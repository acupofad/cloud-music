<template>
  <div>
    <div><Head /></div>
    <div class="nav">
      <Nav />
      <div class="content"><router-view /></div>
    </div>
    <div class="footer"><Footer /></div>
  </div>
</template>

<script>
import Head from "./head";
import Footer from "./footer";
import Nav from "./nav";
export default {
  name: "index",
  components: {
    Head,
    Footer,
    Nav,
  },
};
</script>

<style scoped>
.nav {
  display: flex;
  height: calc(100vh - 105px);
  width: 100%;
}
.footer {
  background: #fff;
  width: 100%;
  height: 55px;
  position: fixed;
  bottom: 0;
}
.content {
  width: 100%;
  overflow: auto;
}
</style>