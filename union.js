class UnionType {
    constructor(name, define) {
        let parse = (obj) => {
            let t = typeof obj;
            if (t == "string") {
                if (define[obj] === "literal") {
                    return true;
                }
                else {
                    return false;
                }
            }
            if (t != "object") return false;
            let keys = Object.keys(obj);
            if (keys.length !== 1) return false;
            let key = keys[0];
            if ((!key) || (!define.hasOwnProperty(key))) return false;
            return [define[key], obj[key]];
        }
        this.is = (obj) => {
            let p = parse(obj);
            if (typeof p == "boolean") return p;
            return p[0].is(p[1]);
        }
        this.of = (obj) => {
            let p = parse(obj);
            if ((typeof p == "boolean") || (!p[0].is(p[1]))) return false;
            return p[0];
        }
        this.name = name;
        this.meta = () => ({
            type: "union",
            define: define,
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
            typelist[name] = new UnionType(name, define);
            return this;
        }
    }
}
module.exports = Factory