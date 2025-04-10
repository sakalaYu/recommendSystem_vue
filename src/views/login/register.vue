<template>
  <div class="container">
    <div class="top">
      <div class="logo"><img src="../../assets/img/login/top_logo.png" /></div>
      <div class="logo1">
        <img src="../../assets/img/head/logo.png" alt="" />
      </div>
      <div class="logo_text">应用开发AI推荐系统平台</div>
    </div>
    <div class="login-container">
      <div class="logo3"><img src="../../assets/img/login/top_logo.png" /></div>
      <form @submit.prevent="handleRegister">
        <input type="text" id="userid" v-model="userid" placeholder="请输入用户名" required />
        <input type="text" id="username" v-model="username" placeholder="请输入账号" required />
        <input type="password" id="password" v-model="password" placeholder="请输入密码" required />
        <!-- <p>
          <span>弱</span>
          <span>中</span>
          <span>强</span>
        </p> -->
        <input type="password" id="res_password" v-model="resPassword" placeholder="再次确认密码" required />
        <p v-if="password !== resPassword" class="ensurepassword">两次密码输入不一致，请重新输入。</p>
        <button type="submit">注册</button>
        <div class="zhuce">
          已有账号？<router-link to="/login">立即登录</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axiosUtil from '@/util/axios';
export default {
  data() {
    return {
      userid: '', // 初始化为一个空字符串或其他默认值
      username: '',
      password: '',
      resPassword: ''
    };
  },
  watch: {
    password: function (newVal, oldVal) {
      if (newVal !== this.resPassword) {
        this.resPassword = '';
      }
    },
    resPassword: function (newVal, oldVal) {
      if (newVal !== this.password) {
        // 可以给用户一个提示或者禁用提交按钮
      }
    }
  },
  methods: {
    handleRegister() {
      // 处理注册逻辑
      console.log('Username:', this.username);
      console.log('Password:', this.password);
      axiosUtil.post("/user/register", {
        username: this.username,
        password: this.password,
        res_password: this.resPassword,
        userLKnm: this.userid,
      })
        .then(response => {
          if (response.data.success) {
            console.log(response.data.data);
            this.$router.push('/login');
            this.$message({
              message: "注册成功",
              type: 'success'
            });

          } else {
            this.$message.error(response.data.errorMsg);
          }
        })
        .catch(error => {
          this.$message.error("系统运行出错，请联系管理员");
        });
    },
  },
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
  background-image: url("../../assets/img/login/bg_login.png");
  /* 背景图片的路径 */
  background-size: cover;
  /* 背景图片铺满整个容器 */
  background-position: center;
  /* 背景图片居中显示 */
  background-repeat: no-repeat;
}

.login-container {
  position: relative;
  max-width: 350px;
  height: 465px;
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
  border-radius: 15px;
  /* 设置边框圆角 */
  background-color: rgba(97, 97, 97, 0.1);
  padding: 10px;
  color: #333;
  /* 设置文字颜色 */
  font-size: 16px;
  /* 设置字体大小 */
}

input::placeholder {
  color: #999;
  /* 设置文字颜色 */
}

button {
  margin-top: 15px;
  padding: 10px;
  width: 240px;
  background-color: #438e82;
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
  padding: 0 30px;
  /* 增加左右内边距 */
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

.ensurepassword {
  font-size: 12px;
  color: red;
}
</style>