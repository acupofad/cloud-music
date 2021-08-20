<template>
  <div>
    <div class="banner">
      <div
        v-for="(item, index) in banners"
        :key="index"
        v-show="index === currentIndex"
      >
        <div class="img" @click="turnNew(item)">
          <a :href="item.url" target="_blank">
            <img :src="item.imageUrl" alt=""
          /></a>
        </div>
      </div>
      <div class="radius">
        <div
          class="radiu"
          v-for="(item, index) in banners"
          :key="index"
          :class="{ active: index === currentIndex }"
          @click="turnIndex(index)"
        ></div>
      </div>
    </div>
    <div class="title">推荐歌单</div>
    <div class="container">
      <div
        class="box"
        v-for="item in list"
        :key="item.id"
        @click="turnItem(item.id)"
      >
        <div class="pic"><img :src="item.picUrl" alt="" /></div>
        <div class="text">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      list: [],
      banners: [],
      currentIndex: 0,
      timer: null,
      time2: null,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    turn() {
      this.currentIndex++;
      if (this.currentIndex > this.banners.length - 1) this.currentIndex = 0;
    },
    turnIndex(index) {
      this.currentIndex = index;
      clearInterval(this.timer);
      if (!this.timer2) {
        setTimeout(() => {
          this.timer = setInterval(this.turn, 1500);
        }, 2000);
      }
    },
    async getList() {
      const { data: res } = await this.$http.post("/personalized?limit=10");
      this.list = res.result;
      console.log(this.list);
      const result = await this.$http.post("/banner");
      this.banners = result.data.banners;
    },
    turnItem(id) {
      this.$router.push({
        path: "/musicdetail",
        query: {
          id,
        },
      });
    },
    turnNew(item) {
      if (!item.url) {
        this.$message.warning("此歌曲尚不可购买");
      }
    },
  },
  mounted() {
    this.timer = setInterval(this.turn, 1500);
  },
};
</script>

<style scoped>
.banner {
  cursor: pointer;
  width: 600px;
  height: 240px;
  margin: 30px auto 60px;
  position: relative;
}
.radius {
  cursor: pointer;
  width: 200px;
  height: 20px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translate(-50%, 0);
}
.radiu {
  width: 14px;
  height: 14px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
}
.active {
  background: #fff;
}
.img {
  height: 100%;
}
.img img {
  width: 600px;
  height: 240px;
}
.title {
  margin-left: 26px;
  font-size: 18px;
  font-weight: bold;
}
.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
}
.box {
  width: 175px;
  height: 235px;
  cursor: pointer;
  margin: 0 26px;
}
.pic {
  width: 175px;
  height: 175px;
}
.pic img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.text {
  font-size: 12px;
  padding: 6px 2px;
}
</style>