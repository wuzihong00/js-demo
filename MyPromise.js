// https://zhuanlan.zhihu.com/p/431677536
// 1. 原生 new Promise(executor) 中的 executor 是立即执行的
// 2. then 接收两个函数 onFulfilled 和 onRejected，他们分别在状态改变为 fulfilled 和 rejected 之后调用，并分别接收实例对象上的 value 和 reason 作为参数
// 3. 
// then 可以链式调用，因此 then 返回的应该还是一个 promise 对象，
// 并且改变这个返回的 promise 对象的状态的 resolve 和 reject 方法应该在当前的 promise 中被调用，
// 并且将当前 promise 的 value 或 reason 作为参数传入，这样下一个 promise 的 then 方法中就可以拿到上一个 promise 传过来的值

/**
 * Promise/A+ 2.1 中规定：
 * 一个 promise 有且仅有三个 state，分别是：pending、fulfilled、rejected
 * 当调用 resolve 时会改变 state 为 fulfilled 并且将接收的值赋值给 value
 * 当调用 reject 时会改变 state 为 rejected 并且将接收到的拒因赋值给 reason
 * 当一个 promise 的 state 更改为 fulfilled 或 rejected 后，不可以再次更改其 state
 * 
 * then onFulfilled 和 onRejected 都是可选参数
 * 如果 onFulfilled 不是一个函数，就忽略它
 * 如果 onRejected 不是一个函数，就忽略它
 * 
 * then 可以被同一个 promise 多次调用
 */


class MyPromise {
    constructor(executor) {
        this.state = 'pending';
        this.value = null;
        this.reason = null;
        // then 可以被同一个 promise 多次调用。因此我们应该用一个数组来存放回调，然后改变状态时再去遍历执行回调
        this.callbacks = [];
        const resolve = value => {
            if (this.state !== 'pending') return;
            this.state = 'fulfilled';
            this.value = value;
            // 注意这里的callback.fulfilled() this就是callback
            this.callbacks.forEach(callback => callback.fulfilled()); 
        }
        const reject = reason => {
            if (this.state !== 'pending') return;
            this.state = 'rejected';
            this.reason = reason;
            // promise1.then(cb1, cb2);  promise1会去调用多个cb1，同理promise2会去调用promise3
            this.callbacks.forEach(callback => callback.rejected());
        }
        // 由于 executor 执行过程中可能会有异常，因此我们使用 try...catch 来进行异常处理
        // executor是立即执行的
        try {
            executor(resolve, reject);
        } catch(error) {
            reject(error);
        }
    }

