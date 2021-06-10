#!/bin/bash
pm2 kill && \
  cd /home/ubuntu && \
  rm esports-web-backup-v2 -rf
  mv esports-web-v2 esports-web-backup-v2 2>/dev/null
