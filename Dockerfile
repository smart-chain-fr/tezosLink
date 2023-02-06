FROM node:16.19-bullseye-slim as builder
# Setup environnement variables
WORKDIR tezosLink/



# start app
CMD ["npm", "start"]