class NegociacaoController {
    constructor() {
        this.$ = document.querySelector.bind(document);

        this._inputData = this.$('#data');
        this._inputQuantidade = this.$('#quantidade');
        this._inputValor = this.$('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView(this.$('#negociacoesView')),
            'adiciona', 'esvazia'
        );


        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView(this.$('#mensagemView')),
            'texto',
        );
    }

    adiciona(event) {
        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso.'

        this._limpaFormulario();
    }

    apaga() {
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = 'Negociações apagadas com sucesso.';
    }

    importaNegociacoes() {
        let service = new NegociacaoService();

        service.obterNegociacoesDaSemana((err, negociacoes) => {
            if(err) {
                this._mensagem.texto = err;
                return;
            }
            else {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações importadas com sucesso.';
            }
        });
    }

    _criaNegociacao() {
        return new Negociacao(
            new Date(DateHelper.textoParaData(this._inputData.value)),
            this._inputQuantidade.value,
            this._inputValor.value
        )
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0

        this._inputData.focus();
    }
}