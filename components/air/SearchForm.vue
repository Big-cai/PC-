<template>
  <div>
      <el-autocomplete
        v-model="value"
        :fetch-suggestions="loadList"
      ></el-autocomplete>
  </div>
</template>

<script>
export default {
    data() {
        return {
            value: ''
        }
    },
    methods: {
        loadList(inputValue, showList) {
            // 这个函数是自动补全的回调函数
            // 用来提供补全的建议数据数组
            // 有两个参数
            // 1. val 是当前输入值
            // 2. 回调函数, 用来将准备好的数组返回出去

            // 准备的数据格式是固定的, 是一个数组
            // 数组里面每一个对象都是一条建议
            const dataSuggestion = [
                {
                    // 建议对象里面最重要的一个属性是 value
                    // 这个值最终会被显示在列表中
                    value: '小笼包'
                },
                {
                    value: '虾饺'
                }
            ]
            showList(dataSuggestion)
        }
    }
}
</script>

<style>

</style>