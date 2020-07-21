<template>
    <div class="main">
        <div class="air-column">
            <h2>乘机人</h2>
            <el-form ref="usersForm" class="member-info" :model="{
                users: users
            }">
              
                <div class="member-info-item" v-for="(user, index) in users" :key="index">

                    <el-form-item 
                        label="乘机人类型" 
                        :prop="`users[${index}].username`"
                        :rules="[
                            {
                                required: true,
                                message: '请输入乘机人姓名',
                                trigger: 'blur'
                            }
                        ]"
                    >
                        <el-input placeholder="姓名" class="input-with-select" v-model="user.username">
                            <el-select 
                            slot="prepend" 
                            value="1" 
                            placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <el-form-item 
                        label="证件类型"
                        :prop="`users[${index}].id`"
                        :rules="[
                            {
                                required: true,
                                message: '请输入身份证号',
                                trigger: 'blur'
                            },
                            {
                                pattern: /^\d{18}$/,
                                message: '身份证不合法',
                                trigger: 'blur'
                            },
                        ]"
                    >
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

        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form ref="contactForm" label-width="68px" :model="{
                        contactName,
                        contactPhone,
                        captcha
                    }"
                    :rules="contactRules">
                    <el-form-item label="姓名" prop="contactName">
                        <el-input v-model="contactName"></el-input>
                    </el-form-item>

                    <el-form-item label="手机" prop="contactPhone">
                        <el-input placeholder="请输入内容" v-model="contactPhone">
                            <template slot="append">
                            <el-button @click="handleSendCaptcha">发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码" prop="captcha">
                        <el-input v-model="captcha"></el-input>
                    </el-form-item>
                </el-form>   
                <!-- 已经登录显示按钮 -->
                <el-button v-if="$store.state.user.userInfo.token" type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
                <!-- 未登录显示表单 -->
                <el-row 
                v-else
                type="flex" 
                justify="center" 
                align="middle" 
                class="main">

                    <div class="form-wrapper">
                        <!-- 表单头部tab -->
                        <el-row type="flex" justify="center" class="tabs">
                            <span :class="{active: currentTab === index}" 
                            v-for="(item, index) in [`登录`, `注册`]"
                            :key="index" 
                            @click="handleChangeTab(index)">
                                {{item}}
                            </span>
                        </el-row>

                        <!-- 登录功能组件 -->
                        <LoginForm v-if="currentTab == 0"/>

                        <!-- 注册功能组件 -->
                        <RegisterForm @tologin="currentTab = 0" v-if="currentTab == 1"/>
                    </div>
                </el-row>
            </div>
        </div>
        <div style="display:none">{{totalPrice}}</div>
    </div>
</template>

<script>
import LoginForm from '@/components/user/LoginForm'
import RegisterForm from '@/components/user/RegisterForm'

export default {
    components: {
      LoginForm,
      RegisterForm
    },
    props: {
        data: Object
    },
    data() {
        return {
            currentTab: 0,
            users: [
                // 原始数据只有一个乘机人
                {
                    username: '',
                    id: ''
                }
            ],
            // 保险选项数据
            insuranceList: [],
            contactName: '',
            contactPhone:'',
            captcha: '',
            contactRules: {
                contactName: [
                    {
                        required: true,
                        message: '请输入联系人',
                        trigger: 'blur'
                    }
                ],
                contactPhone: [
                    {
                        required: true,
                        message: '请输入联系人手机',
                        trigger: 'blur'
                    }
                ],
                captcha: [
                    {
                        required: true,
                        message: '请输入验证码',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    computed: {
        totalPrice() {
            console.log('运行了计算属性');
            let res = 0;

            res += this.data.seat_infos.org_settle_price * this.users.length

            this.data.insurances.forEach(element => {
                if (this.insuranceList.indexOf(element.id) >= 0) {
                    res += element.price * this.users.length
                }
            });
            
            this.$emit('setTotalPrice', res)
            return res
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
            if (!this.contactPhone) {
                this.$message.error('请先输入手机号')
                return
            }
            this.$axios({
                method: 'post',
                url: '/captchas',
                data: {
                    tel: this.contactPhone
                }
            }).then(res=>{
                console.log(res);
                if (res.data.code == '000000') {
                    this.$message.success('验证码已经发送')
                }
            })
        },

        // 提交订单
        async handleSubmit(){
            // this.$refs.usersForm.validate().then(isValid=>{
            //     // promise 形式
            // })
            let isValidUsersForm = await this.$refs.usersForm.validate().catch(e=>{});
            let isValidContactForm = await this.$refs.contactForm.validate().catch(e=>{});

            if ( isValidUsersForm && isValidContactForm ) {
                // 1. 拼接订单数据
                let data = {
                    users: this.users,
                    insurances: this.insuranceList,
                    contactName: this.contactName,
                    contactPhone: this.contactPhone,
                    invoice: false,
                    seat_xid: this.$route.query.seat_xid,
                    air: this.$route.query.id,
                    captcha: this.captcha
                }

                console.log(data);

                // 2. 提交订单
                this.$axios({
                    method: 'post',
                    url: '/airorders',
                    data,
                    headers: {
                        Authorization: 'Bearer ' + this.$store.state.user.userInfo.token
                    }
                }).then(res=>{
                    console.log(res.data);
                })
            }
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


    .main{
        height: 100%;
        margin:0 auto;
        position: relative;
        
        .form-wrapper{
            width:400px;
            margin:0 auto;
            background:#fff;
            box-shadow: 2px 2px 0 rgba(0,0,0,0.1);
            overflow:hidden;
            
            .tabs{
                span{
                    display: block;
                    width:50%;
                    height: 50px;
                    box-sizing: border-box;
                    border-top:2px #eee solid;
                    background:#eee;
                    line-height: 48px;
                    text-align: center;
                    cursor: pointer;
                    color:#666;

                    &.active{
                        color:orange;
                        border-top-color: orange;
                        background:#fff;
                        font-weight: bold;
                    }
                }
            }
        }
    }
</style>