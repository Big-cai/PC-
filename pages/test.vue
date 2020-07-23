<template>
  <div>
      <Comment :commentData="item" v-for="(item, index) in commentList" :key="index"/>
  </div>
</template>

<script>
import Comment from '@/components/test/comment'
export default {
    components: {
        Comment
    },
    // 评论数据
    data() {
        return {
            commentList: [
                {
                    content: '666'
                },
                {
                    content: '这帖子说的有道理'
                },
                {
                    content: '从前有座山'
                },
                {
                    content: '山上有座庙',
                    parent: {
                        content: '从前有座山'
                    }
                },
                {
                    content: '庙里有个和尚在讲故事',
                    parent: {
                        content: '山上有座庙',
                        parent: {
                            content: '从前有座山'
                        }
                    }
                }
            ]
        }
    }
}
</script>

<style>

</style>