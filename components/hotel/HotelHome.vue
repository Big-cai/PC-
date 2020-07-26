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
      <HodelList />

      <!-- 分页部分 -->
      <div class="paging">
        <el-pagination
          small
          background
          prev-text="上一页"
          next-text="下一页"
          @current-change="currentChange"
          @size-change="sizeChange"
          layout="prev, pager, next"
          :total="50"
        ></el-pagination>
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
      HodelData:{},
      HodelList:[],  //列表数据

      pageIndex: 1,
      pageSize: 10
    }
  },
  created(){
      this.$axios({
        url: '/hotels',
        method: 'get'
      }).then(res => {
        // console.log(res.data)
         this.HodelData = res.data

        this.HodelList =res.data.data
        
      })
  },
  methods: {
    setDateList(){
      //初始值 = 当前页数 减 1 再 * 当前页 显示条数
      const start = (this.pageIndex - 1) * this.pageSize
      // 结束值 等于 初始值 + 当前每页 显示条数
      const end = start + this.pageSize
      // 初始化 酒店列表数据 截取 需要每页要显示的条数
      // this.HodelList = this.HodelData.slice(start,end)
    },
    // 当前页
    currentChange(newIndex) {
      console.log(newIndex)
      this.pageIndex = newIndex
      this.setDateList()
    },
    // 每页条数
    sizeChange(newIndex) {     
      console.log(newIndex)
      this.pageSize = newIndex
      this.pageSize = 1
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
</style>