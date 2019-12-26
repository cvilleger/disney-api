FROM node:12-alpine

WORKDIR /usr/app/

EXPOSE 80

CMD [""]

ENTRYPOINT ["tail", "-f", "/dev/null"]
