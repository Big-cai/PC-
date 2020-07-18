<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                广州 - 上海 
                / 
                2019-06-17
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="runFilters">
                    <el-option
                    v-for="(item, index) in options.airport"
                    :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="runFilters">
                    <!-- 对于起飞时间的 value 值其实并非固定,
                    最终要飞机起飞时间大于 from 小于 to 才能放行
                    最终是由我们自己进行比较和筛选
                    这里的 value 可以我们自己定义格式
                    只要后面的筛选按照这个格式去用就可以了
                    如 6,12 -->
                    <el-option
                    v-for="(item,index) in options.flightTimes"
                    :key="index"
                    :label="`${item.from}:00 - ${item.to}:00`"
                    :value="`${item.from},${item.to}`"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="runFilters">
                    <el-option
                    v-for="(item, index) in options.company"
                    :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="runFilters">
                    <el-option
                    v-for="(item, index) in planeSize"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        options: Object,
        flights: Array
    },
    data(){
        return {
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: "",        // 机型大小
            planeSize: [
                {
                    label: '大',
                    value: 'L'
                },
                {
                    label: '中',
                    value: 'M'
                },
                {
                    label: '小',
                    value: 'S'
                }
            ]
        }
    },
    methods: {
        runFilters() {
            // 复制原来100条数据
            let newList = [...this.flights]

            if (this.airport) {
                newList = newList.filter(el=>{
                    return el.org_airport_name == this.airport
                })
            }

            if (this.flightTimes) {
                newList = newList.filter(el=>{
                    const planeTime = Number(el.dep_time.split(':')[0])
                    const from = Number(this.flightTimes.split(',')[0])
                    const to = Number(this.flightTimes.split(',')[1])
                    return planeTime > from && planeTime < to;
                })
            }
            
            if (this.company) {
                newList = newList.filter(el=>{
                    return el.airline_name == this.company
                })
            }

            if (this.airSize) {
                newList = newList.filter(el=>{
                    return el.plane_size == this.airSize
                })
            }
            

            this.$emit('setFlightsList', newList)
        },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
            this.airport = ""        // 机场
            this.flightTimes = ""    // 出发时间
            this.company = ""       // 航空公司
            this.airSize = ""
            this.runFilters();  
        },
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>