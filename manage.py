#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask.ext.script import Manager

from odot.server import create_app
from odot.server.ext import store

app = create_app('odot')
manager = Manager(app)


@manager.shell
def make_shell_context():
    """Return context dict for a shell session.

    This enables quick access to the Flask ``app`` object.

    Returns:
        dict: context object for the Shell session.
    """
    return dict(app=app, store=store)


manager.add_option(
  '-c', '--config', dest='config', required=False, help='config file path')


if __name__ == '__main__':
    manager.run()
