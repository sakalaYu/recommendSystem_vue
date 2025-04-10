<template>
	<div id="header" ref="test" :class="{ fixed: isFixed }">
	  <div class="nav-global head-top">
		<div class="container">
		  <h1 class="nav-logo">
		
		  </h1>
		</div>
	  </div>
	</div>
  </template>
  <script>
  export default {
    computed: {
      loggedIn() {
        return window.sessionStorage.getItem("token") !== null;
      },
	  userInfo() {
        let userInfo = window.sessionStorage.getItem("userInfo");
        userInfo = JSON.parse(userInfo);
		console.log(userInfo);
        return userInfo;
      },
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
		  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
		const testEle = this.$refs.test;
		if (scrollTop > testEle.offsetTop) {
		  this.isFixed = true;
		} else {
		  this.isFixed = false;
		}
	  },
	}
  };
  </script>
  <style scoped>

  body {
	background-color: #fff;
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
	background-color: #29544D;
	height: 70px;
  position: fixed;
	align-items: center; /* 垂直居中 */
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  bottom: 0;
  left: 0;
  right: 0;
  }
  .nav-logo img {
	max-width: 94.41px; /* 设置为图片的原始宽度 */
	height: auto; /* 自动计算高度，保持原始比例 */
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
  .nav-user > a:before {
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
	left: 50%; /* 左侧边缘位于容器的中心位置 */
	transform: translateX(
	  -50%
	); /* 将横线向左移动自身宽度的一半，实现水平居中对齐 */
	border-radius: 2px;
  }
  .nav-sub-wrapper {
	background: #ffffff;
	border-top: 0.5px solid rgb(216, 215, 215);
	border-bottom: 0.5px solid rgb(216, 215, 215);
  }
  </style>
