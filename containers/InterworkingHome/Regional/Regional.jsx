import React, { Component } from 'react'
import { Icon, Select } from 'antd'
import { param } from 'jquery'
import AreaCharts from './AreaCharts'
import AreaLineCharts from './AreaLineCharts'
import getResponseDatas from '../../../utils/getResponseDatas'
import Axios from '../../../utils/aixosAll'
import datas from './data.js'
import GreenWaveCharts from '../../../components/GreenWaveCharts/GreenWaveCharts'
import styles from './Regional.scss'


const { Option } = Select
class Regional extends Component {
  constructor(props) {
    super(props)
    this.state = {
      areList: [],
      roadLister: null,
      getAvgSpeedList: null,
      showAreaConfig: false,
      programmeTime: '', // 方案时间
      mainLineValue: '',
      mainLine: [], // 干线列表
      planListValue: '',
      planLister: [], // 优化方案列表
      roadList: [], // 区域路口列表
      getOccupancy: null, // 区域优化配置-占有率
      getSectionFlow: null, // 区域优化配置-通过断面车辆数
      roadListByPlanValue: '',
      roadListByPlan: [], // 区域优化配置-区域路口列表
      roadListByPlanInfoList: [], // 区域优化配置-区域路口方案详情
      greenWaveData: null,
      totleDistance: 900,
      showForwordWave: true,
      showReverseWave: true,
    }
    this.getAnyOne = '/signal-decision/area/getAnyOne' // 区域优化配置渠道化
    this.roadList = '/signal-decision/area/getAvgDelay' // 区域平均延误
    this.getAvgSpeed = '/signal-decision/area/getAvgSpeed' // 区域平均车速
    this.getOccupancy = '/signal-decision/area/getOccupancy' // 区域优化配置-占有率
    this.getSectionFlow = '/signal-decision/area/getSectionFlow' // 区域优化配置-通过断面车辆数
    this.mainLineList = '/signal-decision/area/mainLineList' // 干线列表
    this.planList = '/signal-decision/area/planList' // 优化方案列表
    this.getAvgDelay = '/signal-decision/area/roadList' // 区域路口列表
    this.roadListByPlan = '/signal-decision/area/roadListByPlan' // 区域优化配置-区域路口列表
    this.roadListByPlanInfo = '/signal-decision/area/roadListByPlanInfo' // 区域优化配置-区域路口方案详情
    this.areaId = 1 // 默认区域ID
  }
  componentDidMount = () => {
    // 初始化执行页面接口
    this.renders()
  }
  handleShowAreaConfig = () => {
    this.setState({ showAreaConfig: true })
    this.regionalOptimization()
    this.planListGetAvgDelay()
  }
  hanleHideAreaConf = () => {
    this.setState({ showAreaConfig: false })
  }
  selectMainLine = (value) => {
    this.setState({
      mainLineValue: value,
    })
  }
  selectplanList = (id, optios) => {
    // const { pname } = optios.props
    const { planLister } = this.state
    const programmeTime = planLister.find(item => item.plan_id === id)
    this.plan_id = id
    this.setState({
      planListValue: programmeTime.plan_name + programmeTime.plan_id,
      programmeTime: programmeTime.plan_time_slot,
    })
    this.roadListByPlanInfoer()
  }
  selectroadListByPlan = (value) => {
    const { roadListByPlan } = this.state
    this.node_id = roadListByPlan.find(item => item.node_name === value).node_id
    this.setState({
      roadListByPlanValue: value,
    })
    this.roadListByPlanInfoer()
  }
  // 区域优化配置
  regionalOptimization = () => {
    // 区域优化配置渠道化
    getResponseDatas('get', this.getAnyOne, { areaId: this.areaId }).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        console.log(123456789, data)
        this.setState({
          greenWaveData: data,
        })
      }
    })
    // 干线列表
    getResponseDatas('get', this.mainLineList, { areaId: this.areaId }).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({
          mainLine: data,
          mainLineValue: data[0].main_line_name,
        })
      }
    })
    // 通过断面车辆数
    getResponseDatas('get', this.getSectionFlow, { areaId: this.areaId }).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({
          getSectionFlow: data,
        })
      }
    })
    // 区域优化配置-占有率
    getResponseDatas('get', this.getOccupancy, { areaId: this.areaId }).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({
          getOccupancy: data,
        })
      }
    })
  }
  planListGetAvgDelay = () => {
    // 优化方案
    const that = this
    function getplanList() {
      return Axios.get(that.planList)
    }
    function getroadListByPlan() {
      return Axios.get(that.roadListByPlan, { params: { areaId: that.areaId } })
    }
    console.log('ddddddddddddddddddddd')
    Axios.all([getplanList(), getroadListByPlan()])
      .then(Axios.spread((acct, perms) => {
        const { code, data } = acct.data
        if (code === 200) {
          this.plan_id = data[0].plan_id
          console.log(data, 'qqqqssss')
          this.setState({
            planLister: data,
            planListValue: data[0].plan_name,
            programmeTime: data[0].plan_time_slot,
          })
        }
        const codes = perms.data.code
        const dataLisers = perms.data.data
        if (codes === 200) {
          this.node_id = dataLisers[0].node_id
          this.setState({
            roadListByPlan: dataLisers,
            roadListByPlanValue: dataLisers[0].node_name,
          })
        }
        // 区域优化配置-区域路口方案详情
        this.roadListByPlanInfoer()
      }))
  }
  roadListByPlanInfoer = () => {
    getResponseDatas('get', this.roadListByPlanInfo, { interId: this.node_id, planId: this.plan_id }).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        // console.log(data)
        this.setState({
          roadListByPlanInfoList: data,
        })
      }
    })
  }
  renders = () => {
    // 区域路口列表
    getResponseDatas('get', this.getAvgDelay, { areaId: this.areaId }).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({
          areList: data,
        })
      }
    })
    // 区域平均延误
    getResponseDatas('get', this.roadList, { areaId: this.areaId }).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        console.log(data, 'ss')
        this.setState({
          roadLister: data,
        })
      }
    })
    // 区域平均速度
    getResponseDatas('get', this.getAvgSpeed, { areaId: this.areaId }).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({
          getAvgSpeedList: data,
        })
      }
    })
  }

  render() {
    const {
      mainLineValue, programmeTime, planListValue, roadListByPlanValue,
      showAreaConfig, areList, roadLister, getAvgSpeedList,
      planLister, mainLine, getSectionFlow, getOccupancy,
      roadListByPlan, roadListByPlanInfoList,
    } = this.state
    return (
      <React.Fragment>
        {
          showAreaConfig ?
            <div className={styles.configBox}>
              <div className={styles.confTitle}>区域优化配置 <span className={styles.closeConf} onClick={this.hanleHideAreaConf}><Icon type="close" /></span></div>
              <div className={styles.confContent}>
                <div className={styles.confItem}>
                  <div className={styles.title}>
                    <span>干线：</span>
                    <Select value={mainLineValue} onChange={this.selectMainLine}>
                      {mainLine && mainLine.map(item =>
                        <Option key={item.main_line_id + item} value={item.main_line_name}>{item.main_line_name}</Option>)}
                    </Select>
                    <span>优化方案：</span>
                    <Select value={planListValue} onChange={this.selectplanList}>
                      {planLister && planLister.map((item) => {
                        // const Keys = Math.random().toString().substr(2, 8)
                        return <Option key={item.plan_id} value={item.plan_id}>{item.plan_name + item.plan_id}</Option>
                      })}
                    </Select>
                    <span style={{ color: '#00FFFF' }}>方案适用时段：{programmeTime}</span>
                  </div>
                  <div className={styles.greenWaveBox}>
                    <div className={styles.greenWave}>
                      {
                        this.state.greenWaveData &&
                        <GreenWaveCharts
                          chartsData={this.state.greenWaveData}
                          totleDistance={this.state.totleDistance}
                          showForwordWave={this.state.showForwordWave}
                          showReverseWave={this.state.showReverseWave}
                        />
                      }
                    </div>
                    <div className={styles.greenConf}>
                      <div className={styles.interConf}>
                        <div className={styles.confName}>区域路口：</div>
                        <div className={styles.confMsg}>
                          <Select value={roadListByPlanValue} onChange={this.selectroadListByPlan}>
                            {roadListByPlan && roadListByPlan.map(item =>
                              <Option key={item.node_id + item} value={item.node_name}>{item.node_name}</Option>)}
                          </Select>
                        </div>
                      </div>
                      <div className={styles.interConf}>
                        <div className={styles.confName}>正向通行速度：</div>
                        <div className={styles.confMsg}>
                          <div className={styles.interSpeed}><span className={styles.confVal}>37.00</span><span className={styles.confUnit}>千米/小时</span></div>
                        </div>
                      </div>
                      <div className={styles.interConf}>
                        <div className={styles.confName}>反向通行速度：</div>
                        <div className={styles.confMsg}>
                          <div className={styles.interSpeed}><span className={styles.confVal}>37.00</span><span className={styles.confUnit}>千米/小时</span></div>
                        </div>
                      </div>
                      <div className={styles.interConf} style={{ flex: 2, position: 'relative' }}>
                        <div className={styles.splitLine} />
                        <div className={styles.phaseBody}>
                          <div className={styles.phaseItem}>
                            <div className={styles.item}>相位：</div>
                            <div className={styles.item}>绿信比(%)：</div>
                          </div>
                          <div className={styles.phaseValur}>
                            {
                              roadListByPlanInfoList && roadListByPlanInfoList.map((item) => {
                                return (
                                  <div key={item.phase_name + item} className={styles.valueBox}>
                                    <div className={styles.values}>{item.phase_name}</div>
                                    <div className={styles.values}>{item.green_letter_ratio}</div>
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                      </div>
                      <div className={styles.interConf}>
                        <div className={styles.confName}>方案适用时间段：</div>
                        <div className={styles.confMsg}><span className={styles.confVal}>{roadListByPlanInfoList.length && roadListByPlanInfoList[0].plan_time_slot}</span></div>
                      </div>
                      <div className={styles.interConf}>
                        <div className={styles.confName}>周期(S)：</div>
                        <div className={styles.confMsg}><span className={styles.confVal}>{roadListByPlanInfoList.length && roadListByPlanInfoList[0].cycle}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.confItem}>
                  <div className={styles.confCharts}>
                    <div className={styles.title}>通过断面车辆数</div>
                    <div className={styles.chartMsg}>{getSectionFlow && <AreaLineCharts dataList={getSectionFlow} name="getSectionFlow" />}</div>
                  </div>
                  <div className={styles.confCharts}>
                    <div className={styles.title}>占有率</div>
                    <div className={styles.chartMsg}>{getOccupancy && <AreaLineCharts dataList={getOccupancy} name="getOccupancy" />}</div>
                  </div>
                </div>
              </div>
            </div> :
            <div className={styles.Regional}>
              <div className={styles.interListBox}>
                <div className={styles.title}>花冠中路区域 <span className={styles.areaConfig} onClick={this.handleShowAreaConfig}>区域优化配置</span></div>
                <ul className={styles.interMsg}>
                  {
                    areList && areList.map((item) => {
                      return (
                        <li key={item.node_id + item} className={styles.interItem}>
                          <div className={styles.interName}>{item.node_name}</div>
                          <div className={styles.interDetails}>
                            <div className={styles.detailsItems}>实时相位差</div>
                            <div className={styles.detailsItems}>建议相位差</div>
                            <div className={styles.detailsItems}>偏移</div>
                            <div className={styles.detailsItems}>协调相位</div>
                            <div className={styles.detailsItems}>速度</div>
                          </div>
                          <div className={styles.interDetails}>
                            <div className={styles.detailsItems}>{item.real_phase_time}</div>
                            <div className={styles.detailsItems}>{item.proposal_phase_time}</div>
                            <div className={styles.detailsItems}>{item.deciation}</div>
                            <div className={styles.detailsItems}>{item.coordinate_phase}</div>
                            <div className={styles.detailsItems}>{item.speed}</div>
                          </div>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
              <div className={styles.areaChartsBox}>
                <div className={styles.chartsItem}>
                  <div className={styles.title}>区域平均延误</div>
                  <div className={styles.chartsWrap}>
                    {roadLister && <AreaCharts name="delay_time" chartsDatas={roadLister} />}
                  </div>
                </div>
                <div className={styles.chartsItem}>
                  <div className={styles.title}>区域平均速度</div>
                  <div className={styles.chartsWrap}>
                    {getAvgSpeedList && <AreaCharts name="avg_speed" chartsDatas={getAvgSpeedList} />}
                  </div>
                </div>
              </div>
            </div>
        }
      </React.Fragment>
    )
  }
}

export default Regional
