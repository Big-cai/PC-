<template>
    <div>
        <input :type="type">
    </div>
</template>

<script>
export default {
    // props 的其他格式
    // 父子组件可能不是同一个人写的, 
    // 如果子组件想要规定某个属性的类型
    // 就不能这样声明了
    // 第一种最简单写法
    // props: ['msg']
    // 第二种可以设置数据类型限制的写法
    // props 是一个对象
    // 里面的 key:value
    // 就是字段名和 数据类型的配对
    // props: {
    //     msg: String
    // }
    // 还有第三种写法, 可以给一个属性添加默认值
    // 允许父组件不传值
    // 如果我希望即使父组件不传值, 默认就是密码框,
    // 只有当父组件强硬说要 text 我才给一个默认 text 输入框
    // 如果你想设置默认值, 就不能直接给value 一个数据类型, 而应该改成对象
    // props: {
    //     type: String
    // }
    props: {
        type: {
            type: String,
            default: 'password'
        }
    }
}
</script>

<style scoped lang="less">
    .flight-title{
        padding:0 15px;
        border:1px #ddd solid;
        background:#f6f6f6;
        height:38px;
        line-height: 38px;
        color:#666;
        font-size:12px;
        margin-bottom: 10px;

        > div{
            text-align: center
        }
    }
</style>