    // then 接收两个函数 onFulfilled 和 onRejected
    // 他们分别在状态改变为 fulfilled 和 rejected 之后调用，并分别接收实例对象上的 value 和 reason 作为参数
    then(onFulfilled, onRejected) {
        // onFulfilled 和 onRejected 都是可选参数
        // 如果 onFulfilled 不是一个函数，就忽略它
        // 如果 onRejected 不是一个函数，就忽略它
        // 因此我们可以判断当 onFulfilled 或 onRejected 不是函数时，简单赋一下值
        // if (typeof onFulfilled !== 'function') onFulfilled = () => {};
        // if (typeof onRejected !== 'function') onRejected = () => {};
        // promise.then().then(res => console.log(res)) 如果 .then() 括号中什么都不写的话，在后面的 then 中依旧是可以拿到前面传过来的参数的，这就是 then 的穿透。
        if(typeof onFulfilled !== 'function') onFulfilled = value => value;
        if(typeof onRejected !== 'function') onRejected = reason => {throw reason};
        let promise = new MyPromise((resolve, reject) => {
            if(this.state === 'fulfilled') {
                // 原生 Promise 中 promise.then() 括号内部的代码是异步执行的。
                // then 可以链式调用，因此 then 返回的应该还是一个 promise 对象，
                // 并且改变这个返回的 promise 对象的状态的 resolve 和 reject 方法应该在当前的 promise 中被调用，
                // 并且将当前 promise 的 value 或 reason 作为参数传入，这样下一个 promise 的 then 方法中就可以拿到上一个 promise 传过来的值
                // setTimeout(() => resolve(onFulfilled(this.value)));
                setTimeout(() => {
                    try {
                        this.resolvePromise(promise, onFulfilled(this.value), resolve, reject);
                    } catch(error) {
                        reject(error);
                    }
                })
            }
            if(this.state === 'rejected') {
                // 原生 Promise 中 promise.then() 括号内部的代码是异步执行的。
                // 注意，这里依旧是 resolve 而不是 reject，因为 promise 状态是不应该互相影响的。
                // 上一个 promise 只要不抛错，那么下一个 promise 就应该执行 onResolved 回调。
                // setTimeout(() => resolve(onRejected(this.reason)));
                setTimeout(() => {
                    try {
                        this.resolvePromise(promise, onRejected(this.reason), resolve, reject);
                    } catch(error) {
                        reject(error);
                    }
                })
            }
            // 如果我们在 executor 中使用 setTimeout 延迟执行 resolve 或 reject，我们会发现执行 then 时，当前状态为 pending，因此我们还需要加入 pending 状态下的判断。
            if(this.state === 'pending') {
                // console.log(`this.value, ${this.value}`);
                // 先存起来，当调用 resolve 或 reject 时再去执行回调
                // 仅保存 pending 状态下的 promise，因为如果是 resolved 或 rejected 状态下的 promise，直接执行回调即可，因为其状态和值已经改变。
                // 注意，这里的this 调用then的那个对象，并非本实例
                this.callbacks.push({
                    fulfilled: () => {
                        setTimeout(() => {
                            try {
                                this.resolvePromise(promise, onFulfilled(this.value), resolve, reject)
                            } catch(error) {
                                reject(error)
                            }
                        })
                    },
                    rejected: () => {
                        setTimeout(() => {
                            try {
                                this.resolvePromise(promise, onRejected(this.reason), resolve, reject)
                            } catch(error) {
                                reject(error)
                            }
                        })
                    }
                })
            }
        })
        return promise;
    }




    /**
        new Promise((resolve, reject) => {
            resolve()
        }).then(() => {
            return new Promise((resolve, reject) => {
                resolve('hi')
            })
        }).then(res => console.log(res));
    
        if(this.state === 'rejected') {
            setTimeout(() => {
                try {
                    this.resolvePromise(promise, onRejected(this.reason), resolve, reject);
                } catch(error) {
                    reject(error);
                }
            })
        }
     */
    resolvePromise(promise, result, resolve, reject) {
        // const p = promise.then(() => {return p}) 一个 promise 的 onResolved 返回了自身 直接抛异常
        if(promise === result) reject(new TypeError('Chaining cycle detected for promise'));
        // 处理返回promise实例
        if (result && typeof result === 'object' || typeof result === 'function') {
            // 为了保证成功和失败只能调用其中一个，声明变量 called 来作为标记。
            let called;
            try {
                let then =result.then;
                // then如果是一个函数，则说明result 是一个 promise 对象
                if (typeof then === 'function') {
                    // 相当于result.then((value)=>{})
                    then.call(result, value => {
                        if (called) return;
                        called = true;
                        // 在成功时 继续调用 resolvePromise 并且把拿到的值作为新的 result 传入
                        this.resolvePromise(promise, value, resolve, reject);
                    }, reason => {
                        if (called) return
                        called = true
                        reject(reason);
                    })
                } 
                // 如果 then 不是一个函数，那就说明 result 是一个函数或者是一个普通对象，那就直接 resolve
                else {
                    if (called) return;
                    called = true;
                    resolve(result);
                }
            } catch(error) {
                if (called) return
                called = true
                reject(error)
            }
        } else {
            resolve(result);
        }
    }
}

// 测试
let promise1 = new MyPromise((resolve, reject) => {
    setTimeout(()=>{
        console.log(`promise1 finish`);
        resolve(10)
    }, 5000)
})
let promise2 = promise1.then((value)=>{
        setTimeout(()=>{
            console.log(`promise2 finish ${value}`);
            // resolve(10)
        }, 1000)
    }
);
// 这个value是有传进来的
let promise3 = promise2.then((value)=>{
        setTimeout(()=>{
            console.log(`promise2 finish ${value}`);
            // resolve(10)
        }, 2000)
    }
);

// console.log(promise2.callbacks);
// console.log(promise2);

// iPromise.then((value) => {
//     console.log(value);
// })
// console.log(iPromise);



