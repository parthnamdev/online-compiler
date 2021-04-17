FROM alpine:latest
RUN apk add --no-cache nodejs npm gcc libc-dev g++ openjdk8
ENV JAVA_HOME /usr/lib/jvm/java-1.8-openjdk
ENV PATH $PATH:$JAVA_HOME/bin

RUN export JAVA_HOME
RUN export PATH

WORKDIR /app

COPY . /app

RUN npm install



CMD node app.js --bind 0.0.0.0:$PORT