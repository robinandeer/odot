# -*- coding: utf-8 -*-
import pytest

from odot.api import TodoStore, User, List, Todo, Model


@pytest.yield_fixture(scope='function')
def db():
    config = {'SQLALCHEMY_DATABASE_URI': 'sqlite://'}
    _db = TodoStore(config=config, Model=Model)
    _db.create_all()
    yield _db
    _db.drop_all()


@pytest.yield_fixture(scope='function')
def user(db):
  _user = User(name='Paul Anderson', email='paul.anderson@magnlia.com')
  one_list = List(name='My list', user=_user)
  one_list.todos.append(Todo(title='Do this'))
  one_list.todos.append(Todo(title='Do that'))
  db.add_commit([_user, one_list])
  yield _user
