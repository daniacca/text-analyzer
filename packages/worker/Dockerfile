FROM node:20

WORKDIR /
COPY package.json .
COPY tsconfig.json .
COPY lerna.json .
COPY ./packages/common ./packages/common
COPY ./packages/worker ./packages/worker
RUN npm install
RUN npm run build --workspace=packages/common
RUN npm run build --workspace=packages/worker
HEALTHCHECK --interval=15s --retries=3 --timeout=5s CMD ["node", "dist/healthcheck.js"]
CMD npm run start --workspace=packages/worker