class TupleType {
    constructor(name, define) {
        this.is = (obj) => {
            if (!Array.isArray(obj)) return false;
            if (obj.length !== define.length) return false;
            for (let i = 0; i < obj.length; i++) {
                if (!define[i].is(obj[i])) return false;
            }
            return true;
        }
        this.name = name;
        this.meta = () => ({
            type: "tuple",
            define: define,
        })
    }
}
class Factory {
    constructor(typelist) {
        let define;
        this.set = (types) => {
            define = types;
            this.define = (name) => {
                typelist[name] = new TupleType(name, define);
                return this;
            }
            return this;
        }
    }
}
module.exports = Factory