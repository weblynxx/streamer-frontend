#!/bin/sh
for file in /usr/share/nginx/html/js/app.*.js;
do
  if [ ! -f $file.tmpl.js ]; then
    cp $file $file.tmpl.js
  fi
  envsubst '$VUE_APP_TWITCH_REDIRECT' < $file.tmpl.js > $file
done
echo "Starting Nginx"
nginx -g 'daemon off;'