# RastroJS

### Rastro - API Rastreamento de objetos - Correios NodeJS/Express
### v2.0

Retorna dados de rastreamento de objetos nos correios por meio do código de rastreio.

### Tipos de retornos implementados
- JSON
- XML
- CSV

### Exemplos:
- http://you_host:port/track/DUXX1595899BR
- http://you_host:port/track/DUXX1595899BR

### Uso/Instalação:

Em sua linha de comando execute:
```sh
$ git clone https://github.com/talesluna/RastroJS/ && cd RastroJs
$ npm install
$ npm run dev (modo de desenvolvimnto)
$ npm build (fazer build es6 com babel)
$ npm start (iniciar a api com PM2 no host)
$ npm start-docker (fazer pull e iniciar a api em container docker)
```

### Response Codes:

- 200 OK

    > Informações presentes e exibidas

- 404 NOT_FOUND
    
    > Objeto não encontrado no sistema dos Correios.

- 400 BAD_REQUEST

    > Informações passadas na requisição estão fora do padrão estabelecido.


### Retornos:

- XML

    - 200 - OK
        ``` XML
            <?xml version='1.0'?>
            <track>
                <track>
                    <status>objeto entregue ao destinatário</status>
                    <date>10/01/2018</date>
                    <hour>11:57</hour>
                    <unit>SÃO PAULO / SP</unit>
                </track>
                <track>
                    <status>objeto postado</status>
                    <date>08/01/2018</date>
                    <hour>09:27</hour>
                    <unit>UBERABA / MG</unit>
                </track>
            </track>
        ```

    - 404 - NOT_FOUND
        ``` XML
            <?xml version='1.0'?>
            <track>Error: Objeto não encontrado no sistema dos Correios.</track>
        ```

- JSON

    - 200 - OK
    
        ```JSON
            {
              "code": 200,
              "data": [
                {
                  "status": "objeto entregue ao destinatário",
                  "date": "10/01/2018",
                  "hour": "11:57",
                  "unit": "SÃO PAULO / SP"
                },
                {
                  "status": "objeto postado",
                  "date": "08/01/2018",
                  "hour": "09:27",
                  "unit": "UBERABA / MG"
                }
              ],
              "message": "success"
            }
        ```
        
     - 404 - NOT_FOUND
        ```JSON
            {
              "code": 404,
              "data": "Objeto não encontrado no sistema dos Correios.",
              "message": "not_found"
            }
        ```

- CSV

    - 200 - OK
        ```CSV
            "status","date","hour","unit"
            "objeto entregue ao destinatário","10/01/2018","11:57","SÃO PAULO / SP"
            "objeto postado","08/01/2018","09:27","UBERABA / MG"
        ```
        
    - 404 - NOT_FOUND

        ###### NO BUFFER

### Author
> Tales Luna

> tales.ferreira.luna@gmail.com
    
### License:
- MIT

