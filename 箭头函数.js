// =>
const foo = v => v; // 单个 形参可以省略()、如果函数体只有一行，则可以省略大括号和return关键字。
// 等价
const foo1 = function(v) {
    return v;
}

const fn = (v1, v2) => {
    return v1+v2;
}
// console.log(fn(100, 10));



function Timer() {
    this.s1 = 0;
    this.s2 = 0;
    setInterval(() => this.s1++, 1000); // 难道定义了就跑起来了吗？还是实例了之后就跑起来了？
    setInterval(function() {
        this.s2++;
    }, 1000);
} 
// let timer = new Timer();
// setTimeout(() => console.log(`s1: ${timer.s1}`), 3100);// s1: 3
// setTimeout(() => console.log(`s2: ${timer.s2}`), 3100);// s2: 0


// async function waitAndPrint(global) {
//     await setTimeout(() => console.log(`s2: ${timer.s2}`), 3100);
//     console.log(global.s2);
// }
// let global = this;
// waitAndPrint(global);

// setTimeout(() => console.log(`global: ${this.s2}`), 6000);// s2: 0


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

// this.title = 'xxxx';
// this.message = 'zzzzz';
var title = 'xxxx';
var message = 'zzzzz';


const p1 = {
    title: 'llll',
    message: 'kkkkk',
    say: () => {  // 箭头函数的this会指向外层作用域，即全局对象global
        // function指向函数的调用值
        // (function() { // 
        //     console.log(`title  ${this.title}  message    ${this.message}`); // title  undefined  message    undefined
        // })();


        console.log(`title  ${this.title}  message    ${this.message}`); //  title  xxxx  message    zzzzz
        (()=>{ // 这个this指向外层作用域，即外层的箭头函数，而外层的箭头函数又指向全局对象
            //  title  xxxx  message    zzzzz
            console.log(`title  ${this.title}  message    ${this.message}`); 
        })();
    }
}
p1.say();
let global = (function() { // 
    return this;
    // console.log(this); // Object [global]
    // console.log(this.title); // global
    // console.log(this.message); // global
    // console.log(`astitle  ${this.title}  message    ${this.message}`); // astitle  undefined  message    undefined
})();

console.log(this === global);

// [Arguments] {
//     '0': {},
//     '1':
//      { [Function: require]
//        resolve: { [Function: resolve] paths: [Function: paths] },
//        main:
//         Module {
//           id: '.',
//           exports: {},
//           parent: null,
//           filename: '/Users/wuzihong/Desktop/js-demo/arrow-function-demo.js',
//           loaded: false,
//           children: [],
//           paths: [Array] },
//        extensions:
//         [Object: null prototype] { '.js': [Function], '.json': [Function], '.node': [Function] },
//        cache:
//         [Object: null prototype] {
//           '/Users/wuzihong/Desktop/js-demo/arrow-function-demo.js': [Module] } },
//     '2':
//      Module {
//        id: '.',
//        exports: {},
//        parent: null,
//        filename: '/Users/wuzihong/Desktop/js-demo/arrow-function-demo.js',
//        loaded: false,
//        children: [],
//        paths:
//         [ '/Users/wuzihong/Desktop/js-demo/node_modules',
//           '/Users/wuzihong/Desktop/node_modules',
//           '/Users/wuzihong/node_modules',
//           '/Users/node_modules',
//           '/node_modules' ] },
//     '3': '/Users/wuzihong/Desktop/js-demo/arrow-function-demo.js',
//     '4': '/Users/wuzihong/Desktop/js-demo' }


