ARG NODE_VERSION=18.13.0

################## Stage 1 ##################
FROM node:${NODE_VERSION}-alpine as development
WORKDIR /usr/src/app

COPY package.json yarn.lock tsconfig.json tsconfig.node.json vite.config.ts index.html *.config.cjs ./
COPY ./src ./src
COPY .env.production .env

RUN yarn install && yarn build

################## Stage 2 ##################
FROM node:${NODE_VERSION}-alpine as production
WORKDIR /usr/src/app

COPY --chown=node:node --from=development /usr/src/app/dist .
RUN yarn global add serve

EXPOSE 3000
CMD serve -s . -l 3000