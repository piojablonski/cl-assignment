FROM node:16.15.0-alpine as build

USER node
WORKDIR /usr/src/app

# copy package.json, package-lock.json
COPY --chown=node:node package*.json ./
# install dependencies
RUN npm ci

# copy app source
COPY --chown=node:node . .
RUN npm run build

ENV NODE_ENV production
# keep only production depenecies
RUN npm ci --only=production && npm cache clean --force

# ---
FROM node:16.15.0-alpine as production

# copy files from build stage (only thos necessary for execution)
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist


ENV NODE_ENV production

# Use the node user instead of the root user
USER node

# start the server
CMD [ "node", "dist/main.js" ]