// 状态 state 应该是一个对象,
// 就像 data 一样
// 仓库里面储存了各种状态 叫做 state
// 这些仓库里面的状态数据, 在任意一个组件内部都可以被调用
export const state = () => ({
    username: '地球发动机'
})

// 如果需要修改状态数据, 必须先定义 修改方法, 声明 mutations
export const mutations = {
    // 这里每一个属性都是一个函数
    setUsername(state, data) {
        // mutations 里面可以接受两个参数
        // 第一个是 state 当前仓库的数据本身
        // 第二个是调用时传进来的参数
        // 如果我这里希望外面调用时传进来的数据
        // 修改当前状态的 username 
        state.username = data
    }
}