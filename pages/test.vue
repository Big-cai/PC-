<template>
  <div>
      {{showMsg()}}
      {{showMsg()}}
      {{showMsg()}}
      {{showMsg()}}
      {{showMsg()}}
      {{showMsg()}}
      {{showMsg()}}
      {{showMsg()}}
      {{msg}}
      {{msg}}
      {{msg}}
      {{msg}}
      {{msg}}
      {{msg}}
      {{msg}}
      {{msg}}
      {{msg}}
  </div>
</template>

<script>
export default {
    computed: {
        msg() {
            console.log('计算属性被执行');
            return 'hello vue'
        }
    },
    methods: {
        showMsg() {
            console.log('函数被执行');
            return 'hello vue'
        }
    }
}
</script>

<style>

</style>