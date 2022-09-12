/**
 * iterator 和 for ... of
 */

// 没部署iterator接口  无法使用for...of
let obj = {
    name: "pa",
    age: 10
}
// for (const key of obj) {
//     console.log(key); // TypeError: obj is not iterable
// }

// 正常输出
let arr = [1,2,3];
for (const item of arr) {
    // console.log(item); 
}

// 如果想要自定义一些可以使用for...of循环的数据结构，
// Iterator接口是部署在Symbol.iterator属性上的，是一个函数，因此只需要对特定的数据结构加上Symbol.iterator属性即可。
function Person(name, age) {
    this.name = name;
    this.age = age;
}
// console.log(obj.prototype); // undefined
// console.log(Person.prototype); // {}
Person.prototype[Symbol.iterator] = function() {
    let propArr = Object.keys(this);
    let count = 0;
    return {
        next: function() {
            if (count < propArr.length) {
                let index = count++;
                return {
                    value: propArr[index],
                    done: false
                }
            } else {
                return {
                    value: undefined,
                    done: true
                }
            }
        }
    }
}
let obj1 = new Person("pa", 10)
for (const key of obj1) {
    console.log(key); 
}

// 对于Map结构的数据，for...of循环在执行每轮循环时，会将Map中的每个键和对应的值组合成一个数组进行返回
let map = new Map();
map.set('name', 'kink');
map.set('age', 12);
map.set('address', 'beijing');
for (const item of map) {
    console.log(item);  // [ 'name', 'kink' ]  [ 'age', 12 ]   [ 'address', 'beijing' ]
}

// 函数参数arguments对象使用for...of循环
function foo() {
    for (const arg of arguments) {
        console.log(`arg: ${arg}`);
    }
}
foo('a','b','c');


/**
 * for...of、forEach()、for...in 之间的比较。
 */
// forEach()无法使用continue、break；return 相当于跳过当前，但仍然会执行后续循环
const arr1 = ['one', 'two', 'three'];
// arr1.forEach((item, index)=> {
//     if (index === 1) {
//         return ; 
//         // break; // SyntaxError: Illegal break statement
//     } 
//     console.log(item);
// })
// for in 主要是为 遍历对象设计的，对数组不友好
// 数组使用for in存在问题：1. 使用for...in循环遍历数组时，返回的是数组索引；2. 如果手动给数组实例添加的属性，同样会被遍历出来
arr1.use = 'demo';
for (const i in arr1) {
    console.log(i); // 0 1 2 use
}

// for of优点：1、for of 返回数组元素，且不会将手动给数组实例添加的属性遍历出来；2、支持continue、break、return
for (const item of arr1) {
    if (item === 'two') {
        continue;
    }
    console.log(item); // one three
}