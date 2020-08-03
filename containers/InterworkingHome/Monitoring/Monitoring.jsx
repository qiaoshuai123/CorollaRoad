// 全局监视

import React, { Component } from 'react'
import styles from './Monitoring.scss'
import EvaluateEcharts from './evaluateEcharts/evaluateEcharts'
import SchemeEcharts from './schemeEcharts/schemeEcharts'

class Monitoring extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ckeckRanking: true,
    }
  }
  componentDidMount = () => {

  }

  render() {
    const { ckeckRanking } = this.state
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
          <li>花冠路与甲秀南路</li>
          <li>花冠路与甲秀南路</li>
          <li>花冠路与甲秀南路</li>
          <li>花冠路与甲秀南路</li>
          <li>花冠路与甲秀南路</li>
          <li>花冠路与甲秀南路</li>
          <li>花冠路与甲秀南路</li>
          <li>花冠路与甲秀南路</li>
        </div>
        <div className={styles.Monitoring_scheme}>
          <li>优化方案统计及</li>
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
