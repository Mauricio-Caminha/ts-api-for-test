# API RESTful em Node.js com Express e TypeScript

API RESTful desenvolvida em Node.js utilizando Express e TypeScript, com estrutura organizada em rotas, controllers e services.

## Estrutura do Projeto

```
src/
├── app.ts                 # Arquivo principal da aplicação
├── types/                 # Definições de tipos TypeScript
│   └── index.ts
├── routes/                # Definição das rotas
│   ├── userRoutes.ts
│   ├── carRoutes.ts
│   ├── productRoutes.ts
│   └── orderRoutes.ts
├── controllers/           # Lógica de controle das requisições
│   ├── userController.ts
│   ├── carController.ts
│   ├── productController.ts
│   └── orderController.ts
└── services/              # Lógica de negócio
    ├── userService.ts
    ├── carService.ts
    ├── productService.ts
    └── orderService.ts
```

## Serviços Disponíveis

### 1. Users (`/api/users`)
- `GET /api/users` - Lista todos os usuários
- `GET /api/users/:id` - Busca usuário por ID
- `POST /api/users` - Cria novo usuário
- `PUT /api/users/:id` - Atualiza usuário
- `DELETE /api/users/:id` - Deleta usuário

### 2. Cars (`/api/cars`)
- `GET /api/cars` - Lista todos os carros
- `GET /api/cars/:id` - Busca carro por ID
- `POST /api/cars` - Cria novo carro
- `PUT /api/cars/:id` - Atualiza carro
- `DELETE /api/cars/:id` - Deleta carro

### 3. Products (`/api/products`)
- `GET /api/products` - Lista todos os produtos
- `GET /api/products/:id` - Busca produto por ID
- `POST /api/products` - Cria novo produto
- `PUT /api/products/:id` - Atualiza produto
- `DELETE /api/products/:id` - Deleta produto

### 4. Orders (`/api/orders`)
- `GET /api/orders` - Lista todos os pedidos
- `GET /api/orders/:id` - Busca pedido por ID
- `POST /api/orders` - Cria novo pedido
- `PUT /api/orders/:id` - Atualiza pedido
- `DELETE /api/orders/:id` - Deleta pedido

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente (opcional):
```bash
cp .env.example .env
```

3. Compile o TypeScript:
```bash
npm run build
```

4. Inicie o servidor:
```bash
npm start
```

Para desenvolvimento com auto-reload:
```bash
npm run dev
```

## Testes

O projeto está configurado com Vitest para testes TypeScript.

Para executar os testes:
```bash
npm test
```

Para executar os testes em modo watch:
```bash
npm run test:watch
```

Para gerar relatório de cobertura:
```bash
npm run test:coverage
```

## Endpoints

- Health Check: `GET /health`
- Base URL: `http://localhost:3000`

## Observações

- Os dados são armazenados em memória (arrays), então serão perdidos ao reiniciar o servidor
- A estrutura está preparada para fácil integração com banco de dados
- Projeto totalmente tipado com TypeScript
- Configurado para testes unitários com Vitest e TypeScript
