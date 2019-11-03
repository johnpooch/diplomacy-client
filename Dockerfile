# base image
FROM node

# set working directory
WORKDIR /app

# install
COPY . ./
RUN yarn
RUN yarn build

# start app
CMD ["yarn", "start"]
