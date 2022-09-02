// 场景：假设一个业务分很多步骤完成，并且每个步骤都是异步，依赖上一个步骤的结果

/**
 * 回调地狱
 * 在回调函数中嵌套另一个回调函数。然后嵌套得很多，导致可读性大大降低
 * 比如，一个行为中，需要执行多个异步请求，并且每一个请求又依赖于上一个请求的结果
 */
let fn = function() {
    let data ;
    setTimeout(() => { // 模拟io，事件就绪后回调某个函数
        data = 1; // 模拟通过io获取数据
        console.log("1s 后输出: " + data);
        setTimeout(() => {// 模拟发送网络数据去处理请求
            data += 1;
            console.log("2s 后输出: " + data);
            setTimeout(() => {
                data += 1;
                console.log("3s 后输出: " + data);
                setTimeout(() => {
                    data += 1;
                    console.log("4s 后输出: " + data);
                }, 4000);
            }, 3000);
        }, 2000);
    }, 1000);
};
// fn();

function step1() { 
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let val = 1;
            console.log("execute step1, val: " + val);
            resolve(val);
        }, 1000);
    }) 
}
function step2(val) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("execute step2, val: " + (val+1));
            resolve(val + 1);
        }, 2000);
    }) 
}
function step3(val) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("execute step3, val: " + (val+1));
            resolve(val + 1);
        }, 3000);
    });
}
function step4(val) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("execute step4, val: " + (val+1));
            resolve(val + 1);
        }, 4000);
    });
}

/**
 * 使用传统promise的写法
 */
function doIt() {
    step1()
        .then(val => step2(val))
        .then(val => step3(val))
        .then(val => step4(val))
        .then(result => {
            console.log("result: " + result);
        })
}
doIt();



/**
 * 通过 async-await语法糖的方式改写promise的写法
 * 
 * async用于声明一个回调函数，此函数返回的是一个promise对象，通过then方法获取Promise的返回值
 * await用于等待一个Promise对象，只能在异步函数 async function中使用，否则会报错
 * 使用 await 可以实现 使用同步的写法来编写 异步串行 
 */
async function cal() {
    const val1 = await step1();
    const val2 = await step2(val1);
    const val3 = await step3(val2);
    const val4 = await step4(val3);
    console.log(val4);
}

cal();
console.log("不会阻塞");







//错误写法，问题出在then方法的调用时机是在函数执行完，而由于回调函数不会阻塞后续代码的执行，因此val值会直接返回未被修改过的（没法实现异步间的串行）
/**
 * 要获取异步请求得来的数据data，需要调用promise的then
 * then (cb1, cb2); then 接口参数是两个回调函数
 * cb1在fulfilled状态时被调用；cb2在rejected状态被调用
 * then方法实际上会返回一个新的promise对象
 * 因此可以链式的一直调用下去
 */
// let iPromise = new Promise((resolve, reject) => {
//     let data ;
//     // 异步请求处理
//     setTimeout(() => { 
//         data = 1;
//         if (data) { // 成功获取数据的标识
//             resolve(data);// pending -> fulfilled
//         } else {
//             reject("fail");// pending -> rejected
//         }
//     }, 1000);
// });
// iPromise.then(val => { //val 参数是回调函数的返回值
//     console.log("value1: " + val);
//     // 注意，是当所有代码执行完毕后去执行下一个then函数，而由于回调函数不会阻塞后续代码的执行，因此val值会直接返回未被修改过的
//     setTimeout(() => {
//         val = 2;
//     }, 2000);
//     return val;// 在cb1 return 状态pending -> fulfilled
// }, err => {
//     console.log("err: " + err);
//     return "error";
// }).then(val => {
//     console.log("value2: " + val);
//     setTimeout(() => {
//         val = 3;
//     }, 3000);
//     return val;
// }).then(val => {
//     console.log("value3: " + val);
//     setTimeout(() => {
//         vla = 4;
//         // return val;
//         console.log("end");
//     }, 4000);
// })