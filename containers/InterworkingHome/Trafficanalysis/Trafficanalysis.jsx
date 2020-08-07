// 交通分析

import React, { Component } from 'react'
import styles from './Trafficanalysis.scss'
import OptLineCharts from './OptLineCharts/OptLineCharts'

class Trafficanalysis
  extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lsitLists: [1, 2, 3, 4, 5, 6, 7, 8],
      num: 0, // 计数器
    }
  }
  componentDidMount = () => {

  }
  ckeckActive = (items, ind) => {
    this.setState({
      num: ind,
    })
  }

  render() {
    const { lsitLists, num } = this.state
    return (
      <div className={styles.Trafficanalysis}>
        <div className={styles.TrafficanalysisLeft}>
          <div className={styles.listhead}>返回GIS地图</div>
          <div className={styles.listBox}>
            {
              lsitLists.map((item, ind) => <li className={num === ind ? styles.actives : ''} onClick={() => this.ckeckActive(item, ind)} key={item}>花冠路与贾秀路交叉口{ind}</li>)
            }
          </div>
        </div>
        <div className={styles.TrafficanalysisRight}>
          <div className={styles.GpsMapEcharts}>
            <div className={styles.listhead}>路口流量</div>
            <OptLineCharts />
          </div>
          <div className={styles.GpsMapEcharts}>
            <div className={styles.listhead}>路口延误时间</div>
            <OptLineCharts />
          </div>
          <div className={styles.GpsMapEcharts}>
            <div className={styles.listhead}>路口停车次数</div>
            <OptLineCharts />
          </div>
          <div className={styles.GpsMapEcharts}>
            <div className={styles.listhead}>路口排队长度</div>
            <OptLineCharts />
          </div>

        </div>
      </div>
    )
  }
}

export default Trafficanalysis
