<template>
  <div>
      <!-- 没有数据的情况下, 显示一个 undefined 大不了就是空白 -->
      {{ticketData.id}}
      <!-- 如果从一个 undefined 属性中继续取属性, 就会报错 -->
      {{ticketData.seat_infos.org_settle_price}}

      <!-- <div v-if="showNull"> -->
          <!-- 这两种写法到底哪一种会显示 -->
      <div v-if="showObj">
          这里是条件渲染的子组件
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            ticketData: {},
            showNull: null,
            showObj: {}
        }
    }
}
</script>

<style>

</style>