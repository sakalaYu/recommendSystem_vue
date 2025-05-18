<template>
  <div class="account-content">
    <div class="account-order">
      <div class="gray-box">
        <div class="title columns-title pre-title">
          <h2>我的上传</h2>
          <!-- <div class="shangchuan" @click="skip_upload">
            上传
          </div> -->
          <el-button type="primary" class="shangchuan" @click="skip_upload">上传<i
              class="el-icon-upload el-icon--right"></i></el-button>
        </div>
        <div class="js-list-inner">
          <div class="box-inner order-cart order-list-cart clear" v-for="(orderGroup, index) in groupedOrderData"
            :key="index">
            <div class="gray-sub-title cart-title">
              <span class="date">{{ orderGroup.upload }}</span>
              <span class="ti">标题</span>
              <span class="num">作者</span>
              <span class="sub-total">课程类别</span>
              <span class="order-detail"> 操作 </span>
            </div>
            <div class="cart" v-for="(item, itemIndex) in orderGroup.items" :key="itemIndex">
              <div class="cart-items clear">
                <div class="prod-info clear">
                  <div class="items-thumb">
                    <a href="javascript:;" target="_blank">
                      <img :src="`http://localhost:8081/file${item.file_image}`" />
                    </a>
                  </div>
                  <div class="items-params clear">
                    <div class="name vh-center">
                      <div class="file_name">{{ item.file_name }}</div>
                    </div>
                    <div class="detail"></div>
                  </div>
                  <div class="username">{{ item.user_name }}</div>
                  <div class="num">{{ item.type }}</div>
                  <el-button class="button_check" icon="el-icon-search" circle @click="check(item.id)"></el-button>
                  <el-button icon="el-icon-edit" class="button_edit" circle
                  @click="handleDelete(item.id)"></el-button>
                  <el-button icon="el-icon-delete" class="button_delete" circle
                    @click="handleDelete(item.id)"></el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosUtil from "@/util/axios";
export default {
  data() {
    return {
      orderData: [],
    };
  },
  computed: {
    // orderData() {
    //   return this.$store.state.orderData;
    // },
    groupedOrderData() {
      let groupedData = {};
      this.orderData.forEach((order) => {
        let date = order.upload.split("T")[0]; // Assuming date is in YYYY-MM-DD format
        if (groupedData[date]) {
          groupedData[date].push(order);
        } else {
          groupedData[date] = [order];
        }
      });

      // Sort groupedData by date
      const sortedDates = Object.keys(groupedData).sort(
        (a, b) => new Date(b) - new Date(a)
      );
      let sortedGroupedData = {};
      sortedDates.forEach((date) => {
        sortedGroupedData[date] = groupedData[date];
      });

      return Object.keys(sortedGroupedData).map((date) => {
        return { upload: date, items: sortedGroupedData[date] };
      });
    },
  },
  methods: {
    getOrderData() {
      axiosUtil
        .get("/user/MyUpload")
        .then((res) => {
          console.log(res);
          const modifiedData = res.data.data.map((item) => {
            // 将时间格式修改为 "2008-12-13"
            const originalDate = new Date(item.upload);
            const formattedDate = `${originalDate.getFullYear()}-${String(
              originalDate.getMonth() + 1
            ).padStart(2, "0")}-${String(originalDate.getDate()).padStart(
              2,
              "0"
            )}`;

            // 修改type的值
            let modifiedType = "";
            switch (item.type) {
              case 0:
                modifiedType = "前端开发";
                break;
              case 1:
                modifiedType = "后端开发";
                break;
              case 2:
                modifiedType = "数据库";
                break;
              case 3:
                modifiedType = "移动端开发";
                break;
              case 4:
                modifiedType = "云计算与DevOps";
                break;
              case 5:
                modifiedType = "安全技术栈";
                break;
              case 6:
                modifiedType = "版本控制与协作";
                break;
              case 7:
                modifiedType = " Web开发工具与库";
                break;
              default:
                modifiedType = "";
            }

            return {
              ...item,
              upload: formattedDate,
              type: modifiedType,
            };
          });
          console.log(modifiedData);
          this.orderData = modifiedData;
        })
        .catch((error) => {
          console.error("Error fetching MyUpload data:", error);
        });
    },

    skip_upload() {
      this.$router.push({ path: '/upload' })
    },
    check(id) {
      console.log(id);
      this.$router.push({ path: '/detail', query: { fileId: id } });
    },
    handleDelete(id) {
      console.log(id);
      this.$message({
        message: '删除成功',
        type: 'success'
      });
      axiosUtil.get('/file/delete', { id: id }).then(res => {
        console.log(res.data, '删除');
        window.location.reload();
      }).catch(error => {
        console.error("Error fetching MyUpload data:", error);
      });
    },
  },
  mounted: function () {
    //自动触发写入的函数
    this.getOrderData();
  },
};
</script>

