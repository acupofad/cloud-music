<template>
  <div class="container">
    <div class="bold">相关视频</div>
    <div
      v-for="(item, index) in recommendVideos"
      :key="index"
      @click="jumpRecommend(item.vid)"
      class="recommend-item flex"
    >
      <div class="pic mr-16">
        <img :src="item.coverUrl" alt="" />
      </div>
      <div class="des">
        <div class="size-12">{{ item.title }}</div>
        <div class="size-8 gray mt-24">by {{ item.creator[0].userName }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      recommendVideos: [],
    };
  },
  props: {
    id: {
      type: Number,
      default: -1,
    },
  },
  created() {
    this.getRecommend();
  },
  methods: {
    async getRecommend() {
      const { data: res } = await this.$http.post(
        `/related/allvideo?id=${this.id}`
      );
      console.log(res.data);
      this.recommendVideos = res.data;
    },
    jumpRecommend(id) {
      console.log(id);
    },
  },
};
</script>

<style scoped>
.pic {
  width: 180px;
  height: 120px;
  border-radius: 15px;
}
.pic img {
  width: 100%;
  height: 100%;
  border-radius: 15px;
}
.recommend-item {
  margin: 28px 0;
  width: 100%;
}
.container > .recommend-item {
  margin-top: 18px;
}
.des {
  flex: 1;
  margin: auto;
}
</style>