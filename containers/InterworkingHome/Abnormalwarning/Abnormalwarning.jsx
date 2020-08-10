// 异常预警
import React, { Component } from 'react'
import styles from './Abnormalwarning.scss'
import { Pagination } from 'antd'
import OptLineCharts from './OptLineCharts/OptLineCharts'

class Abnormalwarning extends Component {
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
  handlePagination = (pageNumber) => {
    // console.log('Page: ', pageNumber)
    // this.sysUser.pageNo = pageNumber
  }
  render() {
    const { lsitLists, num } = this.state
    return (
      <div className={styles.Abnormalwarning}>
        <div className={styles.GpsMapLeft}>
          <div className={`${styles.listhead} ${styles.listheads}`}>全部地图</div>
          <div className={styles.listBox}>
            {
              lsitLists.map((item, ind) => <li className={num === ind ? styles.actives : ''} onClick={() => this.ckeckActive(item, ind)} key={item}>花冠路与贾秀路交叉口{ind}</li>)
            }
          </div>
        </div>
        <div className={styles.GpsMapCenter}>
          <div className={styles.GpsMapCenterMap}>
            <div className={styles.listhead}>预警消息列表(12条)
              <div className={styles.days}>
                <div><span>全部</span></div>
                <div><span>近一天</span></div>
                <div><span>近一周</span></div>
                <div><span>近一月</span></div>
              </div>
            </div>
            <div className={styles.GpsMapCenterMapBox}>
              <div className={styles.listItem}>
                <span className={styles.hierarchy}>一级</span>
                <div className={styles.listBox}>
                  <div className={styles.listBoxContain}>花冠中路与甲秀南路交叉口东方向车辆用的严重</div>
                  <div className={styles.listBoxTime}>2020-07-02 12:14:24</div>
                </div>
                <span className={styles.management}>处置</span>
              </div>
            </div>
          </div>
          <div className={styles.GpsMapCenterTime}>
            <div className={styles.page}>当前共{10}条，每页显示10条</div><Pagination showQuickJumper current={1} total={50} onChange={this.handlePagination} />
          </div>
        </div>
        <div className={styles.GpsMapRight}>
          <div className={styles.GpsMapEcharts}>
            <div className={styles.listhead}>近七天预警统计</div>
            <OptLineCharts />
          </div>
          <div className={styles.GpsMapEcharts}>
            <div className={styles.listhead}>按路口统计</div>
            <OptLineCharts />
          </div>
        </div>
      </div >
    )
  }
}

export default Abnormalwarning
