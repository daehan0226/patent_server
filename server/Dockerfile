FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY src ./src
COPY tsconfig.json ./tsconfig.json

RUN npm run build


CMD [ "npm", "run", "start" ]

# # Start production image build
# FROM gcr.io/distroless/nodejs:16

# # Copy node modules and build directory
# COPY --from=base ./node_modules ./node_modules
# COPY --from=base /dist /dist
