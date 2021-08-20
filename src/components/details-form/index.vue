<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      size="mini"
      @row-click="play"
    >
      <el-table-column type="index"> </el-table-column>
      <el-table-column width="100">
        <template>
          <div class="flex">
            <div class="pic1 pic mr-8"></div>
            <div class="pic2 pic"></div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="音乐标题" width="400">
      </el-table-column>
      <el-table-column prop="ar[0].name" label="歌手" width="240">
      </el-table-column>
      <el-table-column prop="al.name" label="专辑" width="400">
      </el-table-column>
      <el-table-column prop="mst" label="时长">
        <template slot-scope="scope">
          {{ scope.row.dt | formatTime }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      tableData: [],
      url: "",
    };
  },
  props: {
    id: {
      type: Number,
      default: -1,
    },
  },
  created() {
    this.getTable();
  },
  methods: {
    async getTable() {
      const { data: res } = await this.$http.post(
        `/playlist/detail?id=${this.id}`
      );
      const { tracks } = res.playlist;
      this.tableData = tracks;
      console.log(this.tableData);
      this.$store.commit("updateMusicList", this.tableData);
      console.log(this.$store.state.musicList,'aaaa');
    },
    async play(row) {
      console.log(row, "row");
      this.$store.commit("updateMusicId", row);
    },
  },
};
</script>

<style scoped>
/deep/.el-table .cell {
  color: rgb(128, 128, 128) !important;
  line-height: 16px;
}
.pic1 {
  background: url("../../assets/img/gedanshoucang.svg");
}
.pic2 {
  background: url("../../assets/img/xiazai.svg");
}
.pic {
  width: 12px;
  height: 12px;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>