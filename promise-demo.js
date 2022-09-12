const fs = require('fs')
// 异步读取两个文件，并拼接起来，输出到一个共同的文件当中
// 等价于all写法
// let filePath = './output2.txt';
let filePath = './output.txt';


function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err)
                reject(err)
            }
            resolve(data);
        })
    });
};

function writeFile(filePath, msg) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, msg, err => {
            if (err) {
                console.error(err)
                reject(err)
            }
            resolve();
        })
    });
};

// 如果onFulfilled方法没有返回值，
// .then方法的默认返回值  
// then方法会
let msg1 = undefined;
let msg2 = undefined;
let defaultReturn = readFile(filePath)
                        .then(value=>{
                            let message = value;
                            console.log(`article ${message}`);
                            return writeFile('./input.txt', message);
                        },reason=>{
                            // console.log(`reason ${reason}`); // reason Error: ENOENT: no such file or directory, open './output2.txt'
                        });

// setTimeout(()=>{console.log(defaultReturn)}, 1000); // 并返回一个新的promise对象




function test() {
    return new Promise((resolve, reject) => {
        // resolve(1);
        throw new Error('err');
    })
}
let t = test()
console.log(t); // Promise { <pending> }


// .then((value)=> {
//     return new Promise((resolve, reject) => {
//         // reject('1');
//     });
// })