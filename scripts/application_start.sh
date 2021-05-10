#!/bin/bash
cd /home/ubuntu/esports-web-v2 && \
  NODE_ENV=production pm2 start yarn -- start
