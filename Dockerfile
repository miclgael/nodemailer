FROM node:lts-alpine

# make the 'app' folder and set as cwd
WORKDIR /app

# copy entire repo to container
COPY . .

# install project dependencies and run app
RUN npm install && node index.js