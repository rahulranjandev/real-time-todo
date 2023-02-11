FROM node:16-alpine

RUN apk add --update nodejs
# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
# RUN npm install
# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . /app


CMD [ "node", "src/app.js" ]
