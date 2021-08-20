<template>
  <div>
    <div class="flex comments">
      <div class="mr-16 bold">评论</div>
      <div class="mt-4 gray size-12 mb-2" v-if="comments.length">
        共{{ total }}条评论
      </div>
    </div>
    <div class="box">
      <CommentsBox />
    </div>
    <div v-if="hotComments !== []">
      <div class="size-14 bold">精彩评论</div>
      <SpecialComments :comments="hotComments" :type="1" />
    </div>
    <div v-if="comments !== []">
      <div class="size-14 mt-36 bold">最新评论 {{ total }}</div>
      <SpecialComments
        :comments="comments"
        :type="2"
        @change="change"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import CommentsBox from "./comments-box";
import SpecialComments from "./special-comments";
export default {
  name: "index",
  components: {
    CommentsBox,
    SpecialComments,
  },
  data() {
    return {
      hotComments: [],
      comments: [],
      total: null,
      currentPage: 1,
      currentSize: 10,
    };
  },
  props: {
    id: {
      type: Number,
      default: -1,
    },
    requestType: {
      type: Number,
      default: -1,
    },
  },
  created() {
    this.getComments();
  },
  methods: {
    async getComments() {
      if (this.requestType == 0) {
        let { data: res } = await this.$http.post(
          `/comment/playlist?id=${this.id}&offset=${
            (this.currentPage - 1) * this.currentSize
          }&limit=${this.currentSize}`
        );
        let { comments, hotComments, total } = res;
        if (hotComments !== undefined) this.hotComments = hotComments;
        this.comments = comments;
        this.hotComments = hotComments;
        this.total = total;
      } else if (this.requestType == 1) {
        let { data: res } = await this.$http.post(
          `/comment/mv?id=${this.id}&offset=${
            (this.currentPage - 1) * this.currentSize
          }&limit=${this.currentSize}`
        );
        let { comments, hotComments, total } = res;
        this.comments = comments;
        if (hotComments !== undefined) this.hotComments = hotComments;
        this.total = total;
      }
    },
    change(currentPage, currentSize) {
      this.currentPage = currentPage;
      this.currentSize = currentSize;
      this.getComments();
    },
  },
};
</script>

<style scoped>
.comments {
  padding-bottom: 8px;
  border-bottom: 2px solid #ec4141;
}
.box {
  margin: 16px 0 30px;
}
</style>