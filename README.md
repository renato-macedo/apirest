# API REST

### Para iniciar a aplicação:

```bash
npm install
npm run dev
```

### Para rodar os testes:

```bash
npm test
```

### Endpoints

| MÉTODO | ENDPOINT                                              | DESCRIÇÃO                     |
| ------ | ----------------------------------------------------- | ----------------------------- |
| GET    | /appointments                                         | Listar todas as regras        |
| GET    | /appointments?startDate=DD-MM-YYYY&endDate=DD-MM-YYYY | Listar dentro de um intervalo |
| POST   | /appointments                                         | Criar regra                   |
| DELETE | /appointments/:id                                     | Remover regra                 |

### Documentação

[Postman](https://documenter.getpostman.com/view/7870103/SVtWyTag?version=latest#13c28727-563c-4597-8d82-e01a76cada9c)
