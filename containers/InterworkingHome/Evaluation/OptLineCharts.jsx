import React from 'react'
import echarts from 'echarts'

class ExportCharts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.legend = ['初始条件', '对比时间']
    // this.time = []
    this.series = this.props.resData
    // console.log(this.series, '看下数据...')
    // this.props.resData.map((item, i) => {
    //   if (this.time.length === 0 && item[i].length > 0) {
    //     this.time = item[0]
    //   }
    //   const obj = {
    //     name: this.legend.split(',')[i],
    //     type: 'line',
    //     data: item[1],
    //     itemStyle: {
    //       normal: {
    //         color: '#01CD74',
    //       },
    //     },
    //     symbol: 'circle',
    //     symbolSize: 10,
    //   }
    //   this.series.push(obj)      
    // })
  }
  componentDidMount = () => {
    this.getPropsChartsData()
  }
  componentDidUpdate = (prevState) => {
    console.log(prevState)
  }
  getPropsChartsData = () => {
    const chartsBox = echarts.init(this.chartsBox)
    this.renderCharts(chartsBox)
  }
  renderCharts = (myCharts, legend = this.legend, time = this.time, series = this.series) => {
    // 绘制图表
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(0, 255, 233,0)'
              }, {
                offset: 0.5,
                color: 'rgba(255, 255, 255,1)',
              }, {
                offset: 1,
                color: 'rgba(0, 255, 233,0)'
              }],
              global: false
            }
          },
        },
      },
      grid: {
        top: '15%',
        left: '10%',
        right: '5%',
        bottom: '15%',
        // containLabel: true
      },
      legend: {
        icon: 'rect',
        data: ['初始条件', '对比时间'],
        top: 25,
        right: 35,
        textStyle: {
          color: '#fff',
        },
      },
      xAxis: [{
        type: 'category',
        axisLine: {
          show: false,
          color: '#E59E14',
        },

        axisLabel: {
          color: '#E59E14',
          width: 100,
        },
        splitLine: {
          show: false,
        },
        boundaryGap: false,
        data: series[0][0],
        // data: ["2020-06-21", "2020-06-22", "2020-06-23", "2020-06-24", "2020-06-25", "2020-06-26", "2020-06-27"]//this.$moment(data.times).format("HH-mm") ,

      },
      {
        type: 'category',
        axisLine: {
          show: false,
          color: '#4EBBC8',
        },

        axisLabel: {
          color: '#4EBBC8',
          width: 100,
        },
        splitLine: {
          show: false,
        },
        boundaryGap: false,
        data: series[1][0],
        // data: ["2020-06-21", "2020-06-22", "2020-06-23", "2020-06-24", "2020-06-25", "2020-06-26", "2020-06-27"]//this.$moment(data.times).format("HH-mm") ,

      }
    ],

      yAxis: [{
        type: 'value',
        min: 0,
        // max: 140,
        splitNumber: 4,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#00BFF3',
            opacity: 0.23,
          }
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          margin: 20,
          textStyle: {
            color: '#03F4F3',

          },
        },
        axisTick: {
          show: false,
        },
      }],
      series: [
        {
          name: '初始条件',
          type: 'line',
          smooth: 0.3,
          showAllSymbol: true,
          symbol: 'circle',
          symbolSize: 10,
          data: series[0][1], // data.values
          itemStyle: {
            normal: {
              color: '#E59E14',
            },
          },
        },
        {
          name: '对比时间',
          type: 'line',
          smooth: 0.3,
          showAllSymbol: true,
          symbol: 'circle',
          symbolSize: 10,
          data: series[1][1],
          itemStyle: {
            normal: {
              color: '#4EBBC8',
            },
          },
        },
      ],
    }
    myCharts.setOption(option, true)
  }
  render() {
    return (
      <div ref={(input) => { this.chartsBox = input }} style={{ height: '100%', width: '100%' }} />
    )
  }
}

export default ExportCharts
