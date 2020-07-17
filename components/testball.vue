<template>
  <div class="ball" :style="`background: ${options.bg};`">
      {{options.num}}
  </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Object,
            default() {
                return {
                    bg: 'blue',
                    num: (Math.random()*35+1).toFixed(0)
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.ball {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    line-height: 60px;
    text-align: center;
    color: white;
}
</style>