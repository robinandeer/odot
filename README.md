# Odot!

[![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url]

A humble todo app built with Flask and React with a PostgreSQL backend.

## Features
- Login through GitHub OAuth
- Create and remove multiple todo lists
- Automatic saving of state

## Install for development

### Setup
Make sure you have node.js and npm installed. Create your Python virtualenv of choice. I personally recommend "conda".

```bash
$ git clone https://github.com/robinandeer/odot
$ cd odot
$ npm install
$ npm install -g webpack webpack-dev-server
$ pip install -e .
$ webpack -d
```

### Configure
There's a few options that you need to set before running the app. I'm using environment variables but you could technically change the behavior by modifying the `odot/settings.py` module.

Odot uses GitHub OAuth to login users. For this you need to ["Register new application"](https://github.com/settings/applications/new) on GitHub and make a note of the credentials. You also need to add an "Authorization callback URL" which you should set to `http://localhost:5000/authorized` for local development.

```bash
export DATABASE_URL="sqlite:///tests/todo-store.sqlite3"
export GITHUB_CLIENT_ID="yourGitHubClientId"
export GITHUB_CLIENT_SECRET="yourGitHubClientSecret"
```

When you run Odot on Heroku, you will need to install the PostgreSQL addon. This will automatically add a `DATABASE_URL` environment variable to your Heroku instance which Odot is configured to use. You just need to add the GitHub credentials in your apps Heroku settings.

### Run
For development we can run the app in a single process and in debug mode:

```bash
$ python serve.py
```

In production we would rather proxy using something like `gunicorn`:

```bash
$ gunicorn serve:app --log-file -
```

Before the app will work you need to setup the database schema which you can do my visiting [`/setup`](http://localhost:5000/setup) in your browser.


[travis-url]: https://travis-ci.org/robinandeer/odot
[travis-image]: https://img.shields.io/travis/robinandeer/odot.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/robinandeer/odot
[coveralls-image]: https://img.shields.io/coveralls/robinandeer/odot.svg?style=flat-square
