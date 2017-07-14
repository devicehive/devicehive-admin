FROM node:latest

ARG REACT_APP_SERVER_URL

ARG REACT_APP_POLL_HISTORY_SIZE

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install serve -g && npm install && REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL REACT_APP_POLL_HISTORY_SIZE=$REACT_APP_POLL_HISTORY_SIZE npm run build

EXPOSE 5000

CMD serve -s build