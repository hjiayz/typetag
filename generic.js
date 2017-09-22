let Type = require("./type.js")
class InstanceType extends Type {
    constructor(name, type, verify, param, isdebug) {
        super(name, isdebug);
        this.is = (obj) => verify(obj, param);
        this.meta = {
            type: type,
            param: param
        }
    }
}
class GenericType extends Type {
    constructor(name, verify, paramtype, typelist, isdebug) {
        super(name);
        this.new = (param, insname) => {
            if (isdebug) {
                paramtype.assert(param);
            };
            if (insname === undefined) {
                insname = this.insname(param)
            }
            typelist[insname] = new InstanceType(insname, name, verify, param, isdebug);
            return this;
        }
        this.insname = (param) => {
            return `${name}<${JSON.stringify(param)}>`
        }
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