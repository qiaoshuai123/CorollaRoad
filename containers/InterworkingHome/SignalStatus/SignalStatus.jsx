import React, { Component } from 'react'
import { Select } from 'antd'
import getResponseDatas from '../../../utils/getResponseDatas'
import styles from './SignalStatus.scss'

import OptLineCharts from './OptLineCharts'

const { Option } = Select
class SignalStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      SelectRoadValue: '',
      mapRoadList: [],
    }
    this.roadList = 'signal-decision/monitor/roadList' // 下拉框选择路口
    this.getAvgSpeed = '/signal-decision/road/getAvgSpeed' // 路口平均速度
    this.getrankLenght = '/signal-decision/road/getrankLenght' // 方案预评估-路口排队长度
    this.getFlow = '/signal-decision/road/getFlow' // 方案预评估-路口流量
    this.getDelayTime = '/signal-decision/road/getDelayTime' // 方案预评估-路口延误时间
    this.getStopNum = '/signal-decision/road/getStopNum' // 路口停车次数
    this.planInfo = '/signal-decision/road/planInfo' // 优化控制方案明细
    this.planList = '/signal-decision/road/planList' // 优化控制方案列表
  }
  componentDidMount = () => {
    this.renderRoadList()
  }
  selectRoad = () => {

  }
  roadData = (interId) => {
    getResponseDatas('get', this.getrankLenght, { interId }).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({
          // optimizationPlanList: data,
        })
      }
    })
    getResponseDatas('get', this.getFlow, { interId }).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({
          // optimizationPlanList: data,
        })
      }
    })
    getResponseDatas('get', this.getDelayTime, { interId }).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({
          // optimizationPlanList: data,
        })
      }
    })
  }
  renderRoadList = () => {
    getResponseDatas('get', this.roadList).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({
          SelectRoadValue: data[0].node_name,
          mapRoadList: data,
        })
        this.roadData(data[0].node_id)
      }
    })
  }


  render() {
    const { mapRoadList, SelectRoadValue } = this.state
    return (
      <div className={styles.SignalStatus}>
        <div className={styles.interBox}>
          <div className={styles.innerMap}>
            <div className={styles.title}>
              <Select value={SelectRoadValue} onChange={this.selectRoad}>
                {
                  mapRoadList && mapRoadList.map(item =>
                    <Option key={item.node_id + item} value={item.node_name}>{item.node_name}</Option>)
                }
              </Select>
            </div>
          </div>
          <div className={styles.interDetails}>
            <div className={styles.title}>
              优化控制操作：
              <span className={styles.planTime}>
                <Select defaultValue="1">
                  <Option key="1" value="1">方案一（00:00-07:00）</Option>
                </Select>
              </span>
              <span className={styles.exportBtn}>导出</span>
            </div>
            <div className={styles.pahseDetails}>
              <div className={styles.planMsg}>
                <div className={styles.planTitle}>执行方案（方案编号：202006131840020）</div>
                <div className={styles.phaseTable}>
                  <div className={styles.phaseBody}>
                    <div className={styles.phaseItem}>
                      <div className={styles.item}>相位</div>
                      <div className={styles.item}>相位时间(s)</div>
                      <div className={styles.item}>绿信比(%)</div>
                    </div>
                    <div className={styles.phaseValur}>
                      <div className={styles.valueBox}>
                        <div className={styles.values}>东直行左转</div>
                        <div className={styles.values}>东直行左转</div>
                        <div className={styles.values}>东直行左转</div>
                      </div>
                      <div className={styles.valueBox}>
                        <div className={styles.values}>18</div>
                        <div className={styles.values}>21</div>
                        <div className={styles.values}>22</div>
                      </div>
                      <div className={styles.valueBox}>
                        <div className={styles.values}>29</div>
                        <div className={styles.values}>34</div>
                        <div className={styles.values}>32</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.phaseBottom}>
                    <div className={styles.bottomLeft}>周期(S)</div>
                    <div className={styles.bottomRight}>61</div>
                  </div>
                </div>
              </div>
              <div className={styles.planMsg}>
                <div className={styles.planTitle}>建议优化方案</div>
                <div className={styles.phaseTable}>
                  <div className={styles.phaseBody}>
                    <div className={styles.phaseItem}>
                      <div className={styles.item}>相位</div>
                      <div className={styles.item}>相位时间(s)</div>
                      <div className={styles.item}>绿信比(%)</div>
                    </div>
                    <div className={styles.phaseValur}>
                      <div className={styles.valueBox}>
                        <div className={styles.values}>东直行左转</div>
                        <div className={styles.values}>东直行左转</div>
                        <div className={styles.values}>东直行左转</div>
                      </div>
                      <div className={styles.valueBox}>
                        <div className={styles.values}>18</div>
                        <div className={styles.values}>21</div>
                        <div className={styles.values}>22</div>
                      </div>
                      <div className={styles.valueBox}>
                        <div className={styles.values}>29</div>
                        <div className={styles.values}>34</div>
                        <div className={styles.values}>32</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.phaseBottom}>
                    <div className={styles.bottomLeft}>周期(S)</div>
                    <div className={styles.bottomRight}>61</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.interBox}>
          <div className={styles.interInnerBox}>
            <div className={styles.title}>方案预评估</div>
            <div className={styles.optPlanBox}>
              <div className={styles.optCharts}>
                <div className={styles.chartsName}>路口排队长度</div>
                <OptLineCharts />
              </div>
              <div className={styles.optCharts}>
                <div className={styles.chartsName}>路口流量</div>
                <OptLineCharts />
              </div>
              <div className={styles.optCharts}>
                <div className={styles.chartsName}>路口延误时间</div>
                <OptLineCharts />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignalStatus
