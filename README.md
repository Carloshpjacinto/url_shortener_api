# 🔗 Encurtador de URLs 

### API RESTful para encurtar URLs de usupario autenticados ou não. Construída com NestJS, TypeScript, PostgreSQL, Docker e Swagger.

---

##### 📄 Para informações mais detalhadas, a documentação e os registros de ADR estão disponíveis na pasta docs.

---

## 🚀 Tecnologias Utilizadas

<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg" width="45" height="45" style="margin-right: 50px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" width="45" height="45" style="margin-right: 50px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="45" height="45" style="margin-right: 50px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original-wordmark.svg" height="45" style="margin-right: 50px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg" width="45" height="45"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original-wordmark.svg" height="45" style="margin-right: 50px;"/>
</div>

---

## 📁 Arquitetura

### A arquitetura modular por domínio baseada em NestJS segue os princípios SOLID (especialmente responsabilidade única), com injeção de dependência nativa, organização clara e foco em escalabilidade e testabilidade.

---

## 👨‍💻 Principais funcionalidades:

 ##### Cadastro de usuário
 ##### Login de usuário
 ##### Autenticação via JWT
 ##### Encurtamento de URLs
 ##### Editar URLs encurtadas
 ##### Deletar URLs encurtadas

## </> Principais Endpoints da API:

### A documentação dos endpoints da API está em Swagger.

#### POST - /auth/register

#### POST - /auth/login

#### GET - /auth/profile

#### POST - /auth/url

#### GET - /auth/redirect

#### GET - /auth/url

Get de cima está com páginação, exemplo da Url: http://localhost:3000/auth/url?page=1&limit=10

#### PATCH - /auth/url

#### DELETE - /auth/url

## ⚙️ Instalação e Execução

### 1. Clone o repositório

#### bash

    git clone https://github.com/Carloshpjacinto/url_shortener_api.git

### 2. Instalação das dependencias

    npm install

### 3. Configurar a variavel de ambiente JWT_SECRET.

#### O arquivo .env.example serve como exemplo das variáveis de ambiente usadas no projeto.

### 4. Execução dos testes com cobertura.

    npm run test:cov

### 5. Execução da aplicação em Docker

    npm run dev

As migrations são executadas automaticamente após o Docker terminar de subir o banco de dados.
O Docker está executando o PostgreSQL, PgAdmin e a Aplicação.

## 🚪 Portas de acesso da aplicação:

### 1. Swagger - http://localhost:3000/api

### 2. PgAdmin - http://localhost:3200

Para configurar o PosgreSQL no PgAdmin:<br>
Nome: postgres<br>
Host name/address: postgres<br>
Port: 5432<br>
Maintenance database: url_shortener<br>
Username: postgres<br>
password: docker