<style scoped>
.shangchuan {
  background-color: rgb(60, 148, 133);
  color: floralwhite;
  margin-left: 740px;
}

/* .check {

  position: absolute;

  margin-left: 100px;
} */
.button_check {
  margin-top: 15px;
  position: absolute;
  margin-left: 680px;
}
.button_edit {
  position: absolute;
  margin-top: 15px;
  margin-left: 730px;
}
.button_delete {
  position: absolute;
  margin-top: 15px;
  margin-left: 780px;
}

.account-order .gray-box {
  margin-bottom: 20px;
}

.gray-box .columns-title h2 {
  float: left;
}

.gray-btn-menu {
  display: inline-block;
  height: 36px;
  background: #f2f2f2;
  background: linear-gradient(#fff, #f5f5f5);
  border: 1px solid #dbdde2;
  border-radius: 4px;
  line-height: 36px;
  cursor: pointer;
  text-align: center;
  user-select: none;
}

.account-order .sort-status-menu {
  width: 112px;
}

.gray-box .title .gray-btn-menu,
.gray-box .title span.gray-normal-btn {
  margin: 10px 0 0 10px;
}

.gray-box .title .gray-btn-menu {
  overflow: visible;
  float: right;
}

.gray-btn-menu .label {
  position: relative;
  z-index: 1;
  display: block;
  padding: 0 13px 0 16px;
  text-align: left;
  color: #666;
}

.gray-box .title .gray-btn-menu .label {
  overflow: visible;
  float: none;
  margin-top: 0;
}

.gray-btn-menu .label .arrow {
  float: right;
  width: 10px;
  height: 7px;
  margin: 16px 0 0 6px;
  background: url(../../assets/img/btn-icon-new.png) -15px -571px no-repeat;
}

.gray-btn-menu .menu-list {
  display: none;
  position: absolute;
  right: -1px;
  top: -1px;
  width: 100%;
  padding: 38px 0 6px;
  background: #fff;
  border: 1px solid #dbdde2;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 #eee;
}

.gray-btn-menu-on .menu-list,
.white-btn-menu-on .menu-list {
  display: block;
}

.gray-btn-menu .menu-list li {
  height: 24px;
  line-height: 24px;
  padding: 0 3px 3px;
  text-align: left;
  font-size: 12px;
}

.gray-btn-menu .menu-list li a {
  display: block;
  padding: 0 15px;
  border-radius: 3px;
  color: #999;
}

.gray-btn-menu .menu-list li a:hover {
  background: #c7c7ca;
  color: #fff;
}

.gray-btn-menu .menu-list li.selected a {
  background: #8f9096;
  color: #fff;
  cursor: default;
}

.account-order .sort-time-menu {
  width: 118px;
}

.gray-btn-menu-on .label .arrow,
.white-btn-menu-on .label .arrow {
  margin-top: 15px;
  background-position: -15px -521px;
}

.gray-btn-menu-on,
.white-btn-menu-on {
  position: relative;
  z-index: 10;
  height: auto;
  background: #fff;
}

.gray-btn-menu-on {
  border: 1px solid #dbdde2;
}

.gray-box,
.gray-btn-menu-on:hover {
  background: #fff;
}

.gray-box .gray-sub-title {
  display: flex;
  justify-content: space-between;
  height: 38px;
  padding: 0 24px;
  background: #eee;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  line-height: 38px;
  font-size: 12px;
  color: #666;
}

.account-order .gray-box .box-inner:first-child .gray-sub-title {
  border-top: none;
}

.order-list-cart .cart-title span {
  position: relative;
  text-align: center;
}

.order-list-cart .cart-title .num {
  position: absolute;
  margin-left: 400px;
}

.order-list-cart .cart-title .ti {
  position: absolute;
  margin-left: 200px;
}

.order-list-cart .cart-title .order-detail {
  position: absolute;
  right: 50px;
}

.order-list-cart .cart-title .sub-total {
  position: absolute;
  margin-left: 600px;
}

.order-list-cart .cart-title .date,
.order-list-cart .cart-title .order-id {
  float: left;
  text-align: left;
}

.order-list-cart .cart-title .date {
  width: 108px;
  padding-left: 6px;
}

.order-list-cart .cart-title .order-detail {
  width: 82px;
  padding-left: 24px;
  text-align: center;
}

.order-list-cart .cart-title .sub-total {
  width: 102px;
  padding-right: 18px;
  text-align: right;
}

.order-list-cart .cart-title .num {
  width: 70px;
}

.order-list-cart .cart-title .price {
  width: 85px;
  padding-right: 27px;
  text-align: right;
}

.order-list-cart .cart {
  float: left;
  width: 737px;
  padding: 0;
}

.order-cart .cart-items {
  position: relative;
  padding: 18px 0 28px;
  border-top: 1px solid #efefef;
}

.order-list-cart .cart-items {
  height: 110px;
  padding: 0;
  width: 100%;
}

.order-cart .cart-items:first-child {
  border-top: none;
}

.order-cart .prod-info {
  position: relative;
  margin-left: 138px;
}

.order-list-cart .prod-info {
  padding: 15px 0 15px 111px;
  margin-left: 0;
  position: relative;
  width: 100%;
}

.order-list-cart .items-thumb {
  position: absolute;
  left: 30px;
  top: 15px;
  width: 78px;
  height: 78px;
  border-radius: 3px;
}

.order-list-cart .items-thumb img {
  width: 78px;
  height: 78px;
}

.order-list-cart .items-params {
  float: left;
  height: 50px;
  padding: 15px 0;
  margin-left: 29px;
  border-bottom: none;
  line-height: 25px;
}

.order-list-cart .prod-info .check {
  position: absolute;
  line-height: 80px;
  text-align: center;
  width: 70px;
  margin-left: 760px;
}

.order-list-cart .prod-info .vh-center {
  height: auto;
  line-height: 50px;
}

.order-list-cart .prod-info .total {
  position: absolute;
  line-height: 80px;
  text-align: center;
  margin-left: 620px;
}

.order-list-cart .prod-info .num {
  position: absolute;
  line-height: 80px;
  text-align: center;
  width: 100px;
  margin-left: 540px;
  display: flex;
  /* 使用 Flexbox 布局 */
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  white-space: nowrap;
}

.order-list-cart .prod-info .username {
  position: absolute;
  line-height: 80px;
  text-align: center;
  width: 100px;
  margin-left: 300px;
}

.blue-small-btn,
.orange-small-btn,
.white-gray-small-btn {
  display: inline-block;
  height: 30px;
  padding: 0 13px;
  border-radius: 4px;
  line-height: 30px;
  font-size: 12px;
  cursor: pointer;
}

.upload {
  position: absolute;
  display: inline-block;
  right: 30px;
}

.file_name {
  width: 140px;
  position: absolute;
  margin-left: 30px;
  display: flex;
  /* 使用 Flexbox 布局 */
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  white-space: nowrap;
  /* 不换行 */
  /* overflow: hidden; */
  /* 超出部分隐藏 */
  /* text-overflow: ellipsis; */
  /* 超出部分显示省略号 */
}
</style>
