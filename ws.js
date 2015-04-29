var express = require('express');

var bodyParser = require('body-parser');

var app = express();

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3030
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.use(bodyParser.json());

app.use(function (req, res, next) {
    
    	res.setHeader('Access-Control-Allow-Origin', '*');
    	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Cache-Control, Pragma, Expires');

    	next();
});

function autenticacao(req, res, next) {

    	// VALIDA ACESSO
    
    	// TODO CRIAR UMA SENHA
    
    	var senha = 'teste';
    
	if (req.headers.senha && new Buffer(req.headers.senha, 'base64').toString('utf8') === senha) {

		next();
	} else {
        	res.status(200).send('Acesso ao servidor não autorizado.');
	}
}

app.post('/ws', autenticacao, function (req, res) {
    
    	// SINCRONIZA PEDIDOS
    
    	// TODO INSERIR EM UMA BASE DE DADOS
    
    	console.log(req.body);
    	
    	/*
	[
		{
	      		"codigo":1,
			"dataHora":"25/02/2015 12:57:39",
			"codigoCliente":"1",
		  	"observacoes":"teste",
		  	"codigoCondicaoPagamento":"1",
	      		"itens":
	      			[
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
    	*/

	res.status(200).send('OK');
});

app.get('/ws/:mac', autenticacao, function (req, res) {
    
    	// SINCRONIZA CADASTROS

    	// TODO RECUPERAR DE UMA BASE DE DADOS
    
	var result = JSON.parse('{ "clientes" : [ '
                            + '{"codigo":"1","nome":"Cliente Teste","cnpj":"01.234.456/0001-23","telefone":"(00)0000-0000","contato":"Contato 1","email":"teste@teste.com","logradouro":"Rua Geral","numero":"1","bairro":"Centro","cidade":"Pequenópolis","estado":"DF","tipo":"Especial","limite":1000,"venda":0,"valor_titulos_vencidos":0,"quantidade_titulos_vencidos":0} ],'
                            + '"condicoes" : ['
                            + '{"codigo":"1","descricao":"A VISTA","desconto_maximo":20} ],'
                            + '"produtos" : ['
                            + '{"codigo":"1","descricao":"Produto Teste","unidade":"UN","referencia":"001","fornecedor":"Fornecedor 1","quantidade_estoque":100,"percentual_comissao":7,"percentual_desconto":10,"valor_minimo":6.23,"valor_venda":6.92} ],'
                            + '"parametros" : {"nome_empresa":"EMPRESA TESTE","controlar_limite_cliente":"S","controlar_desconto_cond_pagto":"N","controlar_estoque":"S","valor_saldo_flex": 50.0} }');

	res.status(200).send(result);
});

app.get('/', function (req, res) {

	res.status(200).send('<b>Exemplo de Web Service para sincronização com o aplicativo <a href="https://play.google.com/store/apps/details?id=br.com.blogspot.webjoel.representantemobile" target="_blank">Representante Mobile</a></b><br><br><u>Requisições disponíveis:<br><br><li>POST /ws</li><li>GET /ws</li></ul>');
});

app.listen(server_port, server_ip_address);

console.log('WS rodando na porta ' + server_port + '...');
