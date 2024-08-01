# Use a lightweight Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Update package index and install g++
RUN apk update && apk add --no-cache g++ python3 py3-pip

# Copy only the package.json and package-lock.json files and install dependencies
# This allows Docker to cache this layer when package files don't change
COPY package*.json ./
RUN npm install

# Copy all the code from the current directory to the working directory in the container
COPY . .

# Expose port 8000
EXPOSE 8000

# Define the command to run the application
CMD ["node", "server.js"]