FROM node:8
WORKDIR /src
COPY . /src
RUN npm install
RUN npm rebuild node-sass
EXPOSE 4200
