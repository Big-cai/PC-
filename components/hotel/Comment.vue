<template>
  <!-- 评论模块 -->
  <div class="comment">
    <h3>0条真实用户评价</h3>
    <div class="comment-hd">
      <div class="comment-bd">
        <p>总评数：148</p>
        <p>好评数：145</p>
        <p>差评：3</p>
      </div>
      <div class="recommend">
        <div class="recommend-hd">
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
        </div>
        <div class="recommend-bd">推荐</div>
      </div>
      <ProgressView/>
    </div>
  </div>
</template>

<script>
import ProgressView from "@/components/hotel/ProgressView";
export default {
  components: {
    ProgressView
  },
  data() {
    return {
      value: 3.7
    };
  }
};
</script>
<style lang="less">
.comment {
  margin-top: 40px;
  font-size: 16px;
  .comment-hd {
    margin-top: 20px;
    display: flex;
    align-items: center;
    .recommend {
      position: relative;
      .recommend-hd {
        margin-left: 50px;
      }
      .recommend-bd {
        position: absolute;
        left: 80px;
        top: -25px;
        border: 2px solid #fa3;
        text-align: center;
        line-height: 70px;
        width: 70px;
        height: 70px;
        font-size: 25px;
        color: orange;
        border-radius: 50%;
        opacity: 0.25;
        transform: rotate(-30deg);
      }
    }
  }
}
</style>
