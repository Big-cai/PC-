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

        <!-- 搜索框 -->
        <div class="banner-content">
            <div class="search-bar">
                
                <!-- tab栏 -->
                <el-row 
                type="flex" 
                class="search-tab">
                    <span 

                    v-for="(item, index) in options" 

                    :key="index" 
                    @click="handleOption(index)">
                    >
                        <i>{{item.name}}</i>
                    </span>
                </el-row>
                
                <!-- 输入框 -->
                <el-row 
                type="flex" 
                align="middle" 
                class="search-input">
                    <input 
                    :placeholder="options[currentOption].placeholder" />
                    <i class="el-icon-search" ></i>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      banners: [],
    //   记录当前的激活选项索引
      currentOption: 0,
      options: [
          {
              name: '攻略',
              placeholder: '请输入城市搜索攻略'
          },
          {
              name: '酒店',
              placeholder: '请输入城市搜索酒店'
          },
          {
              name: '机票',
              placeholder: '请输入城市搜索机票'
          }
      ]
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
  },
  methods:{
    handleOption(index) {
        console.log('修改当前激活标签');
        this.currentOption = index;
    }
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