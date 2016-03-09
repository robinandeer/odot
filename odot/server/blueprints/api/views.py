# -*- coding: utf-8 -*-
from flask import jsonify, request, abort, Blueprint, g
from flask_restful import Resource

from odot.server.ext import store, api
from odot.api import dictify_user

BP_NAME = __name__.split('.')[-2]
blueprint = Blueprint(BP_NAME, __name__)


@blueprint.route('/user')
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
