class RawType {
    constructor(name, verify) {
        this.is = (obj) => verify(obj)
        this.name = name;
        this.meta = () => { type: "raw" };
    }
}
class Factory {
    constructor(typelist) {
        let verify;
        this.verify = (func) => {
            verify = func;
            return this;
        }
        this.define = (name) => {
            typelist[name] = new RawType(name, verify);
            return this;
        }
    }
}
module.exports = Factory