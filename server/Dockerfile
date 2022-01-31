FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY src ./src
COPY .env ./.env
COPY tsconfig.json ./tsconfig.json

RUN npm run build

CMD [ "npm", "run", "start" ]