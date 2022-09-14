// 属性简写
const id = 1234;
const address = "xxxx";
const obj1 = { id, address }; // { id: 1234, address: 'xxxx' }
// 等价于
const obj = {
    id: id,
    address: address
}

// 函数简写，省略function
const obj2 = {
    fn: function () {
        return "hello world";
    }
}
const obj3 = {
    fn() {
        return "hello world";
    }
}


// module.exports = {getItem, setItem, clear}
// // 等价于
// module.exports = {
//     getItem: getItem,
//     setItem: setItem ,
//     clear: clear
// }


// 当需要输出一组模块变量时，对象简写的方法就非常合适
// module.exports = { getItem, setItem, clear };
// module.exports = {    
//     getItem: getItem,
//     setItem: setItem,
//     clear: clear
// };


// Object.assign()用途
// 给对象添加函数
function Person(name, age) {
    this.name = name;
    this.age = age;
}
function Person(name, age) {
    Object.assign(this, {name, age});
}

// 给对象添加函数
Person.prototype.f1 = function(){};
Person.prototype.f2 = function(){};
Object.assign(Person.prototype, {
    f1() {},
    f2() {}
});


// 合并对象
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
