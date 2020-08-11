// 全局监视

import React, { Component } from 'react'
import styles from './Monitoring.scss'
import EvaluateEcharts from './evaluateEcharts/evaluateEcharts'
import SchemeEcharts from './schemeEcharts/schemeEcharts'
import getResponseDatas from '../../../utils/getResponseDatas'
import $bus from '../../../utils/events'
import Item from 'antd/lib/list/Item'
import { Icon } from 'antd'

class Monitoring extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ckeckRanking: true,
      roadRankingList: [],
    }
    this.jam = '/signal-decision/monitor/rank/jam' // 路口排名-拥堵排名
    this.optimization = '/signal-decision/monitor/rank/optimization' // 路口排名-优化排名
    // this.
  }
  componentDidMount = () => {
    this.roadRanking()
    this.messageInformation()
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
  render() {
    const { ckeckRanking, roadRankingList } = this.state
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
          <SchemeEcharts />
        </div>
        <div className={styles.Monitoring_evaluate}>
          <li>花冠路与甲秀南路</li>
          <EvaluateEcharts />
        </div>
      </div>
    )
  }
}

export default Monitoring
