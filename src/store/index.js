import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    carPanelData: [],
    receiveInfo: [{
      'name': '王某某',
      'phone': '13811111111',
      'areaCode': '010',
      'landLine': '64627856',
      'provinceId': 110000,
      'province': '北京市',
      'cityId': 110100,
      'city': '市辖区',
      'countyId': 110106,
      'county': '海淀区',
      'add': '上地十街辉煌国际西6号楼319室',
      'default': true,
      'checked': true
    },{
      'name': '李某某',
      'phone': '13811111111',
      'areaCode': '010',
      'landLine': '64627856',
      'provinceId': 110000,
      'province': '北京市',
      'cityId': 110100,
      'city': '市辖区',
      'countyId': 110106,
      'county': '海淀区',
      'add': '上地十街辉煌国际东6号楼350室',
      'default': false,
      'checked': false
    }],
    provisionalOrder: [],
    orderData: [
      {
        iDate: '2024-01-30',
        goodsData: [
          {
            userid: '123456',
            ali_image: '',
            title: 'Title 1',
            author: '王芝麻',
            subject: 'C语言课程设计'
          },
          {
            userid: '123456',
            ali_image: '',
            title: 'Title 2',
            author: '王芝麻',
            subject: 'C语言课程设计'
          }
        ],
      },
      {
        iDate: '2024-01-25',
        goodsData: [
          {
            userid: '678910',
            ali_image: 'https://example.com/product3.jpg',
            title: 'Title 3',
            author: '王芝麻',
            subject: 'C语言课程设计'
          }
        ],
      }
    ],
    maxOff: false,
    carShow: false,
    ball: {
      show: false,
      el: null,
      img: ''
    }
  },
  }
)

export default store
