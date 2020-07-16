FROM node:12

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Create app directory
WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

USER root

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Install netcat for wait-for
RUN apt-get -q update && apt-get -qy install netcat

# Bundle app source
COPY --chown=node:node . .

EXPOSE 3030
CMD [ "node", "server.js" ]