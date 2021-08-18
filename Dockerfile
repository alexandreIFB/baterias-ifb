#Imagem do container
FROM node:15.2.0-alpine3.12
#Instalar o bash
RUN apk add --no-cache bash
#Instalar cli nest
RUN npm i -g @nestjs/cli@8.0.0

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
#non-root
USER node 
#Pasta da api
WORKDIR /home/node/app