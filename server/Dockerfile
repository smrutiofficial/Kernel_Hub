FROM node:20

WORKDIR /server

COPY server/package.json ./

RUN npm install

COPY . .

EXPOSE 5000

# ARG NODE_ENV=production
# ENV NODE_ENV=$NODE_ENV

CMD ["npm", "run", "dev"]