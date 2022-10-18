# set build env variables
export REACT_APP_BASEPATH="/react-crud/"
export REACT_APP_COLLECTION_NAME="customers-db"

# build all
npm run build
cd ../frontend && npm run build && cd ../backend && cp -r ../frontend/build ./

# unset build env variables
unset REACT_APP_BASEPATH
unset REACT_APP_COLLECTION_NAME

# switch to correct project
gcloud auth login szopatrik@gmail.com
gcloud config set project react-crud-2e223

#deploy the function
gcloud functions deploy react-crud \
  --runtime nodejs16 \
  --trigger-http \
  --region europe-west3 \
  --memory 256Mi \
  --max-instances 1 \
  --entry-point runApp \
  --env-vars-file .env.yaml \
  --allow-unauthenticated

# LOGS
# gcloud functions logs read react-crud --limit 50
