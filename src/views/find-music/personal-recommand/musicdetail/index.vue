<template>
  <div class="container">
    <div><DetailsTitle :id="id" /></div>
    <div class="form">
      <div class="mb-2 comments">歌曲列表</div>
      <DetailsForm :id="id" />
    </div>
    <div>
      <Comments :id="id" :requestType="requestType" />
    </div>
  </div>
</template>

<script>
import DetailsTitle from "../../../../components/details-title";
import DetailsForm from "../../../../components/details-form";
import Comments from "../../../../components/comments";
export default {
  name: "index",
  components: {
    DetailsTitle,
    DetailsForm,
    Comments,
  },
  data() {
    return {
      id: -1,
      requestType: 0,
    };
  },
  created() {
    this.getId();
  },
  methods: {
    async getId() {
      this.id = this.$route.query.id - 0;
    },
  },
};
</script>

<style scoped>
.container {
  padding: 25px 30px;
}
.form {
  margin: 40px 0 30px;
}
</style>