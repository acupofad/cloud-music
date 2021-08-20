<template>
  <div>
    <div v-for="(item, index) in comments" :key="index" class="container mt-8">
      <div class="mt-8 flex size-12">
        <div class="pic mr-16">
          <img :src="item.user.avatarUrl" alt="" />
        </div>
        <div class="right">
          <div>
            <span class="blue">{{ item.user.nickname }}：</span>
            <span>{{ item.content }}</span>
          </div>
          <div class="mt-24 flex between like">
            <div class="gray">{{ item.time | formatDate }}</div>
            <div class="flex">
              <div class="icon mr-3 pointer" v-if="false">
                <img src="../../../assets/img/dianzan.svg" alt="" />
              </div>
              <div class="icon mr-3 pointer">
                <img src="../../../assets/img/dianzan_1.svg" alt="" />
              </div>
              <div>{{ item.likedCount }}</div>
              <div class="line"></div>
              <div class="pointer">回复</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex center mt-24" v-if="type === 2">
      <div>
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="currentSize"
          small
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      user: {},
      currentPage: 1,
      currentSize: 10,
    };
  },
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
    type: {
      type: Number,
      default: null,
    },
    total: {
      type: Number,
      default: null,
    },
  },
  methods: {
    handleSizeChange(val) {
      this.currentSize = val;
      this.$emit("change", this.currentPage, this.currentSize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$emit("change", this.currentPage, this.currentSize);
    },
  },
};
</script>

<style scoped>
.container {
  border-top: 1px dashed rgb(141, 130, 130);
  padding: 5px 10px;
}
.container:first-of-type {
  border-top: 1px solid rgb(141, 129, 129);
}
.pic {
  width: 50px;
  height: 50px;
}
.pic img {
  width: 100%;
  height: 100%;
}
.right {
  width: calc(100% - 75px);
}
.like {
  width: 100%;
}
.icon {
  width: 14px;
  height: 14px;
}
.icon img {
  width: 100%;
  height: 100%;
}
.line {
  margin: 0 10px;
  width: 2px;
  height: 14px;
  background: rgb(187, 179, 179);
}
/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #ec4141;
}
</style>