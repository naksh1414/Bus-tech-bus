# Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies including devDependencies
RUN npm install

# Copy TypeScript config
COPY tsconfig.json ./

# Copy source code
COPY . .

# Set environment variables
ENV NODE_ENV=development
ENV PORT=8008
ENV KAFKA_BROKER=kafka:9092

# Expose port
EXPOSE 8008

CMD ["npx", "ts-node", "app.ts"]