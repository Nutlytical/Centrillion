#********************  For Test ********************#

FROM node:alpine

WORKDIR /app
COPY . .
RUN rm -rf node_modules
RUN npm install

EXPOSE 5000

CMD ["npm", "run", "dev"]

