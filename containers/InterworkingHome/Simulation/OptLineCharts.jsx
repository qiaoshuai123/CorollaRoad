import React from 'react'
import echarts from 'echarts'

class ExportCharts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.keyNum = Math.random()
    this.colors = ['#44f0ff', '#ff9d00', '#ec6941', '#00fffc', '#ffff00', '#ff0000', '#f19ec2', '#00ff00', '#cfa972', '#acd598', '#7d0000', '#0db4ff', '#732c95']
    this.reverseColors = ['#ff9d00', '#0db4ff', '#7d0000', '#acd598', '#cfa972', '#00ff00', '#44f0ff', '#f19ec2', '#ff0000', '#ffff00', '#00fffc', '#ec6941', '#732c95']
    this.legend = this.props.legendName ? this.props.legendName.split(',') : []
    this.time = []
    this.series = []
    this.props.resData.map((item, i) => {
      if (this.time.length === 0 && item[i].length > 0) {
        this.time = item[0]
      }
      const obj = {
        name: this.props.legendName.split(',')[i],
        type: 'line',
        data: item[1],
        itemStyle: {
          normal: {
            color: '#01CD74',
          },
        },
        symbol: 'circle',
        symbolSize: 10,
      }
      this.series.push(obj)      
    })
  }
  componentDidMount = () => {
    window.showFlag = null
    this.getPropsChartsData()
  }
  componentDidUpdate = (prevState) => {
    // console.log(prevState)
  }
  getPropsChartsData = () => {
    const chartsBox = echarts.init(this.chartsBox)
    this.renderCharts(chartsBox)
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
        icon: 'rect',
        // data: ['东进口左转', '东进口直行', '东南进口左转', '东南进口直行', '西南进口左转', '西南进口直行', '西北进口左转', '西北进口直行', '西北进口左转1', '西北进口直行1'],
        data: legend,
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
      <div ref={(input) => { this.chartsBox = input }} style={ { height: '80%', width: '734px' } } /> 
      // <div style={{ height: '80%', width: '100%' }}>
      //   { window.showFlag ? 
      //     <div ref={(input) => { this.chartsBox = input }} style={ { height: '100%', width: '120%' }} /> :
      //   }
      // </div>
    )
  }
}

export default ExportCharts
