# Desafio Técnico - Frontend Developer

## Objetivo

Desenvolver uma aplicação frontend utilizando **Next.js 14 ou superior** junto com a biblioteca de componentes **Ant Design**. A aplicação deverá consumir a **Pokémon API pública** para listar Pokémons com base em um filtro aplicado pelo usuário.

## Requisitos

### Funcionalidades
1. A aplicação deve iniciar exibindo uma mensagem informativa solicitando que o usuário utilize um filtro.
2. Deve haver um botão "Filtrar" na interface principal que, ao ser clicado, abrirá um modal.
3. O modal deve conter:
   - Um campo **select** que trará uma lista de tipos de Pokémon, consumida da API pública de Pokémon. 
4. Após a seleção da data e do tipo de Pokémon, o usuário deve clicar em "Filtrar". 
   - O modal deve ser fechado automaticamente.
   - Uma tabela com a lista de Pokémons do tipo selecionado deve ser exibida na interface principal.
5. A tabela deve ter:
   - Colunas com **nome** do Pokémon e o tipo dele.
   - Incluir **Paginação**, já que a API pública de Pokémon pode conter muitos resultados para certos tipos.
   
### Requisitos técnicos
- A aplicação deve ser feita utilizando **Next.js 14 ou superior**.
- Deve utilizar a biblioteca de componentes **Ant Design** para construir a interface (modal, tabela, botões, etc.).
- A lista de tipos de Pokémon deve ser carregada da API pública de Pokémon. [Link da API](https://pokeapi.co/)
- O filtro deve ser funcional e aplicar as condições selecionadas para a exibição dos Pokémons na tabela.

## Plus (Diferenciais)
- Implementar **responsividade** para que a aplicação seja acessível em dispositivos móveis.
- Utilizar boas práticas de **código limpo** e **componentização**.
- Adicionar uma barra de **loading** ou **skeleton** enquanto os dados estão sendo carregados.

## Instruções para Entrega

- O projeto deve ser versionado e disponibilizado em um repositório público no GitHub.
- No README.md do repositório, inclua instruções detalhadas de como rodar o projeto localmente (comando de instalação, execução e dependências necessárias).
- O prazo para conclusão é de **7 dias** a partir do recebimento deste desafio.

## Observações

Você será avaliado(a) pela:
- **Clareza** e **organização** do código.
- Uso correto da **biblioteca Ant Design**.
- Implementação correta das funcionalidades solicitadas.
- **Boas práticas** de desenvolvimento frontend.
- **Documentação** do código e clareza no README.

Boa sorte e estamos ansiosos para ver o que você pode construir!
