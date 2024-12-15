# Base image for serving the built app
FROM nginx:alpine AS production

# Switch to a non-root user
USER 1001

# Copy the built app to the NGINX HTML directory
COPY --from=build /app/build /usr/share/nginx/html

RUN mkdir -p /tmp/client_temp && \
    chown -R 1001:0 /tmp

# Expose the port NGINX will listen on
EXPOSE 8080

# Start NGINX to serve the app
CMD ["nginx", "-g", "daemon off;"]


