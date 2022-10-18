# insert correct main name into package.json
pattern='  "main": "dist/app.js",'
replacement='  "main": "dist/sendToPubSubWorker.js",'
sed -i --expression "s@$pattern@$replacement@" package.json

gcloud functions deploy sendToPubSubWorker \
 --entry-point main \
 --runtime nodejs12 \
 --region europe-west3 \
 --memory 256Mi \
 --max-instances 1 \
 --trigger-topic sendToPubSub-trigger \
 --timeout=540

# delete inserted name
pattern='  "main": "dist/sendToPubSubWorker.js",'
replacement='  "main": "dist/app.js",'
sed -i --expression "s@$pattern@$replacement@" package.json