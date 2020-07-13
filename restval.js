var student = {
    name: 'tom',
    age: 12,
    address: '珠吉路58号'
}

var student2 = {...student}

// 剩余参数/属性 写法跟展开运算符一模一样
// 但是实际作用刚好相反
const {name, ...shengyu} = student

console.log(shengyu);