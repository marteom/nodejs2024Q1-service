FROM node:20-alpine

USER node

RUN mkdir -p /home/node
WORKDIR /home/node

COPY --chown=node:node package*.json ./

RUN npm i --force && npm cache clean --force

COPY --chown=node:node . .

RUN npm run build

EXPOSE ${PORT}

CMD [ "npm", "run", "start:dev" ]