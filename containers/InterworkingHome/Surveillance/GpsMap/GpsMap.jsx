// 交通分析

import React, { Component } from 'react'
import styles from './GpsMap.scss'
import getResponseDatas from '../../../../utils/getResponseDatas'
import OptLineCharts from '../OptLineCharts/OptLineCharts'
import ImgMove from './ImgMove/ImgMove'

class GpsMap
  extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roadLister: null,
      num: 0, // 计数器
      getFlowList: null, // 路口流量
      getrankLenghtList: null, // 路口排队长度
      getRoadStatusList: {}, // 运行状态
      GpsMapCenterMapBoxBac: '', // 路口底图
    }
    this.roadList = '/signal-decision/monitor/roadList' // 全部路口
    this.getFlow = '/signal-decision/road/getFlow' // 方案预评估 - 路口流量
    this.getrankLenght = '/signal-decision/road/getrankLenght' // 方案预评估 - 路口排队长度
    this.getRoadStatus = '/signal-decision/road/getRoadStatus' // 运行状态
  }
  componentDidMount = () => {
    this.renders()
  }
  getControlModeler = () => {
    getResponseDatas('get', this.getFlow, { interId: this.roadId }).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({
          getFlowList: data,
        })
      }
    })
    getResponseDatas('get', this.getrankLenght, { interId: this.roadId }).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({
          getrankLenghtList: data,
        })
      }
    })
    getResponseDatas('get', this.getRoadStatus, { interId: this.roadId }).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        let nums = 0
        data.phase.forEach((item) => {
          nums += (item.green_time + item.yellow_time)
        })
        this.setState({
          getRoadStatusList: data,
          nums,
        })
      }
    })
  }
  ckeckActive = (items, ind) => {
    this.roadId = items.node_id
    this.setState({
      num: ind,
      GpsMapCenterMapBoxBac: items.node_img,
    })
    this.getControlModeler()
  }
  isGpsMapShow = () => {
    this.props.isGpsMapShow()
  }
  closePoint = () => {
    this.setState({
      isMessagePage: false,
    })
  }
  renders = () => {
    getResponseDatas('get', this.roadList).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.roadId = data[0].node_id
        this.setState({
          roadLister: data,
          GpsMapCenterMapBoxBac: data[0].node_img,
        })
        this.getControlModeler()
      }
    })
  }
  render() {
    const { roadLister, num, getrankLenghtList, getFlowList, getRoadStatusList, GpsMapCenterMapBoxBac, nums, } = this.state
    return (
      <div className={styles.GpsMap}>
        <div className={styles.GpsMapLeft}>
          <div onClick={this.isGpsMapShow} className={styles.listhead}>返回GIS地图</div>
          <div className={styles.listBox}>
            {
              roadLister && roadLister.map((item, ind) => <li className={num === ind ? styles.actives : ''} onClick={() => this.ckeckActive(item, ind)} key={item.node_id}>{item.node_name}</li>)
            }
          </div>
        </div>
        <div className={styles.GpsMapCenter}>
          <div className={styles.GpsMapCenterMap}>
            <div className={styles.listhead}>{roadLister && roadLister[num].node_name}</div>
            <div
              style={{
                backgroundImage: GpsMapCenterMapBoxBac ? `url(${require(`./img/${GpsMapCenterMapBoxBac}`)})` : '',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
              }}
              className={styles.GpsMapCenterMapBox}>
              {
                getRoadStatusList.road && getRoadStatusList.road.map(item => <ImgMove pictureInformation={item} key={item.device_id} />)
              }
            </div>
          </div>
          <div className={styles.GpsMapCenterTime}>
            <div className={styles.listhead}>2020-07-20 12:12:51</div>
            <div className={styles.listBox}>
              <div className={styles.equipmentStatus}>设备状态:<span>{getRoadStatusList.road && getRoadStatusList.road[0].device_status}</span></div>
              <div className={styles.controlStatus}>控制状态:本地多时段</div>
              <div className={styles.timeInterval}>当前时段:{getRoadStatusList.phase && getRoadStatusList.phase.map(item => <div className={styles.timeIntervalBox} key={item.phase_name + item}><img src={require(`./img/${item.phase_img}`)} /></div>)}</div>
              <div className={styles.programme}>当前方案:<span>方案一</span></div>
              <div className={styles.programmeTime}>
                <div className={styles.programmeTimeBox}>
                  {/* 123 */}
                  <div className={styles.AnimationTime}>
                    <div className={styles.palnRunBox}>
                      <div className={styles.runStage} style={{ width: `${50}px` }}><span className={styles.stageInner} /></div>
                      {
                        getRoadStatusList.phase && getRoadStatusList.phase.map((item) => {
                          const allSm = item.green_time + item.yellow_time
                          const yellowNum = (item.yellow_time * 100) / allSm
                          const greenNum = (item.green_time * 100) / allSm
                          const allNum = (allSm * 100) / nums
                          return (
                            <div key={item.phase_name + item.phase_img} style={{ width: `${allNum}%` }} className={styles.planRunStage}>
                              <span className={styles.stageMsg}>{item.phase_name} &nbsp;{item.green_time}秒</span>
                              <div className={styles.greenStage} style={{ width: `${greenNum}%` }} />
                              <div className={styles.yellowStage} style={{ width: `${yellowNum}%` }} />
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.GpsMapRight}>
          <div className={styles.GpsMapEcharts}>
            <div className={styles.listhead}>路口流量</div>
            {getFlowList && <OptLineCharts name="flow" dataList={getFlowList} />}
          </div>
          <div className={styles.GpsMapEcharts}>
            <div className={styles.listhead}>路口排队长度</div>
            {getrankLenghtList && <OptLineCharts name="line_up_length" dataList={getrankLenghtList} />}
          </div>
        </div>
      </div >
    )
  }
}

export default GpsMap
