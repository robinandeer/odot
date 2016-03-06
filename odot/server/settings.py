# -*- coding: utf-8 -*-
import os


class BaseConfig:
    SQLALCHEMY_DATABASE_URI = 'sqlite://'


class DevelopConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    GITHUB_CLIENT_ID = os.environ['GITHUB_CLIENT_ID']
    GITHUB_CLIENT_SECRET = os.environ['GITHUB_CLIENT_SECRET']

    SECRET_KEY = 'iamasecret'
