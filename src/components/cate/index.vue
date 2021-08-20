<template>
  <div>
    <div class="orders">
      <div class="title">地区:</div>
      <div
        v-for="item in areaList"
        :key="item.id"
        class="selection"
        :class="{ active: areaIndex === item.id }"
        @click="getArea(item)"
      >
        {{ item.area }}
      </div>
    </div>
    <div class="orders">
      <div class="title">类型:</div>
      <div
        v-for="item in typeList"
        :key="item.id"
        class="selection"
        :class="{ active: typeIndex === item.id }"
        @click="getType(item)"
      >
        {{ item.type }}
      </div>
    </div>
    <div class="orders">
      <div class="title">排序:</div>
      <div
        v-for="item in orderList"
        :key="item.id"
        class="selection"
        :class="{ active: orderIndex === item.id }"
        @click="getorder(item)"
      >
        {{ item.order }}
      </div>
    </div>
  </div>
</template>

<script>
import { areaList, typeList, orderList } from "../../utils/cateList";
export default {
  name: "index",
  data() {
    return {
      areaList: [],
      typeList: [],
      orderList: [],
      areaIndex: 0,
      typeIndex: 0,
      orderIndex: 0,
      area: "",
      order: "",
      type: "",
    };
  },
  created() {
    this.reset();
  },
  methods: {
    reset() {
      this.areaList = areaList;
      this.typeList = typeList;
      this.orderList = orderList;
    },
    getArea(item) {
      this.area = item.area;
      this.areaIndex = item.id;
      this.pass();
    },
    getType(item) {
      this.type = item.type;
      this.typeIndex = item.id;
      this.pass();
    },
    getorder(item) {
      this.order = item.order;
      this.orderIndex = item.id;
      this.pass();
    },
    pass() {
      this.$emit("pass", this.area, this.type, this.order);
    },
  },
};
</script>

<style scoped>
.orders {
  display: flex;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.7);
  height: 30px;
  align-items: center;
}
.title {
  padding: 0 15px;
}
.selection {
  width: 70px;
  text-align: center;
}
.active {
  background: #fdf5f5;
  color: #ec4747;
  padding: 3px 0;
  border-radius: 11px;
}
</style>