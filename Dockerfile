# Use Node.js 20 Alpine as the base image
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app for production
RUN npm run build

# Use a clean Node.js 20 Alpine image for serving
FROM node:20-alpine AS serve

# Install the `serve` package globally
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy the built React app from the build stage
COPY --from=build /app/build ./build

# Expose port 5000 (default for `serve`)
EXPOSE 5000

# Serve the app
CMD ["serve", "-s", "build", "-l", "5173"]