from alchy import ModelBase, make_declarative_base
from sqlalchemy import orm, Column, types, ForeignKey

Model = make_declarative_base(Base=ModelBase)


class User(Model):
    id = Column(types.Integer, primary_key=True)
    name = Column(types.String(128))
    email = Column(types.String(128))
    gh_token = Column(types.String(128))

    lists = orm.relationship('List')


class Todo(Model):
    id = Column(types.Integer, primary_key=True)
    text = Column(types.String(256))
    done = Column(types.Boolean, default=False)
    list_id = Column(types.Integer, ForeignKey('list.id'))

    list = orm.relationship('List')


class List(Model):
    id = Column(types.Integer, primary_key=True)
    name = Column(types.String(128))
    user_id = Column(types.Integer, ForeignKey('user.id'))

    user = orm.relationship('User')
    todos = orm.relationship('Todo', order_by=Todo.id.desc())
