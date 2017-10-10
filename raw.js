let Type = require("./type.js")
class RawType extends Type {
    constructor(verify, isdebug, index) {
        super(isdebug);
        this.is = (obj) => verify(obj)
        this.meta = { type: "raw", verify: verify };
        this.define = (name) => {
            let named = new RawType(verify, isdebug, index);
            named.meta.name = name;
            index[name] = named;
            named.toJSON = () => name;
            return named;
        }
    }
}
module.exports = (verify, isdebug, index) => new RawType(verify, isdebug, index);