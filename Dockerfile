# Use the official Node.js 14 image as the base image
FROM node:16
# Set the working directory inside the container
WORKDIR /app
# Copy package.json and package-lock.json to the container
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code to the container
COPY . .
# Expose the port that the NestJS application is listening on (default is 3000)
EXPOSE 3000
# Start the NestJS application
CMD ["npm", "run", "start"]