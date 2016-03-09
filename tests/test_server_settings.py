# -*- coding: utf-8 -*-
from odot.server.settings import BaseConfig


def test_BaseConfig():
    assert BaseConfig.SQLALCHEMY_DATABASE_URI == 'sqlite://'
    assert len(BaseConfig.BLUEPRINTS) == 3
