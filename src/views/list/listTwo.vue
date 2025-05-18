<template>
  <div id="main">
    <div class="sku-box store-content">
      <div class="sort-option">
        <ul class="line clear">
          <li><a href="javascript:;" class="active">综合排序</a></li>
          <li><a href="javascript:;" class="">日期排序</a></li>
          <li><a href="javascript:;" class="">收藏高到低</a></li>
        </ul>
      </div>
      <div class="gray-box" v-if="filteredGoods.length > 0">
        <div class="item-box">
          <shop-item :key="index" v-for="(item, index) in filteredGoods" :item="item"></shop-item>
        </div>
      </div>
      <div class="no-data" v-else>暂时还没有文章哦，快来上传吧！</div>
    </div>
    <prompt v-if="maxCount"></prompt>
  </div>
</template>


<script>
import axiosUtil from '@/util/axios';  // 导入Axios
import shopItem from '@/components/shop-item';
import prompt from '@/components/prompt';

export default {
  data() {
    return {
      goodsList: [],
      goodsShow: [],
      filteredGoods: [],
    };
  },
  watch: {
    $route: 'reseat',
  },
  mounted() {
    this.reseat();
  },
  components: {
    shopItem,
    prompt,
  },
  computed: {
    maxCount() {
      return this.$store.state.maxOff;
    },
  },
  methods: {
    reseat() {
      axiosUtil.get("file/show/1")
        .then(response => {
          console.log(response.data.data);
          this.goodsShow = response.data.data; // 假设后端响应包含商品数据
          this.filteredGoods = this.goodsShow.filter((item) => item.type === 1);
          for (var i = 0; i < this.filteredGoods.length; i++) {
            this.filteredGoods[i].type = "后端开发";
          }
          console.log(this.filteredGoods); // 输出筛选后的数组
        })
        .catch(error => {
          console.error('获取数据时发生错误：', error);
        });
    },
  },
};
</script>

<style>
.no-data {
  font-size: large;
  line-height: 50px;
  color: #999;
}

.sku-box {
  position: relative;
}

.sort-option {
  border-top: 1px solid #D8D8D8;
  color: #ffffff;
}

.sort-option ul {
  height: 60px;
  line-height: 60px;
}

.sort-option li {
  position: relative;
  float: left;
  padding-left: 42px;
}

.sort-option li:first-child {
  padding-left: 9px;
}

.sort-option li:before {
  content: ' ';
  display: block;
  position: absolute;
  left: 20px;
  top: 50%;
  width: 2px;
  height: 2px;
  margin-top: -1px;
  background: #C7C7C7;
}

.sort-option li:first-child:before {
  display: none;
}

.sort-option a {
  font-size: 12px;
  color: #999;
  display: inline-block;
  /* 将链接设为行内块级元素 */
  height: 20px;
  line-height: 20px;
  /* 设置行高与容器高度相等 */
  color: #727a8e;
  text-decoration: none;
  /* 移除下划线 */
  padding: 0 10px;
  /* 添加左右内边距 */
}

.sort-option a.active,
.sort-option a:hover {
  height: 20px;
  color: #FFFFFF;
  background-color: #189C86;
  border-radius: 3px;
}

.gray-box {
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0, 0, 0, .14);
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);
}

.sku-box .item-box {
  clear: both;
  overflow: hidden;
  margin: 0 -1px -1px -1px;
}
</style>
