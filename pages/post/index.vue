<template>
  <div>
    <h1>添加攻略</h1>
    <!-- 由于这个组件只有客户端才会引入
    所以也只能在客户端使用
    可以利用 nuxt 提供的标签 client-only
    声明一部分代码只在客户端处理 -->
    <client-only>
      <VueEditor v-model="content"/>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: ''
    }
  }
}
</script>

<style>

</style>