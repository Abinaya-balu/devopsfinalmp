FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Set default environment variables
ENV NODE_ENV=production
ENV PORT=5000
ENV APP_NAME="Kongu Hall Booking System"

EXPOSE 5000
CMD ["node", "app.js"]
