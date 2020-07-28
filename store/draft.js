//草稿箱vux数据
export const state = () => ({
    list: []
})

export const mutations = {
    //增加草稿数据
    addDraft(state, data) {
        state.list.unshift(data);
    },
    //删除草稿数据
    delDraft(state, index) {
        state.list.splice(index, 1);
    }

}