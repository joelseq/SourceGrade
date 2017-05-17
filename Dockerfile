FROM kkarczmarczyk/node-yarn:latest

# Create app folder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Setup environment
ARG NODE_ENV
ENV NODE_ENV production

# Install dependencies
COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app
RUN yarn

# Copy app into working directory
COPY . /usr/src/app

# Expose the port the server is going to run on
EXPOSE 3000

# Start the server
CMD ["node", "bin/www"]

