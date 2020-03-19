FROM node:12.16.1-alpine

RUN mkdir /usr/app

WORKDIR /usr/app

COPY ./package.json .

COPY ./yarn.lock .

RUN yarn

COPY ./tsconfig.json .

COPY ./src ./src

COPY .env .env

RUN yarn build

CMD yarn start