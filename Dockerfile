# Install dependencies only when needed
FROM node:19-alpine AS deps

WORKDIR tezosLink/

COPY package.json  ./

RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:19-alpine AS builder

WORKDIR /

COPY . .
COPY --from=deps /node_modules ./node_modules
RUN yarn build

# Production image, copy all the files and run next
FROM node:19-alpine AS production

WORKDIR /

RUN adduser -D nextjs --uid 10000 && chown -R nextjs /app

COPY --from=builder --chown=nextjs /node_modules ./node_modules
COPY --from=builder --chown=nextjs /public ./public
COPY --from=builder --chown=nextjs /src ./src
COPY --from=builder --chown=nextjs /.next ./.next

COPY --from=builder --chown=nextjs /package.json ./package.json
COPY --from=builder --chown=nextjs /next.config.js ./next.config.js

USER nextjs

CMD ["yarn", "start"]