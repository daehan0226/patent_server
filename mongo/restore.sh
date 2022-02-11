if [ -f ../.env ]; then
  export $(echo $(cat ../.env | sed 's/#.*//g'| xargs) | envsubst)
fi

docker exec -i ${MONGO} /usr/bin/mongorestore --username ${MONGO_USERNAME} --password ${MONGO_PASSWORD} --authenticationDatabase admin --db ${MONGO_DATABASE} /dump
