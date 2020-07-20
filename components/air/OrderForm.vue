<template>
    <div class="main">
        <div class="air-column">
            <h2>乘机人</h2>
            <el-form class="member-info">
                <div class="member-info-item" v-for="(user, index) in users" :key="index">

                    <el-form-item label="乘机人类型">
                        <el-input placeholder="姓名" class="input-with-select" v-model="user.username">
                            <el-select 
                            slot="prepend" 
                            value="1" 
                            placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="证件类型">
                        <el-input 
                        placeholder="证件号码"  class="input-with-select" v-model="user.id">
                            <el-select 
                            slot="prepend" 
                            value="1"           
                            placeholder="请选择">
                                <el-option label="身份证" value="1" :checked="true"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <span class="delete-user" @click="handleDeleteUser(index)">-</span>
                </div>
            </el-form>

            <el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
        </div>

        <div class="air-column">
            <h2>保险</h2>
            <div>
                <!-- <div 
                class="insurance-item"
                v-for="(item, index) in data.insurances"
                :key="index">
                    <el-checkbox 
                    :label="`${item.type}：￥${item.price}/份×${users.length}  最高赔付${item.compensation}`" 
                    border>
                    </el-checkbox> 
                    
                </div> -->
                <!-- 由于保险数据, 最终发送订单时 需要的是
                已选中的保险 id 组成的数组
                就要用这个多选框组组件 -->

                <el-checkbox-group v-model="insuranceList">
                    <div 
                    class="insurance-item"
                    v-for="(item, index) in data.insurances"
                    :key="index">
                        <!-- 对于 checkbox 来说, label 是最终存放在数组中供接口使用的数据
                        如果我们希望显示不一样的内容给用户, 就放在开闭标签之间 -->
                        <el-checkbox 
                        :label="item.id" 
                        border>
                        {{`${item.type}：￥${item.price}/份×${users.length}  最高赔付${item.compensation}`}}
                        </el-checkbox> 
                    </div>
                </el-checkbox-group>
            </div>
        </div>

       <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
    </div>
</template>

<script>
export default {
    props: {
        data: Object
    },
    data() {
        return {
            users: [
                // 原始数据只有一个乘机人
                {
                    username: '',
                    id: ''
                }
            ],
            // 保险选项数据
            insuranceList: []
        }
    },
    methods: {
        // 添加乘机人
        handleAddUsers(){
            this.users.push({
                username: '',
                id: ''
            })
        },
        
        // 移除乘机人
        handleDeleteUser(index){
            this.users.splice(index, 1)
        },
        
        // 发送手机验证码
        handleSendCaptcha(){
            
        },

        // 提交订单
        handleSubmit(){
            console.log(this.insuranceList);
        }
    }
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;   
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>