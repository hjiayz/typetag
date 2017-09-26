let assert = require("assert");
let t = new (require("../index.js"))(true)
let i = t.index;
t.raw((o) => o === null).define("null");
assert(i.null.is(null));
t.raw((o) => typeof o == "function").define("func").define("ffunc");
assert(i.func.is(() => 1));
t.generic((o, p) => Array.isArray(o) && o.every((v) => p.is(v)), i.type).define("list").define("llist");
i.llist(i.func).define("flist").define("fflist");
i.flist.assert([() => 1, () => 2]);