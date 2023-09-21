FROM node:lts AS devui

RUN mkdir -p /usr/src/app/src
WORKDIR /usr/src/app

ENV CI=true
ENV PORT=3000

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

RUN npm ci

RUN mkdir -p ./public
COPY ./public ./public
COPY ./src ./src

CMD ["npm", "start"]
