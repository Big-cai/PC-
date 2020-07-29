<template>
  <div>
    <!-- 酒店 入住日期-离店日期 组件 -->
    <el-form class="form_conter" ref="showcities">
      <!-- 切换城市  -->
      <el-form-item>
        <el-autocomplete
          v-model="showcities.SwitchCity"
          :fetch-suggestions="querySearchAsync"
          :trigger-on-focus="false"
          :highlight-first-item="true"
          placeholder="切换城市"
          v-model="formInline.departCity"
          @select="handleDepartSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="showcities.CutDate"
          type="daterange"
          range-separator="-"
          start-placeholder="入住日期"
          end-placeholder="离店日期"
          @change="startDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <div class="hotel-people">
          <el-popover placement="bottom" width="300" trigger="click">
            <el-row type="flex" align="middle">
              <span class="hotel-select-item">每间</span>
              <el-select
                v-model="selectData.valueO"
                placeholder="2成人"
                size="mini"
                class="select-item"
                @change="addlabel('成人')"
              >
                <el-option v-for="item in 7" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <el-select
                v-model="selectData.valueT"
                placeholder="0儿童"
                size="mini"
                class="select-item"
                @change="addlabel('儿童')"
              >
                <el-option v-for="item in 4" :key="item + 10" :label="item" :value="item"></el-option>
              </el-select>
            </el-row>
            <div class="btn-col"></div>
            <el-row type="flex" justify="end">
              <el-button type="primary" size="mini" @click="addContentToInput">确定</el-button>
            </el-row>
            <div slot="reference" ref="personal">
              <el-input
                placeholder="请输入内容"
                suffix-icon="el-icon-user"
                readonly="readonly"
                v-model="formInline.input2"
              ></el-input>
            </div>
          </el-popover>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryPrice">查看价格</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      number: '', //人数
      ExoBinding: {
        adult: '0成人', //成人
        children: '0儿童' // 儿童
      },
      showcities:{
      SwitchCity: '', //切换城市
      CutDate: '', //入住日期

      },
        
       
     
       

      
      form: {

        options: [
          {
            value: '1成人',
            label: ''
          },
          {
            value: '2成人',
            label: ''
          }
        ],
        children: [
          {
            value: '1儿童',
            label: ''
          },
          {
            value: '2儿童',
            label: ''
          }
        ]
      }
    }
  },
  watch:{
      '$route.query':{
        handler: function(){
          if($route.query){
            
          }
        }
      }
  },
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
            code: city.sort
          }
        })
        ShowList(cityName)
      })
    },

    // 切换城市输入触发
    handleSelect(item) {
      this.form.SwitchCity = item.name
      console.log(item)
    },
    // 确定按钮
    handlesubmit() {
      this.number = this.ExoBinding.children
      this.number = this.ExoBinding.adult
    },
    // 日期 
    startDate(value){
      console.log(value)
    },
    // 查询价格
    facet_query() {
      const query = {
        SwitchCity: this.showcities.SwitchCity, //切换城市
        CutDate: this.showcities.CutDate, //入住日期
      }
      this.$store.commit('history/addHistory',query)

    //  this.$axios({
    //    url:'cities',
    //    method:'get',
    //  }).then(res=>{
    //    console.log(res.data);
    //  })
     this.$router.push({
         path:'/hotel',
         query
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