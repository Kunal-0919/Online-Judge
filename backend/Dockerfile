# base image -> node, alpine is very lightweight version of node.js
FROM node:18-alpine
# base img

# Directory that will be created inside your container
# WORKDIR /the/workdir/path
WORKDIR /app
# working dir


# installed gcc
RUN apk update && apk add --no-cache g++

# Copy only the package.json and package-lock.json files and install dependencies.
# This allows Docker to cache this layer when package files don't change.
COPY package*.json .


# COPY source dest -> <host> and <container>
# all the code will be pasted inside the /app
# all the folders and files inside the
# current directory will be posted inside the 
# working directory of the container
RUN npm i


COPY . .
# or COPY . /app


EXPOSE 8000

# Now we need to run first 
# to start the server
# CMD and entrypoint are the same
# cmd is your last and main command, there can't be multiple cmd or entrypoint
CMD ["node", "server.js"]