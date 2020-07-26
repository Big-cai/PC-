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
          placeholder="切换城市"
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
        <el-input
          role="tooltip"
          placeholder="人数未定"
          readonly="readonly"
          autocomplete="off"
          suffix-icon="el-input__icon iconfont iconuser"
          v-popover:popover
        ></el-input>
        <el-popover
          class="tooltip"
          ref="popover"
          placement="bottom-start"
          width="350"
          trigger="focus"
        >

          <el-row class="PeopleNumber ">
            <el-col :span="6">每间</el-col>
            <el-col :span="6">
                 <el-select size="mini" 
                  :value="options.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
               <el-select size="mini" 
                  :value="options.value">
                    </el-option>
                </el-select>
            </el-col>
          </el-row>

          <el-row class="SelectNumber">
            <el-button type="primary" size="mini">主要按钮</el-button>
          </el-row>
        </el-popover>
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
      options: [{
          value: '1',
         
        }, {
          value: '2',
   
        }, 
      ],
      form: {
        SwitchCity: '', //切换城市
        CutDate: '' //入住日期
      },
     
    }
  },
  
  methods: {
    // 切换城市输入框，获得焦点触发value,ShowList
    querySearchAsync(value,ShowList) {
   this.$axios({
        url: '/airs/sale',
        method: 'get',
      }).then(res => {
        console.log(res.data)
      const cityName = res.data.data.map(city=>{
          return{
            value:city.departCity
          }
        })
        ShowList(cityName)
      })
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

.tooltip {
  
}

.PeopleNumber{
  
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-popover{
  overflow: auto !important;
}

.SelectNumber{
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid #ddd;
  text-align: right;
}
</style>