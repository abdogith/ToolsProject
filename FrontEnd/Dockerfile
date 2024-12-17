# Base image for building the React app
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

# Base image for serving the built app
FROM nginx:alpine AS production

# Copy the built app to the NGINX HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port Nginx will listen on
EXPOSE 8080

# Start Nginx with a writable PID file location
CMD ["nginx", "-g", "daemon off; pid /tmp/nginx.pid;"]  # Ensure PID location is /tmp/nginx.pid



