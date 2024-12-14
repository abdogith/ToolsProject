# Step 1: Build the React App
FROM node:16-alpine AS build

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Build the React app
RUN npm run build

# Step 2: Prepare NGINX for Deployment
FROM nginx:1.21-alpine

# Set permissions for OpenShift (fix permission issues)
USER root
RUN mkdir -p /var/cache/nginx /var/run/nginx && \
    chmod -R 777 /var/cache/nginx /var/run/nginx /etc/nginx /usr/share/nginx/html

# Remove the "user" directive from NGINX configuration (optional)
RUN sed -i '/^user/d' /etc/nginx/nginx.conf

# Copy the built app to the NGINX HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the NGINX port
EXPOSE 8080

# Switch back to a non-root user
USER 1001

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]

