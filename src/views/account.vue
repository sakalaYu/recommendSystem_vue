<template>
  <div id="main">
    <header-top />
    <div class="content clear">
      <div class="account-wrapper">
        <div class="account-sidebar">
          <div class="avatar gray-box clear">
            <div class="js-account-sidebar-info">
              <div class="tx"><img :src="`http://localhost:8081/file${userInfo.icon}`"></div>
            </div>
            <div class="box-inner">
              <ul class="account-nav">
                <router-link :to="{ name: 'Account' }" exact tag="li" activeClass="current">
                  <a>我的收藏</a>
                </router-link>
                <router-link :to="{ name: 'Address' }" tag="li" activeClass="current">
                  <a>我的上传</a>
                </router-link>
                <router-link :to="{ name: 'Profile' }" tag="li" activeClass="current">
                  <a>个人中心</a>
                </router-link>
              </ul>
            </div>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
    <fooster></fooster>
  </div>
</template>

<script>
import axiosUtil from '@/util/axios';
import headerTop from '../components/header-top.vue';
import fooster from '../components/fooster.vue';
export default {
  computed: {
    userInfo() {
      let userInfo = window.sessionStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);
      console.log(userInfo);
      return userInfo;
    }
  },
  components: {
    headerTop, fooster
  },
  data() {
    return {
      userId: 1,
      // favorites: []  // 存储用户收藏数据的数组
    };
  },
  mounted() {
    // 在组件加载时调用后端 API 获取用户收藏数据
    // this.fetchFavorites();
  },
  methods: {
    fetchFavorites() {
      // 调用后端 API 获取用户收藏数据
      // axiosUtil.get(`/user/showcollect/${this.userId}`)
      //   .then(response => {
      //     console.log(response.data);
      //   })
      //   .catch(error => {
      //     console.log('Error fetching favorites:', error);
      //   });
    }
  }
};
</script>

<style>
.content {
  clear: both;
  width: 1220px;
  min-height: 600px;
  padding: 0 0 25px;
  margin: 0 auto;
}

.account-wrapper {
  position: relative;
  min-height: 550px;
  margin-top: 50px;
}

.account-sidebar {
  position: absolute;
  left: 0;
  top: 0;
  width: 210px;
}

.gray-box,
.gray-btn-menu-on:hover {
  background: #FFF;
}

.gray-box {
  overflow: hidden;
  border: 1px solid #D1D1D1;
  border-color: rgba(0, 0, 0, .14);
  border-radius: 8px;
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);
}

.account-sidebar .avatar {
  padding-top: 20px;
  margin: 0 0 20px;
  border-radius: 10px;
  text-align: center;
  height: 430px;
}

.account-sidebar .avatar img {
  width: 132px;
  height: 132px;
  display: inline-block;
  border-radius: 50%;
}

.account-sidebar .account-nav {
  padding-top: 15px;
}

.account-sidebar .account-nav li {
  position: relative;
  height: 48px;
  line-height: 48px;
}

.account-sidebar .account-nav .current {
  border: none;
}

.account-sidebar .account-nav a {
  display: block;
  height: 48px;
  padding: 0 30px;
  color: #666;
  -moz-transition: none;
  -webkit-transition: none;
  transition: none;
  margin-top: 20px;
  font-size: 18px;
}

.account-sidebar .account-nav .current a,
.account-sidebar .account-nav a:hover {
  position: relative;
  top: -1px;
  z-index: 1;
  height: 50px;
  background-color: rgb(60, 148, 133);
  line-height: 50px;
  color: #FFF;
  font-size: 18px;
}

.account-content {
  margin-left: 230px;
}

.gray-box .title {
  height: 60px;
  padding: 0 10px 0 28px;
  background: #F5F5F5;
  background: linear-gradient(#FFF, #F5F5F5);
  border-bottom: 1px solid #DCDCDC;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 1px 7px rgba(0, 0, 0, .06);
  line-height: 60px;
  color: #646464;
}

.gray-box .pre-title {
  position: relative;
  z-index: 2;
}

.gray-box .title h2 {
  font-size: 18px;
  font-weight: 400;
  color: #626262;
}

.tx {
  background-color: #F8F8F7;
  display: flex;
  height: 170px;
  width: 170px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0px 0px 55px 0px rgba(0, 0, 0, 0.17);
}

.js-account-sidebar-info {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
