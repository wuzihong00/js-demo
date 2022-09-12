
const a = Symbol();
const b = Symbol();
const c = Symbol("hello");
const d = Symbol("hello");
console.log(a === b); // false
console.log(c === d); // false
console.log(typeof a);// symbol
console.log(d.toString()+"a");//Symbol(hello)a
// console.log(d+"a");// TypeError: Cannot convert a Symbol value to a string

// 使用同一个Symbol
let s1 = Symbol.for("ss")
let s2 = Symbol.for("ss")
console.log(s1 === s2);// true


let obj = {
    [Symbol('name')]: 'Hello',
    age: 19,
    title: 'barber'
}
// for (const key in obj) {
//     console.log(key);
// }
console.log(Reflect.ownKeys(obj));// [ 'age', 'title', Symbol(name) ]


function fa(type) {
    this.type = type;
}
function son(type) {
    this.type = type;
}

// Symbol用法
// 用作对象属性名
let PROP_NAME = Symbol("symbol的描述"); // 区别于symbol作为属性名时，属性名的value
let obj1 = {};
// 写法1
obj1[PROP_NAME] = "key的value";
console.log(`obj1[PROP_NAME]   ${obj1[PROP_NAME]}`);

// 写法2
let obj2 = {
    [PROP_NAME]: 'hello'
}
console.log(`obj2[PROP_NAME]   ${obj2[PROP_NAME]}`);

// 写法3



// 注意，不能用 . 的写法， 在通过点运算符为obj增加PROP_NAME属性时，这个PROP_NAME实际是一个字符串，并不是一个Symbol变量
let obj4 = {}
let iSymbol = Symbol("iSymbol的描述"); // 区别于symbol作为属性名时，属性名的value
obj4.iSymbol = 'iiiii';
console.log(obj4[iSymbol]); // undefined
console.log(obj4['iSymbol']); // iiiii


// 在使用Symbol类型的数据时，存在几种不同的写法，遵循的一个原则就是为对象字面量新增属性时需要使用方括号[]。



