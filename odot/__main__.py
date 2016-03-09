#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Invoke as ``python -m odot`` (no install required)."""
import sys

from .server import create_app


if __name__ == '__main__':
    # exit using whatever exit code the main returned
    app = create_app('odot')
    sys.exit(app.run())
