<template>
  <div>
    <div class="flex">
      <div class="pic"><img :src="imgUrl" /></div>
      <div class="title">
        <div class="flex item-center">
          <div class="title-tag">歌单</div>
          <div class="text">{{ listName }}</div>
        </div>
        <div class="flex detail item-center">
          <div class="img mr-8"><img :src="avatarUrl" alt="" /></div>
          <div class="nickName mr-8 size-12">{{ nickName }}</div>
          <div class="mr-8 size-8">{{ createTime | formatDate }}创建</div>
        </div>
        <div class="flex size-12 mt-8">
          <div class="play flex item-center bg">
            <div class="icon mr-3 play-icon"></div>
            <div class="white h-20 lh-20 mr-3">播放全部</div>
          </div>
          <div class="play flex item-center">
            <div class="icon mr-3 collect-icon"></div>
            <div class="h-20 lh-20 mr-3">收藏</div>
          </div>
          <div class="play flex item-center">
            <div class="icon mr-3 share-icon"></div>
            <div class="h-20 lh-20 mr-3">分享</div>
          </div>
        </div>
        <div class="coontent size-8 ml-30 mt-8">
          <div class="mb-2">
            <span>标签：</span>
            <span class="nickName">{{ labelStr }}</span>
          </div>
          <div class="mb-2">
            <span class="mr-16">歌曲：{{ trackCount }}</span>
            <span>播放：{{ playCount | formatNumber }}</span>
          </div>
          <div>
            <span>简介：{{ description }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      imgUrl: "",
      avatarUrl: "",
      listName: "",
      nickName: "",
      createTime: "",
      labelStr: "",
      trackCount: 0,
      playCount: 0,
      description: "",
    };
  },
  props: {
    id: {
      type: Number,
      default: -1,
    },
  },
  created() {
    this.getDetails();
  },
  methods: {
    async getDetails() {
      console.log(`/playlist/detail?id=${this.id}`);
      const { data: res } = await this.$http.post(
        `/playlist/detail?id=${this.id}`
      );
      this.imgUrl = res.playlist.coverImgUrl;
      this.avatarUrl = res.playlist.creator.avatarUrl;
      this.nickName = res.playlist.creator.nickname;
      this.createTime = res.playlist.createTime;
      this.listName = res.playlist.name;
      this.trackCount = res.playlist.trackCount;
      this.labelStr = res.playlist.tags.join(" ");
      this.playCount = res.playlist.playCount;
      this.description = res.playlist.description;
      console.log(this.avatarUrl);
      console.log(res);
    },
  },
};
</script>

<style scoped>
.pic {
  width: 150px;
  height: 150px;
  margin-right: 12px;
}
.pic img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.title {
  flex: 1;
}
.title-tag {
  font-size: 12px;
  color: #ec4141;
  border: 1px solid #ec4141;
  padding: 1px 2px;
  border-radius: 2px;
  margin-right: 5px;
  transform: scale(0.8);
}
.text {
  font-size: 20px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.detail {
  margin-top: 8px;
}
.img {
  width: 20px;
  height: 20px;
}
.img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.nickName {
  color: #6191c2;
}
.play {
  height: 30px;
  padding: 0 12px;
  border-radius: 18px;
  margin-right: 16px;
  border: 1px solid #ddd;
}
.play-icon {
  background: url("../../assets/img/play3.svg");
}
.collect-icon {
  background: url("../../assets/img/shoucang.svg");
}
.share-icon {
  background: url("../../assets/img/fenxiang.svg");
}
.icon {
  width: 16px;
  height: 16px;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>