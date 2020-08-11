import React from 'react'
import echarts from 'echarts'
import { nodeName } from 'jquery'

class HollowPie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => {
    const chartsBox = echarts.init(this.chartsBox)
    // const { seriseData, totleDevice } = this.props.chartsDatas
    this.renderCharts(chartsBox, [{ value: 104, name: "方案库104套" }, { value: 242, name: "推荐平台242套" }], 346)
  }
  renderCharts = (chartsBox, serise, totle) => {
    const options = {
      title : {
        text: '共产出优化方案数'+totle+'套',
        textStyle: { // 图例文字的样式
          color: '#fff',
          fontSize: 14,
        },
        x:'45%',
        y:'25%',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: '45%',
        top: 'center',
        data: [serise[0].name, serise[1].name],
        textStyle: { // 图例文字的样式
          color: '#fff',
          fontSize: 12,
        },
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['25%', '50%'],
          data: serise,
          itemStyle: {
            normal: {
              color(params) {
                // 自定义颜色
                const colorList = ['#05B0C4', '#F76846', '#0f85ff', '#00E8FF']
                return colorList[params.dataIndex]
              },
            },
          },
          label: {
            normal: {
               position: 'inner',
               show : false
            }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
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

export default HollowPie
