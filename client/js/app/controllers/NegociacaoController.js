class NegociacaoController {
    constructor() {
        this.$ = document.querySelector.bind(document);

        this._inputData = this.$('#data');
        this._inputQuantidade = this.$('#quantidade');
        this._inputValor = this.$('#valor')
    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = new Negociacao(
            new Date(
                ...this._inputData.value
                    .split('-')
                    .map((item, indice) => indice == 1 ? item - 1 : item)
            ),
            this._inputQuantidade.value,
            this._inputValor.value
        )


    }
}