// 路口监测

import React, { Component } from 'react'
import styles from './Surveillance.scss'

class Surveillance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lsitLists:[]
    }
  }
  componentDidMount = () => {

  }

  render() {
    return (
      <div className={styles.Surveillance}>
        {/* <div className={styles.Surveillance_messageLeft}>1</div> */}
        <div className={styles.Surveillance_messageLeft}>
          <div className={styles.listhead}>优化方案统计及</div>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
        </div>
      </div>
    )
  }
}

export default Surveillance
