# Use an official Node.js runtime as a parent image
FROM node:20 as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install Quasar CLI globally
RUN npm install -g @quasar/cli

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./ .

# Build the Quasar application
RUN quasar build

# Use an official NGINX image to serve the build output
FROM nginx as production-stage

RUN mkdir /app

# Copy the built application files to the NGINX container
COPY --from=build-stage /app/dist/spa /app
COPY nginx.conf /etc/nginx/nginx.conf

# Running the script at container run
COPY ./substitute_environment_variables.sh /docker-entrypoint.d/substitute_environment_variables.sh
RUN chmod +x /docker-entrypoint.d/substitute_environment_variables.sh
