<template>
  <div id="header" ref="test" :class="{ fixed: isFixed }">
    <div class="nav-global head-top">
      <div class="container">
        <h1 class="nav-logo">
          <img src="../assets/img/head/logo.png" />
          <div class="head-name">应用开发AI推荐系统平台</div>
        </h1>
        <ul class="nav-aside">
          <li class="nav-user" v-if="loggedIn">
            <router-link to="/account">个人中心</router-link>
            <!-- 个人中心下方的悬浮信息 -->
            <div class="nav-user-wrapper">
              <div class="nav-user-list">
                <dl class="nav-user-avatar">
                  <dd><span class="ng-scope"></span></dd>
                  <dt class="ng-binding">
                    {{ userInfo.userLKnm }}
                  </dt>
                </dl>
                <ul>
                  <li class="order">
                    <router-link to="/account" exact>我的收藏</router-link>
                  </li>
                  <li class="address">
                    <router-link to="/address">我的上传</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <!-- 登出 -->
          <div class="logout" v-if="loggedIn" @click="logout"><img src="../assets/img/login/logout.png"></div>
          <!-- 登陆注册 -->
          <div class="nav-lore" v-if="!loggedIn">
            <router-link to="/login" class="iconfont nav-login">
              <div class="head-login">登录</div>
              <div class="fenge">|</div>
              <div class="head-register">注册</div>
              <!--          <div class="head-register">退出</div>-->
            </router-link>
          </div>
        </ul>
      </div>
    </div>
    <!-- 菜单栏，部分有点击效果 -->
    <div class="nav-sub">
      <div class="nav-sub-wrapper">
        <div class="container">
          <ul class="nav-list">
            <router-link to="/phone" exact tag="li" activeClass="active">
              <a>首页</a>
            </router-link>
            <router-link to="/listOne" exact tag="li" activeClass="active">
              <a>前端开发</a>
            </router-link>
            <router-link to="/listTwo" exact tag="li" activeClass="active">
              <a>React</a>
            </router-link>
            <router-link to="/listThree" exact tag="li" activeClass="active">
              <a>后端开发</a>
            </router-link>
            <router-link to="/listFour" exact tag="li" activeClass="active">
              <a>Spring Boot项目</a>
            </router-link>
            <router-link to="/listFive" exact tag="li" activeClass="active">
              <a>Java Web</a>
            </router-link>
            <router-link to="/listSix" exact tag="li" activeClass="active">
              <a>响应式开发</a>
            </router-link>
            <router-link to="/listSeven" exact tag="li" activeClass="active">
              <a>云服务集成</a>
            </router-link>
            <router-link to="/listEight" exact tag="li" activeClass="active">
              <a>跨平台开发</a>
            </router-link>
            <router-link to="/chart" exact tag="li" activeClass="active">
              <a>可视化数据</a>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  computed: {
    loggedIn() {
      // 检查是否存在token
      return window.sessionStorage.getItem("token") !== null;
    },
    userInfo() {
      let userInfo = window.sessionStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);
      console.log(userInfo);
      return userInfo;
    }
  },
  data() {
    return {
      isFixed: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      const testEle = this.$refs.test;
      if (scrollTop > testEle.offsetTop) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    },
    logout() {
      // 从本地存储中删除token
      sessionStorage.removeItem('token');
      sessionStorage.removeItem("userInfo");
      window.location.reload();
    }
  },
};
</script>
<style>
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}

body {
  background-color: #f0f0f0;
}

.nav-lore {
  position: relative;
  display: flex;
  width: 50px;
}

.iconfont {
  position: absolute;
  font-size: 22px;
  margin-left: 15px;
  font-weight: bold;
}

.head-top {
  background-color: #fff;
  height: 70px;
  display: flex;
  align-items: center;
  /* 垂直居中 */
  box-shadow: #868686;
}

.nav-logo img {
  max-width: 94.41px;
  /* 设置为图片的原始宽度 */
  height: auto;
  /* 自动计算高度，保持原始比例 */
}

.nav-logo {
  display: flex;
}

.head-name {
  margin-left: 10px;
  color: rgb(1, 1, 1);
  line-height: 20px;
  font-size: 18px;
  font-weight: 400;
}

.nav-user>a:before {
  content: " ";
  position: absolute;
  left: 8px;
  width: 20px;
  top: -12px;
  height: 20px;
  background-size: 240px 107px;
  transition: none;
}

.head-login {
  width: 40px;
  height: 30px;
  color: B0B0B0;
  line-height: 18px;
  font-size: 16px;
  margin-top: -10px;
  display: flex;
}

.head-register {
  width: 40px;
  height: 30px;
  color: B0B0B0;
  line-height: 18px;
  font-size: 16px;
  margin-left: 45px;
  margin-top: -30px;
}

.fenge {
  width: 40px;
  height: 30px;
  color: B0B0B0;
  line-height: 18px;
  font-size: 16px;
  margin-left: 37px;
  margin-top: -30px;
}

.nav-list li a {
  color: #868686;
}

.active a::after {
  content: "";
  display: block;
  width: 60%;
  height: 3px;
  background-color: #189c86;
  position: absolute;
  bottom: 0;
  left: 50%;
  /* 左侧边缘位于容器的中心位置 */
  transform: translateX(-50%);
  /* 将横线向左移动自身宽度的一半，实现水平居中对齐 */
  border-radius: 2px;
}

.nav-sub-wrapper {
  background: #ffffff;
  border-top: 0.5px solid rgb(216, 215, 215);
  border-bottom: 0.5px solid rgb(216, 215, 215);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.logout {
  position: relative;
  display: flex;
  width: 20px;
  height: 20px;
  left: 20px;
  bottom: 12px;
}

.logout img {
  position: absolute;
  width: 20px;
  height: 20px;
}
</style>
