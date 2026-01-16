# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.18.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node"

# App lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install frontend dependencies and build
COPY package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY . .

# Build frontend
RUN npm run build

# Copy built frontend to backend public directory
RUN mkdir -p notion-backend/public && cp -r dist/* notion-backend/public/

# Install backend dependencies
WORKDIR /app/notion-backend
RUN npm ci --omit=dev


# Final stage for app image
FROM base

# Copy built application and backend
COPY --from=build /app/notion-backend /app

# Expose port 8080 (fly.io default)
EXPOSE 8080

# Start the backend server
CMD [ "node", "index.js" ]
