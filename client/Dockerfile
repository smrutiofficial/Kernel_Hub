FROM node:20

WORKDIR /client/src/app

COPY client/package.json ./

RUN npm install

COPY client/  .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
