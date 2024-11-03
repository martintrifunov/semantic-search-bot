if [ -z "$1" ]; then
  echo "Usage: ./init.sh [up|down]"
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

if [ "$1" == "up" ]; then
    docker compose up --build

elif [ "$1" == "down" ]; then
    docker compose down
    
else
  echo "Invalid argument. Use 'up' or 'down'."
  exit 1
fi
