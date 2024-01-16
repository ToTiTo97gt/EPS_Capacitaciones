FROM node:16-alpine

WORKDIR /usr/src/app
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# install and cache app dependencies
COPY package.json /usr/src/
RUN npm install

COPY . /usr/src/app

EXPOSE 3020

CMD ["npm", "start"]

# WORKDIR /usr/src/app

# COPY . .

# RUN npm install

# EXPOSE 3020

# CMD [ "npm", "start" ]