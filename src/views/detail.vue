<template>
  <div>
    <headerUpload />
    <div class="big_contain">
      <img class="bcg" src="../assets/img/详情页背景图.png" alt="">

      <div class="detail_container">
        <div class="left">
          <img :src="item.file_image" alt="商品图片"
            style="width: 550px; height: auto;">

        </div>
        <div class="right">
          <h2 class="name">{{ item.file_name }}</h2>
          <p class="class putu_zi">
            <span class="little_zi">类别</span>
            <span v-show="item.type === 0">前端开发</span>
            <span v-show="item.type === 1">React</span>
            <span v-show="item.type === 2">后端开发</span>
            <span v-show="item.type === 3">Spring Boot项目</span>
            <span v-show="item.type === 4">Java Web</span>
            <span v-show="item.type === 5">响应式开发</span>
            <span v-show="item.type === 6">云服务集成</span>
            <span v-show="item.type === 7">跨平台开发</span>

          </p>
          <div class="description putu_zi" style="display: flex;">
            <p class="little_zi">介绍</p>
            <p style="width: auto;">
              {{ item.title }}
            </p>
          </div>

          <div class="little_contain">
            <p class="publisherName putu_zi">
              <span class="little_zi">发布人</span>
              {{ item.user_name }}
            </p>
            <p class="time putu_zi">
              <span class="little_zi">发布时间</span>
              {{ item.upload }}
            </p>
          </div>
          <div class="botton_contain">
            <el-button icon="el-icon-download"
              style="background-color:#438E82;color: white;border-radius: 30px;height: 40px;"
              @click="downloadFile(item.file_path,item.file_name)">点击下载</el-button>


            <!-- <img style="width: 22px;height: 22px;" src="../assets/img/head/upload.png" alt=""> -->
            <!-- <p class="collection">收藏</p> -->
            <div class="collection" @click="addCarPanelHandle(item.id, item.user_id)">
              <img v-if="!isFavorite" src="../assets/img/icon/collect.png">
              <img v-else src="../assets/img/icon/collected.png">
              <span style="line-height: 40px;">{{ isFavorite ? '取消收藏' : '加入收藏' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <fooster />
  </div>
</template>

<script>
import axiosUtil from '@/util/axios';
import headerUpload from '../components/header-upload.vue';
import fooster from '../components/fooster.vue';


export default {

  components: {
    headerUpload, fooster
  },
  data() {
    return {
      item: {},
      isFavorite: false
    };
  },

  methods: {
    downloadFile(fileName,file_name) {
      const fileUrl = fileName; // 文件的URL地址
      const upload = `http://localhost:8081/file/icon/${fileUrl}`
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
  },
  created() {
    const fileId = this.$route.query.fileId;
    axiosUtil.get('/file/show_info', { id: fileId }).then(res => {
      console.log(res.data.data, '111111');
      const backendData = res.data.data;
      this.item = {
        collect: backendData.collect,
        comment: backendData.comment,
        down_count: backendData.down_count,
        file_image: `${backendData.file_image}`,
        file_name: backendData.file_name,
        file_path: `${backendData.file_path}`,
        id: backendData.id,
        title: backendData.title,
        type: backendData.type,
        upload: new Date(backendData.upload).toISOString().split('T')[0], // 转换为所需日期格式
        user_id: backendData.user_id,
        user_name: backendData.user_name
      };
      console.log(this.item);
    })
  }
};
</script>
<style scoped>
.big_contain {
  position: absolute;
  top: 71px;
  bottom: 70px;
  left: 0;
  right: 0;
  box-sizing: border-box;
  padding: 60px;
  background-color: white;
  overflow-y: scroll;
  z-index: -2;
}

.bcg {
  position: fixed;
  z-index: -1;
  top: 0;
  bottom: 70px;
  left: 0;
  right: 0;
  width: 100%;
}

img {
  width: 500px;
  border-radius: 50px;
}

.detail_container {
  display: flex;
  width: 100%;
  /* border: 1px solid rgb(86, 208, 90); */

}

.left {
  position: relative;
  left: 150px;
  display: flex;
  align-items: center;
  /* 垂直居中 */
  justify-content: center;
  top: 20px;
  /* border: 1px solid skyblue; */
}

.right {
  width: 340px;
  /* border: 1px solid skyblue; */
  position: relative;
  left: 300px;
  text-align: left;
  margin-top: 20px;
}

.name {
  margin-top: 30px;
  color: black;
  font-size: 24px;
  text-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 1);
  font-weight: 400;

}

.little_zi {
  color: rgb(131, 130, 130);
  font-size: 14px;
  margin-right: 16px;
  flex-shrink: 0;
}

.putu_zi {
  color: black;
  font-size: 14px;

}

.class {
  margin-top: 15px;

}

.description {
  margin-top: 15px;

}

.little_contain {
  display: flex;
  margin-top: 15px;
  justify-content: space-between;
}

.botton_contain {
  display: flex;
  margin-top: 35px;
  justify-content: space-around;

}

.collection {
  display: flex;
}

.collection img {
  width: 40px;
  height: 40px;
}
</style>