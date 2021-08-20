<template>
  <div>
    <div class="cate"><cate @pass="pass" /></div>
    <div class="mt-24"><list :list="mvList" /></div>
  </div>
</template>

<script>
import cate from "../../../components/cate";
import list from "../../../components/list";
export default {
  name: "index",
  components: {
    cate,
    list,
  },
  data() {
    return {
      mvList: [],
      area: "",
      order: "",
      type: "",
    };
  },
  created() {
    this.getMvList();
  },
  methods: {
    async getMvList() {
      let res = await this.$http.post(
        `/mv/all?area=${this.area}&type=${this.type}&order=${this.order}`
      );
      res = res.data.data;
      this.mvList = res;
      console.log(this.mvList);
    },
    pass(area, type, order) {
      this.area = area;
      this.type = type;
      this.order = order;
      this.getMvList();
    },
  },
};
</script>
