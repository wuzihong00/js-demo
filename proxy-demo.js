let arr = [1,2,3];
// console.log(arr[-1]);

let Person = function(name, age) {
    this.name = name;
    this.age = age;
}
let obj = new Person("he", 10)
let proxy = new Proxy(obj, {
    get: function(target, propKey) { // target 表示被代理的对象  prop表示key
        console.log(target+  "xxxxx"   + propKey);
        console.log(`${target}  xxxxx   ${propKey}`);
    }
})

proxy.name;

