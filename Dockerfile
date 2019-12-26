FROM node:12-alpine

RUN apk update && apk add bash nano

WORKDIR /usr/app/

EXPOSE 80

CMD [""]

ENTRYPOINT ["tail", "-f", "/dev/null"]
