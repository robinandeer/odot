# -*- coding: utf-8 -*-
from alchy import Manager

from .models import User, List, Todo


class TodoStore(Manager):

    """API layer for managing list of todos."""

    def init_app(self, app):
        """Flask initialize method.

        Args:
            app (Flask): Flask app instance
        """
        self.config.update(app.config)

    def user(self, email=None, gh_token=None):
        """Fetch a user from the database.

        Args:
            email (Optional[str]): email of the user
            gh_token (Optional[str]): GitHub auth token

        Returns:
            User: related user model or `None`
        """
        if email:
            one_user = User.query.filter_by(email=email).first()
        else:
            one_user = User.query.filter_by(gh_token=gh_token).first()
        return one_user

    def users(self):
        """Return all users in the database."""
        all_users = User.query
        return all_users

    def list(self, list_id):
        one_list = List.query.filter_by(id=list_id).first()
        return one_list

    def add_user(self, gh_token, name=None, email=None):
        new_user = User(gh_token=gh_token, name=name, email=email)
        self.add_commit(new_user)
        new_user.refresh()
        return new_user

    def remove_user(self, user_obj):
        for list_obj in user_obj.lists:
            list_obj.delete()
        user_obj.delete()
        self.commit()

    def add_list(self, name, user_obj):
        new_list = List(name=name, user=user_obj)
        self.add_commit(new_list)
        return new_list

    def remove_list(self, list_obj):
        for todo_obj in list_obj.todos:
            todo_obj.delete()
        list_obj.delete()
        self.commit()

    def todo(self, todo_id):
        todo_obj = Todo.query.get(todo_id)
        return todo_obj

    def add_todo(self, text, list_obj):
        new_todo = Todo(text=text)
        list_obj.todos.append(new_todo)
        self.commit()
        return new_todo

    def remove_todo(self, todo_obj):
        todo_obj.delete()
        self.commit()
