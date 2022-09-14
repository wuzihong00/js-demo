const foo = v => v; // 单个 形参可以省略()、如果函数体只有一行，则可以省略大括号和return关键字。
// 等价
const foo1 = function(v) {
    return v;
}

const fn = (v1, v2) => {
    return v1+v2;
}
// console.log(fn(100, 10));

function normalFn() {
    for (const item of arguments) {
        console.log(`item  ${item}`);
    }
}
// normalFn("one", "two", "three");
// 箭头函数无法使用arguments，但可以借助扩展运算
let arrowFn = (...args) => {
    // console.log(arguments);
    for (const arg of args) {
        console.log(`arg  ${arg}`);
    }
}
// arrowFn(1,2,3);

this.title = 'xxxx1';
this.message = 'zzzzz1';
var title = 'xxxx';
var message = 'zzzzz';
// console.log(this);

const p1 = {
    title: 'llll',
    message: 'kkkkk',
    say: () => {  
        // 箭头函数的this会指向外层作用域，即全局对象global
        // 普通function指向函数的调用值
        console.log(`title  ${this.title}  message    ${this.message}`); //  title  xxxx  message    zzzzz
        (()=>{ 
            // 这个this指向外层作用域，即外层的箭头函数，而外层的箭头函数又指向全局对象
            //  title  xxxx  message    zzzzz
            console.log(`title  ${this.title}  message    ${this.message}`); 
        })();
    }
}
p1.say();
let global = (function() { // 
    // console.log(this); // Object [global]
    // console.log(this.title); // global
    // console.log(this.message); // global
    // console.log(`astitle  ${this.title}  message    ${this.message}`); // astitle  undefined  message    undefined
    return this;
})();

// console.log(this === global);
// console.log(global.title);
// console.log(global.message);
