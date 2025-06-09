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

# Caso, ao rodar a aplicação, o Docker aponte um erro na leitura deste arquivo, execute os seguintes comandos no bash:
# "sed -i 's/\r$//' entrypoint.sh"
# "chmod +x entrypoint.sh" 
# Então rode a aplicação novamente com: npm run dev
