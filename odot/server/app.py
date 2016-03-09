# -*- coding: utf-8 -*-
import logging

from flask import Flask, g, session
from sqlalchemy.exc import OperationalError

from .ext import api, github, store

logger = logging.getLogger(__name__)


def create_app(name, config_path='odot.server.settings.DevelopConfig'):
    """Instatiate Flask app object."""
    app = Flask(__name__)
    logger.debug('load configurations')
    app.config.from_object(config_path)

    logger.debug('configure extensions')
    api.init_app(app)
    github.init_app(app)
    store.init_app(app)

    logger.debug('register blueprints')
    for blueprint in app.config['BLUEPRINTS']:
        app.register_blueprint(blueprint)

    setup_requests(app)

    return app


def setup_requests(app):
    @app.before_first_request
    def setup_things():
        if not app.debug:
            # In production mode, add log handler to sys.stderr.
            app.logger.addHandler(logging.StreamHandler())
            app.logger.setLevel(logging.INFO)

        # setup database with tables
        store.create_all()

    @app.before_request
    def before_request():
        g.user = None
        if 'user_token' in session:
            try:
                g.user = store.user(gh_token=session['user_token'])
            except OperationalError:
                return None
