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
            return this;
        }
        this.toJSON = () => {
            let res = {};
            res[type.toJSON()] = param;
            return res;
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
    let generic = (param, type) => {
        paramtype.assert(param);
        return new InstanceType(type, param, isdebug, index)
    }
    let un = (param) => generic(param, un);
    un.meta = {
        type: "Generic",
        verify: verify,
        paramtype: paramtype,
    }
    un.define = (name) => {
        let named = (param) => generic(param, named);
        named.meta = Object.assign({}, un.meta, { name: name });
        named.define = un.define;
        index[name] = named;
        named.toJSON = () => name;
        return named;
    }
    return un;
}