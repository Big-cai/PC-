<template>
  <div>
    <h1>添加攻略</h1>
    <VueEditor v-model="content"/>
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