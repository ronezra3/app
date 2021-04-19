FROM node:8-alpine as buildstage
RUN mkdir -p /usr/src/app/temp-build
WORKDIR /usr/src/app/temp-build
COPY package.json /usr/src/app/temp-build
RUN npm install
COPY . /usr/src/app/temp-build
RUN npm rebuild node-sass
RUN npm run build:offline


FROM nginx:1.17
COPY --from=buildstage /usr/src/app/temp-build/www /usr/share/nginx/html/
