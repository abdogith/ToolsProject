# Step 1: Base image for building the React app
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

# Step 2: Base image for serving the app
FROM nginx:1.21-alpine

# Set permissions for the NGINX directories
RUN mkdir -p /var/cache/nginx /var/run/nginx && \
    chown -R nginx:nginx /var/cache/nginx /var/run/nginx /usr/share/nginx/html

# Copy the built app to the NGINX HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port NGINX will listen on
EXPOSE 80

# Start NGINX to serve the app
USER nginx
CMD ["nginx", "-g", "daemon off;"]
