# stage1 - build react app first 
FROM node:12.16.1-alpine3.9 as build
WORKDIR /app
COPY ./package.json /app/
COPY . /app

ARG NODE_ENV
ARG PUBLIC_URL
ARG BASE_URL
ARG REACT_APP_API_URL

RUN npm install
RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.17.8-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
