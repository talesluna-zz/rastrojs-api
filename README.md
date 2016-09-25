# RastroJS
Rastro - API Rastreamento de objetos - Correios NodeJS/Express

Retorna dados de rastreamento de objetos nos correios por meio do código de rastreio com saídas em JSON ou XML.

##### Exemplos:
- http://you_host:port/xml/JGXXXXXXXXXBR
- http://you_host:port/json/JGXXXXXXXXXBR

##### Uso/Instalação:

Em sua linha de comando execute:
```sh
$ git clone https://github.com/talesluna/RastroJS/ && cd RastroJs
$ npm install
$ npm start
```

##### Response Codes:

- 200 OK
    > Informações presentes e exibidas
- 404 NOT_FOUND
    > Não foram encontradas informações de rastreio
- 408 REQUEST_TIMEOUT
    > Falha ao se conectar com os correios
- 400 BAD_REQUEST
    > Tipo de retorno não implementado ou algum param faltando


##### Retornos:

- XML
    ``` XML
        <?xml version='1.0'?>
        <rastreio>
            <rastreio>
                <data>10/08/2016 17:49</data>
                <local>CTCE VITORIA/GCCAP - VIANA/ES</local>
                <situacao>Postado depois do horário limite da agência</situacao>
            </rastreio>
            <rastreio>
                <data>10/08/2016 18:30</data>
                <local>CTCE VITORIA/GCCAP - VIANA/ES</local>
                <situacao>Encaminhado para CTE BELO HORIZONTE - BELO HORIZONTE/MG</situacao>
            </rastreio>
        </rastreio>
    ```
- JSON
    ```JSON
    [ 
        {
            "data" : "10/08/2016 17:49",
            "local" : "CTCE VITORIA/GCCAP - VIANA/ES",
            "situacao" : "Postado depois do horário limite da agência"
        },
        {
            "data" : "10/08/2016 18:30",
            "local" : "CTCE VITORIA/GCCAP - VIANA/ES",
            "situacao" : "Encaminhado para CTE BELO HORIZONTE - BELO HORIZONTE/MG"
        },
        {
            "data" : "11/08/2016 09:21",
            "local" : "CTE BELO HORIZONTE - BELO HORIZONTE/MG",
            "situacao" : "Encaminhado para CEE VALE DO ACO - Santana Do Paraiso/MG"
        },
        {
            "data" : "12/08/2016 10:10",
            "local" : "Santana Do Paraiso/MG",
            "situacao" : "Saiu para entrega ao destinatário"
        },
        {
            "data" : "12/08/2016 19:42",
            "local" : "CEE VALE DO ACO - Santana Do Paraiso/MG",
            "situacao" : "Entrega Efetuada"
        }
    ]
    ```

##### License:
- MIT

