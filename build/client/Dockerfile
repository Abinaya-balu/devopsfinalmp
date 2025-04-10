# Use Node.js for building
FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
# Set environment variables for the build
ENV REACT_APP_TITLE="Kongu Hall Booking System"
ENV REACT_APP_HOD_FEATURE=true
RUN npm run build

# Use Nginx for serving React
FROM nginx:alpine
# Copy custom nginx config if needed
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
# Add script to replace environment variables at runtime
COPY ./env.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/env.sh
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
