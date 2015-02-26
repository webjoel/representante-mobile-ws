# representante-mobile-ws

Para a realização da sincronização de dados entre o <b>ERP</b> do cliente e o aplicativo <b>Representante Mobile</b> é necessário a criação de um Web Service por parte do cliente/software house.

O Web Service deve ser criado em uma arquitetura de serviço <b>REST</b> utilizando o padrão <b>JSON</b> para formato de transmissão de dados.

Durante a sincronização o aplicativo <b>Representante Mobile</b> realizará um <b>POST</b> e um <b>GET</b>:

> POST
* Envio dos pedidos realizados no aplicativo para o ERP, caso sucesso, atualizará o status de sincronização do(s) pedido(s) no aplicativo.

> GET
* Recuperação dos dados cadastrais atualizados, caso sucesso, removerá os dados antigos do aplicativo.

Em ambas as requisições (<b>POST</b> e <b>GET</b>) o aplicativo enviará no <b>HEADER</b> das mesmas o parâmetro "Senha" que é recuperado a partir do campo "Senha" do cadastro de "Parâmetros" do aplicativo, determinando assim a segurança da sincronização.

O Web Service pode ser disponibilizado em uma rede local ou na internet, sendo que os dados do mesmo devem ser configurados no cadastro de "Parâmetros" no aplicativo <b>Representante Mobile</b>.

> Configuração do Web Service:
* IP/Host: Obrigatório. Exemplo: http://192.168.0.1, http://nomedaempresa.no-ip.org, http://www.nomedaempresa.com.br
* Porta: Não obrigatório. Exemplo: 3030
* Contexto: Obrigatório. Exemplo: ws

Simulando um exemplo de uma sincronização local na porta "3030" e contexto "ws", o aplicativo <b>Representante Mobile</b> realizará as seguintes requisições:

> Envio dos pedidos:
* POST http://192.168.0.1:3030/ws
* HEADER: Senha=teste
* BODY: [ { ... }, ... ]
* RESPONSE: "OK" ou Error ...

> Atualização dos cadastros:
* GET http://192.168.0.1:3030/ws
* HEADER: Senha=teste
* RESPONSE: { ... } ou Error ...

Abaixo segue o exemplo da estrutura de pedidos (<b>POST</b>) e da atualização cadastral (<b>GET</b>):

> Pedidos(s):
* [
   {
      "codigo":1,
      "dataHora":"25/02/2015 12:57:39",
      "identificadorCliente":"1",
      "observacoes":"teste",
      "identificadorCondicaoPagamento":"1",
      "itens":[
         {     
            "codigo":1,
            "codigoPedido":1,
	    "identificadorProduto":"1",
            "quantidade":1,
	    "unidade":"UN",
            "valorUnitario":6.92,
	    "percentualDesconto":0,
            "valorDescontoFLEX":0
         }
      ]
   }
]

> Cadastros:
* {
   "clientes":[
      {
         "identificador":"1",
         "nome":"Cliente Teste",
         "cnpj":"01.234.456/0001-23",
         "telefone":"(00)0000-0000",
         "contato":"Contato 1",
         "email":"teste@teste.com",
         "logradouro":"Rua Geral",
         "numero":"1",
         "bairro":"Centro",
         "cidade":"Pequenópolis",
         "estado":"DF",
         "tipo":"Especial",
         "limite":1000,
         "venda":0,
         "valor_titulos_vencidos":0,
         "quantidade_titulos_vencidos":0
      }
   ],
   "condicoes":[
      {
         "identificador":"1",
         "descricao":"A VISTA",
         "desconto_maximo":20
      }
   ],
   "produtos":[
      {
         "identificador":"1",
         "descricao":"Produto Teste",
         "unidade":"UN",
         "referencia":"001",
         "fornecedor":"Fornecedor 1",
         "quantidade_estoque":100,
         "percentual_comissao":7,
         "percentual_desconto":10,
         "valor_minimo":6.23,
         "valor_venda":6.92
      }
   ],
   "parametros":{
      "nome_empresa":"JOEL DA ROSA",
      "controlar_limite_cliente":"S",
      "controlar_desconto_cond_pagto":"N",
      "controlar_estoque":"S",
      "valor_saldo_flex":50.0
   }
}

> Observações:
* Os campos "identificador" servem para identificar a chave primária do registro cadastral no ERP;
* Valores decimais devem ser disponibilizados em vírgulas, apenas ponto (.);
* Campos Boolean (verdadeiro ou falso), Sim e Não, etc, devem ser disponibilizados como "S" (sim) ou "N" (não);
