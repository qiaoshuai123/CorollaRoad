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
        top: 'center',
        data: ['直接访问', '邮件营销'],
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
          center: ['50%', '60%'],
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
          ],
          itemStyle: {
            normal: {
              color(params) {
                // 自定义颜色
                const colorList = ['#C99D27', '#456FB5', '#0f85ff', '#00E8FF']
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
