FROM node:alpine

LABEL authors="SaedNassar"

RUN npm install -g nodemon

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 5001

CMD ["npm", "run", "start"]