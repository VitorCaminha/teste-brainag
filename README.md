<h1 align="center">Teste Brain Agriculture</h1>

Para rodar a aplicação, precisaremos do [Node.js](https://nodejs.org/pt), [Git](https://git-scm.com/) e do [Docker](https://www.docker.com/) instalados e funcionando localmente.

## Rodando o backend
- Rode os seguintes comandos para clonar o repositório, instalar as dependências e rodar o container do banco de dados:

```bash
git clone git@github.com:VitorCaminha/teste-brainag.git
cd teste-brainag/backend
npm install
docker compose up -d
```

- Para executar as migrations no banco, precisamos renomear o arquivo .env.example para .env. Podemos fazer isso com os comandos:
```bash
mv .env.example .env
npx prisma migrate dev
```

- Para popular o banco de dados com os dados "mockados", rode o seguinte comando:
```bash
npx prisma db seed
```

- Para iniciar o servidor, basta rodar o comando:
```bash
npm run dev
```

Você pode visualizar os dados no banco em tempo real no navegador com o comando:
```bash
npx prisma studio
```
Nesta pasta, existe um arquivo nomeado `requests.http`, que possue uma documentação simples das rotas disponíveis na nossa api e que podem ser executadas diretamente do editor pela extensão [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) do VSCode.

Além disso, existem alguns testes end-to-end que podem ser executados com o comando:
```bash
npm test
```

## Rodando o frontend

- Para rodar o frontend, precisamos voltar para a pasta inicial e executar os seguintes comandos:

```bash
cd teste-brainag/frontend
npm install
mv .env.example .env
npm run dev
```

Com isso, nossa aplicação já irá abrir automaticamente no navegador e já estará pronta para uso, integrada à nossa api.