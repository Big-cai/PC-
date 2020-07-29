// 攻略递归评论vuex
export const state = () => ({
    // 采用接口返回的数据结构
    list: []
})

export const mutations = {
    setList(state, data) {
        state.list = data
    }
};
