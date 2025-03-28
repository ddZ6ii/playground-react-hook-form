# Specify the base image to extend
FROM node:20-alpine3.21

# Specify the working directory in the image where files will be copied and commands will be executed
WORKDIR /app

# Install package manager
RUN apk add curl
RUN curl -L https://unpkg.com/@pnpm/self-installer | node

# Copy and install dependencies
COPY package*.json pnpm-lock.yaml ./
RUN pnpm i

# Copy the actual source code of the application (excluding the ones in .dockerignore)
COPY vite.config.ts ./
COPY tsconfig*.json ./
COPY index.html ./
COPY public ./public
COPY src ./src

# Indicate the port the image would like to expose (documentation only)
EXPOSE 5173

# Define the command to start the application (run at container startup)
CMD [ "pnpm", "run", "dev" ]
