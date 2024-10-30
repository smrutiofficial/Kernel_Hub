# Step 1: Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Step 2: Production stage
FROM node:18-alpine

# Set working directory in the final image
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app /app

# Expose the necessary port
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production

# Start the server
CMD ["node", "index.js"]
