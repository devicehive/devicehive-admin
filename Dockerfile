FROM node:latest

ARG REACT_APP_SERVER_URL

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install pushstate-server -g && npm install && REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL npm run build

EXPOSE 9000

CMD ["pushstate-server", "build"]