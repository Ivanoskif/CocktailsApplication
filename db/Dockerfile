# syntax=docker/dockerfile:1
FROM mongo:7
COPY db/mongo-init.js /docker-entrypoint-initdb.d/01-init.js
EXPOSE 27017
