let assert = require("assert");
let t = new (require("../index.js"))()
let i = t.index;
t.raw.verify((o) => o === null).define("null");
assert(i.null.is(null));
t.raw.verify((o) => typeof o == "function").define("func");
assert(i.func.is(() => 1));
t.union.add("func", i.func).add("null", i.null).add("lit").define("union");
assert(i.union.is({ "func": () => 1 }));
assert(i.union.of({ "func": () => 1 }) == i.func);
assert(i.union.is("lit"));
t.tuple.set([i.null, i.func]).define("tuple");
assert(i.tuple.is([null, () => 1]));
t.list.set(i.null).define("list");
assert(i.list.is([null, null, null]));
t.struct.add("func", i.func).add("null", i.null).define("struct");
assert(i.struct.is({ func: () => 1, null: null }));