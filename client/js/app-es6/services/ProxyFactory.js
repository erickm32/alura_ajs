export class ProxyFactory {
    static create(objeto, props, acao) {
        return new Proxy(objeto, {
            get(target, prop, receiver) {
                if (props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
                    return function () {
                        console.log(`interceptando ${prop}`);
                        let ret = Reflect.apply(target[prop], target, arguments);
                        acao(target);

                        return ret;
                    }
                }
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {
                let ret = Reflect.set(target, prop, value, receiver);
                if(props.includes(prop)) acao(target);

                return ret;
            }
        });
    }

    static _isFunction(func) {
        return typeof (func) == typeof (Function)
    }
}