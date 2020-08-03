import React, { Component } from 'react'
import { Icon } from 'antd'
import styles from './RoadDetail.scss'
import RoadImg from './img/road.jpg'

class RoadDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      IsspanMessage: false,
    }
  }
  componentWillMount = () => {
    // 接收传递来的路口id
    const { pathname } = this.props.location
    const lengths = pathname.length
    const start = pathname.lastIndexOf('/')
    this.roadId = pathname.substring(start + 1, lengths)
  }
  componentDidMount = () => {

  }
  // 关闭控制窗口
  closeStage = () => {
    this.setState({
      IsspanMessage: false,
    })
  }
  // 打开控制窗口
  showStage = () => {
    this.setState({
      IsspanMessage: true,
    })
  }
  render() {
    const { IsspanMessage } = this.state
    return (
      <div className={styles.RoadDetail}>
        <img src={RoadImg} alt="" />
        <div className={styles.roadName}>
          <div className={styles.roadNameTitle}>路口1</div>
          <div>所属区域:海淀区</div>
          <div>信号机品牌:海信</div>
          <span onClick={this.showStage}>控制窗口</span>
        </div>
        <div className={styles.DeviceStatus}>
          <ul className={styles.DeviceStatus_left}>
            <li><span className={styles.fontColor}>设备状态 :</span><span>&nbsp;正常在线</span></li>
            <li><span className={styles.fontColor}>控制状态 :</span>本地多时段</li>
            <li>
              <span className={styles.fontColor}>当前时段 :</span>&nbsp;
              东西左转
              {/* {
                sinaglInfo &&
                <span className={styles.stageImgBox}>
                  <img width="30px" height="30px" src={`${this.processUrl}/atms/comm/images/anniu/${sinaglInfo.STAGE_IMAGE}`} alt="" />
                </span>
              }&nbsp;
              {sinaglInfo ? sinaglInfo.STAGE_CODE : '--'} */}
            </li>
            <li><span className={styles.fontColor}>当前方案 : </span>方案10</li>
            <li><span className={styles.fontColorTwo}>2019/12/02 22:43:20</span></li>
          </ul>
          <div className={styles.DeviceStatus_right}>
            <dl className={styles.deviceControlBtn}>
              <dt><span className={styles.stageImgBox}>锁定</span></dt>
              <dd>锁定</dd>
            </dl>
            <dl className={styles.deviceControlBtn}>
              <dt><span className={styles.stageImgBox}>自动</span></dt>
              <dd>取消步进</dd>
            </dl>
          </div>
        </div>
        {IsspanMessage &&
          <div className={styles.spanMessage}>
            <span onClick={this.closeStage} className={styles.closeStage}><Icon type="close" /></span>
            <div className={styles.stage}>
              <div className={styles.stageLeft}>锁定阶段控制:</div>
              <ul className={styles.stageRight}>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
              </ul>
            </div>
            <div className={styles.control}>
              <div className={styles.controlLeft}>锁定控制模式:</div>
              <ul className={styles.controlRight}>
                <li>全红控制</li>
                <li>黄闪控制</li>
                <li>关灯控制</li>
              </ul>
            </div>
            <div className={styles.programme}>
              <div className={styles.programmeLeft}>锁定方案:</div>
              <ul className={styles.programmeRight}>
                <li>方案一</li>
                <li>方案二</li>
                <li>方案三</li>
              </ul>
            </div>
            <div className={styles.Timing}>
              <div className={styles.timingLeft}>
                校时:
              </div>
              <div className={styles.timingRight}>
                <span>DCU校时</span>
                <span>信号机校时</span>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default RoadDetail
