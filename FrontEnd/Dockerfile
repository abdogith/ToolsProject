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

# Switch to a non-root user
USER 1001

# Create a writable temp directory for NGINX
RUN mkdir -p /tmp/client_temp && \
    chown -R 1001:0 /tmp

# Copy the built app from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port NGINX will listen on
EXPOSE 8080

# Start NGINX to serve the app
CMD ["nginx", "-g", "daemon off;"]
