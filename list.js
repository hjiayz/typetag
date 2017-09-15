class ListType {
    constructor(name, type) {
        this.is = (arr) => {
            if (!Array.isArray(arr)) return false;
            for (let item of arr) {
                if (!type.is(item)) return false;
            }
            return true;
        }
        this.name = name;
        this.meta = () => ({ type: "list", define: type });
    }
}
class Factory {
    constructor(typelist) {
        let ltype;
        this.set = (type) => {
            ltype = type;
            return this;
        }
        this.define = (name) => {
            if (undefined === ltype) throw "type of list is undefined"
            typelist[name] = new ListType(name, ltype);
            return this;
        }
    }
}
module.exports = Factory