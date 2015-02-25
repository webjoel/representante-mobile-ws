var express = require('express');

var bodyParser = require('body-parser');

var app = express();

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

	res.status(200).send('OK');
});

app.get('/ws', autenticacao, function (req, res) {
    
    // SINCRONIZA CADASTROS

    // TODO RECUPERAR DE UMA BASE DE DADOS
    
	var result = JSON.parse('{ "clientes" : [ '
                            + '{"identificador":"1","nome":"Cliente Teste","cnpj":"01.234.456/0001-23","telefone":"(00)0000-0000","contato":"Contato 1","email":"teste@teste.com","logradouro":"Rua Geral","numero":"1","bairro":"Centro","cidade":"Pequenópolis","estado":"DF","tipo":"Especial","limite":1000,"venda":0,"valor_titulos_vencidos":0,"quantidade_titulos_vencidos":0} ],'
                            + '"condicoes" : ['
                            + '{"identificador":"1","descricao":"A VISTA","desconto_maximo":20} ],'
                            + '"produtos" : ['
                            + '{"identificador":"1","descricao":"Produto Teste","unidade":"UN","referencia":"001","fornecedor":"Fornecedor 1","quantidade_estoque":100,"percentual_comissao":7,"percentual_desconto":10,"valor_minimo":6.23,"valor_venda":6.92} ],'
                            + '"parametros" : {"nome_empresa":"JOEL DA ROSA","controlar_limite_cliente":"S","controlar_desconto_cond_pagto":"N","controlar_estoque":"S","valor_saldo_flex": 50.0} }');

	res.status(200).send(result);
});

app.listen(3030);

console.log('WS rodando na porta 3030...');