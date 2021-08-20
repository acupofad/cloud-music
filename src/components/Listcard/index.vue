<template>
  <div class="container">
    <ul
      class="infinite-list"
      v-infinite-scroll="load"
      infinite-scroll-delay="1000"
      style="overflow: auto"
    >
      <li v-for="i in count" class="infinite-list-item" :key="i">{{ i }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    load() {
      this.count++;
    },
  },
};
</script>

<style scoped>
.container {
  height: 100px;
  background: red;
  /* overflow: hidden; */
}
.infinite-list {
  height: 100%;
}
</style>