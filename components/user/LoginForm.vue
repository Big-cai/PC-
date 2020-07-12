<template>
    <!-- 数据校验第一步, 表单整体绑定一个数据对象 -->
    <!-- 数据校验第二部, 表单绑定一个校验规则对象,
    里面跟数据对象一一对应 -->
    <el-form 
        :model="form" 
        ref="form"
        :rules="rules" 
        class="form">

        <!-- 给表单项指定对应的规则属性, 以字符串的形式设置在 prop 属性上 -->
        <el-form-item class="form-item" prop='username'>
            <el-input 
            placeholder="用户名/手机" v-model="form.username">
            </el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="password">
            <el-input 
            placeholder="密码" 
            type="password"
            v-model="form.password">
            </el-input>
        </el-form-item>

        <p class="form-text">
            <nuxt-link to="#">忘记密码</nuxt-link>
        </p>

        <el-button 
        class="submit"
        type="primary"
        @click="handleLoginSubmit">
            登录
        </el-button>
    </el-form>

</template>

<script>
export default {
    data(){
        return {
            // 表单数据
            form: {
                username: '',
                password: ''
            },
            // 表单规则
            rules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }
                ],
                password: [
                    { 
                        required: true, 
                        message: '请输入密码', 
                        trigger: 'blur' 
                    },
                ],
            },
        }
    },
    methods: {
        // 提交登录
        handleLoginSubmit(){
           console.log(this.form)
        }
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>