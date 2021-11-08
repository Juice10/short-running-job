# FROM node:lts-alpine AS packages
FROM node:lts-alpine

ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock

WORKDIR /app

# Installing packages
RUN yarn install --production=true

# # Staging Image
# FROM packages

ADD . /app

ENV NODE_ENV=production

# Building TypeScript files
# RUN yarn build-all

# RUN ls -la /app/dist/esbuild

CMD ["yarn", "cli"]
# CMD ["node", "./dist/esbuild/cli.js"]