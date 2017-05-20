# RastroJS
Rastro - API Rastreamento de objetos - Correios NodeJS/Express

Retorna dados de rastreamento de objetos nos correios por meio do código de rastreio com saídas em JSON ou XML.

### Observação Importante
Os correios desativaram o sistema WebSRO (websro.correios.com.br) em maio de 2017, esse sistema informava todos os dados de rastreio do objeto desde a origem até o destino, alguns desenvolvedores estão disponibilizando sites de consulta baseados no antigo WebSRO, decidi não usar estes meios para servir essa API pois são páginas de terceiros contendo propagandas e que podem ficar instáveis, em vez disso utilizei outra página oficial dos Correios para fazer a consulta, porém desse modo por hora só é possivel ver a última situação do objeto.

### Novidades
Foi adicionada a consulta de multiplos objetos, separados por ";" (ponto e virgula), veja os exemplos abaixo.

### Exemplos:
- http://you_host:port/xml/DUXX1595899BR;DUYY1595799BR
- http://you_host:port/json/DUXX1595899BR;DUYY1595799BR

### Uso/Instalação:

Em sua linha de comando execute:
```sh
$ git clone https://github.com/talesluna/RastroJS/ && cd RastroJs
$ npm install
$ npm start
```

### Response Codes:

- 200 OK

    > Informações presentes e exibidas

- 404 NOT_FOUND (obsoleto por enquanto)
    
    > Não foram encontradas informações de rastreio
    
- 408 REQUEST_TIMEOUT
    
    > Falha ao se conectar com os correios

- 400 BAD_REQUEST

    > Tipo de retorno não implementado ou algum param faltando


### Retornos:

- XML

    ``` XML
        <?xml version='1.0'?>
        <rastreio>
            <DUXX1595899BR>
                <codigo>DUXX1595899BR</codigo>
                <situacao>Objeto entregue ao destinatário</situacao>
                <local>Santana Do Paraiso/MG</local>
                <data>18/05/2017</data>
            </DUXX1595899BR>
            <DUYY1595799BR>
                <codigo>DUYY1595799BR</codigo>
                <situacao>Objeto ainda não consta no sistema</situacao>
                <local>null</local>
                <data>null</data>
            </DUYY1595799BR>
        </rastreio>
    ```

- JSON

    ```JSON
    {
        "DUXX1595899BR": {
            "codigo": "DUXX1595899BR",
            "situacao": "Objeto entregue ao destinatário",
            "local": "Santana Do Paraiso/MG",
            "data": "18/05/2017"
        },
        "DUYY1595799BR": {
            "codigo": "DUYY1595799BR",
            "situacao": "Objeto ainda não consta no sistema",
            "local": null,
            "data": null
        }
    }
    ```

### License:
- MIT

