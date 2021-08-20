<template>
  <div>
    <div class="title bold">MV详情</div>
    <div class="video">
      <video :src="url" controls type="video/mp4"></video>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      url: "",
    };
  },
  created() {
    this.getUrl();
  },
  props: {
    id: {
      type: Number,
      default: -1,
    },
  },
  methods: {
    async getUrl() {
      const { data: res } = await this.$http.get(`/mv/url?id=${this.id}`);
      this.url = res.data.url;
      console.log(this.url);
    },
  },
};
</script>

<style scoped>
.video {
  width: 80%;
  margin: 18px auto;
  height: 80%;
}
</style>