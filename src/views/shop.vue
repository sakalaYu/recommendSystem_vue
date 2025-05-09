<template>
  <div id="main">
    <div class="sku-box store-content">
      <div class="sort-option" ref="test" :class="{ fixed: isFixed }">
        <ul class="line clear">
          <li><a href="javascript:;" :class="{ active: currentSort === '综合排序' }" @click="handleSort('综合排序')">综合排序</a>
          </li>
          <li><a href="javascript:;" :class="{ active: currentSort === '日期排序' }" @click="handleSort('日期排序')">日期排序</a>
          </li>
          <li><a href="javascript:;" :class="{ active: currentSort === '收藏高到低' }" @click="handleSort('收藏高到低')">收藏高到低</a>
          </li>
        </ul>
      </div>
      <div class="gray-box" v-if="goodsShow.length > 0">
        <div class="item-box">
          <shop-item :key="index" v-for="(item, index) in currentArray" :item="item"></shop-item>
        </div>
      </div>
      <div class="no-data" v-else>暂时还没有文章哦，快来上传吧！</div>
    </div>
    <prompt v-if="maxCount"></prompt>
  </div>
</template>


<script>
import axiosUtil from "@/util/axios"; // 导入Axios
import shopItem from "@/components/shop-item";
import prompt from "@/components/prompt";

export default {
  data() {
    return {
      goodsList: [],
      goodsShow: [],
      isFixed: false,
      currentSort: '综合排序',
      currentArray: [],
    };
  },
  watch: {
    $route: "reseat",
  },
  mounted() {
    this.reseat();
    window.addEventListener("scroll", this.handleScroll);
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
    handleSort(sortType) {
      console.log(sortType);
      this.currentSort = sortType;
      console.log(this.currentSort);
      // 这里可以根据排序类型来切换显示的数组
      if (sortType === '综合排序') {
        this.currentArray = this.goodsShow;
      } else if (sortType === '日期排序') {
        this.reseat2();
        console.log(this.reseat2());
      } else if (sortType === '收藏高到低') {
        this.reseat3();
      }
    },
    reseat() {
      axiosUtil
        .get("file/show")
        .then((response) => {
          console.log(response.data.data);
          this.goodsShow = response.data.data; // 假设后端响应包含商品数据
          // 遍历 goodsShow 中的每个元素，将 type 为 0 的元素的 type 改为 C/C++
          this.goodsShow.forEach((item) => {
            switch (item.type) {
              case 0:
                item.type = "前端开发";
                break;
              case 1:
                item.type = "后端开发";
                break;
              case 2:
                item.type = "数据库";
                break;
              case 3:
                item.type = "移动端开发";
                break;
              case 4:
                item.type = "云计算与DevOps";
                break;
              case 5:
                item.type = "安全技术栈";
                break;
              case 6:
                item.type = "版本控制与协作";
                break;
              case 7:
                item.type = "Web开发工具与库";
                break;
              default:
                break;
            }
            this.currentArray = this.goodsShow;
          });
        })
        .catch((error) => {
          console.error("获取数据时发生错误：", error);
        });
    },
    reseat2() {
      axiosUtil
        .get("/file/data_show")
        .then((response) => {
          console.log(response.data.data);
          this.goodsShow = response.data.data; // 假设后端响应包含商品数据
          // 遍历 goodsShow 中的每个元素，将 type 为 0 的元素的 type 改为 C/C++
          this.goodsShow.forEach((item) => {
            switch (item.type) {
              case 0:
                item.type = "前端开发";
                break;
              case 1:
                item.type = "后端开发";
                break;
              case 2:
                item.type = "数据库";
                break;
              case 3:
                item.type = "移动端开发";
                break;
              case 4:
                item.type = "云计算与DevOps";
                break;
              case 5:
                item.type = "安全技术栈";
                break;
              case 6:
                item.type = "版本控制与协作";
                break;
              case 7:
                item.type = "Web开发工具与库";
                break;
              default:
                break;
            }
            this.currentArray = this.goodsShow;
          });
        })
        .catch((error) => {
          console.error("获取数据时发生错误：", error);
        });
    },
    reseat3() {
      axiosUtil
        .get("/file/collect")
        .then((response) => {
          console.log(response.data.data);
          this.goodsShow = response.data.data; // 假设后端响应包含商品数据
          // 遍历 goodsShow 中的每个元素，将 type 为 0 的元素的 type 改为 C/C++
          this.goodsShow.forEach((item) => {
            switch (item.type) {
              case 0:
                item.type = "前端开发";
                break;
              case 1:
                item.type = "后端开发";
                break;
              case 2:
                item.type = "数据库";
                break;
              case 3:
                item.type = "移动端开发";
                break;
              case 4:
                item.type = "云计算与DevOps";
                break;
              case 5:
                item.type = "安全技术栈";
                break;
              case 6:
                item.type = "版本控制与协作";
                break;
              case 7:
                item.type = "Web开发工具与库";
                break;
              default:
                break;
            }
            this.currentArray = this.goodsShow;
          });
        })
        .catch((error) => {
          console.error("获取数据时发生错误：", error);
        });
    },
  }
}
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
  border-top: 1px solid #d8d8d8;
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
  content: " ";
  display: block;
  position: absolute;
  left: 20px;
  top: 50%;
  width: 2px;
  height: 2px;
  margin-top: -1px;
  background: #c7c7c7;
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
  color: #ffffff;
  background-color: #189c86;
  border-radius: 3px;
}

.gray-box {
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
}

.sku-box .item-box {
  clear: both;
  overflow: hidden;
  margin: 0 -1px -1px -1px;
}
</style>
