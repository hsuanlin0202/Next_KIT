FROM gitlab.car-plus.cool:5000/fe/fe-gosmart/cache AS build

WORKDIR /app

COPY . .

RUN yarn build

FROM node:14.16.0-alpine3.13

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY package.json .

CMD ["/usr/local/bin/yarn", "start"]
