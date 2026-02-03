# Dockerfile for Angular v21 app hosted with Nginx
# Step 1: Build the Angular project
FROM node:24 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --output-path=dist --configuration production

# Step 2: Serve with Nginx
FROM nginx:stable-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy all files from dist root
COPY --from=build /app/dist/* /usr/share/nginx/html/

# Also copy contents of browser folder directly into nginx www folder
COPY --from=build /app/dist/*/browser/ /usr/share/nginx/html/

# Copy default nginx config (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
