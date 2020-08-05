import React, { Component } from 'react'
import styles from './Regional.scss'
import AreaCharts from './AreaCharts'

class Regional extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount = () => {

  }

  render() {
    return (
      <div className={styles.Regional}>
        <div className={styles.interListBox}>
          <div className={styles.title}>花冠中路区域 <span className={styles.areaConfig}>区域优化配置</span></div>
          <ul className={styles.interMsg}>
            <li className={styles.interItem}>
              <div className={styles.interName}>花冠路与甲秀南路</div>
              <div className={styles.interDetails}>
                <div className={styles.detailsItems}>实时相位差</div>
                <div className={styles.detailsItems}>建议相位差</div>
                <div className={styles.detailsItems}>偏移</div>
                <div className={styles.detailsItems}>协调相位</div>
                <div className={styles.detailsItems}>速度</div>
              </div>
              <div className={styles.interDetails}>
                <div className={styles.detailsItems}>38s</div>
                <div className={styles.detailsItems}>38s</div>
                <div className={styles.detailsItems}>38s</div>
                <div className={styles.detailsItems}>0</div>
                <div className={styles.detailsItems}>38m/s</div>
              </div>
            </li>
            <li className={styles.interItem}>
              <div className={styles.interName}>花冠路与甲秀南路</div>
              <div className={styles.interDetails}>
                <div className={styles.detailsItems}>实时相位差</div>
                <div className={styles.detailsItems}>建议相位差</div>
                <div className={styles.detailsItems}>偏移</div>
                <div className={styles.detailsItems}>协调相位</div>
                <div className={styles.detailsItems}>速度</div>
              </div>
              <div className={styles.interDetails}>
                <div className={styles.detailsItems}>38s</div>
                <div className={styles.detailsItems}>38s</div>
                <div className={styles.detailsItems}>38s</div>
                <div className={styles.detailsItems}>0</div>
                <div className={styles.detailsItems}>38m/s</div>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.areaChartsBox}>
          <div className={styles.chartsItem}>
            <div className={styles.title}>区域平均延误</div>
            <div className={styles.chartsWrap}>
              <AreaCharts />
            </div>
          </div>
          <div className={styles.chartsItem}>
            <div className={styles.title}>区域平均速度</div>
            <div className={styles.chartsWrap}>
              <AreaCharts />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Regional
