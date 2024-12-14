# Stage 1: Build the React app
FROM node:16-alpine AS build

# Set the working directory
WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the app using NGINX
FROM nginx:alpine AS production

# Use a non-privileged port above 1024 (e.g., 8080)
RUN sed -i 's/listen       80;/listen       8080;/' /etc/nginx/conf.d/default.conf

# Ensure necessary directories are writable for NGINX
RUN mkdir -p /var/cache/nginx && \
    chown -R nginx:nginx /var/cache/nginx

# Copy the built app to the NGINX HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port NGINX will listen on
EXPOSE 8080

# Start NGINX to serve the app
CMD ["nginx", "-g", "daemon off;"]
