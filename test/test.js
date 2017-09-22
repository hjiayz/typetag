let assert = require("assert");
let t = new (require("../index.js"))(true)
let i = t.index;
t.raw.verify((o) => o === null).define("null");
assert(i.null.is(null));
t.raw.verify((o) => typeof o == "function").define("func");
assert(i.func.is(() => 1));
t.generic.verify((o, p) => Array.isArray(o) && o.every((v) => p.is(v))).paramtype(i.type).define("list");
i.list.new(i.func, "flist");
i.flist.assert([() => 1, () => 2]);