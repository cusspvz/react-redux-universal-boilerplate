FROM cusspvz/node:7.0.0
MAINTAINER José Moreira <josemoreiravarzim@gmail.com>

ARG NODE_ENV=production

ADD package.json /app/package.json

RUN npm install --production

ADD build/node /app/build/node
ADD build/browser /app/build/browser

EXPOSE 3000
CMD [ "start" ]