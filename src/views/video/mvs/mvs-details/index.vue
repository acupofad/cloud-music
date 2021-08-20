<template>
  <div class="mvs-box">
    <div class="left">
      <div class="mv-detail">
        <MvDetailTitle :id="id" />
      </div>
      <div class="comments">
        <Comments :id="id" :requestType="requestType" />
      </div>
    </div>
    <div class="right">
      <related-video :id="id" />
    </div>
  </div>
</template>

<script>
import Comments from "../../../../components/comments";
import MvDetailTitle from "../mvs-details/mvdetail-title";
import relatedVideo from "./mvdetail-title/related-video";
export default {
  name: "index",
  components: {
    Comments,
    MvDetailTitle,
    relatedVideo,
  },
  data() {
    return {
      id: null,
      requestType: 1,
      artistName: "",
      commentCount: null,
      cover: "",
      desc: "",
      duration: null,
      name: "",
      playCount: null,
      publishTime: "",
      shareCount: null,
      subCount: null,
      videoGroup: [],
    };
  },
  created() {
    this.getDetails();
  },
  methods: {
    async getDetails() {
      this.id = this.$route.query.id - 0;
      const { data: res } = await this.$http.get(`/mv/detail?mvid=${this.id}`);
      const {
        artistName,
        commentCount,
        cover,
        desc,
        duration,
        name,
        playCount,
        publishTime,
        shareCount,
        subCount,
        videoGroup,
      } = res.data;
      this.artistName = artistName;
      this.commentCount = commentCount;
      this.cover = cover;
      this.desc = desc;
      this.duration = duration;
      this.name = name;
      this.playCount = playCount;
      this.publishTime = publishTime;
      this.shareCount = shareCount;
      this.subCount = subCount;
      this.videoGroup = videoGroup;
    },
  },
};
</script>

<style scoped>
.mvs-box {
  width: 1080px;
  display: flex;
  margin: 18px auto;
}
.left {
  flex: 1;
  margin-right: 60px;
}
.right {
  width: 360px;
}
.mv-detail {
  width: 100%;
  margin-bottom: 36px;
}
</style>