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

Qualquer dúvida, só olhar o teste das rotas do express em **./src/infra/HouseExpressRoutes.test.ts**