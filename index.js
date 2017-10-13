let generic = require("./generic.js");
let raw = require("./raw.js");
let Type = require("./type.js");
class TypeTag {
    constructor(debugmode) {
        let typelist = {};
        let plugins = {};
        Object.defineProperties(this, {
            index: {
                get: () => typelist
            }
        })
        this.raw = (verify) => raw(verify, debugmode, this.index);
        this.generic = (verify, paramtype) => generic(verify, paramtype, debugmode, this.index);
        this.load = (plugin) => {
            if (debugmode && plugins[plugin.name]) throw new Error(`Plugin ${plugin.name} has been loaded.`)
            plugin(this, debugmode);
            plugins[plugin.name] = true;
            return this;
        }
        this.type = this.raw((o) => o instanceof Type).define("type", (o) => {
            if (typeof o == "string") return this.index[o];
            let t = this.index[Object.keys(o)[0]];
            return t(t.meta.paramtype.parse(Object.values(o)[0]));
        });
    }
}
module.exports = TypeTag;