FROM node:16-alpine as builder


WORKDIR '/app'

COPY package.json .
RUN mkdir ./node_modules && chown -R node:node ../app
USER node
RUN npm install


COPY --chown=node:node . .

CMD ["npm", "run", "start"]

FROM nginx
EXPOSE 3000
COPY ./nginx/default.config /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html