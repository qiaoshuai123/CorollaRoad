import React, { Component } from 'react'
import { Input } from 'antd'
import Header from '../../../components/Header/Header'
import CustomTree from '../../../components/CustomTree/CustomTree'
import styles from './SignalStatus.scss'

class SignalStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isInterworkingList: false,
    }
  }
  componentDidMount = () => {

  }
  showInterworkingList = (isShow) => {
    if (isShow) {
      this.setState({
        isInterworkingList: true,
      })
    } else {
      this.setState({
        isInterworkingList: false,
      })
    }
  }
  render() {
    const { Search } = Input
    const { isInterworkingList } = this.state
    return (
      <div className={styles.SignalStatus}>
        <div className={styles.promptBox}>
          <div><span className={styles.spanTop} />本地多时段控制0处</div>
          <div><span className={styles.spanBom} />手动控制0处</div>
          <div><span className={styles.spanBom} />实时优化控制7处</div>
          <div><span className={styles.spanBom} />多时段优化控制0处</div>
          <div><span className={styles.spanBom} />设备离线2处</div>
        </div>
        <div onClick={() => this.showInterworkingList(true)} className={styles.switch} />
      </div>
    )
  }
}

export default SignalStatus
