# -*- coding: utf-8 -*-


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
