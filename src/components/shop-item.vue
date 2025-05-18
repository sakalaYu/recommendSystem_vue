<template>
  <div class="item">
    <div>
      <div class="item-img" @click="check(item.id)"><img :src="`http://localhost:8081/file${item.file_image}`"
          style="opacity: 1;">
      </div>
      <h6 style=" white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;">{{ item.file_name }}</h6>
      <h3><img :src="`http://localhost:8081/file${item.user_image}`" alt="">{{ item.user_name }}</h3>
      <div class="shoucang" @click="addCarPanelHandle(item.id, item.user_id)">
        <img v-if="!isFavorite" src="../assets/img/icon/collect.png">
        <img v-else src="../assets/img/icon/collected.png">
        <span>{{ isFavorite ? '取消收藏' : '加入收藏' }}</span>
      </div>
      <div class="pinglun"><img src="../assets/img/user/pl.png"></div>
      <h2>{{ item.type }}</h2>
      <div class="item-btns clearfix" @click="downloadFile(item.file_path, item.file_name,item.id)">
        <span class="upload"><img src="../assets//img//head//upload.png"></span>
      </div>
    </div>
  </div>
</template>
<script>

import axiosUtil from '@/util/axios';  // 导入Axios
export default {
  data() {
    return {
      itemIndex: 0,
      isFavorite: this.item.isCollected == 0 ? false : true, // 收藏状态
    }
  },
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    ball() {
      return this.$store.state.ball
    }
  },
  methods: {
    addCarPanelHandle(itemId, user_id) {
      console.log(itemId)
      console.log(user_id)
      this.isFavorite = !this.isFavorite;
      axiosUtil.post('user/collect', { file_id: itemId, ah_id: user_id })
        .then(response => {
          // 处理后端的响应
          console.log(response.data);
        })
        .catch(error => {
          // 处理请求错误
          console.error('Error adding item to favorites:', error);
        });
    },
    tableData(index) {
      this.itemIndex = index
    },
    toggleFavorite() {

    },
    downloadFile(fileName, file_name,file_id) {
      axiosUtil.get(`file/download`,{ id: file_id })
        .then(response => {
          // 处理下载成功的逻辑
          console.log('Download successful:', response);
        })
        .catch(error => {
          console.error('Download error:', error);
        });
      const fileUrl = fileName; // 文件的URL地址
      const upload = `http://localhost:8081/file/${fileUrl}`
      var request = new XMLHttpRequest();
      request.responseType = "blob";
      // 确保使用正确的URL
      request.open("GET", upload);
      request.onload = function () {
        // 确保请求成功
        if (this.status === 200) {
          var url = window.URL.createObjectURL(this.response);
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.href = url;
          a.download = file_name; // 建议使用实际的文件名
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url); // 释放URL对象
        }
      }
      request.send();
    },
    check(id) {
      console.log(id);
      this.$router.push({ path: '/detail', query: { fileId: id } });
    },
  }
}
</script>

<style>
.sku-box .item {
  position: relative;
  float: left;
  border-right: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  width: 25%;
  height: 335px;
  background: #fff;
  box-sizing: border-box
}

.sku-box .item:hover {
  box-shadow: 0 0 38px rgba(0, 0, 0, .08) inset;
  transition: all .15s ease;
}

.sku-box .item .item-img {
  display: block;
  width: 206px;
  height: 206px;
  margin: 50px auto 10px;
  background-color: #f2f2f2;
}

.sku-box .item .item-img img {
  display: block;
  width: 100%;
  height: 100%;
}

.sku-box .item h6 {
  line-height: 1.2;
  font-size: 20px;
  color: #29544D;
  margin-left: 20px;
}

.sku-box .item h3 {
  display: flex;
  line-height: 1.2;
  font-size: 14px;
  color: #a0a0a0;
  margin-left: 20px;
  margin-top: 10px;
  color: rgb(41, 84, 77);
}

.sku-box .item h3 img {
  width: 20px;
  height: 20px;
  border-radius: 50px;
  margin-right: 5px;
}

.sku-box .item h2 {
  line-height: 1.2;
  font-size: 12px;
  color: #d0d0d0;
  margin-left: 175px;
  margin-top: -10px;
  margin-right: 10px;
  text-align: right;
}

.sku-box .item .item-btns {
  position: relative;
  opacity: 0;
  z-index: 10;
}

.sku-box .item:hover .item-btns {
  opacity: 1;
  transition: all .2s ease-in;
}

.upload {
  position: absolute;
  margin-left: 200px;
  bottom: 270px;
  left: 50px;
}

.upload img {
  width: 22px;
  height: 22px;
}

.shoucang {
  position: absolute;
  display: flex;
  right: 10px;
  bottom: 30px;
  color: rgb(24, 156, 134);
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
}

.shoucang img {
  position: absolute;
  width: 20px;
  height: 20px;
  right: 60px;
}

.pinglun {
  position: absolute;
  display: flex;
  width: 20px;
  height: 20px;
  bottom: 55px;
  right: 10px;
}
</style>
