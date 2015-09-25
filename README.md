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
* IP/Host: Obrigatório. Exemplo: 192.168.0.1, nomedaempresa.no-ip.org, www.nomedaempresa.com.br
* Porta: Não obrigatório. Exemplo: 3030
* Contexto: Obrigatório. Exemplo: ws

Simulando um exemplo de uma sincronização local na porta "3030" e contexto "ws", o aplicativo <b>Representante Mobile</b> realizará as seguintes requisições:

> Envio dos pedidos:
* POST http://192.168.0.1:3030/ws
* HEADER: Senha=teste
* BODY: [ { PEDIDO }, ... ]
* RESPONSE: { "mensagem" : "OK" } ou { "mensagem" : "ERRO" }

> Atualização dos cadastros:
* GET http://192.168.0.1:3030/ws/MAC_DO_DISPOSITIVO
* HEADER: Senha=teste
* RESPONSE: [ { CADASTRO }, ... ] ou { "mensagem" : "ERRO" }

Abaixo segue o exemplo da estrutura de pedidos (<b>POST</b>) e da atualização cadastral (<b>GET</b>):

> Pedidos(s):
* [
   {
      "codigo":1,
      "dataHora":"25/02/2015 12:57:39",
      "codigoCliente":"1",
      "observacoes":"teste",
      "codigoCondicaoPagamento":"1",
      "itens":[
         {
            "codigo":1,
            "codigoPedido":1,
	    "codigoProduto":"1",
            "quantidade":1,
	    "unidade":"UN",
            "valorUnitario":6.92,
	    "percentualDesconto":0,
            "valorDescontoFLEX":0
         }
      ]
   }
]

>> Observações:
* Os campos "codigoCADASTRO" são os mesmos do campo "codigo" do respectivo registro cadastral;
* O campo "valorDescontoFLEX" deve ser utilizado pelo ERP para atualizar a disponibilização do campo "valor_saldo_flex" do registro de "parâmetros";
* O campo "valorUnitario" já está com o desconto informado no campo "percentualDesconto";
* O subtotal de cada item do pedido é: (quantidade * valorUnitario) - valorDescontoFLEX.

> Cadastros:
* {
   "<b>condicoes</b>":[
      {
         "codigo":"1",
         "descricao":"A VISTA",
         "desconto_maximo":20,
         "considera_limite":"S"
      }
   ],
   "<b>clientes</b>":[
      {
         "codigo":"1",
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
         "quantidade_titulos_vencidos":0,
         "mac_dispositivo_vendedor":"00:00:00:00:00:00",
         "codigo_condicao_pagamento":1,
         "percentual_desconto":0,
         "observacao_entrega":""
      }
   ],
   "<b>produtos</b>":[
      {
         "codigo":"1",
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
   "<b>parametros</b>":{
      "nome_empresa":"EMPRESA TESTE",
      "controlar_limite_cliente":"S",
      "controlar_desconto_cond_pagto":"N",
      "controlar_estoque":"S",
      "valor_saldo_flex":0,
      "nome_vendedor":"VENDEDOR TESTE",
      "mac_dispositivo_vendedor":"00:00:00:00:00:00"
   }
}

>> Observações:
* Os campos "codigo" servem para identificar a chave primária do registro cadastral no ERP;
* Valores decimais devem ser disponibilizados sem vírgulas, apenas ponto (.);
* Campos Boolean (verdadeiro ou falso), Sim e Não, etc, devem ser disponibilizados como "S" (sim) ou "N" (não);
* Valores indisponíveis devem ser disponibilizados vazios ("") ou com zero (0), de acordo com o tipo do campo;
* O campo "valor_saldo_flex" do registro de "parâmetros" deve ser controlado pelo ERP, atualizando e disponibilizando se assim o cliente desejar controlá-lo no aplicativo.

> Dicas:
* Para controlar a sincronização de modo diferente para cada representante pode ser utilizado o número <b>MAC</b> do dispositivo, disponibilizado na tela inicial do aplicativo <b>Representante Mobile</b>. Sendo que no momento da atualização cadastral, será enviado o referido <b>MAC</b> junto a requisição.
* A Senha (cadastrada na tela de Parâmetros) enviada na requisição pelo aplicativo <b>Representante Mobile</b> será codificada no padrão Base64, logo no servidor, deve-se realizar a decodificação da mesma para realizar a autenticação.

Para servir como base, foi disponibilizado nesta página um exemplo de um Web Service (<b>ws.js</b>) desenvolvido na linguagem JavaScript, disponibilizado na plataforma <b>Node.js</b> e hospedado no serviço Cloud <b>OpenShift</b> (http://representantemobilews-webjoel.rhcloud.com), utilizando os recursos e regras supracitados. Lembrando que o Web Service pode ser desenvolvido e disponibilizado em qualquer linguagem e plataforma que aceite a arquitetura <b>REST</b>.
