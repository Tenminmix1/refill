FROM node:13-alpine


WORKDIR /srv/app

ADD package*.json ./
ADD tsconfig.json ./

RUN npm i
COPY ./src ./src

RUN npm run build
CMD node dist/server.js
