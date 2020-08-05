// 路口监测

import React, { Component } from 'react'
import styles from './Surveillance.scss'
import EvaluateEcharts from './EvaluateEcharts/EvaluateEcharts'
import GpsMap from './GpsMap/GpsMap'

class Surveillance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lsitLists: [1, 2, 3, 4, 5],
      num: 0, // 计数器
      isGpsMap: true,
    }
  }
  componentDidMount = () => {

  }
  ckeckActive = (items, ind) => {
    this.setState({
      num: ind,
    })
  }
  btnMe = () => {
    this.setState({
      isGpsMap: false,
    })
  }
  isGpsMapShow = () => {
    this.setState({
      isGpsMap: true,
    })
  }
  render() {
    const { lsitLists, num, isGpsMap } = this.state
    return (
      <React.Fragment>
        {
          isGpsMap ?
            <div className={styles.Surveillance}>
              <div className={styles.Surveillance_messageLeft}>
                <div className={styles.listhead}>优化方案统计及</div>
                <div className={styles.listBox}>
                  {
                    lsitLists.map((item, ind) => <li className={num === ind ? styles.actives : ''} onClick={() => this.ckeckActive(item, ind)} key={item}>花冠路与贾秀路交叉口{ind}</li>)
                  }
                  <div onClick={this.btnMe}>点我</div>
                </div>
              </div>
              <div className={styles.Surveillance_messageRight}>
                <div className={styles.Surveillance_RightLists}>
                  <div className={styles.listhead}>拥堵排名</div>
                  <div className={styles.Surveillance_RightListsBox}>
                    <li><span className={styles.circulars} /><span className={styles.ItemList}>花冠路与甲秀南路</span><span className={styles.arrows}></span></li>
                    <li><span className={styles.circulars} /><span className={styles.ItemList}>花冠路与甲秀南路</span><span className={styles.arrows}></span></li>
                    <li><span className={styles.circulars} /><span className={styles.ItemList}>花冠路与甲秀南路</span><span className={styles.arrows}></span></li>
                    <li><span className={styles.circulars} /><span className={styles.ItemList}>花冠路与甲秀南路</span><span className={styles.arrows}></span></li>
                  </div>
                </div>
                <div className={styles.Surveillance_messageRightEcharts}>
                  <div className={styles.listhead}>延误时间排名</div>
                  <EvaluateEcharts />
                </div>
              </div>
            </div> : <GpsMap isGpsMapShow={this.isGpsMapShow} />
        }
      </React.Fragment>
    )
  }
}

export default Surveillance
