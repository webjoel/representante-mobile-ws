# representante-mobile-ws

Para a realização da sincronização de dados entre o <b>ERP</b> do cliente e o aplicativo <b>Representante Mobile</b> é necessário a criação de um Web Service por parte do cliente/software house.

O Web Service deve ser criado em uma arquitetura de serviço <b>REST</b> utilizando o padrão <b>JSON</b> para formato de trasmissão de dados.

Durante a sincronização o aplicativo "Representante Mobile" realizará um <b>POST</b> e um <b>GET</b>:

> POST
* Envio dos pedidos realizados no aplicativo para o ERP, caso sucesso, atualizará o status de sincronização do(s) pedido(s) no aplicativo.

> GET
* Recuperação dos dados cadastrais atualizados, caso sucesso, removerá os dados antigos do aplicativo.

Em ambas as requisições (<b>POST</b> e <b>GET</b>) o aplicativo enviará no <b>HEADER</b> das mesmas o parâmetro "Senha" que é recuperado a partir do campo "Senha" do cadastro de "Parâmetros" do aplicativo, determinando assim a segurança da sincronização.
