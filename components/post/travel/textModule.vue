<template>
  <!-- 发布攻略组件 -->
  <div class="main">
    <h2>发表新攻略</h2>
    <p class="create-desc">分享你的个人游记，让更多人看到哦！</p>
    <!-- elm表单 -->
    <el-form class="form" :model="form">
      <el-form-item>
        <el-input placeholder="请输入标题" v-model="form.title"></el-input>
      </el-form-item>
      <!-- 富文本框 -->
      <el-form-item>
        <!-- 富文本框  注意：要用client-only标签包裹住富文本框，这样就不会报错-->
        <client-only>
          <VueEditor
            :editorToolbar="['bold','italic','underline','strike',{'header':[false,1,2,3,4,5,6]},{'script':'super'},{'script':'sub'},'clean','color','background','image','video']"
            v-model="form.content"
            :useCustomImageHandler="true"
            @image-added="handleImageAdded"
          ></VueEditor>
        </client-only>
      </el-form-item>

      <!-- 搜索，自动补全 -->
      <el-form-item label="活动名称">
        <el-autocomplete
          v-model="form.city"
          placeholder="请搜索游玩城市"
          @select="handleSelect"
          :fetch-suggestions="queryCity"
          :trigger-on-focus="false"
          :highlight-first-item="true"
        ></el-autocomplete>
      </el-form-item>
    </el-form>
    <!-- 按钮 -->
    <div class="button">
      <el-button type="primary" size="small" @click="sendRelease">发布</el-button>
      <span>
        或者
        <nuxt-link to="#" @click.native="preserVation">保存到草稿</nuxt-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  //草稿组件的子传子
  props: ["deliveryData"],
  data() {
    return {
      form: {
        title: "",
        content: "",
        city: ""
      }
    };
  },
  watch: {
    //监听草稿箱数据的重新编写变化
    deliveryData(value) {
      this.form = value;
    }
  },
  mounted() {
    this.getCity("");
  },
  methods: {
    //1.获取所有城市
    getCity(value) {
      return this.$axios({
        url: "/cities",
        params: { name: value }
      }).then(res => {
        console.log(res.data.data);
        let cityList = res.data.data.map(city => {
          return { value: city.name.replace(/市$/, "") };
        });
        return cityList;
        console.log(cityList);
      });
    },
    //2.用户选择的文件   2.编辑器实例  3.光标位置  4.上传完的回调函数
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      //上传图片
      let formData = new FormData();
      formData.append("files", file);
      console.log("1");
      // console.log(file);
      // console.log(formData);

      //发送文件请求
      this.$axios({
        url: "/upload",
        method: "post",
        data: formData
      })
        .then(res => {
          if (res.status == 200) {
            console.log(res.data);

            console.log("文件上传成功");
            //将图片显示到富文本框
            //参数：1-光标位置 2-标签  3-路径
            Editor.insertEmbed(
              cursorLocation,
              "image",
              this.$axios.defaults.baseURL + res.data[0].url
            );
            resetUploader();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //3.自动补全
    handleSelect(value) {
      // console.log("下拉");
      console.log(value.value);
    },
    //4.自动补全搜索,第二个参数是回调函数，显示数组
    queryCity(value, showList) {
      this.getCity(value).then(cityList => {
        if (cityList.length > 0) {
          showList(cityList);
        } else {
          showList: [
            {
              value: "没有找到该城市"
            }
          ];
        }
      });
    },

    //5.发布按钮
    sendRelease() {
      this.form.city = this.form.city.replace(/市$/, "");
      console.log(this.form);

      this.$axios({
        url: "/posts",
        method: "post",
        data: this.form,
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.$message.success("发布成功");
          this.form = {};
        }
      });
    },
    //6.保存为草稿
    preserVation() {
      let date = new Date();
      let month =
        date.getMonth() > 10 ? date.getMonth() : "0" + date.getMonth();
      let day = date.getDate() > 10 ? date.getDate() : "0" + date.etDate();
      let dates = date.getFullYear() + "-" + month + "-" + day;
      let data = {
        title: this.form.title,
        city: this.form.city,
        content: this.form.content,
        date: dates
      };
      // console.log(data);

      this.$store.commit("draft/addDraft", data);
      // console.log("保存为草稿");
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 750px;
  h2 {
    margin-bottom: 10px;
    font-size: 22px;
    font-weight: 400;
  }
  p {
    margin-bottom: 10px;
    font-size: 12px;
    color: #999;
  }
  .form {
    .el-form-item {
      margin-bottom: 22px;
      .el-form-item__content {
        position: relative;
        line-height: 40px;
        font-size: 14px;
      }
      .el-input {
        display: inline-block;
        position: relative;
        font-size: 14px;
        width: 100%;
      }
      /deep/ .ql-editor.ql-blank {
        height: 320px;
      }
      /deep/ .ql-toolbar {
        padding: 0;
        margin: 0;
        .ql-formats {
          padding: 15px 1px;
          margin: 0;
        }
      }
    }
  }
  .button {
    span {
      margin-left: 10px;
      font-size: 14px;
      a {
        color: orange;
      }
    }
  }
}
</style>