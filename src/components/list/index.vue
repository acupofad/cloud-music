<template>
  <div class="list">
    <div
      v-for="item in list"
      :key="item.id"
      class="item-box"
      @click="jumpDetail(item.id)"
    >
      <div class="pic">
        <img :src="item.cover" alt="" />
        <div class="play flex">
          <div class="icon">
            <img src="../../assets/img/shipin.svg" alt="" />
          </div>
          <div class="count">{{ item.playCount | formatNumber }}</div>
        </div>
      </div>
      <div class="size-12 name">{{ item.name }}</div>
      <div class="gray size-12 ml-12">{{ item.artistName }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {};
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    jumpDetail(id) {
      this.$router.push({
        path: "/mvs-details",
        query: {
          id: id,
        },
      });
    },
  },
};
</script>

<style scoped>
.list {
  width: 100%;
  padding: 0 40px;
  display: flex;
  flex-flow: wrap;
}
.item-box {
  width: 220px;
  margin: 10px 20px;
}
.pic {
  position: relative;
  width: 220px;
  height: 130px;
  border-radius: 20px;
}
.pic img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}
.name {
  width: 100%;
  margin: 4px 12px 2px;
}
.play {
  position: absolute;
  right: 15px;
  top: 3px;
}
.icon {
  width: 15px;
  height: 15px;
  margin-right: 3px;
}
.count {
  font-size: 10px;
  color: white;
}
</style>