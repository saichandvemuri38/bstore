# Client App
FROM node:16-alpine3.11 as angular

WORKDIR /app
COPY . .
RUN npm install --silent
RUN npm run build

FROM httpd:alpine3.15

WORKDIR /usr/local/apache2/htdocs
COPY --from=angular /app/dist/book-store .

