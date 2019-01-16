class NegociacaoController {
    constructor() {
        this.$ = document.querySelector.bind(document);

        this._inputData = this.$('#data');
        this._inputQuantidade = this.$('#quantidade');
        this._inputValor = this.$('#valor');
        this._listaNegociacoes = new ListaNegociacoes();
    }

    adiciona(event) {
        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._limpaFormulario();
    }

    _criaNegociacao(){
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