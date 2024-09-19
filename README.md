Pokedex - Desafio Técnico

## Como rodar a aplicação localmente?

1. Clone o repositório do Github na sua máquina. Abra o terminal ou Prompt de comando e cole:

```bash
git clone https://github.com/username/repository.git
```

Substitua username pelo seu **nome de usuário** do GitHub e **repository** pelo nome do repositório.

2. Após a criação do repositório, um diretório será criado. Navegue até ele com:

```bash
cd repository
```

Substitua **repository** pelo nome do diretório criado.

3. Abra o repositório no VS Code:

```bash
code .
```

4. Para baixar todas as dependências do projeto e garantir que ele rode sem problemas em sua máquina, rode um:

```bash
npm install
```

Isso garantirá que todas as dependências necessárias para o projeto serão instaladas.

5. Após isso, para rodar a aplicação localmente, é necessário utilizar um dos seguintes comandos, de acordo com o seu gerenciador de pacotes:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

6. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para conferir o resultado.

