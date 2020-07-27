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
          :highlight-first-item="true"
          placeholder="切换城市"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <!-- 入住日期-离店日期 -->
      <el-form-item>
        <el-date-picker
          v-model="form.enterTime"
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
          v-model="number"
        ></el-input>
        <el-popover
          class="tooltip"
          ref="popover"
          placement="bottom-start"
          width="350"
          trigger="focus"
        >
          <el-row class="PeopleNumber">
            <el-col :span="6">每间</el-col>
            <el-col :span="6">
              <el-select size="mini" placeholder="请选择" v-model="value">
                <el-option
                  v-for="item in form.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-select size="mini" placeholder="请选择" v-model="value2">
                <el-option
                  v-for="item in form.children"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row class="SelectNumber">
            <el-button type="primary" size="mini" @click="handelSubmit">确定</el-button>
          </el-row>
        </el-popover>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitQuery">查看价格</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: '', //人数
      value: '0成人',
      value2: '0儿童',

      form: {
        SwitchCity: '', //切换城市
        enterTime: '', //入住日期

        options: [
          {
            value: '选项1',
            label: '1成人'
          },
          {
            value: '选项2',
            label: '2成人'
          },
          {
            value: '选项3',
            label: '3成人'
          }
        ],

        children: [
          {
            value: '1',
            label: '1'
          },
          {
            value: '2',
            label: '2'
          }
        ]
      }
    }
  },
  created() {},
  methods: {
    // 切换城市输入框，获得焦点触发value,ShowList
    querySearchAsync(value, ShowList) {
      this.$axios({
        url: '/cities',
        method: 'get',
        params: { name: value }
      }).then(res => {
        console.log(res.data)
        const cityName = res.data.data.map(city => {
          return {
            value: city.name,
            code:city.code
          }
        })
        ShowList(cityName)
      })
    },

    // 切换城市输入触发
    handleSelect(item) {
      console.log(item)

      this.form.SwitchCity = item.name
      
    },

    handelSubmit() {},
    // 查询价格
    submitQuery() {
      const query = {
        SwitchCity: this.form.SwitchCity,
        enterTime: this.form.enterTime
      }
      this.$axios({
        url: '/hotels',
        method: 'get',
        query:this.form
      }).then(res => {
        console.log(res.data)
        this.$message.success('查询成功')
        this.$router.go(0)
      })
    }
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

.PeopleNumber {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-popover {
  overflow: auto !important;
}

.SelectNumber {
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid #ddd;
  text-align: right;
}
</style>