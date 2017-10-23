FROM cusspvz/node:5.1.1
MAINTAINER José Moreira

ARG NODE_ENV=production

ADD ./build/node /app/build/node
ADD ./build/browser /app/build/browser
ADD ./package.json /app/package.json

RUN \
  apk update && \
  apk add git && \
  npm install --production && \
  apk del git && \
  rm -fR /var/cache/apk/* ~/.npmrc

CMD [ "start" ]
EXPOSE 3000
