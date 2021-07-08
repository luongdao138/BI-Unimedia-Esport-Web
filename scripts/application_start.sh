#!/bin/bash
cd /home/ubuntu/esports-web-v2 && \
  yarn install --production=true && \
  NODE_ENV=production pm2 start server.js -f -i max