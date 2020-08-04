import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import Header from '../../../components/Header/Header'
import CustomTree from '../../../components/CustomTree/CustomTree'
import MineData from '../../../components/MineData/MineData'

import { Input } from 'antd'
import styles from './InterworkingHome.scss'

class InterworkingHome extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount = () => {

  }
  goMonitoring = () => {
    this.props.history.push('/interworkingHome/Monitoring')
  }

  render() {
    const { Search } = Input
    console.log(this.props.route.routes, '123456')
    return (
      <div className={styles.InterworkingHomeBox}>
        <Header {...this.props} />
        <div className={styles.Interwork_left}>
          <div className={styles.InterworkLeft_search}>
            <Search
              placeholder="关键词搜索"
              onSearch={value => console.log(value)}
              style={{ width: 230 }}
            />
          </div>
          <div className={styles.InterworkLeft_Title}>
            <span onClick={this.goMonitoring}>全局监视</span>
          </div>
          <CustomTree />
        </div>
        <div className={styles.Interwork_right}>
          <MineData />
          {renderRoutes(this.props.route.routes)}
        </div>
      </div>
    )
  }
}

export default InterworkingHome
