#!/bin/bash

set -e

# Function to wait for a yes/no prompt and respond with yes
respond_yes() {
  while true; do
    read -p "Do you want to continue? All data will be lost. " yn
    case $yn in
      [Yy]* ) echo "yes"; break;;
      [Nn]* ) echo "no"; break;;
      * ) echo "Please answer yes or no.";;
    esac
  done
}

# Check if the migrations directory exists
if [ ! -d "prisma/migrations" ]; then
  echo "Migrations directory does not exist. Running 'prisma migrate dev'..."
  sleep 15
  echo "yes" | npx prisma migrate dev --name migrationx
else
  echo "Migrations directory exists. Running 'prisma migrate deploy'..."
  respond_yes | npx prisma migrate deploy
fi