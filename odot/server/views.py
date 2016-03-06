# -*- coding: utf-8 -*-
import logging

from flask import (abort, Flask, redirect, url_for, request, render_template,
                   flash, g, session, jsonify)
from flask_restful import Resource, Api
from flask.ext.github import GitHub
from sqlalchemy.exc import OperationalError

from odot.api import TodoStore, Model


app = Flask(__name__)
app.config.from_object('odot.server.settings.DevelopConfig')
api = Api(app)
github = GitHub(app)
store = TodoStore(Model=Model)
store.init_app(app)


def dictify_user(user_obj):
    user_dict = user_obj.to_dict()
    user_dict['lists'] = [dictify_list(list_obj) for list_obj
                          in user_obj.lists]
    return user_dict


def dictify_list(list_obj):
    todos = [todo_obj.to_dict() for todo_obj in list_obj.todos]
    list_dict = list_obj.to_dict()
    list_dict['todos'] = todos
    return list_dict


@app.before_first_request
def setup_things():
    if not app.debug:
        # In production mode, add log handler to sys.stderr.
        app.logger.addHandler(logging.StreamHandler())
        app.logger.setLevel(logging.INFO)

    # setup database with tables
    store.create_all()


@app.before_request
def before_request():
    g.user = None
    if 'user_token' in session:
        try:
            g.user = store.user(gh_token=session['user_token'])
        except OperationalError:
            return None


@github.access_token_getter
def token_getter():
    user = g.user
    if user is not None:
        return user.gh_token


@app.route('/')
def index():
    if g.user:
        if g.user.email is None:
            user_data = github.get('user')
            g.user.email = user_data['email']
            g.user.name = user_data['name']
            store.commit()
        return render_template('app.html')

    return render_template('index.html')


@app.route('/login')
def login():
    return github.authorize()


@app.route('/logout')
def logout():
    session.pop('user_token', None)
    return redirect(url_for('index'))


@app.route('/authorized')
@github.authorized_handler
def authorized(oauth_token):
    next_url = request.args.get('next') or url_for('index')
    if oauth_token is None:
        flash("Authorization failed.")
        return redirect(next_url)

    user_obj = store.user(gh_token=oauth_token)
    if user_obj is None:
        user_obj = store.add_user(gh_token=oauth_token)

    session['user_token'] = user_obj.gh_token
    return redirect(next_url)


@app.route('/user')
def user():
    if g.user:
        user_dict = dictify_user(g.user)
        return jsonify(**user_dict)
    else:
        return abort(500)


class UsersApi(Resource):
    def get(self):
        all_users = [user_obj.to_dict() for user_obj in store.users()]
        return {'users': all_users}

    def post(self):
        name = request.form['name']
        email = request.form['email']
        new_user = store.add_user(name, email)
        return new_user.to_dict()


class UserApi(Resource):
    def get(self, email):
        user_obj = store.user(email)
        if user_obj is None:
            return abort(404)
        user_dict = dictify_user(user_obj)
        return user_dict


class ListsApi(Resource):
    def post(self):
        name = request.form['name']
        new_list = store.add_list(name, g.user)
        return new_list.to_dict()

    def get(self):
        data = [user_list.to_dict() for user_list in g.user.lists]
        return {'lists': data}


class ListApi(Resource):
    def put(self, list_id):
        title = request.form['title']
        list_obj = store.list(list_id)
        if list_obj is None:
            return abort(404)
        store.add_todo(title, list_obj)
        return list_obj.to_dict()

    def delete(self, list_id):
        list_obj = store.list(list_id)
        store.remove_list(list_obj)
        return {'success': True}


class TodosApi(Resource):
    def post(self):
        list_id = request.form['list_id']
        text = request.form['text']
        list_obj = store.list(list_id)
        todo_obj = store.add_todo(text, list_obj)
        return todo_obj.to_dict()


class TodoApi(Resource):
    def put(self, todo_id):
        todo_obj = store.todo(todo_id)
        todo_obj.done = False if todo_obj.done else True
        store.commit()
        return todo_obj.to_dict()

    def delete(self, todo_id):
        todo_obj = store.todo(todo_id)
        store.remove_todo(todo_obj)
        return todo_obj.to_dict()


api.add_resource(UsersApi, '/api/v1/users')
api.add_resource(UserApi, '/api/v1/users/<email>')
api.add_resource(ListsApi, '/api/v1/lists')
api.add_resource(ListApi, '/api/v1/lists/<list_id>')
api.add_resource(TodoApi, '/api/v1/todos/<todo_id>')
api.add_resource(TodosApi, '/api/v1/todos')


if __name__ == '__main__':
    app.run(debug=True)
