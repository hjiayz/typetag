module.exports = class {
    constructor(name, isdebug) {
        this.name = name;
        this.is = (obj) => false;
        this.assert = (obj) => {
            if ((isdebug) && (!this.is(obj))) throw new TypeError(`not a ${this.name}`);
            return this;
        }
    }
}