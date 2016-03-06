# -*- coding: utf-8 -*-


def test_user(db, user):
    the_user = db.user(user.email)
    assert the_user == user

    # test user that doesn't exist
    assert db.user('i_dont_exist@example.com') is None


def test_users(db, user):
    all_users = db.users()
    assert len(all_users.all()) == 1


def test_add_user(db):
    new_user = db.add_user('Paul Anderson', 'paul@anderson.com')
    assert new_user.id
    assert len(new_user.lists) == 0


def test_remove_user(db, user):
    list_ids = [user_list.id for user_list in user.lists]
    db.remove_user(user)
    for list_id in list_ids:
        list_obj = db.list(list_id)
        assert list_obj is None


def test_add_list(db, user):
    list_name = 'My new list'
    new_list = db.add_list(list_name, user)
    assert new_list.user == user
    assert new_list in user.lists
    assert new_list.name == list_name


def test_remove_list(db, user):
    one_list = user.lists[0]
    db.remove_list(one_list)
    assert one_list not in user.lists


def test_add_todo(db, user):
    one_list = user.lists[0]
    before_count = len(one_list.todos)
    todo_text = 'Do this thing'
    db.add_todo(todo_text, one_list)
    assert len(one_list.todos) == before_count + 1
    assert one_list.todos[0].text == todo_text
    assert one_list.todos[0].done is False


def test_remove_todo(db, user):
    one_list = user.lists[0]
    one_todo = one_list.todos[0]
    before_count = len(one_list.todos)
    db.remove_todo(one_todo)
    assert len(one_list.todos) == before_count - 1
    assert one_todo not in one_list.todos
