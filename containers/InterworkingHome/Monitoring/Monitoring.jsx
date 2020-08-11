// 全局监视
import React, { Component } from 'react'
import { Icon } from 'antd'
import EvaluateEcharts from './evaluateEcharts/evaluateEcharts'
import SchemeEcharts from './schemeEcharts/schemeEcharts'
import getResponseDatas from '../../../utils/getResponseDatas'
import $bus from '../../../utils/events'
import Item from 'antd/lib/list/Item'

import styles from './Monitoring.scss'

class Monitoring extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ckeckRanking: true,
      roadRankingList: [],
      optimizationPlanList: null, // 优化方案统计
      evaluatingLsit: null, // 评价指标统计
    }
    this.jam = '/signal-decision/monitor/rank/jam' // 路口排名-拥堵排名
    this.optimization = '/signal-decision/monitor/rank/optimization' // 路口排名-优化排名
    this.getOptimizationPlan = '/signal-decision/monitor/getOptimizationPlan' // 优化方案统计
    this.getEvaluating = '/signal-decision//monitor/getEvaluating' // 评价指标统计
  }
  componentDidMount = () => {
    this.roadRanking()
    this.messageInformation()
    this.optimizationPlan()
    this.evaluating()
  }
  // 初始化传递信息给地图
  messageInformation = () => {
    $bus.emit('message', 'hello world')
  }
  ckeckRanking = (boos) => {
    if (boos) {
      this.roadRanking()
    } else {
      this.roadOptimization()
    }
    this.setState({
      ckeckRanking: boos,
    })
  }
  // 拥堵排名
  roadRanking = () => {
    getResponseDatas('get', this.jam).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({
          roadRankingList: data,
        })
      }
    })
  }
  // 优化排名
  roadOptimization = () => {
    getResponseDatas('get', this.optimization).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({
          roadRankingList: data,
        })
      }
    })
  }
  // 优化方案
  optimizationPlan = () => {
    getResponseDatas('get', this.getOptimizationPlan).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({
          optimizationPlanList: data,
        })
      }
    })
  }
  // 评价指标统计
  evaluating = () => {
    getResponseDatas('get', this.getEvaluating).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({
          evaluatingLsit: data,
        })
      }
    })
  }
  render() {
    const { ckeckRanking, roadRankingList, optimizationPlanList, evaluatingLsit, } = this.state
    return (
      <div className={styles.Monitoring}>
        <div className={styles.Monitoring_top}>
          路口排名
        </div>
        <div className={styles.ckeckRanking_top}>
          <span className={ckeckRanking ? styles.actives : ''} onClick={() => this.ckeckRanking(true)}>拥堵排名</span>
          <span className={!ckeckRanking ? styles.actives : ''} onClick={() => this.ckeckRanking(false)}>优化排名</span>
        </div>
        <div className={styles.Monitoring_box}>
          {
            roadRankingList && roadRankingList.map(item =>
              <li key={item.node_id + item}><span className={styles.circulars} /><span className={styles.ItemList}>{item.node_name}</span><Icon className={styles.arrowsGreen} type="arrow-down" /></li>
            )
          }
        </div>
        <div className={styles.Monitoring_scheme}>
          <li>优化方案统计</li>
          {optimizationPlanList && <SchemeEcharts optimizationPlanList={optimizationPlanList} />}
        </div>
        <div className={styles.Monitoring_evaluate}>
          <li>评价指标统计</li>
          {evaluatingLsit && <EvaluateEcharts evaluatingLsit={evaluatingLsit} />}
        </div>
      </div>
    )
  }
}

export default Monitoring
