# -*- coding: utf-8 -*-
from odot.api.utils import dictify_list, dictify_user


def test_dictify_list(user):
    list_obj = user.lists[0]
    dict_list = dictify_list(list_obj)
    assert dict_list['id'] == list_obj.id
    assert dict_list['name'] == list_obj.name
    todos = [todo.text for todo in list_obj.todos]
    assert [todo['text'] for todo in dict_list['todos']] == todos


def test_dictify_user(user):
    dict_user = dictify_user(user)
    assert dict_user['id'] == user.id
    assert dict_user['name'] == user.name
    assert dict_user['email'] == user.email
    assert len(dict_user['lists']) == 1
    assert isinstance(dict_user['lists'][0], dict)
