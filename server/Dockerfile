FROM node:10-alpine

RUN apk add --no-cache tini
ADD package.json .
RUN yarn --pure-lockfile
ADD ./* ./
ENTRYPOINT [ "tini", "--" ]
CMD [ "yarn", "start" ]