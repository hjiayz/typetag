let Type = module.exports = class {
    constructor(isdebug) {
        this.is = (obj) => false;
        this.assert = (obj, msg) => {
            if ((isdebug) && (!this.is(obj))) throw new TypeError(msg || `not a ${this.meta.name}`);
            return this;
        }
        let igname = (o) => Object.assign({}, o, { name: "" })
        let eq = (a, b) => {
            if (typeof a != typeof b) return false;
            if (typeof a == "object") {
                if (a instanceof Type) {
                    return a.eq(b);
                }
                if (Array.isArray(a)) {
                    if (!Array.isArray(b)) return false;
                    if (a.length != b.length) return false;
                    return a.every((v, i) => eq(v, b[i]));
                }
                if (Object.keys(a).length != Object.keys(b).length) return false;
                for (let i in a) {
                    if (!eq(a[i], b[i])) return false;
                }
                return true;
            }
            if ((typeof a == "function") && (a.meta !== undefined) && (eq(igname(a.meta), igname(b.meta)))) return true
            return a === b;
        }
        this.eq = (tp) => {
            if (!(tp instanceof Type)) return false;
            return eq(igname(this.meta), igname(tp.meta));
        }
    }
}