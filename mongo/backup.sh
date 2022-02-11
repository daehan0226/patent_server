if [ -f ../.env ]; then
  export $(echo $(cat ../.env | sed 's/#.*//g'| xargs) | envsubst)
fi

docker exec $MONGO /usr/bin/mongodump --archive -u ${MONGO_USERNAME} -p ${MONGO_PASSWORD} --authenticationDatabase admin > ./backup/$(date '+%d-%m-%Y_%H-%M-%S').gz