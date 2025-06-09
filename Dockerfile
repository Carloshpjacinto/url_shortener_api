FROM node:18

WORKDIR /usr/src/app
RUN apt-get update && apt-get install -y netcat-openbsd
COPY package*.json ./
RUN npm install
RUN npm install -g @nestjs/cli
COPY . .
RUN npx prisma generate
EXPOSE 3000
ENTRYPOINT ["bash", "./entrypoint.sh"]
