# Use an official Node.js runtime
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Run tests (this uses the "test" script from package.json)
RUN npm test

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]