<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    <FlightsFilters
                    v-if="flightsData.options"
                    :options="flightsData.options"/>
                </div>
                
                <!-- 航班头部布局 -->
                <div>
                    <FlightsListHead/>
                    
                </div>
                
                
                <!-- 航班信息 -->
                <div>
                    <FlightsItem :data="item" v-for="item in dataList" :key="item.id"/>
                    <div v-if="flightsData.flights && flightsData.flights.length == 0">暂无数据</div>
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
import FlightsFilters from '@/components/air/FlightsFilters'

export default {
    data() {
        return {
            flightsData: {},
            // 机票分页数据
            // dataList: [],
            pageIndex: 1,
            pageSize: 10
        }
    },
    computed: {
        dataList() {
            if (!this.flightsData.flights) {
                return []
            }
            const beginIndex = (this.pageIndex - 1) * this.pageSize
            const endIndex = beginIndex + this.pageSize
            return this.flightsData.flights.slice(beginIndex, endIndex)
        }
    },
    components: {
        FlightsListHead,
        FlightsItem,
        FlightsFilters
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
    },
    methods: {
        currentChange(newIndex) {
            this.pageIndex = newIndex
        },
        sizeChange(newSize) {
            this.pageSize = newSize
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