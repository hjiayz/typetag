let Type = require("./type.js")
class RawType extends Type {
    constructor(name, verify, isdebug) {
        super(name, isdebug);
        this.is = (obj) => verify(obj)
        this.meta = () => { type: "raw" };
    }
}
class Factory {
    constructor(typelist, isdebug) {
        this.verify = (func) => {
            this.define = (name) => {
                typelist[name] = new RawType(name, func, isdebug);
                return this;
            }
            return this;
        }
    }
}
module.exports = Factory