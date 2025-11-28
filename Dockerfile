FROM node:19-alpine

WORKDIR /app

# Copy package files first (for better caching)
COPY package.json package-lock.json* ./

RUN npm install --production

# Copy the entire src folder
COPY src ./src

CMD ["node", "src/server.js"]
