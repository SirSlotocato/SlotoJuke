FROM node:14.17.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV DEBUG="sj:*"

EXPOSE 3000

CMD ["npm", "start"]