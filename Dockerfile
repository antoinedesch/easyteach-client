
FROM node:17.5-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
COPY ssl/certificate.crt /app/
COPY ssl/ /app/ssl

RUN npm install
COPY . .
RUN npm install -g @angular/cli
RUN ng build --configuration production --output-path=/dist

################
# Run in NGINX #
################
FROM nginx:alpine

RUN mkdir -p /ssl
COPY --from=build /app/ssl/ /ssl/
ADD ssl/certificate.crt /etc/nginx/certs/
ADD ssl/private.key /etc/nginx/certs/

COPY --from=build /dist /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf


EXPOSE 443 80

# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
