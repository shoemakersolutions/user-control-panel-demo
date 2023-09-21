FROM node:lts AS devserver

RUN mkdir -p /usr/src/app/src
WORKDIR /usr/src/app

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.build.json ./tsconfig.build.json
COPY db-config.json ./db-config.json
COPY nest-cli.json ./nest-cli.json

RUN npm ci

COPY ./src ./src
RUN mkdir -p ./migrations
COPY ./migrations ./migrations

CMD ["npm", "run", "start:dev"]
