let Type = module.exports = class {
    constructor(isdebug) {
        this.is = (obj) => false;
        this.assert = (obj, msg) => {
            if ((isdebug) && (!this.is(obj))) throw new TypeError(msg || `not a ${this.meta.name}`);
            return this;
        }
        this.eq = (tp) => {
            if (!(tp instanceof Type)) return false;
            return JSON.stringify(this) == JSON.stringify(tp);
        }
        this.parse = (o) => {
            if (!this.is(o)) throw new Error("parse error!");
            return o;
        }
    }
}