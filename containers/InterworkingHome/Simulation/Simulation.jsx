// 仿真评价数据分析
import React, { Component } from 'react'
import styles from './Simulation.scss'
import OptLineCharts from './OptLineCharts'
import getResponseDatas from '../../../utils/getResponseDatas'
import Select from '../../../components/Antd/Select/Select'
class Simulation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roadNode: null,
      planData: null,
      interId: null,
      planId: '',
    }
    this.roadListUrl = '/signal-decision/monitor/roadList' // 路口经纬度列表
    this.getPlanListUrl = '/signal-decision/sim/getPlanList' //获取方案下拉' // 方案
    this.getFirstChartUrl = '/signal-decision/sim/getFirstChart' //左上路口流量
    this.getSecondChartUrl = '/signal-decision//sim/getSecondChart' //右上路口延误时间
    this.getThirdChartUrl = '/signal-decision/sim/getThirdChart' //左下路口排队长度
    this.getFourChartUrl = '/signal-decision/sim/getFourChart' //右下路口停车次数
  }
  componentDidMount = () => {
    console.log(this.state.options2, 'select数据')
    // 路口
    this.getRoadData()
  }
  getRoadData = () => {
    getResponseDatas('get', this.roadListUrl).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({ roadNode: data }, () => {
          this.getPlanData(this.state.roadNode[0].node_id)
        })
      }
    })
  }
  getPlanData = (interId) => {
    getResponseDatas('get', this.getPlanListUrl + '?interId=' + interId).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({ planData: data, interId, planId: null }, () => {
          this.state.planData[0] ? this.planToRender(this.state.planData[0].plan_id) : null
        })
      }
    })
  }
  planToRender = (planId) => {
    this.getShowCharts(this.getFirstChartUrl, this.state.interId, planId)
    this.getShowCharts(this.getSecondChartUrl, this.state.interId, planId)
    this.getShowCharts(this.getThirdChartUrl, this.state.interId, planId)
    this.getShowCharts(this.getFourChartUrl, this.state.interId, planId)
  }
  getShowCharts = (url, interId, planId) => {
    getResponseDatas('get', url + "?interId=" + interId + "&planId=" + planId).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        console.log(data, '图表数据')
      }
    })
  }
  render() {
    const { roadNode, planData, planId } = this.state
    return (
      <div className={styles.Simulation}>
        <div className={styles.searchBox}>
          <div className={styles.search}>
            {
              roadNode ? <Select name="node_name" value="node_id" options={roadNode} onChange={(value) => { this.getPlanData(value) }} /> : null 
            }         
          </div>
          <div className={styles.search}>
            {
              planData ? <Select defaultValue={planId} name="plan_name" value="plan_id" modeStatus={true} options={planData} onChange={(value) => {this.planToRender(value)}} /> : null
            }
          </div>
        </div>
        <div className={styles.mainBox}>
          <div className={styles.echartBox}>
            <div className={styles.Title}> 路口流量</div>
            <div className={styles.content}>
              <div className={styles.center}>
                <OptLineCharts />
              </div>
            </div>
          </div>
          <div className={styles.echartBox}>
            <div className={styles.Title}>路口延误时间</div>
            <div className={styles.content}>
              <div className={styles.center}>
                <OptLineCharts />
              </div>
            </div>
          </div>
          <div className={styles.echartBox}>
            <div className={styles.Title}>路口排队长度</div>
            <div className={styles.content}>
              <div className={styles.center}>
                <OptLineCharts />
              </div>
            </div>
          </div>
          <div className={styles.echartBox}>
            <div className={styles.Title}>停车次数</div>
            <div className={styles.content}>
              <div className={styles.center}>
                <OptLineCharts />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Simulation
