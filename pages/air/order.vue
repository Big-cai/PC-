<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <OrderForm v-if="ticketData" :data="ticketData"/>

            <!-- 侧边栏 -->
            <OrderAside v-if="ticketData" :data="ticketData" />
        </el-row>
    </div>
</template>

<script>
import OrderForm from '@/components/air/OrderForm'
import OrderAside from '@/components/air/orderAside'
export default {
    components: {
        OrderForm,
        OrderAside
    },
    data() {
        return {
            ticketData: null
        }
    },
    created() {
        this.$axios({
            url: '/airs/' + this.$route.query.id,
            params: {
                seat_xid: this.$route.query.seat_xid
            }
        }).then(res=>{
            console.log(res.data);
            this.ticketData = res.data
        })
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>