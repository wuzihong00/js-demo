/**
 * es6对 对象的扩展
 */
const id = 1234;
const address = "xxxx";
const obj = {
    id: id,
    address: address
}
// es6简写： 传统{key: value}的简写
const obj1 = {id, address}; // { id: 1234, address: 'xxxx' }
// console.log(obj1);


// 函数简写，省略function
const obj2 = {
    fn: function() {
        return "hello world";
    }
}
const obj3 = {
    fn() {
        return "hello world";
    }
}
// console.log(obj3.fn());


// 当需要输出一组模块变量时，对象简写的方法就非常合适
// module.exports = { getItem, setItem, clear };
// module.exports = {    
//     getItem: getItem,
//     setItem: setItem,
//     clear: clear
// };


// Object.assign()用途


/**
 * 扩展运算符  (...)
 */
const arr = [1,2,3,4];
console.log(...arr);// 1 2 3 4
const str = "hello";
// console.log(...str);// h e l l o


function add(outThis) {
    // var innerThis = this;
    // console.log(innerThis);
    console.log(this === outThis);
}
var outerThis = this;
add(outerThis);

// add.call(undefined, this);
console.log(this === this);
// console.log(Array.prototype);

// console.log(Math.max(1,2,3,4));
console.log(Math.max.apply(null, [1,2,3,4]));

var display = function(arr) {
    return arr;
}
console.log(display([1,2,3]));
console.log(display.apply(null, [1,2,3]));




const mergedObj = (target, ...sources) => Object.assign(target, ...sources);
const obj4 = {
    id: 1111,
    pid: 2222
}
const obj5 = {
    id: 2222,
    pid: 3333
}
const obj6 = {
    id: 3333,
    pid: 4444
}

const merge = mergedObj({}, obj4, obj5, obj6);
console.log(merge);



