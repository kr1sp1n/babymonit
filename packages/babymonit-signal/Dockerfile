FROM mhart/alpine-node:5
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
CMD npm start
