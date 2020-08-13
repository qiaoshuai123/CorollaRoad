import React from 'react'
import echarts from 'echarts'

class ExportCharts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.legend = ['东向西', '西向东']
    this.series = [
      {
        name: '东向西',
        type: 'line',
        data: [],
        itemStyle: {
          normal: {
            color: '#01CD74',
          },
        },
        symbol: 'circle',
        symbolSize: 10,
      },
      {
        name: '西向东',
        type: 'line',
        data: [],
        itemStyle: {
          normal: {
            color: '#00DCFE',
          },
        },
        symbol: 'circle',
        symbolSize: 10,
      },
    ]
  }
  componentDidMount = () => {
    this.chartsBoxer = echarts.init(this.chartsBox)
    this.renders()
  }
  componentDidUpdate = (prevProps) => {
    const { dataList } = this.props
    if (dataList != prevProps.dataList) {
      this.renders()
    }
  }
  renders = () => {
    const { dataList, name } = this.props
    let values = null
    if (name === 'getSectionFlow') {
      values = 'section_flow'
    } else if (name === 'getOccupancy') {
      values = 'occupancy'
    }
    const timeList = []
    const lists = []
    const listsTwo = []
    if (dataList.reverse && dataList.reverse.length) {
      dataList.reverse.forEach((item) => {
        timeList.push(item.time)
        lists.push(item[values])
      })
      this.series[1].data = lists
    }
    if (dataList.forward && dataList.forward.length) {
      if (!timeList.length) {
        dataList.forward.forEach((item) => {
          timeList.push(item.time)
          listsTwo.push(item[values])
        })
        this.series[0].data = listsTwo
      } else {
        dataList.forward.forEach((item) => {
          listsTwo.push(item[values])
        })
        this.series[0].data = listsTwo
      }
    }
    // console.log(this.series)
    this.renderCharts(this.chartsBoxer, this.legend, timeList, this.series)
  }
  renderCharts = (myCharts, legend = this.legend, time = this.time, series = this.series) => {
    // 绘制图表
    const options = {
      title: {
        text: '',
        // subtext: '单位：次/车',
        textStyle: {
          top: -20,
          fontSize: 16,
          color: '#fff',
        },
      },
      dataZoom: [
        {
          height: 10,
          type: 'slider',
          show: false,
          xAxisIndex: [0],
          start: 0,
          end: 100,
          bottom: 5,
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
      // toolbox: {
      //   show: true,
      //   top: 20,
      //   right: 10,
      //   feature: {
      //     magicType: { show: true, type: ['line', 'bar'] },
      //   },
      //   iconStyle: {
      //     normal: {
      //       color: 'white', // 设置颜色
      //     },
      //   },
      // },
      grid: {
        left: '5px',
        right: '5px',
        bottom: '5%',
        top: '15%',
        containLabel: true,
      },
      legend: {
        // data: ['东进口左转', '东进口直行', '东南进口左转', '东南进口直行', '西南进口左转', '西南进口直行', '西北进口左转', '西北进口直行', '西北进口左转1', '西北进口直行1'],
        data: legend,
        icon: 'rect',
        top: 5,
        right: 10,
        textStyle: {
          color: '#fff',
        },
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          // data: ['10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50'],
          data: time,
          axisLabel: { // X轴文字
            textStyle: {
              fontSize: 12,
              color: '#f1f1fb',
            },
          },
          axisLine: {
            lineStyle: {
              color: '#11485D',
            },
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: { // Y轴刻度值
            formatter: '{value}',
            textStyle: {
              fontSize: 12,
              color: '#fff',
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#11485D'],
              width: 1,
              type: 'solid',
            },
          },
        },
      ],
      series,
    }
    myCharts.setOption(options, true)
  }
  render() {
    return (
      <div ref={(input) => { this.chartsBox = input }} style={{ height: '98%', width: '98%' }} />
    )
  }
}

export default ExportCharts
