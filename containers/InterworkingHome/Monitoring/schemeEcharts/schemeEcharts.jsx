import React from 'react'
import echarts from 'echarts'

class HollowPie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => {
    const chartsBox = echarts.init(this.chartsBox)
    // const { seriseData, totleDevice } = this.props.chartsDatas
    this.renderCharts(chartsBox, [{ value: 104, name: "中控" }, { value: 242, name: "海信" }], 346)
  }
  renderCharts = (chartsBox, serise, totle) => {
    const options = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'right',
        top: '30',
        data: ['方案库300套', '推荐平台225套'],
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
          center: ['40%', '50%'],
          data: [
            { value: 300, name: '方案库300套' },
            { value: 225, name: '推荐平台225套' },
          ],
          itemStyle: {
            normal: {
              color(params) {
                // 自定义颜色
                const colorList = ['#05B0C4', '#F76846', '#0f85ff', '#00E8FF']
                return colorList[params.dataIndex]
              },
            },
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
