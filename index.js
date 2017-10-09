let generic = require("./generic.js");
let raw = require("./raw.js");
let Type = require("./type.js");
class TypeTag {
    constructor(debugmode) {
        let typelist = {};
        Object.defineProperties(this, {
            index: {
                get: () => typelist
            }
        })
        this.raw = (verify) => raw(verify, debugmode, this.index);
        this.generic = (verify, paramtype) => generic(verify, paramtype, debugmode, this.index);
        this.load = (plugin) => {
            plugin(this, debugmode);
            return this;
        }
        this.type = this.raw((o) => o instanceof Type);
        this.generictype = this.raw((o) => (typeof o == "function") && (o.meta !== undefined) && (o.meta.type === "Generic"));
    }
}
module.exports = TypeTag;