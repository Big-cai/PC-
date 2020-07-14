<template>
  <div>
      <el-date-picker
        v-model="valueDate"
        type="date"
        placeholder="选择日期">
    </el-date-picker>
    {{valueDate}}
  </div>
</template>

<script>
export default {
    data() {
        return {
            valueDate: ''
        }
    }
}
</script>

<style>

</style>