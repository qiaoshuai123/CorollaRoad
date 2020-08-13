import React from 'react'
import echarts from 'echarts'

class AreaCharts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.xDatas = ['离点断线', '关灯控制', '全红控制', '黄闪控制', '本地多时段', '本地感应', '中心多时段', '勤务控制']
    this.series = [1, 2, 3, 4, 0]
  }
  componentDidMount = () => {
    this.chartsBox = echarts.init(this.chartsBox)
    this.renders()
  }
  componentDidUpdate = (prevProps) => {
    const { chartsDatas } = this.props
    if (chartsDatas != prevProps.chartsDatas) {
      this.renders()
    }
  }
  renders = () => {
    const { chartsDatas, name } = this.props
    if (chartsDatas) {
      const xData = []
      const seriseData = []
      let values = null
      if (name === 'delay_time') {
        values = 'delay_time'
      } else if (name === 'avg_speed') {
        values = 'avg_speed'
      }
      chartsDatas.forEach((item) => {
        xData.push(item.time)
        seriseData.push(item[values])
      })
      this.renderCharts(this.chartsBox, xData, seriseData)
    }
  }
  renderCharts = (chartsBox, xData, seriesData) => {
    const options = {
      color: ['#3398DB'],
      // title: {
      //   show: false,
      //   text: '实时信号控制状态',
      //   padding: [5, 0, 0, 20],
      //   textStyle: {
      //     fontWeight: 'normal',
      //     color: '#FFFFFF',
      //   },
      // },
      dataZoom: [
        {
          height: 10,
          type: 'slider',
          show: false,
          xAxisIndex: [0],
          start: 0,
          end: xData.length > 5 ? 50 : 100,
          top: 0,
        },
        {
          type: 'inside',
          xAxisIndex: [0],
          start: 50,
          end: 100,
        },
      ],
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
            color: '#C6D2DC', // 更改坐标轴文字颜色
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
            color: '#C6D2DC', // 更改坐标轴文字颜色
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
          type: 'line',
          barWidth: '10%',
          data: seriesData, // [60, 80, 120, 160, 120, 100, 60, 40],
        },
      ],
    }
    chartsBox.setOption(options, true)
  }
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }} ref={(input) => { this.chartsBox = input }} />
    )
  }
}

export default AreaCharts
