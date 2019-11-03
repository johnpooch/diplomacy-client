FROM node

# install Webpack globally
RUN yarn config set registry http://registry.npmjs.org/
RUN yarn add webpack -g
RUN yarn add webpack-cli -g

# copy over package.json and install Node modules
WORKDIR /tmp
COPY package.json /tmp/
RUN yarn install

# set working directory and copy over Node modules
WORKDIR /app
COPY . /app/
RUN cp -a /tmp/node_modules /app/

# run server
CMD ["npm", "start"]
