<template>
  <div>
    <!-- 酒店 入住日期-离店日期 组件 -->
    <el-form class="form_conter">
      <!-- 切换城市  -->
      <el-form-item>
        <el-autocomplete
          v-model="form.SwitchCity"
          :fetch-suggestions="querySearchAsync"
          :trigger-on-focus="false"
          placeholder="切换内容"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <!-- 入住日期-离店日期 -->
      <el-form-item>
        <el-date-picker
          v-model="form.CutDate"
          type="daterange"
          range-separator="-"
          start-placeholder="入住日期"
          end-placeholder="离店日期"
        ></el-date-picker>
      </el-form-item>

      <!-- 人数 -->
      <el-form-item>
        <el-input placeholder="人数未定" suffix-icon="el-input__icon iconfont iconuser" trigger="click"></el-input>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary">查看价格</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        SwitchCity: '', //切换城市
        CutDate: '' //入住日期
      },
      data: [
        {
          id: '', //酒店id(酒店详情)
          price_in: '', //城市id
          scenic: '', //酒店价格
          name_contains: '',
          hotellevel: '',
          hoteltype: '',
          hotelbrand: '',
          hotelasset: '',
          enterTime: '',
          person: '',
          _sort: '',
          _limit: '',
          _start: ''
        }
      ]
    }
  },
  created() {},
  methods: {
    // 切换城市输入框，获得焦点触发
    querySearchAsync(value, ShowList) {
       this.$axios({
        url: '/hotels',
        method: 'get',
        name:value
      }).then(res => {
        console.log(res.data)
    
      })
      ShowList([
        {value:'广州'},
        {value:'上海'},
        {value:'北京'},
      ])
    },

    // 切换城市输入触发
    handleSelect() {}
  }
}
</script>
<style lang="less" scoped>
.form_conter {
  display: flex;
  justify-content: space-between;
}
</style>