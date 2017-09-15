class StructType {
    constructor(name, define) {
        this.is = (obj) => {
            if (typeof obj != "object") return false;
            if (Object.keys(obj).length != Object.keys(define).length) return false;
            for (let name in define) {
                if (!define[name].is(obj[name])) return false;
            }
            return true;
        }
        this.name = name;
        this.meta = () => ({
            type: "struct",
            define: define
        })
    }
}
class Factory {
    constructor(typelist) {
        let define = {};
        this.add = (name, type) => {
            define[name] = type;
            return this;
        }
        this.define = (name) => {
            typelist[name] = new StructType(name, Object.assign(define));
            return this;
        }
    }
}
module.exports = Factory;