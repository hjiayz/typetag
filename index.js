let Generic = require("./generic.js");
let Raw = require("./raw.js");
let Type = require("./type.js");
class TypeTag {
    constructor(debugmode) {
        let typelist = {};
        Object.defineProperties(this, {
            raw: {
                get: () => new Raw(typelist, debugmode)
            },
            generic: {
                get: () => new Generic(typelist, debugmode)
            },
            index: {
                get: () => typelist
            }
        })
        this.raw.verify((o) => o instanceof Type).define("type");
    }
}
module.exports = TypeTag;