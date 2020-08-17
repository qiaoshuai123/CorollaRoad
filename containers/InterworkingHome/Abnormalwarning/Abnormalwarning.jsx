// 异常预警
import React, { Component } from 'react'
import { Pagination } from 'antd'
import getResponseDatas from '../../../utils/getResponseDatas'
import OptLineCharts from './OptLineCharts/OptLineCharts'
import styles from './Abnormalwarning.scss'

class Abnormalwarning extends Component {
  constructor(props) {
    super(props)
    this.state = {

      roadLister: [],
      num: 0, // 计数器
      alertListObj: null, // 分页器
      getNearSevenCountList: null,
      getRoadCountList: null,
      currents: 1, // 默认第一页
    }
    this.objs = {
      interId: '',
      pageNo: 1,
      pageSize: 10,
      timeType: 0,
    }
    this.roadList = '/signal-decision/monitor/roadList' // 全部路口
    this.getNearSevenCount = '/signal-decision/alert/getNearSevenCount' // 近七天预警统计
    this.getRoadCount = 'signal-decision/alert/getRoadCount' // 按路口统计
    this.alertList = 'signal-decision/alert/alertList' // 预警信息列表
  }
  componentDidMount = () => {
    this.renders()
  }
  getControlModeler = () => {
    getResponseDatas('get', this.alertList, this.objs).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({
          alertListObj: data,
        })
      }
    })
  }
  handlePagination = (pageNumber) => {
    this.objs.pageNo = pageNumber
    this.setState({
      currents: pageNumber,
    })
    this.getControlModeler()
  }
  ckeckActive = (items, ind) => {
    this.objs.interId = items.node_id
    this.objs.timeType = 0
    this.setState({
      num: ind,
      currents: 1,
    })
    this.getControlModeler()
  }
  checkDay = (days) => {
    this.objs.pageNo = 1
    this.objs.timeType = days
    this.setState({
      currents: 1,
    })
    this.getControlModeler()
  }
  // 点击处置跳转至路口优化
  goSignalStatus = (obj) => {
    this.props.history.push({ pathname: `/interworkingHome/signalStatus/${obj.node_id}` })
  }
  renders = () => {
    // 全部路口
    getResponseDatas('get', this.roadList).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.objs.interId = data[0].node_id
        this.setState({
          roadLister: data,
        })
        this.getControlModeler()
      }
    })
    // 近七天预警统计
    getResponseDatas('get', this.getNearSevenCount).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({
          getNearSevenCountList: data,
        })
      }
    })
    // 按路口统计
    getResponseDatas('get', this.getRoadCount).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({
          getRoadCountList: data,
        })
      }
    })
  }
  render() {
    const { roadLister, num, getNearSevenCountList, getRoadCountList, alertListObj, currents } = this.state
    return (
      <div className={styles.Abnormalwarning}>
        <div className={styles.GpsMapLeft}>
          <div className={`${styles.listhead} ${styles.listheads}`}>全部地图</div>
          <div className={styles.listBox}>
            {
              roadLister && roadLister.map((item, ind) => <li className={num === ind ? styles.actives : ''} onClick={() => this.ckeckActive(item, ind)} key={item.node_id + item}>{item.node_name}</li>)
            }
          </div>
        </div>
        <div className={styles.GpsMapCenter}>
          <div className={styles.GpsMapCenterMap}>
            <div className={styles.listhead}>预警消息列表({alertListObj && alertListObj.totalCount})
              <div className={styles.days}>
                <div><span onClick={() => this.checkDay(0)}>全部</span></div>
                <div><span onClick={() => this.checkDay(1)}>近一天</span></div>
                <div><span onClick={() => this.checkDay(7)}>近一周</span></div>
                <div><span onClick={() => this.checkDay(30)}>近一月</span></div>
              </div>
            </div>
            <div className={styles.GpsMapCenterMapBox}>
              {
                alertListObj && alertListObj.list.map((item) => {
                  const isNumber = item.level === 1 ? '一' : item.level === 2 ? '二' : item.level === 3 ? '三' : ''
                  const actives = item.level === 1 ? 'active1' : item.level === 2 ? 'active2' : item.level === 3 ? 'active3' : ''
                  return (
                    <div key={item.id + item} className={styles.listItem}>
                      <span className={`${styles.hierarchy} ${styles[actives]}`}>{isNumber}级</span>
                      <div className={styles.listBox}>
                        <div className={styles.listBoxContain}>{item.early_warning_message}</div>
                        <div className={styles.listBoxTime}>{item.dateTime}</div>
                      </div>
                      <span onClick={() => this.goSignalStatus(item)} className={styles.management}>处置</span>
                    </div>
                  )
                })
              }
            </div>
          </div>
          {alertListObj &&
            <div className={styles.GpsMapCenterTime}>
              <div className={styles.page}>当前共{alertListObj.totalCount}条，每页显示10条</div><Pagination showQuickJumper current={currents} total={alertListObj.totalCount} onChange={this.handlePagination} />
            </div>
          }
        </div>
        <div className={styles.GpsMapRight}>
          <div className={styles.GpsMapEcharts}>
            <div className={styles.listhead}>近七天预警统计</div>
            {
              getNearSevenCountList && <OptLineCharts name="getNearSevenCountList" dataList={getNearSevenCountList} />
            }
          </div>
          <div className={styles.GpsMapEcharts}>
            <div className={styles.listhead}>按路口统计</div>
            {
              getRoadCountList && <OptLineCharts name="getRoadCountList" dataList={getRoadCountList} />
            }
          </div>
        </div>
      </div >
    )
  }
}

export default Abnormalwarning
