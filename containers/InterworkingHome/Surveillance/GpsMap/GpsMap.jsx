// 交通分析

import React, { Component } from 'react'
import styles from './GpsMap.scss'
import OptLineCharts from '../OptLineCharts/OptLineCharts'

class GpsMap
  extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lsitLists: [1, 2, 3, 4, 5],
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
  isGpsMapShow = () => {
    this.props.isGpsMapShow()
  }
  render() {
    const { lsitLists, num } = this.state
    return (
      <div className={styles.GpsMap}>
        <div className={styles.GpsMapLeft}>
          <div onClick={this.isGpsMapShow} className={styles.listhead}>返回GIS地图</div>
          <div className={styles.listBox}>
            {
              lsitLists.map((item, ind) => <li className={num === ind ? styles.actives : ''} onClick={() => this.ckeckActive(item, ind)} key={item}>花冠路与贾秀路交叉口{ind}</li>)
            }
          </div>
        </div>
        <div className={styles.GpsMapCenter}>
          <div className={styles.GpsMapCenterMap}>
            <div className={styles.listhead}>花冠路与花桐路交叉口</div>
            <div className={styles.GpsMapCenterMapBox}>
              1
            </div>
          </div>
          <div className={styles.GpsMapCenterTime}>
            <div className={styles.listhead}>2020-07-20 12:12:51</div>
            <div className={styles.listBox}>
              <div className={styles.equipmentStatus}>设备状态:<span>正常</span></div>
              <div className={styles.controlStatus}>控制状态:本地多时段</div>
              <div className={styles.timeInterval}>但前时段:<span>1</span><span>2</span><span>3</span></div>
              <div className={styles.programme}>当前方案:<span>方案一</span></div>
              <div className={styles.programmeTime}>
                <div className={styles.programmeTimeBox}>
                  123
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.GpsMapRight}>
          <div className={styles.GpsMapEcharts}>
            <div className={styles.listhead}>路口流量</div>
            <OptLineCharts />
          </div>
          <div className={styles.GpsMapEcharts}>
            <div className={styles.listhead}>路口排大队长度</div>
            <OptLineCharts />
          </div>
        </div>
      </div >
    )
  }
}

export default GpsMap
