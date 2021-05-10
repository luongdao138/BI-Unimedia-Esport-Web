zip -r EsportsDevWeb . -x 'node_modules*' -x '.next*' -x '.git*' && \
  aws s3 cp EsportsDevWeb.zip s3://esports-deploy-src/dev/EsportsDevWeb.zip && \
  rm EsportsDevWeb.zip