
FROM nginx:alpine AS production

# Ensure NGINX has permissions to write to the necessary directories
RUN mkdir -p /var/cache/nginx && \
    chown -R nginx:nginx /var/cache/nginx

# Copy the built app to the NGINX HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port NGINX will listen on
EXPOSE 80

# Start NGINX to serve the app
CMD ["nginx", "-g", "daemon off;"]
