/**
 * Set 和 Map
 */
// NaN在Set里边是严格相等的
console.log(NaN === NaN);// false
let set = new Set();
set.add(NaN);
set.add(NaN);
set.add("NaN");
console.log(set);// { NaN, 'NaN' }

// set遍历
console.log(set.keys());// [Set Iterator]
console.log(set.values());// [Set Iterator]
console.log(set.entries());// [Set Iterator]

for (const key of set.keys()) {
    console.log(key); //  NaN   'NaN'
}
for (const value of set.values()) {
    console.log(value); // NaN   'NaN'
}
for (const item of set.entries()) {
    console.log(item); // [ NaN, NaN ]   [ 'NaN', 'NaN' ]
}


// 单数组去重
let arr = [1,1,1,1,2,3,4];
let set1 = new Set(arr); // 数组转set
console.log(set1);// { 1, 2, 3, 4 }

// 多个数组去重
let arr1 =  [1,1,1,1,2,3,4];
let arr2 =  [5,6,9,10,5,5,5,5];
let arr3 =  [11,1,3,4];
let combineArr = [...arr1,...arr2,...arr3];
let set2 = new Set(combineArr);
console.log(set2);  // { 1, 2, 3, 4, 5, 6, 9, 10, 11 }

// set 转 数组
// 方式1：扩展运算符
let setArr = [...set1];
console.log(`setArr   ${setArr}`);// [ 1, 2, 3, 4 ]
// 方式2:Array.from()
let setArr1 = Array.from(set1);
console.log(`setArr1  ${setArr1}`);// [ 1, 2, 3, 4 ]



// Map与其它数据类型间的转换


