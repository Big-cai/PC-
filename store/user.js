// 用户管理
export const state = () => ({
    // 采用接口返回的数据结构
    userInfo: {
        token: "",
        user: {},
    },
})

export const mutations = {
    setUserInfo(state, data) {
        state.userInfo = data
    }
};

export const actions = {
    login(store, data) {
        // 这个函数可以接收到两个参数
        // 1. 当前仓库 store 的本身
        // 2. 外部调用时额外的数据
        // 对于登录来说就是表单数据对象
        this.$axios({
            url: "/accounts/login",
            method: "POST",
            data
        }).then(res => {
            console.log(res.data);
            if (res.data.token) {
                // action 是 vuex 执行异步操作的地方
                // 但是修改 state 数据依然只能通过 mutations
                // this.$store.commit('user/setUserInfo', res.data)
                store.commit('setUserInfo', res.data)
            }
        })
    }
};