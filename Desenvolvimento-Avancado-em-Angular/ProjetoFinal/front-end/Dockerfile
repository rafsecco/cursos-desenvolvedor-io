### Estágio 1 — Build Angular ###
FROM node:20-alpine AS ng-builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx ng build --configuration production

### Estágio 2 — NGINX servindo os arquivos estáticos ###
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=ng-builder /app/dist/front-end/browser /usr/share/nginx/html
EXPOSE 80
