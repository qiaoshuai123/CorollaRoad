import React, { Component } from 'react'
import { Select } from 'antd'
import getResponseDatas from '../../../utils/getResponseDatas'
import styles from './SignalStatus.scss'
import $bus from '../../../utils/events'
import OptLineCharts from './OptLineCharts'

const { Option } = Select
class SignalStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      SelectRoadValue: '',
      mapRoadList: [],
      planListValue: '',
      planListList: [],
      getrankLenghtList: null,
      getFlowList: null,
      getDelayTimeList: null,
      roadPlanInfoList: {},
    }
    this.roadList = 'signal-decision/monitor/roadList' // 下拉框选择路口
    // this.getAvgSpeed = '/signal-decision/road/getAvgSpeed' // 路口平均速度
    this.getStopNum = '/signal-decision/road/getStopNum' // 路口停车次数
    this.getrankLenght = '/signal-decision/road/getrankLenght' // 方案预评估-路口排队长度
    this.getFlow = '/signal-decision/road/getFlow' // 方案预评估-路口流量
    this.getDelayTime = '/signal-decision/road/getDelayTime' // 方案预评估-路口延误时间
    this.planList = '/signal-decision/road/planList' // 优化控制方案列表
    this.planInfo = '/signal-decision/road/planInfo' // 优化控制方案明细
    this.export = '/signal-decision/road/export' // 优化控制方案导出
  }
  componentDidMount = () => {
    this.renderRoadList()
  }
  getResetParams = (params) => {
    if (JSON.stringify(params) !== '{}') {
      let newParams = '?'
      const resetParams = Object.keys(params)
      const lengths = resetParams.length
      Object.keys(params).forEach((item, index) => {
        if (params[item] !== null && params[item] !== 'null') {
          newParams += `${item}=${params[item]}${index !== lengths - 1 ? '&' : ''}`
        }
      })
      return newParams
    }
    return params
  }
  selectRoad = (value) => {
    const { mapRoadList } = this.state
    this.setState({
      SelectRoadValue: value,
    })
    this.nodeId = mapRoadList.find(item => item.node_name === value).node_id
    this.roadData()
  }
  selectPlan = (value) => {
    const { planListList } = this.state
    this.setState({
      planListValue: value,
    })
    this.plan_id = planListList.find(item => item.plan_name + item.plan_time_slot === value).plan_id
    this.roadPlanInfo()
  }
  // 导出表格
  exportTable = () => {
    // this.nodeId
    // this.plan_id
    const logListParams = {
      interId: this.nodeId,
      planId: this.plan_id,
      planName: this.state.planListValue,
    }
    window.location.href = `${this.export}${this.getResetParams(logListParams)}`
  }
  roadData = () => {
    // 方案预评估-路口排队长度
    getResponseDatas('get', this.getrankLenght, { interId: this.nodeId }).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        // console.log(data, '路口排队长度')
        this.setState({
          getrankLenghtList: data,
        })
      }
    })
    // 方案预评估-路口流量
    getResponseDatas('get', this.getFlow, { interId: this.nodeId }).then((res) => {
      const { code, data } = res.data
      // console.log(data, '路口流量')
      if (code === 200) {
        this.setState({
          getFlowList: data,
        })
      }
    })
    // 方案预评估-路口延误时间
    getResponseDatas('get', this.getDelayTime, { interId: this.nodeId }).then((res) => {
      const { code, data } = res.data
      // console.log(data, '路口延误时间')
      if (code === 200) {
        this.setState({
          getDelayTimeList: data,
        })
      }
    })
    // 优化控制操作
    getResponseDatas('get', this.planList, { interId: this.nodeId }).then((res) => {
      const { code, data } = res.data
      // console.log(data, '路口延误时间')
      if (code === 200) {
        this.setState({
          planListList: data,
          planListValue: data[0].plan_name + data[0].plan_time_slot,
        })
        this.plan_id = data[0].plan_id
        this.roadPlanInfo()
      }
    })
  }
  roadPlanInfo = () => {
    getResponseDatas('get', this.planInfo, { interId: this.nodeId, planId: this.plan_id }).then((res) => {
      const { code, data } = res.data
      // console.log(data, '优化控制方案明细')
      if (code === 200) {
        this.setState({
          roadPlanInfoList: data,
        })
      }
    })
  }
  renderRoadList = () => {
    const { pathname } = this.props.location
    const index = pathname.lastIndexOf('/')
    const number = pathname.slice(index + 1)
    getResponseDatas('get', this.roadList).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        if (number) {
          console.log(number, 'sss')
          this.nodeId = number
          this.roadData(number)
          const objName = data.find(item => item.node_id == number)
          $bus.emit('goMapBtn', objName)
          console.log(objName, objName.node_name, '123456')
          this.setState({
            SelectRoadValue: objName.node_name,
            mapRoadList: data,
          })
        } else {
          console.log(number, data[0].node_name, 'sss')
          this.setState({
            SelectRoadValue: data[0].node_name,
            mapRoadList: data,
          })
          $bus.emit('goMapBtn', data[0])
          this.nodeId = data[0].node_id
          this.roadData(data[0].node_id)
        }
      }
    })
  }

  render() {
    const { mapRoadList, SelectRoadValue, getrankLenghtList, getFlowList,
      getDelayTimeList, planListList, planListValue, roadPlanInfoList,
    } = this.state
    return (
      <div className={styles.SignalStatus}>
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
              <Select value={planListValue} onChange={this.selectPlan}>
                {planListList && planListList.map(item =>
                  <Option key={item.plan_id + item} value={item.plan_name + item.plan_time_slot}>{item.plan_name + item.plan_time_slot}</Option>)}
              </Select>
            </span>
            <span onClick={this.exportTable} className={styles.exportBtn}>导出</span>
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
                    {
                      roadPlanInfoList.ori && roadPlanInfoList.ori.map((item) => {
                        return (
                          <div key={item + item.phase_time} className={styles.valueBox}>
                            <div className={styles.values}>{item.phase_name}</div>
                            <div className={styles.values}>{item.phase_time}</div>
                            <div className={styles.values}>{item.green_letter_ratio}</div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                <div className={styles.phaseBottom}>
                  <div className={styles.bottomLeft}>周期(S)</div>
                  <div className={styles.bottomRight}>{roadPlanInfoList.ori && roadPlanInfoList.ori[0].cycle}</div>
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
                    {
                      roadPlanInfoList.opt && roadPlanInfoList.opt.map((item) => {
                        return (
                          <div key={item + item.phase_time} className={styles.valueBox}>
                            <div className={styles.values}>{item.phase_name}</div>
                            <div className={styles.values}>{item.phase_time}</div>
                            <div className={styles.values}>{item.green_letter_ratio}</div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                <div className={styles.phaseBottom}>
                  <div className={styles.bottomLeft}>周期(S)</div>
                  <div className={styles.bottomRight}>{roadPlanInfoList.opt && roadPlanInfoList.opt[0].cycle}</div>
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
                {getrankLenghtList && <OptLineCharts name="getrankLenghtList" dataList={getrankLenghtList} />}
              </div>
              <div className={styles.optCharts}>
                <div className={styles.chartsName}>路口流量</div>
                {getFlowList && <OptLineCharts name="getFlowList" dataList={getFlowList} />}
              </div>
              <div className={styles.optCharts}>
                <div className={styles.chartsName}>路口延误时间</div>
                {getDelayTimeList && <OptLineCharts name="getDelayTimeList" dataList={getDelayTimeList} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignalStatus
