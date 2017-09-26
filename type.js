module.exports = class {
    constructor(isdebug) {
        this.is = (obj) => false;
        this.assert = (obj) => {
            if ((isdebug) && (!this.is(obj))) throw new TypeError(`not a ${this.name}`);
            return this;
        }
    }
}