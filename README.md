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
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-plain-wordmark.svg" height="45" style="margin-right: 50px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original-wordmark.svg" height="45" style="margin-right: 50px;"/>
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

### 3. Rode os seguintes comandos no bash para remover os caracteres de quebra de linha do Windows do arquivo entrypoint.sh localmente:

    sed -i 's/\r$//' entrypoint.sh

    chmod +x entrypoint.sh

### 4. Configurar a variavel de ambiente JWT_SECRET.

#### O arquivo .env.example serve como exemplo das variáveis de ambiente usadas no projeto.

### 5. Execução dos testes com cobertura.

    npm run test:cov

### 6. Execução da aplicação em Docker

    npm run dev

As migrations são executadas automaticamente após o Docker terminar de subir o banco de dados.<br>
O Docker está executando o PostgreSQL, PgAdmin e a Aplicação.

## 🚪 Portas de acesso da aplicação:

### 1. Swagger - http://localhost:3000/api

### 2. PgAdmin - http://localhost:3200

### 3. Prometheus - http://localhost:9090/targets

### 4. Grafana - http://localhost:3001

#### Para configurar o PosgreSQL no PgAdmin:<br>
Nome:    postgres<br>
Host name/address:    postgres<br>
Port:    5432<br>
Maintenance database:    url_shortener<br>
Username:    postgres<br>
password:    docker

## 📊 Construção dos dashboard em Grafana

### O painel com os dashboards pode ser importado por meio do arquivo JSON presente no projeto: dashboard.grafana.json

### Configuração do Painel de Métricas da Aplicação:

#### Usuários Cadastrados: 
Data source: grafana-postgresql-datasource(PostgreSQL)<br>
Tabela: users<br>
Operação: COUNT<br>
Coluna: id<br>
Clique em "Run query"<br>

#### URLs Ativas:
Data source: grafana-postgresql-datasource(PostgreSQL)<br>
Tabela: urls<br>
Operação: COUNT<br>
Coluna: active<br>
Ative o "Filter":<br>
Clique em "+" e selecione: active == Yes<br>
Clique em "Run query"<br>

#### URLs Desativadas: 
Data source: grafana-postgresql-datasource (PostgreSQL)<br>
Tabela: urls<br>
Operação: COUNT<br>
Coluna: active<br>
Ative o "Filter":<br>
Clique em "+" e selecione: active == No<br>
Clique em "Run query"<br>

#### CPU (Aplicação e PostgreSQL):
Data source: prometheus<br>
Métrica: process_cpu_seconds_total<br>
Clique em "Run query"<br>

#### Memória Física (Aplicação e PostgreSQL):
Data source: prometheus<br>
Métrica: process_resident_memory_bytes<br>
Clique em "Run query"<br>

#### Memória Virtual (Aplicação e PostgreSQL):
Data source: prometheus<br>
Métrica: process_virtual_memory_bytes<br>
Clique em "Run query"<br>

#### Handles Ativos (Aplicação):
Data source: prometheus<br>
Métrica: nodejs_active_handles_total<br>
Clique em "Run query"<br>

#### Picos de Lentidão (Aplicação):
Data source: prometheus<br>
Métrica: nodejs_eventloop_lag_p99_seconds<br>
Clique em "Run query"<br>

### ⚠️ Possíveis melhorias:

#### 1.Rate limit por IP ou por usuário
#### 2.Expiração automática das URLs
#### 3.Painel de estatísticas com quantidade de acessos 
#### 4.Integração com Redis para cache de redirecionamentos 
