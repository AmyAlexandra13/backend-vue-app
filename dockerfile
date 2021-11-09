FROM  node:current-alpine3.12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

ENV NODE_ENV=production
ENV DBURL=postgres://postgres:123@172.20.0.2:5432/postgres
ENV PORT=3001

COPY . .

EXPOSE 3001

CMD ["node","server.js" ]