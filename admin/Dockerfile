# Base image
FROM node:20

WORKDIR /admin/app

COPY admin/package.json ./

RUN npm install

COPY admin/ .

RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]