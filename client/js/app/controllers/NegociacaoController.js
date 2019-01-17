class NegociacaoController {
    constructor() {
        this.$ = document.querySelector.bind(document);

        this._inputData = this.$('#data');
        this._inputQuantidade = this.$('#quantidade');
        this._inputValor = this.$('#valor');

       let self = this; 
        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
            get(target, prop, receiver) {
                if(['adiciona', 'esvazia'].includes(prop) &&
                    typeof(target[prop]) == typeof(Function)) {
                    return function() {
                        console.log(`interceptando ${prop}`);
                        Reflect.apply(target[prop], target, arguments);                        
                        self._negociacoesView.update(target);
                    }
                }
                return Reflect.get(target, prop, receiver);                
            }
        })
            
        this._negociacoesView = new NegociacoesView(this.$('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView(this.$('#mensagemView'));
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {
        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem.texto = 'Negociação adicionada com sucesso.'
        this._mensagemView.update(this._mensagem);

        this._limpaFormulario();
    }

    apaga() {
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = 'Negociações apagadas com sucesso.';
        this._mensagemView.update(this._mensagem);
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