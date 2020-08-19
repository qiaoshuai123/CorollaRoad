import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import Header from '../../../components/Header/Header'
import CustomTree from '../../../components/CustomTree/CustomTree'
import MineData from '../../../components/MineData/MineData'
import classNames from 'classnames'
import 'animate.css'
import { Input } from 'antd'
import $bus from '../../../utils/events'
import styles from './InterworkingHome.scss'


class InterworkingHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isname:
        this.props.location.pathname === '/interworkingHome/Monitoring' ? 'goMonitoring' :
          this.props.location.pathname === '/interworkingHome/Simulation' ? 'evaluate' :
            this.props.location.pathname === '/interworkingHome/LoginUser' ? 'goUser' : '',
      showFlag: null, // 是否显示左侧导航栏
      returnPopFlag: null,
    }
    this.stylesH = `width: 0px;
      transition:all .5s;`
    this.stylesRH = `width: 100%;
      left: 0px;
      transition:all .5s;`
    // this.RedirectsRouter()
  }
  componentDidMount = () => {
    // this.map
    this.messageInformation()
  }
  componentDidUpdate = () => {

  }
  messageInformation = () => {
    $bus.on('messageRouter', (text) => {
      this.setState({
        isname: text,
      })
    })
  }
  changeLeftMenu = () => {
    if (this.state.showFlag) {
      window.showFlag = true
      window.showStatus = true
      this.setState({
        showFlag: null
      })
      $("#container-right").attr("style", '')
      $("#menu-left").attr("style", '')
    } else {
      window.showFlag = true
      window.showStatus = null
      this.setState({
        showFlag: true
      })
      $("#container-right").attr("style", this.stylesRH)
      $("#menu-left").attr("style", this.stylesH)
    }
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
      returnPopFlag: true,
    }, () => {
      returnPop()
      this.setState({ returnPopFlag: null })
    })
  }
  turnPopFn = (status) => {
    this.setState({ returnPopFlag: status })
  }
  goMonitoring = () => {
    this.clearActive()
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
    const { isname, showFlag, returnPopFlag } = this.state
    return (
      <div className={styles.InterworkingHomeBox}>
        <Header {...this.props} />
        <div id='menu-left' className={classNames('animated', styles.Interwork_left)}>
          <div className={styles.Interwork_leftBox}>
            {/* <div className={styles.InterworkLeft_search}>
              <Search
                placeholder="关键词搜索"
                onSearch={value => console.log(value)}
                style={{ width: 240 }}
              />
            </div> */}
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
          {!showFlag ? <div className={styles.closeBtn} title="收起" onClick={this.changeLeftMenu}>《 </div> : <div className={styles.openBtn} title="展开" onClick={this.changeLeftMenu}>》</div>}
        </div>
        <div id='container-right' className={classNames('animated', styles.Interwork_right)}>
          <MineData {...this.props} returnPop={returnPopFlag} turnPopFn={this.turnPopFn} />
          {renderRoutes(this.props.route.routes)}
        </div>
      </div >
    )
  }
}

export default InterworkingHome
