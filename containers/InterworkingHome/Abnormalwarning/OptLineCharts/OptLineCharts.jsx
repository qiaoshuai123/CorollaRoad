import React from 'react'
import echarts from 'echarts'

class evaluateEcharts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => {
    this.chartsBoxer = echarts.init(this.chartsBox)
    this.renders()
  }
  renders = () => {
    const { name, dataList } = this.props
    let xDatasName = null
    const xDatas = []
    const xNumber = []
    if (name === 'getNearSevenCountList') {
      xDatasName = 'time' // time 是日期 week 是星期
    } else if (name === 'getRoadCountList') {
      xDatasName = 'roadname'
    }
    dataList.forEach((item) => {
      xDatas.push(item[xDatasName])
      xNumber.push(item.num)
    })
    this.renderCharts(this.chartsBoxer, xDatas, xNumber, name)
  }
  renderCharts = (chartsBox, xData, seriesData, name) => {
    const options = {
      color: ['#3398DB'],
      title: {
        show: false,
        text: '实时信号控制状态',
        padding: [5, 0, 0, 20],
        textStyle: {
          fontWeight: 'normal',
          color: '#FFFFFF',
        },
      },
      dataZoom: [{
        type: 'slider',
        show: name === 'getNearSevenCountList' ? true : false,
        xAxisIndex: [0],
        left: '9%',
        height: 10,
        handleSize: 0, // 滑动条的 左右2个滑动条的大小
        borderColor: '#1C385F',
        fillerColor: '#269cdb',
        bottom: 10,
        start: 0,
        end: 30, // 初始化滚动条
      }],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        data: [''],
        textStyle: { // ----图例内容样式
          color: '#FFFFFF', // ---所有图例的字体颜色
          // backgroundColor:'black',  //---所有图例的字体背景色
        },
      },
      grid: {
        show: false, // ---是否显示直角坐标系网格
        top: '13%', // 等价于 y: '16%'
        left: '13%',
        bottom: '58', // ---相对位置，top\bottom\left\right
        containLabel: false, // ---grid 区域是否包含坐标轴的刻度标签
      },
      xAxis: {
        type: 'category',
        data: xData, // ['离点断线', '关灯控制', '全红控制', '黄闪控制', '本地多时段', '本地感应', '中心多时段', '勤务控制'],
        axisLabel: {
          show: true,
          textStyle: {
            color: '#5dbaf7', // 更改坐标轴文字颜色
            fontSize: 12, // 更改坐标轴文字大小
          },
          interval: 0,
          formatter(value) {
            let ret = ''
            const maxLength = 10 // 每项显示文字个数
            const valLength = value.length // X轴类目项的文字个数
            const rowN = Math.ceil(valLength / maxLength) // 类目项需要换行的行数
            if (rowN > 1) { // 如果类目项的文字大于3
              for (let i = 0; i < rowN; i++) {
                let temp = '' // 每次截取的字符串
                const start = i * maxLength // 开始截取的位置
                const end = start + maxLength // 结束截取的位置
                temp = `${value.substring(start, end)}\n`
                ret += temp // 凭借最终的字符串
              }
              return ret
            }
            return value
          },
        },
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          // show: true,
          lineStyle: {
            color: '#1C385F', // 轴的颜色
          },
        },
      },
      yAxis: {
        type: 'value',
        splitLine: { // ---grid 区域中的分隔线
          show: true, // ---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
          lineStyle: {
            color: ['#2A4065'],
            width: 1,
            type: 'solid',
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#5dbaf7', // 更改坐标轴文字颜色
            fontSize: 13, // 更改坐标轴文字大小
          },
        },
        axisLine: {
          lineStyle: {
            color: '#1C385F', // 轴的颜色
          },
        },
      },
      series: [
        {
          name: '',
          type: 'bar',
          barWidth: '10%',
          data: seriesData, // [60, 80, 120, 160, 120, 100, 60, 40],
          itemStyle: {// 柱状图圆角
            // emphasis: {
            //   barBorderRadius: 7,
            // },
            normal: {
              barBorderRadius: [5, 5, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: '#05427B', // 0% 处的颜色
              }, {
                offset: 0.6,
                color: '#2099B4', // 60% 处的颜色
              }, {
                offset: 1,
                color: ' #39E8DB ', // 100% 处的颜色
              }], false),
            },
          },
        },
      ],
    }
    chartsBox.setOption(options, true)
  }
  render() {
    return (
      <div style={{ width: '100%', height: 'calc(100% - 30px)' }} ref={(input) => { this.chartsBox = input }} />
    )
  }
}

export default evaluateEcharts
