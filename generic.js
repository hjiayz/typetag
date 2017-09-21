let Type = require("./type.js")
class InstanceType extends Type {
    constructor(name, type, verify, param, factory, isdebug) {
        super(name, isdebug);
        this.new = factory;
        this.is = (obj) => verify(obj, param);
        this.meta = {
            type: type,
            param: param,
            factory: factory,
        }
    }
}
class InstanceFactory {
    constructor(type, typelist, isdebug) {
        let { verify, paramtype } = typelist[type].meta.define;
        let param, factory;
        this.param = (iparam) => {
            if (isdebug) {
                paramtype.assert(iparam);
            };
            param = iparam;
            return this;
        }
        this.factory = (ifactory) => {
            if (isdebug && (typeof ifactory != "function")) throw new TypeError("not a function");
            factory = ifactory;
            return this;
        }
        this.define = (name) => {
            if (isdebug && (param === undefined)) throw new TypeError("param is undefined")
            if (isdebug && (factory === undefined)) throw new TypeError("factory is undefined")
            typelist[name] = new InstanceType(name, type, verify, param, factory, isdebug);
            return this;
        }
    }
}
class GenericType extends Type {
    constructor(name, verify, paramtype, typelist, isdebug) {
        super(name);
        Object.defineProperty(this, "new", { get: () => new InstanceFactory(this.name, typelist, isdebug) });
        this.is = (obj) => false;
        this.meta = {
            type: "Generic",
            define: {
                verify: verify,
                paramtype: paramtype
            }
        };
    }
}
class Factory {
    constructor(typelist, isdebug) {
        let verify, paramtype;
        this.verify = (iverify) => {
            if (isdebug && (typeof iverify != "function")) throw new TypeError("not a function");
            verify = iverify;
            return this;
        }
        this.paramtype = (iparamtype) => {
            if (isdebug && (!(iparamtype instanceof Type))) throw new TypeError("not a Type");
            paramtype = iparamtype;
            return this;
        }
        this.define = (name) => {
            if (isdebug && (verify === undefined)) throw new TypeError("verify is undefined")
            if (isdebug && (paramtype === undefined)) throw new TypeError("paramtype is undefined")
            typelist[name] = new GenericType(name, verify, paramtype, typelist, isdebug);
            return this;
        }
    }
}
module.exports = Factory