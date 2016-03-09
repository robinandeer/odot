# -*- coding: utf-8 -*-
from flask import Blueprint, g, session, redirect, request, url_for, flash

from odot.server.ext import github, store

BP_NAME = __name__.split('.')[-2]
blueprint = Blueprint(BP_NAME, __name__)


@github.access_token_getter
def token_getter():
    user = g.user
    if user is not None:
        return user.gh_token


@blueprint.route('/login')
def login():
    return github.authorize()


@blueprint.route('/logout')
def logout():
    session.pop('user_token', None)
    return redirect(url_for('public.index'))


@blueprint.route('/authorized')
@github.authorized_handler
def authorized(oauth_token):
    next_url = request.args.get('next') or url_for('public.index')
    if oauth_token is None:
        flash("Authorization failed.")
        return redirect(next_url)

    user_obj = store.user(gh_token=oauth_token)
    if user_obj is None:
        user_obj = store.add_user(gh_token=oauth_token)

    session['user_token'] = user_obj.gh_token
    return redirect(next_url)
