FROM node

# install Webpack globally
RUN npm install webpack -g
RUN npm install webpack-cli -g

# copy over package.json and install Node modules
WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

# set working directory and copy over Node modules
WORKDIR /app
COPY . /app/
RUN cp -a /tmp/node_modules /app/

# run server
CMD ["npm", "start"]
