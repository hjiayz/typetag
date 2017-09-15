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
        this.set = (type) => {
            this.define = (name) => {
                typelist[name] = new ListType(name, type);
                return this;
            }
            return this;
        }
    }
}
module.exports = Factory