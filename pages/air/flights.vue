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
                    <FlightsItem :data="item" v-for="item in dataList" :key="item.id"/>
                    <el-pagination
                        v-if="flightsData.flights"
                        @current-change="currentChange"
                        @size-change="sizeChange"
                        :page-size="pageSize"
                        :page-sizes="[2,5,10,20,50]"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="flightsData.flights.length">
                    </el-pagination>
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
            flightsData: {},
            // 机票分页数据
            dataList: [],
            pageIndex: 1,
            pageSize: 10
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

            const beginIndex = (this.pageIndex - 1) * this.pageSize
            const endIndex = beginIndex + this.pageSize
            this.dataList =  this.flightsData.flights.slice(beginIndex, endIndex)
        })
    },
    methods: {
        currentChange(newIndex) {
            this.pageIndex = newIndex
            const beginIndex = (this.pageIndex - 1) * this.pageSize
            const endIndex = beginIndex + this.pageSize
            this.dataList =  this.flightsData.flights.slice(beginIndex, endIndex)
        },
        sizeChange(newSize) {
            this.pageSize = newSize
            const beginIndex = (this.pageIndex - 1) * this.pageSize
            const endIndex = beginIndex + this.pageSize
            this.dataList =  this.flightsData.flights.slice(beginIndex, endIndex)
        }
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