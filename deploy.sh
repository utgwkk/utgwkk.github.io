#!/bin/sh
set -e

rsync -auvz ./html/ $DEST:/home/www
