// 全局监视

import React, { Component } from 'react'
import styles from './Monitoring.scss'
import EvaluateEcharts from './evaluateEcharts/evaluateEcharts'
import SchemeEcharts from './schemeEcharts/schemeEcharts'
import Item from 'antd/lib/list/Item'
import { Icon } from 'antd'

class Monitoring extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ckeckRanking: true,
    }
  }
  componentDidMount = () => {

  }
  ckeckRanking = (boos) => {
    this.setState({
      ckeckRanking: boos,
    })
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
          <li><span className={styles.circulars} /><span className={styles.ItemList}>花冠路与甲秀南路</span><Icon className={styles.arrowsRed} type="arrow-up" /></li>
          <li><span className={styles.circulars} /><span className={styles.ItemList}>花冠路与甲秀南路</span><Icon className={styles.arrowsRed} type="arrow-up" /></li>
          <li><span className={styles.circulars} /><span className={styles.ItemList}>花冠路与甲秀南路</span><Icon className={styles.arrowsRed} type="arrow-up" /></li>
          <li><span className={styles.circulars} /><span className={styles.ItemList}>花冠路与甲秀南路</span><Icon className={styles.arrowsGreen} type="arrow-down" /></li>
          <li><span className={styles.circulars} /><span className={styles.ItemList}>花冠路与甲秀南路</span><Icon className={styles.arrowsGreen} type="arrow-down" /></li>
          <li><span className={styles.circulars} /><span className={styles.ItemList}>花冠路与甲秀南路</span><Icon className={styles.arrowsGreen} type="arrow-down" /></li>
          <li><span className={styles.circulars} /><span className={styles.ItemList}>花冠路与甲秀南路</span><Icon className={styles.arrowsRed} type="arrow-up" /></li>
          <li><span className={styles.circulars} /><span className={styles.ItemList}>花冠路与甲秀南路</span><Icon className={styles.arrowsRed} type="arrow-up" /></li>
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
