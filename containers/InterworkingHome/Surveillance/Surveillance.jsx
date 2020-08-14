// 路口监测

import React, { Component } from 'react'
import { Icon } from 'antd'
import EvaluateEcharts from './EvaluateEcharts/EvaluateEcharts'
import GpsMap from './GpsMap/GpsMap'
import getResponseDatas from '../../../utils/getResponseDatas'
import styles from './Surveillance.scss'

class Surveillance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 0, // 计数器
      isGpsMap: true,
      roadRankingList: [],
      roadLister: [],
      getControlModelList: null,
    }
    this.roadList = 'signal-decision/monitor/roadList' // 全部路口
    this.jam = '/signal-decision/monitor/rank/jam' // 路口排名-拥堵排名
    this.getControlModel = 'signal-decision/road/getControlModel' // 控制状态排名
  }
  componentDidMount = () => {
    this.renders()
  }
  getControlModeler = () => {
    getResponseDatas('get', this.getControlModel, { interId: this.roadId }).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({
          getControlModelList: data,
        })
      }
    })
  }
  ckeckActive = (items, ind) => {
    this.roadId = items.node_id
    this.setState({
      num: ind,
    })
    this.getControlModeler()
  }
  isGpsMapShow = () => {
    this.setState({
      isGpsMap: true,
    })
  }
  goDetail = () => {
    this.setState({
      isGpsMap: false,
    })
  }
  renders = () => {
    getResponseDatas('get', this.jam).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({
          roadRankingList: data,
        })
      }
    })
    getResponseDatas('get', this.roadList).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.roadId = data[0].node_id
        this.setState({
          roadLister: data,
        })
        this.getControlModeler()
      }
    })
  }

  render() {
    const { num, isGpsMap, roadRankingList, roadLister, getControlModelList } = this.state
    return (
      <React.Fragment>
        {
          isGpsMap ?
            <div>
              <div className={styles.Surveillance_messageLeft} >
                <div className={styles.listhead} onClick={this.goDetail}><span>全部路口</span></div>
                <div className={styles.listBox}>
                  {
                    roadLister && roadLister.map((item, ind) => <li className={num === ind ? styles.actives : ''} onClick={() => this.ckeckActive(item, ind)} key={item.node_id + item}>{item.node_name}</li>)
                  }
                </div>
              </div >
              <div className={styles.Surveillance}>
                <div className={styles.Surveillance_messageRight}>
                  <div className={styles.Surveillance_RightLists}>
                    <div className={styles.listhead}>拥堵排名</div>
                    <div className={styles.Surveillance_RightListsBox}>
                      {
                        roadRankingList && roadRankingList.map(item =>
                          <li key={item.node_id + item}><span className={styles.circulars} /><span className={styles.ItemList}>{item.node_name}</span><Icon className={styles.arrowsGreen} type="arrow-down" /></li>
                        )
                      }
                    </div>
                  </div>
                  <div className={styles.Surveillance_messageRightEcharts}>
                    <div className={styles.listhead}>控制状态排名</div>
                    {getControlModelList && <EvaluateEcharts dataList={getControlModelList} />}
                  </div>
                </div>
              </div>
            </div >
            : <GpsMap isGpsMapShow={this.isGpsMapShow} />
        }
      </React.Fragment>
    )
  }
}

export default Surveillance
