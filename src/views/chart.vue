<template>
  <div id="main">

    <headerUpload />
    <div class="container">
      <el-card style="height: 270px;">
        <div ref="echarts1" style="height: 270px;"></div>
      </el-card>
      <el-card style="height: 270px;">
        <div ref="echarts2" style="height: 270px;"></div>
      </el-card>
      <el-card style="height: 270px;">
        <div ref="echarts3" style="height: 270px;"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import axiosUtil from '@/util/axios';
import headerUpload from '../components/header-upload.vue';
import * as echarts from 'echarts';


export default {

  components: {
    headerUpload
  },
  data() {
    return {
  echarts1_data: [
    ['努力学习组', '13'],
    ['代码猎人组', '7'],
    ['像素玩家组', '2'],
    ['数据狂想组', '9'],
    ['二进制诗人组', '14'],
    ['NaN的信仰', '6'],
    ['学习游击组', '8'],
    ['AI探险组', '13'],
    ['赛博朋克组', '15'],
    ['余弦悲伤组', '7'],
    ['量子忧郁组', '8'],
    ['梯度下降组', '9']
  ],
  echarts2_data: [
    ['努力学习组', '18'],
    ['代码猎人组', '2'],
    ['像素玩家组', '11'],
    ['数据狂想组', '20'],
    ['二进制诗人组', '5'],
    ['NaN的信仰', '0'],
    ['学习游击组', '14'],
    ['AI探险组', '7'],
    ['赛博朋克组', '13'],
    ['余弦悲伤组', '19'],
    ['量子忧郁组', '3'],
    ['梯度下降组', '16']
  ],
  echarts3_data: [
    ['努力学习组', '4'],
    ['代码猎人组', '12'],
    ['像素玩家组', '1'],
    ['数据狂想组', '17'],
    ['二进制诗人组', '9'],
    ['NaN的信仰', '20'],
    ['学习游击组', '6'],
    ['AI探险组', '15'],
    ['赛博朋克组', '10'],
    ['余弦悲伤组', '8'],
    ['量子忧郁组', '0'],
    ['梯度下降组', '11']
  ]
}
  },
  methods: {

  },
  mounted() {

    axiosUtil.get('/user/user/echar')
      .then(response => {
      //   console.log(response.data.data);
      //   this.echarts1_data = response.data.data.resList1;
      //   this.echarts2_data = response.data.data.resList2;
      //   this.echarts3_data = response.data.data.resList3;
      //   // 表1
      // console.log(this.echarts1_data);
      
        const echarts1 = echarts.init(this.$refs.echarts1)
        const echarts1Option = {
          legend: {
            //图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            //字符串类型
            left: "20%"
          },
          //提示框
          tooltip: {
            trigger: "axis"
          },
          xAxis: {
            type: "category",//类目轴
            data: this.echarts1_data.map(item => item[0]),
            axisLine: {
              lineStyle: {
                color: "#17b3a3"
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            }
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3"
                }
              }
            }
          ],
          color: ["rgb(60, 148, 133)"],
          series: [
            {
              name: "发布量",
              data: this.echarts1_data.map(item => item[1]),
              type: "bar",
              barWidth: 40
            }
          ]
        }
        echarts1.setOption(echarts1Option);
        //表二
        const echarts2 = echarts.init(this.$refs.echarts2)
        const echarts2Option = {
          legend: {
            //图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            //字符串类型
            left: "20%"
          },
          //提示框
          tooltip: {
            trigger: "axis"
          },
          xAxis: {
            type: "category",//类目轴
            data: this.echarts2_data.map(item => item[0]),
            axisLine: {
              lineStyle: {
                color: "#17b3a3"
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            }
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3"
                }
              }
            }
          ],
          color: ["rgb(60, 148, 133)"],
          series: [
            {
              name: "下载量",
              data: this.echarts2_data.map(item => item[1]),
              type: "bar",
              barWidth: 40
            }
          ]
        }
        echarts2.setOption(echarts2Option);
        //表三
        const echarts3 = echarts.init(this.$refs.echarts3)
        const echarts3Option = {
          legend: {
            //图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            //字符串类型
            left: "20%"
          },
          //提示框
          tooltip: {
            trigger: "axis"
          },
          xAxis: {
            type: "category",//类目轴
            data: this.echarts3_data.map(item => item[0]),
            axisLine: {
              lineStyle: {
                color: "#17b3a3"
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            }
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3"
                }
              }
            }
          ],
          color: ["rgb(60, 148, 133)"],
          series: [
            {
              name: "收藏量",
              data: this.echarts3_data.map(item => item[1]),
              type: "bar",
              barWidth: 40
            }
          ]
        }
        echarts3.setOption(echarts3Option)
      })
      .catch(error => {
        console.error('Error fetching favorites:', error);
      });
  }
}
</script>

<style scoped></style>