import { HttpService } from './services/HttpService';

function sendPost(event) {

    event.preventDefault();

    console.log("Enviando post");

    let $ = document.querySelector.bind(document);
    let inputData = $('#data');
    let inputQuantidade = $('#quantidade');
    let inputValor = $('#valor');

    let negociacao = {
        data: inputData.value,
        quantidade: inputQuantidade.value,
        valor: inputValor.value
    };

    new HttpService()
        .post('/negociacoes', negociacao)
        .then(() => {
            inputData.value = '';
            inputQuantidade.value = 1;
            inputValor.value = 0.0;
            inputData.focus();
            alert('Negociação enviada com sucesso');
        })
        .catch(erro => {
            alert(`Não foi possível enviar a negociação: ${erro}`);
            debugger;
        });
}

document.querySelector('#btn-envia')
    .addEventListener('click', function (event) {
        sendPost(event);
    });