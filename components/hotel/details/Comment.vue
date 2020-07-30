<template>
  <!-- 评论模块 -->
  <div class="comment">
    <h3>0条真实用户评价</h3>
    <div class="comment-hd">
      <div class="comment-bd">
        <p>总评数：{{ hotelData.all_remarks }}</p>
        <p>好评数：{{ hotelData.good_remarks }}</p>
        <p>差评：{{ hotelData.bad_remarks }}</p>
      </div>
      <div class="recommend">
        <div class="recommend-hd">
          <el-rate
            v-model="value5"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}分"
          ></el-rate>
        </div>
        <div class="recommend-bd">推荐</div>
      </div>
      
      <ProgressView ProText="环境" :scores="this.scores.environment"></ProgressView>
      <ProgressView ProText="产品" :scores="this.scores.product"></ProgressView>
      <ProgressView ProText="环境" :scores="this.scores.service"></ProgressView>
    </div>
  </div>
</template>

<script>
import ProgressView from "@/components/hotel/details/ProgressView";
export default {
  props: {
    hotelData: Object
  },
  components: {
    ProgressView
  },
  data() {
    return {
      value5: this.hotelData.stars,
      scores: this.hotelData.scores
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
    .comment-bd {
      width: 166px;
    }
    .recommend {
      position: relative;
      width: 208px;
      text-align: center;
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
