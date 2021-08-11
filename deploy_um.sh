#!/bin/bash

file_name=um_deployment && \
  current_time=$(date "+%Y%m%d%H%M%S") && \
  new_fileName=$file_name.$current_time && \
  echo "Um deployment starting" > $new_fileName.log && \
  git checkout um >> $new_fileName.log && \
  git pull >> $new_fileName.log && \
  zip -r EsportsUmWeb . -x 'node_modules*' -x '.next*' -x '.git*' && \
  aws s3 cp EsportsUmWeb.zip s3://esports-deploy-src/um/EsportsUmWeb.zip >> $new_fileName.log && \
  rm EsportsUmWeb.zip && \

if [ $? -eq 0 ]
then
  echo "Deployment Successfully ended"
  aws s3 cp $new_fileName.log s3://esports-log/um/$new_fileName.log && rm $new_fileName.log
  exit 0
else
  echo "Deployment failed" >&2
  exit 1
fi