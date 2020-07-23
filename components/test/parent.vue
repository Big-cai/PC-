<template>
  <div>
      <Parent :parentData="parentData.parent" v-if="parentData.parent"/>
      {{parentData.content}}
  </div>
</template>

<script>
export default {
    name: 'Parent',
    props: ['parentData']
}
</script>

<style>

</style>
