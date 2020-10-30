FROM node:alpine AS black-box-delivery-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=black-box-delivery-build /app/dist/black-box-delivery /usr/share/nginx/html
EXPOSE 80
