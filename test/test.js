let assert = require("assert");
let t = new (require("../index.js"))(true)
let type = t.type;
let i = t.index;
t.raw((o) => o === null).define("null");
assert(i.null.is(null));
let func = t.raw((o) => typeof o == "function")
func.define("func").define("ffunc");
assert(i.func.is(() => 1));
t.generic((o, p) => Array.isArray(o) && o.every((v) => p.is(v)), type).define("list").define("llist");
i.llist(i.func).define("fllist").define("ffllist");
i.list(i.func).define("flist").define("fflist");
i.flist.assert([() => 1, () => 2]);
assert(i.null.eq(i.null))
assert(i.flist.eq(i.fflist));
assert(i.flist.eq(i.fllist));
assert(i.func.eq(i.ffunc));
assert(i.func.eq(func));
assert(JSON.stringify(i.flist) === `{"list":"func"}`);