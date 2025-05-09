// 引入axios
import axios from 'axios';
import router from '@/router';
// 创建axios实例
// let baseURL="http://8.137.114.181:8081/";
let baseURL='http://localhost:8081/';
const httpService = axios.create({
  // url前缀-'http:xxx.xxx'
  // baseURL: process.env.BASE_API, // 需自定义
  baseURL: baseURL,
  // 请求超时时间
  timeout: 3000 // 需自定义
});

//添加请求和响应拦截器
// 添加请求拦截器
httpService.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let token = window.sessionStorage.getItem('token');
  if (token) {
    config.headers.common['authorization'] = token;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
httpService.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 检查响应数据中的 code
  // if (response.data && response.data.code === 401) {
  //   alert('登录超时，请重新登录！');

  //   // 保存当前页面路径
  //   const currentPath = window.location.pathname + window.location.search;
  //   window.sessionStorage.setItem('redirectPath', currentPath);

  //   // 跳转到登录页面
  //   router.push('/login');
  //   console.log('跳转到登录页面');
  //   // return Promise.reject(new Error(response.data.errorMsg || '用户登录过期'));
  // }
  return response;
},   function (error) {
  // 对响应错误做点什么
 
});

/*网络请求部分*/

/*
 *  get请求
 *  url:请求地址
 *  params:参数
 * */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    httpService({
      url: url,
      method: 'get',
      params: params
    }).then(response => {
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

/*
 *  post请求
 *  url:请求地址
 *  params:参数
 * */
export function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    httpService({
      url: url,
      method: 'post',
      data: params
    }).then(response => {
      console.log(response)
      resolve(response);
    }).catch(error => {
      console.log(error)
      reject(error);
    });
  });
}

/*
 *  文件上传
 *  url:请求地址
 *  params:参数
 * */
export function fileUpload(url, params = {}) {
  return new Promise((resolve, reject) => {
    httpService({
      url: url,
      method: 'post',
      data: params,
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

export function getServerUrl(){
  return baseURL;
}

export default {
  get,
  post,
  fileUpload,
  getServerUrl
}
