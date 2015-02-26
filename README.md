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

Simulando um exemplo de uma sincronização local, o aplicativo <b>Representante Mobile</b> realizará as seguintes requisições:

> Envio dos pedidos:
* POST http://192.168.0.1:3030/ws
* HEADER: Senha=teste
* BODY: [ { ... }, ... ]
* RESPONSE: "OK" ou Error ...

> Atualização dos cadastros:
* GET http://192.168.0.1:3030/ws
* HEADER: Senha=teste
* RESPONSE: { ... } ou Error ...
