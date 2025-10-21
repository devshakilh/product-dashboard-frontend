# Use an official Node.js runtime as a parent image
FROM node:18

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /app

# Copy your package.json and pnpm-lock.yaml (if exists) into the container
COPY package.json pnpm-lock.yaml* ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of your app's code into the container
COPY . .

# Run the build process
RUN pnpm run build

# Expose the port your app is running on (adjust as needed)
EXPOSE 3000

# Define the command to run your app (adjust as needed)
CMD ["pnpm", "start"]
