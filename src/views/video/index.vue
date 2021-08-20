<template>
  <div>
    <div class="sort"><Sort :list="list" /></div>
    <router-view />
  </div>
</template>

<script>
import Sort from '../../components/sort'
export default {
  name: "index",
  components:{
    Sort,
  },
  data(){
    return{
      list: [
        {
          type: "视频",
          id: 0,
          route: "/video/videos",
        },
        {
          type: "MV",
          id: 1,
          route: "/video/mvs",
        },
      ],
    }
  },
  created() {
  },
  methods: {
  },
};
</script>

<style scoped>
.sort {
  margin-bottom: 12px;
}
</style>