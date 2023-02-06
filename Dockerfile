# Install dependencies only when needed
FROM node:19-alpine AS deps

WORKDIR tezosLink/

COPY package.json  ./

RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:19-alpine AS builder

WORKDIR tezosLink/

COPY . .
COPY --from=deps tezosLink/node_modules ./node_modules
RUN yarn build

# Production image, copy all the files and run next
FROM node:19-alpine AS production

WORKDIR tezosLink/

RUN adduser -D nextjs --uid 10000 && chown -R nextjs .

COPY --from=builder --chown=nextjs tezosLink/node_modules ./node_modules
COPY --from=builder --chown=nextjs tezosLink/public ./public
COPY --from=builder --chown=nextjs tezosLink/src ./src
COPY --from=builder --chown=nextjs tezosLink/.next ./.next

COPY --from=builder --chown=nextjs tezosLink/package.json ./package.json
COPY --from=builder --chown=nextjs tezosLink/next.config.js ./next.config.js

USER nextjs

CMD ["yarn", "start"]