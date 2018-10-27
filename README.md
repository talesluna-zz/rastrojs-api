# RastroJS

## API de Rastreamento de Objetos - Correios - NodeJS/Express *(v2.6)*
Para rastreio de objetos nos correios sem uso de webservice.

### Demo

https://rastrojs.herokuapp.com/



### Retornos suportados:
[![JSON](https://img.shields.io/badge/JSON-yellowgreen.svg?style=flat-square)](#)
[![XML](https://img.shields.io/badge/XML-blue.svg?style=flat-square)](#)
[![CSV](https://img.shields.io/badge/CSV-red.svg?style=flat-square)](#)


### Rota básica
/track/:_objectCode/:_outputType

### Exemplos
``` 
GET /track/DUXX1595899BR/json
GET /track/DUXX1595899BR/xml
GET /track/DUXX1595899BR/csv
```


### Status:

|Código|Tipo|Descrição|
|---|---|---|
|200|OK|Informações presentes e exibidas
|404|NOT_FOUND|Objeto não encontrado no sistema dos Correios.
|400|BAD_REQUEST|Informações passadas na requisição estão fora do padrão estabelecido.


### Corpo de resposta:
|Campo|Tipo|Suporte|Descrição
|---|---|---|---|
|isDelivered|boolean|json e xml|Informa se o objeto já foi entregue ao destrinatário
|postedAt|ISO String (Date)|json e xml|Data e horário em que o objeto foi postado
|updatedAt|ISO String (Date)|json e xml|Data e horário da última alteração de rastreio do objeto
|track.status|String|json, xml e csv|Situação/Descrição do rastreio.
|track.observations|String|json, xml e csv|Observação do rastreio, encaminhamentos etc...
|track.trackedAt|ISO String (Date)|json, xml e csv|Data e horário do rastreio
|track.unit|ISO String (Date)|json, xml e csv|Unidade dos correios emissora do rastreio

### Formato de resposta

```
- GET /track/DUXX1595899BR/xml 200 OK
```

```xml

<?xml version='1.0'?>
<object>
    <isDelivered>true</isDelivered>
    <postedAt>2018-01-08T11:27:00.000Z</postedAt>
    <updatedAt>2018-01-10T13:57:00.000Z</updatedAt>
    <track>
        <status>objeto postado</status>
        <observation>null</observation>
        <trackedAt>2018-01-08T11:27:00.000Z</trackedAt>
        <unit>belo horizonte / mg</unit>
    </track>
    <track>
        <status>objeto encaminhado</status>
        <observation>de unidade de tratamento em belo horizonte / mg para unidade de distribuição em são paulo / sp</observation>
        <trackedAt>2018-01-10T00:08:00.000Z</trackedAt>
        <unit>belo horizonte / mg</unit>
    </track>
    <track>
        <status>objeto saiu para entrega ao destinatário</status>
        <observation>null</observation>
        <trackedAt>2018-01-10T10:57:00.000Z</trackedAt>
        <unit>são paulo / sp</unit>
    </track>
    <track>
        <status>objeto entregue ao destinatário</status>
        <observation>null</observation>
        <trackedAt>2018-01-10T13:57:00.000Z</trackedAt>
        <unit>são paulo / sp</unit>
    </track>         
</object>
```

```
- GET /track/DUXX1595899BR/xml 404 NOT_FOUND
```

```xml
<?xml version='1.0'?>
<response>Error: Objeto não encontrado no sistema dos Correios.</response>
```
---


```
GET /track/DUXX1595899BR/json 200 OK
```

```json

{
  "code": 200,
  "data": {
    "isDelivered": false,
    "postedAt": "2018-01-08T11:27:00.000Z",
    "updatedAt": "2018-01-10T10:57:00.000Z",
    "track": [
      {
        "status": "objeto postado",
        "observation": null,
        "trackedAt": "2018-01-08T11:27:00.000Z",
        "unit": "belo horizonte / mg"
      },
      {
        "status": "objeto encaminhado",
        "observation": "de unidade de tratamento em belo horizonte / mg para unidade de distribuição em são paulo / sp",
        "trackedAt": "2018-01-10T00:08:00.000Z",
        "unit": "belo horizonte / mg"
      },
      {
        "status": "objeto saiu para entrega ao destinatário",
        "observation": null,
        "trackedAt": "2018-01-10T10:57:00.000Z",
        "unit": "são paulo / sp"
      }
    ]  
  },
  "message": "success"
}
```

```
GET /track/DUXX1595899BR/json 404 NOT_FOUND
```

```json
{
  "code": 404,
  "data": "Objeto não encontrado no sistema dos Correios.",
  "message": "not_found"
}
```
---


```
GET /track/DUXX1595899BR/csv 200 OK
```

```CSV
"status","observation","trackedAt","unit"
"objeto postado",,"2018-01-08T11:27:00.000Z","belo horizonte / mg"
"objeto encaminhado","de unidade de tratamento em belo horizonte / mg para unidade de distribuição em são paulo / sp","2018-01-10T00:08:00.000Z","belo horizonte / mg"
"objeto saiu para entrega ao destinatário",,"2018-01-10T10:57:00.000Z","são paulo / sp"
"objeto entregue ao destinatário",,"2018-01-10T13:57:00.000Z","são paulo / sp"
```
       
```
GET /track/DUXX1595899BR/csv 404 NOT_FOUND
```
```
! EMPTY BUFFER
```


### Instalação

```sh
$ git clone https://github.com/talesluna/RastroJS/ && cd RastroJS
$ npm install
$ npm run dev (modo de desenvolvimento)
$ # Configurar o ambiente e a api (dev, prod ou test) em config/env/*.env.js
$ npm build (fazer build es6 com babel)
$ npm start (iniciar com processo node simples)
$ npm start:pm2 (iniciar a api com PM2 no host)
$ npm start:docker (fazer pull e iniciar a api em container docker)
```



#### Author: 
Tales Luna - <tales.ferreira.luna@gmail.com>
#### License: *MIT*

