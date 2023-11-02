FROM didar/nginx:latest

COPY ./dist/user-list /usr/share/nginx/html

EXPOSE 80

