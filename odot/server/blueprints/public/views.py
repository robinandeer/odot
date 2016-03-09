# -*- coding: utf-8 -*-
from flask import Blueprint, g, render_template

from odot.server.ext import github, store

BP_NAME = __name__.split('.')[-2]
blueprint = Blueprint(BP_NAME, __name__, template_folder='templates',
                      static_folder='static',
                      static_url_path="/{}/static".format(BP_NAME))


@blueprint.route('/')
def index():
    if g.user:
        if g.user.email is None:
            user_data = github.get('user')
            g.user.email = user_data['email']
            g.user.name = user_data['name']
            store.commit()
        return render_template('app.html')

    return render_template('index.html')
