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
      isname:
        this.props.location.pathname === '/interworkingHome/Monitoring' ? 'goMonitoring' :
          this.props.location.pathname === '/interworkingHome/Simulation' ? 'evaluate' :
            this.props.location.pathname === '/interworkingHome/LoginUser' ? 'goUser' : '',
    }

    // this.RedirectsRouter()
  }
  componentDidMount = () => {

  }
  componentDidUpdate = () => {

  }
  // RedirectsRouter = () => {
  //   console.log(this.props.location.pathname, 'sv')
  //   if (this.props.location.pathname === '/') {
  //     this.props.history.push('interworkingHome/Monitoring')
  //   }
  // }
  // 清除isname
  clearActive = () => {
    this.setState({
      isname: '',
    })
  }
  goMonitoring = () => {
    this.setState({
      isname: 'goMonitoring',
    })
    this.props.history.push('/interworkingHome/Monitoring')
  }
  evaluate = () => {
    this.setState({
      isname: 'evaluate',
    })
    this.props.history.push('/interworkingHome/Simulation')
  }
  goUser = () => {
    this.setState({
      isname: 'goUser',
    })
    this.props.history.push('/interworkingHome/LoginUser')
  }
  render() {
    const { Search } = Input
    const { isname } = this.state
    return (
      <div className={styles.InterworkingHomeBox}>
        <Header {...this.props} />
        <div className={styles.Interwork_left}>
          <div className={styles.Interwork_leftBox}>
            <div className={styles.InterworkLeft_search}>
              <Search
                placeholder="关键词搜索"
                onSearch={value => console.log(value)}
                style={{ width: 250 }}
              />
            </div>
            <div onClick={this.goMonitoring} className={`${isname === 'goMonitoring' ? styles.active : ''} ${styles.InterworkLeft_Title}`}>
              <span /><span>全局监视</span>
            </div>
            <CustomTree clearActive={this.clearActive} />
            <div onClick={this.evaluate} className={`${isname === 'evaluate' ? styles.active : ''} ${styles.InterworkLeft_Title}`}>
              <span /> <span>仿真评价数据分析</span>
            </div>
            <div onClick={this.goUser} className={`${isname === 'goUser' ? styles.active : ''} ${styles.InterworkLeft_Title}`}>
              <span /><span>用户管理</span>
            </div>
          </div>
        </div>
        <div className={styles.Interwork_right}>
          <MineData />
          {renderRoutes(this.props.route.routes)}
        </div>
      </div >
    )
  }
}

export default InterworkingHome
