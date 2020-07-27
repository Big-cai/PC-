/* 面包屑文件 */

export const state = () => ({
    breadList: []
})

export const mutations = {
    //增加面包屑数据
    setBread(state, breadData) {
        state.breadList = breadData
    },

    //删除草稿数据


}