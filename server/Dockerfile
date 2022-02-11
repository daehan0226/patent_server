FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY src ./src
COPY tsconfig.json ./tsconfig.json

ENV NODE_ENV production
RUN npm run build

CMD [ "npm", "run", "start" ]