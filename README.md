# representante-mobile-ws
Exemplo de Web Service em Node.js para sincronização com o aplicativo <b>Representante Mobile</b> 

Este exemplo tem como objetivo fornecer uma base para a criação de um Web Service para integração entre o <b>ERP</b> do cliente e o aplicativo <b>Representante Mobile</b>.

O Web Service deve ser criado em uma arquitetura de serviço <b>REST</b> utilizando o padrão <b>JSON</b> para formato de trasmissão de dados.

Durante a sincronização o aplicativo "Representante Mobile" realizará um <b>POST</b> e um <b>GET</b>, o primeiro para enviar os pedidos realizados no aplicativo para o ERP e atualizará o status de sincronização do(s) pedido(s) no aplicativo, o segundo irá recuperar os dados cadastrais, removendo os dados antigos do aplicativo. Em ambas as requisições (<b>POST</b> e <b>GET</b>) será enviado no <b>HEADER</b> das mesmas o parâmetro "Senha" que é recuperado a partir do campo "Senha" do cadastro de Parâmetros do aplicativo.

> TITULO
* SUBTITULO
