# Use an official Node.js runtime as a parent image
FROM node:lts

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm ci 
RUN npm cache clean --force

# Copy the rest of the application code
COPY . .

RUN npx prisma generate

RUN chmod +x /usr/src/app/ngrok/ngrok

RUN chmod +x /usr/src/app/ngrok/start-ngrok.sh

RUN ./ngrok/ngrok config add-authtoken 2YkB9ii3Y4pmQt52BodfTOxHPtH_KeV2ZPP3SJgkjMEwA3H6

RUN apt-get update && apt-get install -y bash netcat-openbsd 

# Define the command to run your application
CMD ["sh", "-c", "node build/index.js & ./ngrok/start-ngrok.sh"]