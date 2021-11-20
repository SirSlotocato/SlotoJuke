FROM node:16.13.0

WORKDIR /app

COPY package*.json ./

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y ffmpeg

RUN npm install

COPY . .

ENV DEBUG="sj:*"

EXPOSE 3000

CMD ["npm", "start"]