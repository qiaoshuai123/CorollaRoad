// 交通分析

import React, { Component } from 'react'
import styles from './Trafficanalysis.scss'
import getResponseDatas from '../../../utils/getResponseDatas'
import OptLineCharts from './OptLineCharts/OptLineCharts'

class Trafficanalysis
  extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roadLister: [],
      num: 0, // 计数器
      getrankLenghtList: null,
      getFlowList: null,
      getDelayTimeList: null,
      getStopNumList: null,
    }
    this.roadList = '/signal-decision/monitor/roadList' // 全部路口
    this.getrankLenght = '/signal-decision/road/getrankLenght' // 方案预评估-路口排队长度
    this.getFlow = '/signal-decision/road/getFlow' // 方案预评估-路口流量
    this.getDelayTime = '/signal-decision/road/getDelayTime' // 方案预评估-路口延误时间
    this.getStopNum = '/signal-decision/road/getStopNum' // 方案预评估-路口停车次数
  }
  componentDidMount = () => {
    this.renders()
  }
  // echarts 图表
  getControlModeler = () => {
    // 方案预评估-路口排队长度
    // console.log(this.nodeId, 'sdsdsdsd')
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
    // 方案预评估-路口停车次数
    getResponseDatas('get', this.getStopNum, { interId: this.nodeId }).then((res) => {
      const { code, data } = res.data
      // console.log(data, '路口停车次数')
      if (code === 200) {
        this.setState({
          getStopNumList: data,
        })
      }
    })
  }
  ckeckActive = (items, ind) => {
    this.nodeId = items.node_id
    this.setState({
      num: ind,
    })
    this.getControlModeler()
  }
  renders = () => {
    getResponseDatas('get', this.roadList).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.nodeId = data[0].node_id
        this.setState({
          roadLister: data,
        })
        this.getControlModeler()
      }
    })
  }
  render() {
    const {
      roadLister, num,
      getrankLenghtList, getFlowList, getDelayTimeList, getStopNumList,
    } = this.state
    return (
      <div className={styles.Trafficanalysis}>
        <div className={styles.TrafficanalysisLeft}>
          <div className={styles.listhead}>全部路口</div>
          <div className={styles.listBox}>
            {
              roadLister && roadLister.map((item, ind) => <li className={num === ind ? styles.actives : ''} onClick={() => this.ckeckActive(item, ind)} key={item.node_id + item}>{item.node_name}</li>)
            }
          </div>
        </div>
        <div className={styles.TrafficanalysisRight}>
          <div className={styles.GpsMapEcharts}>
            <div className={styles.listhead}>路口流量</div>
            {getFlowList && <OptLineCharts name="getFlowList" dataList={getFlowList} />}
          </div>
          <div className={styles.GpsMapEcharts}>
            <div className={styles.listhead}>路口延误时间</div>
            {getDelayTimeList && <OptLineCharts name="getDelayTimeList" dataList={getDelayTimeList} />}
          </div>
          <div className={styles.GpsMapEcharts}>
            <div className={styles.listhead}>路口停车次数</div>
            {
              getStopNumList && <OptLineCharts name="getStopNumList" dataList={getStopNumList} />
            }

          </div>
          <div className={styles.GpsMapEcharts}>
            <div className={styles.listhead}>路口排队长度</div>
            {getrankLenghtList && <OptLineCharts name="getrankLenghtList" dataList={getrankLenghtList} />}
          </div>

        </div>
      </div>
    )
  }
}

export default Trafficanalysis
