let fn = function () {
    let positions = [{ col: 1, row: 1 }, { col: 1, row: 2 }];
    let count = 2;
    let valid = false;
    let result = [positions, count, valid];
    return result;
}
let result = fn();
let [positions, count, valid] = result; // 对比 [0] [1] [2]这样的赋值
console.log(positions);
console.log(count);
console.log(valid);

// 可以嵌套数组
let [, num2, [num3], num4] = [12, [34, 56], [78, 89]];
console.log(num2);// [ 34, 56 ]
console.log(num3);// 78
console.log(num4);// undefined

let [,arg1, arg2 = 1, arg3] = [10,110,null];
console.log(arg1);
console.log(arg2); // 只有严格等于(===)才会被赋予undefined
console.log(arg3);

// 交换变量
let a = 1;
let b = 2;
[b,a] = [a,b];
console.log(`a ${a}  b  ${b}`);

// 当函数的参数为数组类型时，可以将实参和形参进行解构
function foo([arg1, arg2]) {
    console.log(`arg1 ${arg1}  arg2  ${arg2}`);
}
foo([777,888])


// 对象解构
let {m, n, o, k=999} = {m: 'kx', n: 10}
console.log(m);
console.log(o);
console.log(k);
// 当解构对象的属性名和定义的变量名不同时，必须严格按照key: value的形式补充左侧对象。
// 当key和value值相同时，对于value的省略实际上是一种简写方案。
let {n: name, a: age} = {n: 'kk', a: 17};
console.log(name);
console.log(age);


// 选择性解构对象的属性
let {min, max} = Math;
console.log(min(1,3));
console.log(max(1,3));


function f(arg = 1) {
    console.log(`arg ${arg}`);
}
// 等价于旧版本
function f1(arg) {
    arg = arg || 1;
    console.log(`arg ${arg}`);
}
