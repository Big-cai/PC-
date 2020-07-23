<template>
  <div class="main-comment">
      <Parent :parentData="commentData.parent" v-if="commentData.parent"/>
      {{commentData.content}}
  </div>
</template>

<script>
import Parent from './parent'

export default {
    components: {
        Parent
    },
    props: ['commentData']
}
</script>

<style lang="less" scoped>
.main-comment {
    padding: 10px;
    margin: 10px;
    border: 1px solid pink;
}
</style>