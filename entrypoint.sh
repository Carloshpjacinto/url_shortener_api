#!/bin/sh

echo "Iniciando o container..."

until nc -z postgres 5432; do
  echo "Aguardando o banco de dados iniciar..."
  sleep 2
done

echo "Banco de dados disponível. Executando migrations..."
npx prisma migrate deploy

echo "Iniciando aplicação Nest.js..."
npm run start:dev
