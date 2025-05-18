<template>
  <div class="account-content">
    <div class="account-profile">
      <div class="gray-box">
        <div class="title columns-title pre-title">
          <h2>个人中心</h2>
        </div>
        <div class="profile-form">
          <el-form :model="userInfo" :rules="rules" ref="userForm" label-width="100px">
            <el-form-item label="头像" prop="avatar">
              <el-upload
                class="avatar-uploader"
                action="/user/uploadAvatar"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
              <i  class="el-icon-plus avatar-uploader-icon"></i>
                <!-- <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
              </el-upload>
            </el-form-item>
            <el-form-item class="el-input" label="用户名" prop="username">
              <el-input style="width: 500px;" v-model="userInfo.username" placeholder="请输入用户名"> </el-input>
            </el-form-item>
            <el-form-item  class="el-input"  label="旧密码" prop="passwordbefore">
              <el-input style="width: 500px;" type="password" autocomplete="off" placeholder="请输入旧密码"
              show-password v-model="userInfo.passwordbefore"  ></el-input>
            </el-form-item>
            <el-form-item  class="el-input"  label="新密码" prop="password">
              <el-input style="width: 500px;" type="password" autocomplete="off" placeholder="请输入新密码"
              show-password v-model="userInfo.password"  ></el-input>
            </el-form-item>
            <el-form-item  class="el-input"  label="新密码确认" prop="passwordconfirm">
              <el-input style="width: 500px;" type="password" autocomplete="off"
              placeholder="请确认新密码"
              show-password v-model="userInfo.passwordconfirm"  ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button  @click="submitForm('userForm')" class="shangchuan">保存修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosUtil from "@/util/axios";

export default {
  computed: {
    userInfobefore() {
      let userInfobefore = window.sessionStorage.getItem("userInfo");
      userInfobefore = JSON.parse(userInfobefore);
      console.log(userInfobefore);
      return userInfobefore;
    }
  },
  data() {
    return {
      userInfo: {
        avatar: '',
        username: '',
        password: '',
        passwordbefore: '',
        passwordconfirm: ''
      },
      rules: {
        passwordbefore: [
        {
          validator: (rule, value, callback) => {
            if (value !== this.userInfobefore.password) {
              callback(new Error('输入的旧密码与当前密码不一致'));
            } else {
              callback();
            }
          },
          trigger: 'enter'
        }
        ],
        passwordconfirm: [
        {
          validator: (rule, value, callback) => {
            if (value !== this.userInfo.password) {
              callback(new Error('两次输入的新密码不一致'));
            } else {
              callback();
            }
          },
          trigger: 'blur'
        }
      ]
      }
    };
  },
  mounted() {
    // this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      axiosUtil.get("/user/getUserInfo")
        .then((res) => {
          this.userInfo = res.data.data;
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    },
    handleAvatarSuccess(response, file) {
      this.userInfo.avatar = URL.createObjectURL(file.raw);
      // 可添加更新头像到后端的逻辑
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error('头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('头像图片大小不能超过 2MB!');
      }
      return (isJPG || isPNG) && isLt2M;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axiosUtil.post("/user/updateUserInfo", this.userInfo)
            .then((res) => {
              this.$message.success('个人信息更新成功');
            })
            .catch((error) => {
              console.error("Error updating user info:", error);
              this.$message.error('个人信息更新失败');
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 150px;
  height: 150px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/* .avatar-uploader .el-upload:hover {
  border-color: #409EFF;
} */
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.shangchuan {
  background-color: rgb(60, 148, 133);
  color: floralwhite;
}

</style>
