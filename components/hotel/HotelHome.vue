<template>
  <div>
    <div class="container">
      <!-- 面包屑部分 -->
      <Breadcrumb />

      <!-- 筛选部分 -->
      <Screening />
      <!-- 地图部分 -->
      <HotelMap />

      <!-- 撤销条件部分 -->
      <Cancellation />

      <!-- 酒店列表部分、 -->
      <HodelList :data="item" v-for="(item,index) in HodelList" :key="index"/>

       <div class="tip" v-if="flightsData && HodelList.length == 0">暂无数据</div>

      <!-- 分页部分 -->
      <div class="paging">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :page-sizes="[3, 5,7,9]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="20">
        </el-pagination>

      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/hotel/Breadcrumb'
import Screening from '@/components/hotel/Screening'
import HotelMap from '@/components/hotel/Hotel_Option'
import Cancellation from '@/components/hotel/Cancellation'
import HodelList from '@/components/hotel/HotelList'
export default {
  components: {
    Breadcrumb,
    Screening,
    HotelMap,
    Cancellation,
    HodelList
  },
  data(){
    return{
      flightsData:{},
      HodelList:[],  //列表数据

      pageIndex: 1,
      pageSize: 3
    }
  },
  created(){
      this.$axios({
        url: '/hotels',
        method: 'get'
      }).then(res => {
        this.flightsData = res.data
        // console.log(res.data)
         this.HodelList = res.data.data
      })
  },
  
  methods: {
    setDateList(){
      const start =(this.pageIndex - 1) * this.pageSize

      const end =start + this.pageSize

      this.HodelList = this.flightsData.data.slice(start,end)
    },
    // 当前页
    currentChange(newIndex) {
      // console.log(newIndex)
      this.pageIndex = newIndex
      this.setDateList()
    },
    // 每页条数
    sizeChange(newIndex) {     
      // console.log(newIndex)
      this.pageSize = newIndex
      this.pageIndex = 1
      this.setDateList()
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
}
.paging {
  text-align: right;
  padding: 20px 0 40px;
}

.tip{
  text-align: center;
  font-family:'Microsoft KaiTi';
  font-size: 20px;
}
</style>