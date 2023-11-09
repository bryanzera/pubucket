FROM node:lts-alpine as base

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

CMD ["npm", "run", "start"]
