gcloud auth login szopatrik@gmail.com
gcloud config set project react-crud

gcloud scheduler jobs create pubsub sendToPubSub-worker-scheduler --schedule="0 20 4 * *" \
  --topic=sendToPubSub-trigger --message-body="Make clean please :)"