# Ticketing microservices project

## Run locally

1. Run `skaffold dev`
1. Change `/etc/hosts`
1. When in Chrome and security tab blocks you, type *thisisunsafe*

## Google Cloud

1. Create Google Cloud account
1. Create project *ticketing-dev*
1. Create k8s cluster
1. Install `gcloud` SDK and run `gcloud init`
1. Run `gcloud container clusters get-credentials <cluster-name>` to connect to GCloud cluster
1. Enable Google Cloud Build