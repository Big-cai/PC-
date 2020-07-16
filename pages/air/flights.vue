<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    过滤条件
                    
                </div>
                
                <!-- 航班头部布局 -->
                <div>
                    <FlightsListHead/>
                    
                </div>
                
                
                <!-- 航班信息 -->
                <div>
                    <FlightsItem :data="item" v-for="item in flightsData.flights" :key="item.id"/>
                </div>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                侧边栏
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>
import FlightsListHead from '@/components/air/FlightsListHead'
import FlightsItem from '@/components/air/FlightsItem'
export default {
    data() {
        return {
            flightsData: {}
        }
    },
    components: {
        FlightsListHead,
        FlightsItem
    },
    created() {
        // 现在所有的参数都在 URL 直接发送请求
        this.$axios({
            url: '/airs',
            params: this.$route.query
        }).then(res=>{
            console.log(res.data);
            this.flightsData = res.data
        })
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>