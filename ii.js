class Test {
    constructor() {
        this.callbacks = [];
        this.value = 0;
    }
}

let tt = new Test();
// console.log(tt.callbacks);
tt.callbacks.push(
    {
        fn() {
            this.value++;
            console.log(this.value);
        }
    }
)
tt.callbacks.push(
    {
        fn() {
            this.value++;
            console.log(this.value);
        }
    }
)
tt.callbacks.push(
    {
        fn() {
            this.value++;
            console.log(this.value);
        }
    }
)

console.log(tt.callbacks);
tt.callbacks.forEach(callback => callback.fn());
console.log(tt.value);
