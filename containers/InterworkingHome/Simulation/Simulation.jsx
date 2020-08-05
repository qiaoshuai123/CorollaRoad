// 仿真评价数据分析
import React, { Component } from 'react'
import styles from './Simulation.scss'
import OptLineCharts from '../SignalStatus/OptLineCharts'
import Select from '../../../components/Antd/Select/Select'

class Simulation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options1: [{ key: '花冠路与话甲秀南路', id: 1 }],
      options2: [{ key: '方案一', id: 1 }],
    }
  }
  componentDidMount = () => {

  }

  render() {
    const { options1, options2 } = this.state
    return (
      <div className={styles.Simulation}>
        <div className={styles.searchBox}>
          <div className={styles.search}><Select defaultValue={1} name="key" value="id" options={options1} onChange={(value) => { console.log(value) }} /></div>
          <div className={styles.search}><Select defaultValue={1} name="key" value="id" options={options2} onChange={(value) => { console.log(value) }} /></div>
        </div>
        <div className={styles.mainBox}>
          <div className={styles.echartBox}>
            <div className={styles.Title}> 路口流量</div>
            <div className={styles.content}>
              <OptLineCharts />
            </div>
          </div>
          <div className={styles.echartBox}>
            <div className={styles.Title}>路口延误时间</div>
            <div className={styles.content}>
              <OptLineCharts />
            </div>
          </div>
          <div className={styles.echartBox}>
            <div className={styles.Title}>路口排队长度</div>
            <div className={styles.content}>
              <OptLineCharts />
            </div>
          </div>
          <div className={styles.echartBox}>
            <div className={styles.Title}>路口流量</div>
            <div className={styles.content}>
              <OptLineCharts />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Simulation
