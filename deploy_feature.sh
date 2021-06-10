#!/bin/bash

file_name=feature_deployment && \
  current_time=$(date "+%Y%m%d%H%M%S") && \
  new_fileName=$file_name.$current_time && \
  echo "Feature deployment starting" > $new_fileName.log && \
  git checkout feature >> $new_fileName.log && \
  git pull >> $new_fileName.log && \
  zip -r EsportsFeatureWeb . -x 'node_modules*' -x '.next*' -x '.git*' && \
  aws s3 cp EsportsFeatureWeb.zip s3://esports-deploy-src/feature/EsportsFeatureWeb.zip >> $new_fileName.log && \
  rm EsportsFeatureWeb.zip && \

if [ $? -eq 0 ]
then
  echo "Deployment Successfully ended"
  aws s3 cp $new_fileName.log s3://esports-log/feature/$new_fileName.log 
  exit 0
else
  echo "Deployment failed" >&2
  exit 1
fi