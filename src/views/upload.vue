<template>
    <div id="main">
        <headerUpload />
        <div class="up_container">
            <img src="../assets/img/上传背景图.png" alt="">
            <div v-loading="loading" element-loading-text="模块上传中" class="form">
                <p style="color: black;font-size: 24px;margin-top: -30px;margin-bottom: 20px;">上传模块</p>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" enctype="multipart/form-data"  class="demo-ruleForm"
                    :hide-required-asterisk="true">
                    <el-form-item label="名称" prop="file_name">
                        <el-input v-model="ruleForm.file_name"></el-input>
                    </el-form-item>
                    <el-form-item label="类别" prop="type">
                        <el-select v-model="ruleForm.type" placeholder="请选择类别">
                            <el-option label="前端开发" value="0"></el-option>
                            <el-option label="后端开发" value="1"></el-option>
                            <el-option label="数据库" value="2"></el-option>
                            <el-option label="移动端开发" value="3"></el-option>
                            <el-option label="云计算与DevOps" value="4"></el-option>
                            <el-option label="安全技术栈" value="5"></el-option>
                            <el-option label="版本控制与协作" value="6"></el-option>
                            <el-option label="Web开发工具与库" value="7"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="介绍" prop="title">
                        <el-input type="textarea" v-model="ruleForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="选择封面:" prop="imgList">
                        <el-upload class="upload-img" ref="uploadimg" action="" :show-file-list="true"
                            :http-request="upload_img" :file-list="imgList" list-type="picture" :limit="1"
                            :auto-upload="true" :on-change="onchangeImg" :on-remove="moveImg">
                            <el-button size="small" style="background-color:#438E82;color: white;">请选择一张照片</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="上传文件:" prop="fileList">

                        <!-- <el-upload class="upload-demo" ref="upload" action="http://localhost:8081/file/upFile"
                  :show-file-list="true" :file-list="fileList" :limit="5">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传.xlsx文件，且不超过5M</div>
                  <div v-if="fileList.length === 0" style="color: red;">请上传文件</div>
              </el-upload> -->


                        <el-upload class="upload-file" ref="uploadfile" action="" :http-request="upload_file"
                            :show-file-list="true" :file-list="fileList" :limit="1" :auto-upload="true"
                            :on-change="onchangeFile" :on-remove="moveFile">
                            <el-button slot="trigger" size="small"
                                style="background-color:#438E82;color: white;">请选取一个文件</el-button>
                        </el-upload>

                    </el-form-item>
                    <el-form-item>

                        <el-button style="border-radius: 30px;" @click="resetForm('ruleForm')">重置</el-button>
                        <el-button style="background-color:#438E82;color: white;border-radius: 30px;"
                            @click="submitForm('ruleForm')">发布</el-button>

                    </el-form-item>
                </el-form>

            </div>
        </div>
        <fooster></fooster>
    </div>
</template>

<script>
import axiosUtil from '@/util/axios';
import headerUpload from '../components/header-upload.vue';
import fooster from '../components/fooster.vue';

export default {
    components: {
        headerUpload,
        fooster
    },
    data() {
        return {
            ruleForm: {
                file_name: '',//标题
                type: '',//类型
                title: '',//内容
                file_image: '',//封面
                file_path: '',
                upload: "",
            },
            loading: false,
            fileList: [],
            imgList: [],
            rules: {
                file_name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },

                ],
                type: [
                    { required: true, message: '请选择类别', trigger: 'change' }
                ],

                title: [
                    { required: true, message: '请填写详情', trigger: 'blur' }
                ],
                fileList: {
                    validator: (rule, value, callback) => {
                        if (this.fileList.length === 0) {  // 使用 value 参数获取 file list
                            callback(new Error('请上传文件'));
                        } else {
                            callback();
                        }
                    },
                    trigger: 'blur'
                },
                imgList: {
                    validator: (rule, value, callback) => {
                        if (this.imgList.length === 0) {  // 使用 value 参数获取 file list
                            callback(new Error('请上传图片'));
                        } else {
                            callback();
                        }
                    },
                    trigger: 'blur'
                }
            }
        };
    },
    methods: {
        upload_file(param) {
            const formData = new FormData()
            formData.append('file', param.file)
            const url = 'http://localhost:8081/file/upFile';
            this.axios.post(url, formData).then(res => {
                console.log('上传文件', res.data)
                this.ruleForm.file_path = res.data.data
            }).catch(response => {
                console.log('上传失败')
            })
        },
        upload_img(param) {
            const formData = new FormData()
            formData.append('file', param.file)
            const url = 'http://localhost:8081/file/upFile';
            this.axios.post(url, formData).then(res => {
                console.log('上传文件', res.data)
                this.ruleForm.file_image = res.data.data
            }).catch(response => {
                console.log('上传失败')
            })
        },

        onchangeImg(file, fileList) {
            this.imgList = fileList;



        },
        moveImg(file, fileList) {
            this.imgList = fileList;


        },
        onchangeFile(file, fileList) {
            this.fileList = fileList;

        },
        moveFile(file, fileList) {
            this.fileList = fileList;

        },
        submitForm(formName) {
            this.getTime();


            //this.$refs.uploadimg.submit();
           // this.$refs.uploadfile.submit();

           console.log(this.ruleForm);

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    setTimeout(() => {
                        console.log(this.ruleForm);
                        axiosUtil.post('/user/info', this.ruleForm).then(res => {
                            console.log(res.data, '提交成功');
                            this.$message({
                                message: '上传成功',
                                type: 'success'
                            });
                            this.$router.push({ path: '/address' })
                        });
                    }, 1500);

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        getTime() {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 补齐月份的零
            const day = String(date.getDate()).padStart(2, '0'); // 补齐日期的零
            const formattedDate = `${year}-${month}-${day}`;
            console.log(formattedDate);
            this.ruleForm.upload = formattedDate;


        }
    }
}
</script>

<style scoped>
.up_container {
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
    overflow-y: hidden;
}

img {
    position: fixed;
    z-index: -1;
    top: 0;
    bottom: 70px;
    left: 0;
    right: 0;
}

.demo-ruleForm {
    margin: 0 0 0 10px;
    width: 600px;
}

.form {
    /* border: 1px solid yellow; */
    width: 700px;
}
</style>