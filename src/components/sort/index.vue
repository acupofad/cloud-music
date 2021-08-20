<template>
  <div class="nav">
    <div
      class="nav-item"
      v-for="item in list"
      :key="item.id"
      @click="turnActive(item)"
      :class="{ active: activeIndex === item.id }"
    >
      {{ item.type }}
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      activeIndex: 0,
    };
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    turnActive(item) {
      this.activeIndex = item.id;
      this.$router.push(item.route);
    },
  },
};
</script>

<style scoped>
.nav {
  display: flex;
  height: 40px;
  margin-left: 20px;
}
.nav-item {
  line-height: 40px;
  padding: 0 12px;
  font-size: 13px;
}
.active {
  font-size: 16px;
  font-weight: bold;
  border-bottom: 3px solid #ec4141;
}
</style>