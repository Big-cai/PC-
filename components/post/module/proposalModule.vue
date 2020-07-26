<template>
  <!-- 攻略组件-推荐城市 -->
  <div class="containerWrapper">
    <!-- 1.手风琴 -->
    <div class="menus-body">
      <!-- 1.手风琴第一层 -->
      <div class="menus">
        <!-- mouseover:鼠标移入事件,mouseout:鼠标移出事件 -->
        <div
          v-for="(item,index) in proposalList"
          :key="index"
          class="menu-item"
          :class="{'active':isCurrent===index}"
          @mouseover="addClass(index)"
          @mouseout="removeClass(index)"
        >
          <span>{{item.type}}</span>
        </div>
      </div>

      <!-- 2.手风琴第二层 -->
      <!-- 第一层数据循环,绑定鼠标移入输出两个事件 -->
      <div
        class="sub-menus"
        v-for="(item,index) in proposalList"
        :key="index"
        :class="{'block':isCurrent===index}"
        @mouseover="addClass(index)"
        @mouseout="removeClass(index)"
      >
        <!-- 全部5个ul，由第一层来控制显示 -->
        <ul>
          <!-- 第二层数据循环 -->
          <li v-for="(item,index) in item.children" :key="index" @click="handlePush(item.city)">
            <nuxt-link to="#">
              <i>{{index+1}}</i>
              <strong>{{item.city}}</strong>
              <span>{{item.desc}}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- 2.推荐城市 -->
    <div class="aside-recommend">
      <h4>推荐城市</h4>
      <nuxt-link to="#">
        <img src="@/assets/pic_sea.jpeg" @click="handlePush()" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  //数据
  data() {
    return {
      //假数据-推荐攻略
      proposalList: null,

      //当前选项
      isCurrent: ""
    };
  },
  //挂在钩子
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      if (res.status == "200") {
        console.log(res.data);
        //赋值
        this.proposalList = res.data.data;
        console.log(this.proposalList);
      }
    });
  },
  //函数
  methods: {
    //鼠标移入添加动态类名
    addClass(index) {
      //更改当前选项，增加active类名
      this.isCurrent = index;
    },
    //鼠标移出添加动态类名
    removeClass(index) {
      this.isCurrent = "";
    },
    //路由跳转
    handlePush(city) {
      this.$router.push("/post?city=" + city);
      //执行父组件绑定的事件
      this.$emit("delivery", city);
      // console.log(city);
    }
  }
};
</script>

<style lang="less" scoped>
.containerWrapper {
  position: relative;
  width: 260px;
  z-index: 2;
  //1.手风琴
  .menus-body {
  }
  //手风琴第一层
  .menus {
    width: 260px;
    border: 1px solid #ddd;
    border-right: none;
    border-bottom: none;
    box-shadow: 0 0 1px #f5f5f5;
    z-index: 2;
    .menu-item {
      position: relative;
      padding: 0 20px;
      z-index: 2;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      border-right: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      span {
      }
      //右箭头
      &::after {
        position: absolute;
        top: 16px;
        right: 22px;
        display: block;
        content: "";
        width: 9px;
        height: 9px;
        border-right: 1px solid #999;
        border-top: 1px solid #999;
        transform: rotate(45deg);
      }
    }
    //动态加载的类样式  （改变的都是边框颜色，所以单独设置边框的颜色）
    .active {
      color: orange;
      border-right-color: #fff;
      &::after {
        border-top-color: orange;
        border-right-color: orange;
      }
    }
  }
  //手风琴第二层
  .sub-menus {
    padding: 10px 20px;
    position: absolute;
    top: 20px;
    left: 260px;
    width: 350px;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #ddd;
    font-size: 14px;
    display: none;
    ul {
      display: block;
      ul,
      ol,
      li {
        list-style: none;
        a {
          text-decoration: none;
          color: inherit;
          i {
            font-style: italic;
            font-size: 24px;
            color: orange;
            vertical-align: middle;
          }
          strong {
            margin: 0 10px;
            color: orange;
            font-weight: 400;
          }
          span {
            color: #999;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .block {
    display: block;
  }

  //2.推荐城市
  .aside-recommend {
    width: 260px;
    height: 216px;
    margin-top: 20px;
    h4 {
      display: block;
      margin-bottom: 10px;
      padding-bottom: 10px;
      font-weight: 400;
      border-bottom: 1px solid #ddd;
    }
    a {
      text-decoration: none;
      color: inherit;
      &:hover {
        color: orange;
      }
      img {
        display: block;
        width: 260px;
        height: 173.2px;
      }
    }
  }
}
</style>