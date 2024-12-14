# Stage 1: Build the React app
FROM node:16-alpine AS build

# Set the working directory
WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./ 

# Install dependencies
RUN npm install

# Copy the application code
COPY . ./

# Build the React app
RUN npm run build

# Stage 2: Serve the app using NGINX
FROM nginx:alpine AS production

# Ensure NGINX has permissions to write to the necessary directories
RUN mkdir -p /var/cache/nginx && \
    mkdir -p /var/run/nginx && \
    chown -R nginx:nginx /var/cache/nginx /var/run/nginx /etc/nginx

# If you need to run NGINX as root for binding to port 80, modify the user directive
USER root

# Modify the port NGINX listens on (if needed)
RUN sed -i 's/listen 80;/listen 8080;/' /etc/nginx/conf.d/default.conf

# Copy the built app to the NGINX HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port NGINX will listen on
EXPOSE 8080

# Start NGINX to serve the app
CMD ["nginx", "-g", "daemon off;"]
