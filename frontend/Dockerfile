FROM node:13-alpine as production

RUN mkdir -p /srv/app
WORKDIR /srv/app

ENV PATH /srv/app/node_modules/.bin:$PATH

COPY . /srv/app
RUN npm install
RUN ng build --prod --aot



FROM nginx:alpine

WORKDIR /

RUN rm -rf /usr/share/nginx/html/*

# COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY server.* /
COPY --from=production /srv/app/dist/frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]