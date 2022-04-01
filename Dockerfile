FROM node:17-buster-slim

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app

RUN npm run build

EXPOSE 3000

USER node
CMD npm run start:prod
