# Desafio Backend

Api REST que disponibiliza um CRUD para o registro das casas da série Game Of Thrones.

## Para testar

Executar na raiz do projeto:

```
  docker compose up -d
  docker compose exec db bash -c "mariadb -ptestpassword testdb < bootstrap.sql"
  yarn dev
```

Pronto!

O servidor já deverá estar escutando na porta definida no arquivo **.env** ou, por padrão, na porta **3000**.

Caso os dados do banco de dados não estejam presentes no env, o sistema usará um repositório em memória como fallback.

Qualquer dúvida, só olhar o teste das rotas do express em **./src/infra/HouseExpressRoutes.test.ts**