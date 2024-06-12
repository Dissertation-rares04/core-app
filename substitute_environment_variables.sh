#!/bin/sh

ROOT_DIR=/app

# Replace env vars in files served by NGINX
for file in $ROOT_DIR/js/*.js* $ROOT_DIR/index.html $ROOT_DIR/precache-manifest*.js;
do
  sed -i 's|API_URL_PLACEHOLDER|'${API_URL}'|g' $file
  sed -i 's|AUTH0_DOMAIN_PLACEHOLDER|'${AUTH0_DOMAIN}'|g' $file
  sed -i 's|AUTH0_CLIENTID_PLACEHOLDER|'${AUTH0_CLIENTID}'|g' $file
  sed -i 's|AUTH0_AUDIENCE_PLACEHOLDER|'${AUTH0_AUDIENCE}'|g' $file
  sed -i 's|AUTH0_REDIRECT_URI_PLACEHOLDER|'${AUTH0_REDIRECT_URI}'|g' $file
  # Your other variables here...
done
# Let container execution proceed
exec "$@"
