<template>
  <div class="container">
    <el-menu default-active="/find-music" @select="select">
      <el-menu-item index="/find-music">
        <div class="find icon"></div>
        <span slot="title">发现音乐</span>
      </el-menu-item>
      <el-menu-item index="/video">
        <div class="shipin icon"></div>
        <span slot="title">视频</span>
      </el-menu-item>
      <el-menu-item index="/collect">
        <div class="shoucang icon"></div>
        <span slot="title">收藏</span>
      </el-menu-item>
      <el-menu-item index="/recommand">
        <div class="tuijian icon"></div>
        <span slot="title">每日推荐</span>
      </el-menu-item>
      <el-menu-item index="/created-list" class="song-list">
        <span slot="title">创建的歌单</span>
      </el-menu-item>
      <el-menu-item index="/collected-list" class="song-list">
        <span slot="title">收藏的歌单</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "index",
  methods: {
    select(index) {
      this.$router.push(index);
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 150px;
  border-right: 1px solid #ddd;
}
/deep/.el-menu-item {
  display: flex;
  align-items: center;
  height: 40px;
  height: 40px;
  font-size: 12px;
}
/deep/.song-list {
  color: #909399;
}
/deep/.el-menu-item.is-active,
.el-menu-item:hover {
  color: #ec4141;
  background: rgba(236, 65, 65, 0.1);
}
/deep/.el-menu {
  border-right: 0;
}
.find {
  background: url("../../../assets/img/dianyingzhiye-gequbang.svg");
}
.shipin {
  background: url("../../../assets/img/shipin.svg");
}
.shoucang {
  background: url("../../../assets/img/shoucang.svg");
}
.tuijian {
  background: url("../../../assets/img/tuijian.svg");
}
.icon {
  margin-right: 8px;
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>