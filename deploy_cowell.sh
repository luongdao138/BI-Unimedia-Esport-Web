#!/bin/bash

file_name=cowell_deployment && \
  current_time=$(date "+%Y%m%d%H%M%S") && \
  new_fileName=$file_name.$current_time && \
  echo "cowell deployment starting" > $new_fileName.log && \
  git checkout cowell >> $new_fileName.log && \
  git pull >> $new_fileName.log && \
  zip -r EsportsCowellWebV2 . -x 'node_modules*' -x '.next*' -x '.git*' && \
  aws s3 cp EsportsCowellWebV2.zip s3://esports-deploy-src/cowell/EsportsCowellWebV2.zip >> $new_fileName.log && \
  rm EsportsCowellWebV2.zip && \

if [ $? -eq 0 ]
then
  echo "Deployment Successfully ended"
  aws s3 cp $new_fileName.log s3://esports-log/cowell/$new_fileName.log 
  exit 0
else
  echo "Deployment failed" >&2
  exit 1
fi