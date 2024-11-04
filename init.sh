#!/bin/bash

if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Usage: ./init.sh [dev|prod] [up|down]"
  exit 1
fi

if [ ! -d "./data" ]; then
  mkdir ./data
  echo "Created directory: data"
fi

if [ ! -d "./apps/server/embeddings" ]; then
  mkdir ./apps/server/embeddings
  echo "Created directory: embeddings"
fi

ENV_FILE=""
if [ "$1" == "dev" ]; then
  ENV_FILE="docker-compose-dev.yml"
elif [ "$1" == "prod" ]; then
  ENV_FILE="docker-compose-prod.yml"
else
  echo "Invalid environment. Use 'dev' or 'prod'."
  exit 1
fi

if [ "$2" == "up" ]; then
  docker compose -f "$ENV_FILE" up --build -d
elif [ "$2" == "down" ]; then
  docker compose -f "$ENV_FILE" down
else
  echo "Invalid action. Use 'up' or 'down'."
  exit 1
fi
