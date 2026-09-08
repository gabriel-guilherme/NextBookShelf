# Rainbound

## English

Rainbound is a personal book manager built with Next.js. It helps you organize your library and follow your reading progress in one place.

The project supports two ways of using a book:

- Add the book's information to your library, such as title, author, status, rating, pages, category, and notes.
- Add a book and use its page to track your reading progress, update its status, and keep notes while you read.

### Features

- Responsive book library with poster cards
- Search by title or author
- Filter by reading status
- Add, edit, and delete books
- Reading status, rating, current page, and total pages
- Reading progress indicator
- Categories and personal notes
- Responsive forms for desktop and mobile
- PostgreSQL persistence through Prisma

### Tech stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- PostgreSQL 16
- Prisma 7
- Tailwind CSS 4
- Docker Compose
- Lucide icons and `lucide-react-motion`

### Requirements

- Docker Desktop with Docker Compose
- Git

### Running with Docker

Start the development environment from the project root:

```bash
docker compose up --build
```

Open the application at [http://localhost:3000](http://localhost:3000).

The Docker setup starts the Next.js app and a PostgreSQL database.

### Database commands

Create and apply a migration after changing `prisma/schema.prisma`:

```bash
docker compose exec app npx prisma migrate dev --name describe-your-change
```

Regenerate the Prisma Client when needed:

```bash
docker compose exec app npx prisma generate
```

Check the running services:

```bash
docker compose ps
```

Stop the development environment:

```bash
docker compose down
```

The database data is stored in the `db_data` Docker volume. To remove the containers and database volume too:

```bash
docker compose down -v
```

### Available scripts

```bash
npm run dev    # Start Next.js locally
npm run lint   # Run ESLint
npm run build  # Create a production build
npm run start  # Start the production server
```

### Project structure

```text
app/                   Next.js pages, layouts, and server actions
components/            Reusable UI components
lib/                   Shared services, including Prisma
prisma/                Prisma schema and migrations
generated/prisma/  Generated Prisma Client
public/                Static assets, including book covers
```

## Portugues

Rainbound e um gerenciador pessoal de livros feito com Next.js. Ele ajuda a organizar sua biblioteca e acompanhar seu progresso de leitura em um so lugar.

O projeto permite usar um livro de duas formas:

- Cadastrar apenas os dados do livro na biblioteca, como titulo, autor, status, nota, paginas, categoria e observacoes.
- Cadastrar um livro e usar sua pagina para acompanhar a leitura, atualizar o status e registrar observacoes enquanto voce le.

### Funcionalidades

- Biblioteca responsiva com cartoes em formato de capa
- Busca por titulo ou autor
- Filtro por status de leitura
- Cadastro, edicao e exclusao de livros
- Status de leitura, nota, pagina atual e total de paginas
- Indicador de progresso da leitura
- Categorias e observacoes pessoais
- Formularios responsivos para desktop e celular
- Persistencia em PostgreSQL usando Prisma

### Tecnologias

- Next.js 16 com App Router
- React 19 e TypeScript
- PostgreSQL 16
- Prisma 7
- Tailwind CSS 4
- Docker Compose
- Icones Lucide e `lucide-react-motion`

### Requisitos

- Docker Desktop com Docker Compose
- Git

### Executando com Docker

Na raiz do projeto, inicie o ambiente de desenvolvimento:

```bash
docker compose up --build
```

Abra a aplicacao em [http://localhost:3000](http://localhost:3000).

O Docker inicia o aplicativo Next.js e um banco PostgreSQL.

### Comandos do banco

Crie e aplique uma migration depois de alterar o `prisma/schema.prisma`:

```bash
docker compose exec app npx prisma migrate dev --name descreva-sua-alteracao
```

Gere novamente o Prisma Client quando necessario:

```bash
docker compose exec app npx prisma generate
```

Veja o estado dos servicos:

```bash
docker compose ps
```

Pare o ambiente de desenvolvimento:

```bash
docker compose down
```

Os dados do banco ficam no volume Docker `db_data`. Para remover tambem os containers e o volume do banco:

```bash
docker compose down -v
```

### Scripts disponiveis

```bash
npm run dev    # Inicia o Next.js localmente
npm run lint   # Executa o ESLint
npm run build  # Cria o build de producao
npm run start  # Inicia o servidor de producao
```

### Estrutura do projeto

```text
app/                   Paginas, layouts e server actions do Next.js
components/            Componentes reutilizaveis de interface
lib/                   Servicos compartilhados, incluindo o Prisma
prisma/                Schema e migrations do Prisma
generated/prisma/  Prisma Client gerado
public/                Arquivos estaticos, incluindo capas de livros
```
