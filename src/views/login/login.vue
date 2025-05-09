<template>
  <div class="container">
    <div class="top">
      <div class="logo"><img src="../../assets/img/login/top_logo.png"></div>
      <div class="logo1">
        <!-- <img src="../../assets/img/head/logo.png" alt=""> -->
      </div>
      <div class="logo_text">软件开发功能模块推荐系统平台</div>
    </div>
    <div class="login-container">
      <div class="logo3"><img src="../../assets/img/login/top_logo.png"></div>
      <form @submit.prevent="handleLogin">
        <input type="text" id="username" v-model="username" placeholder="账号/学号" required>
        <input type="password" id="password" v-model="password" placeholder="密码" required>
        <button type="submit">登录</button>
        <router-link to="/register" class="zhuce">点击注册 ></router-link>
      </form>
    </div>
  </div>
</template>

<script>

import axiosUtil from '@/util/axios';
import form from "autoprefixer/lib/value";
import { userInfo } from 'os';
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    handleLogin() {
      // 处理登录逻辑
      console.log('Username:', this.username);
      console.log('Password:', this.password);
      axiosUtil.post("user/login", {
        username: this.username,
        password: this.password
      })
        .then(response => {
          if(response.data.success){
            console.log(response.data.data);
            sessionStorage.setItem("token", response.data.data.token);
            sessionStorage.setItem("userInfo", JSON.stringify(response.data.data.userInfo))
            // 登录成功后的逻辑
            const redirectPath = window.sessionStorage.getItem('redirectPath');
            if (redirectPath) {
              window.sessionStorage.removeItem('redirectPath'); // 清除保存的路径
              window.location.href = redirectPath; // 跳转回原页面
              // this.$router.push(redirectPath);// 跳转到原页面
            } else {
              this.$router.push('/phone');// 默认跳转到首页
              this.$message({
                message: "登录成功",
                type: 'success'
              });
            }
          

          }else{
            this.$message.error(response.data.errorMsg);
          }
        })
        .catch(error => {
          this.$message.error("系统运行出错，请联系管理员");
        });
    },
  }
};
</script>

<style scoped>
.container {
  position: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-image: url('../../assets/img/login/bg_login.png'); /* 背景图片的路径 */
  background-size: cover; /* 背景图片铺满整个容器 */
  background-position: center; /* 背景图片居中显示 */
  background-repeat: no-repeat;
}
.login-container {
  position: relative;
  max-width: 350px;
  height: 350px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 80px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #fff;
}

.logo3 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  height: 80px;
}

.logo3 img {
  display: flex;
  width: 80px;
  height: 100%;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

input {
  width: 240px;
  padding: 15px;
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 15px; /* 设置边框圆角 */
  background-color: rgba(97, 97, 97, 0.1);
  padding: 10px;
  color: #333; /* 设置文字颜色 */
  font-size: 16px; /* 设置字体大小 */
}

input::placeholder {
  color: #999; /* 设置文字颜色 */
}

button {
  margin-top: 15px;
  padding: 10px;
  width: 240px;
  background-color: #438E82;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.top {
  display: flex;
  align-items: center;
  background-color: inherit;
  height: 45px;
  padding: 0 30px; /* 增加左右内边距 */
}
.logo img {
  line-height: 45px;
  width: 42px;
  height: 42px;
}
.logo1 img {
  width: 40px;
  height: 10px;
  margin-left: 10px;
}
.logo_text {
  line-height: 45px;
  padding-top: 5px;
  font-size: 16px;
  margin-left: 10px;
  font-weight: bold;
  color: rgb(1, 1, 1);
}
.zhuce {
  margin-top: 10px;
  font-size: 12px;
  color: #999;
}
</style>
