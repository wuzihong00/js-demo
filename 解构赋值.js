/**
 * 数组的解构赋值
 */
let fn = function () {
    // 经过一番处理
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
let [num1, num2, [num3]] = [12, [34, 56], [78, 89]];
console.log(num3);// 78
