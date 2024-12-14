# Stage 1: Build the React app
FROM node:16-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app using NGINX
FROM nginx:alpine AS production

# Copy custom NGINX configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built app to the NGINX HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port NGINX will listen on
EXPOSE 8080

# Start NGINX to serve the app
CMD ["nginx", "-g", "daemon off;"]
