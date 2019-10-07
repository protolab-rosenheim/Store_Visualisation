FROM node:9

RUN npm install -g cordova ionic

WORKDIR /opt/app

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
COPY package.json /opt/app/package.json
RUN npm install

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
COPY . /opt/app

RUN ionic cordova build browser

EXPOSE 8100

CMD [ "cordova", "run", "browser", "--port=8100" ]