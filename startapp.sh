#!/bin/bash

case $BRAIN_APP in
   "api")
        node ./api/doodle.js
        ;;
   *)
        /usr/sbin/nginx -g "daemon off;"
        ;;
esac
