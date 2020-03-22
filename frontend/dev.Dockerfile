FROM node:13-alpine 

RUN mkdir -p /srv/app
WORKDIR /srv/app

ENV PATH /srv/app/node_modules/.bin:$PATH

COPY . /srv/app
RUN npm install
CMD ng serve --host 0.0.0.0