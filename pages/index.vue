<template>
    <div class="container">
        <!-- 幻灯片 -->
        <el-carousel :interval="5000" arrow="always">

            <el-carousel-item v-for="(item, index) in banners" :key="index">
                
                
                <div
                    class="banner-image"
                    :style="`
                background:url(${item.url}) center center no-repeat;
                background-size:contain contain;
                `"
                ></div>


            </el-carousel-item>


        </el-carousel>
    </div>
</template>

<script>
export default {
  data() {
    return {
      banners: []
    }
  },
  created() {
    // 创建页面时, 需要获取数据
    this.$axios({
      url: '/scenics/banners'
    }).then(res=>{
      console.log(res.data);
      this.banners = res.data.data.map(img=>{
        return {
          ...img,
          url: this.$axios.defaults.baseURL + img.url
        }
      })
      
    })
  }
};
</script>

<style scoped lang="less">
.container{
    min-width:1000px;
    margin:0 auto;
    position:relative;

    /deep/ .el-carousel__container{
        height:700px;
    }

    .banner-image{
        width:100%;
        height:100%;
    }
}
</style>