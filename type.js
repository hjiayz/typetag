module.exports = class {
    constructor(isdebug) {
        this.is = (obj) => false;
        this.assert = (obj, msg) => {
            if ((isdebug) && (!this.is(obj))) throw new TypeError(msg || `not a ${this.name}`);
            return this;
        }
    }
}