<template>
  <div>
    <div class="sort"><Sort :list="list" /></div>
    <div class="find-content"><router-view /></div>
  </div>
</template>

<script>
import Sort from "../../components/sort";
export default {
  name: "index",
  components: {
    Sort,
  },
  data() {
    return {
      list: [
        {
          type: "个性推荐",
          id: 0,
          route: "/find-music/personal-recommand",
        },
        {
          type: "歌单",
          id: 1,
          route: "/find-music/playlist",
        },
        {
          type: "排行榜",
          id: 2,
          route: "/find-music/rank",
        },
        {
          type: "歌手",
          id: 3,
          route: "/find-music/singers",
        },
      ],
    };
  },
};
</script>

<style scoped>
.pic {
  background: red;
  height: 100px;
  width: 100%;
}
.sort {
  margin-bottom: 12px;
}
.find-content {
  width: 100%;
  padding: 0 120px;
}
</style>