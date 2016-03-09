# -*- coding: utf-8 -*-
from flask_restful import Api
from flask.ext.github import GitHub

from odot.api import TodoStore, Model

api = Api()
github = GitHub()
store = TodoStore(Model=Model)
