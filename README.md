# Seleção Cubos

### Para iniciar a aplicação:

```bash
yarn install
yarn dev
```

### Para rodar os poucos testes que eu fiz:

```bash
yarn test
```

### Endpoints

| MÉTODO | ENDPOINT     | DESCRIÇÃO                     |
| ------ | ------------ | ----------------------------- |
| GET    | /list        | Listar todas as regras        |
| GET    | /getinterval | Listar dentro de um intervalo |
| POST   | /create      | Criar regra                   |
| POST   | /remove      | Remover regra                 |

### Como os dados são armazenados

```json
{
data: {
        "type": "day",
        "intervals": [
            {
                "start": "08:30",
                "end": "09:00"
            },
            {
                "start": "09:30",
                "end": "11:30"
            }
        ],
        "day": "23-12-2019",
        "weekdays": [
            1
        ]
    },
    {
        "type": "daily",
        "intervals": [
            {
                "start": "18:40",
                "end": "09:00"
            },
            {
                "start": "14:20",
                "end": "15:30"
            }
        ]
    },
        {
        "type": "weekly",
        "intervals": [
            {
                "start": "08:40",
                "end": "15:00"
            },
            {
                "start": "15:50",
                "end": "16:30"
            }
        ],
        "weekdays": [
            4,
            6
        ]
    }
}
```
