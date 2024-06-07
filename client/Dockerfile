FROM node:22-alpine3.19

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . /app

CMD npm run dev -H 0.0.0.0
