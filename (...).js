const arr = [1,2,3];
console.log(...arr); // 1 2 3
const str = "string";
console.log(...str); // s t r i n g

const arr1 = [1,2,3];
const arr2 = [100,200,300];
const arr3 = [...arr1, ...arr2];
console.log(arr3); // 代替concat
console.log([...new Set([1, 2, 4, 6, 2, 7, 4])]); // [ 1, 2, 4, 6, 7 ]

// 扩展运算符是浅克隆
// 原因：引用数据类型的克隆只是复制了引用的地址，克隆后的对象仍然共享同一个引用地址
let obj = {
    name: 'kingx',
    address:{
        province: 'guangdong',
        city: 'guangzhou'
    }
};
var obj2 = {...obj};
obj2.name = 'kingx2';
obj2.address.city = "GUANGZHOU"
console.log(obj);  // 原始数据类型不受影响 { name: 'kingx' }
console.log(obj.address.city);  // GUANGZHOU


// rest运算符：用于将以逗号分隔的值序列转换成数组
// rest运算符和解构组合
// rest运算符对应的变量应该放在最后一位
let [a, ...b] = [99, 1, 2, 3, 4]; 
console.log(a);
console.log(b);

let {x, y, ...z} = {x: 1, y: 2, a: 3, b: 4};
console.log(z); // {a: 3, b: 4}

// 相当于使用arguments
function fn(...args) {
}
