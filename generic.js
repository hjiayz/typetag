let Type = require("./type.js")
class InstanceType extends Type {
    constructor(type, param, isdebug, index) {
        super(isdebug);
        let verify = type.meta.verify;
        this.is = (obj) => verify(obj, param);
        this.meta = {
            type: type,
            param: param
        }
        this.define = (name) => {
            let named = new InstanceType(type, param, isdebug, index);
            named.meta.name = name;
            index[name] = named;
        }
    }
}
module.exports = (verify, paramtype, isdebug, index) => {
    if ((isdebug) && (typeof verify != "function")) {
        throw new TypeError("not a function");
    }
    if ((isdebug) && (!(paramtype instanceof Type))) {
        throw new TypeError("not a Type");
    }
    let generic = (param) => {
        paramtype.assert(param);
        return new InstanceType(generic, param, isdebug, index)
    }
    generic.meta = {
        type: "Generic",
        verify: verify,
        paramtype: paramtype,
    }
    generic.define = (name) => {
        let named = (param) => generic(param);
        named.meta = Object.assign({}, generic.meta, { name: name });
        index[name] = named;
    }
    return generic;
}