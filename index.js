let Union = require("./union.js");
let Struct = require("./struct.js");
let List = require("./list.js");
let Tuple = require("./tuple.js");
let Raw = require("./raw.js");
class TypeTag {
    constructor() {
        let typelist = {};
        Object.defineProperties(this, {
            union: {
                get: () => new Union(typelist)
            },
            struct: {
                get: () => new Struct(typelist)
            },
            list: {
                get: () => new List(typelist)
            },
            tuple: {
                get: () => new Tuple(typelist)
            },
            raw: {
                get: () => new Raw(typelist)
            },
            index: {
                get: () => typelist
            }
        })
    }
}
module.exports = TypeTag;