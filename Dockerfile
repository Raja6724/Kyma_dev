FROM node:18.12.0

ENV NODE_ENV=production

WORKDIR /usr/src/app
COPY /package*.json ./
RUN npm install

COPY /. .
EXPOSE 4004
USER node
CMD [ "npm", "start" ]