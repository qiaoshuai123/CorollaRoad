// 仿真评价数据分析
import React, { Component } from 'react'
import styles from './Simulation.scss'
import OptLineCharts from './OptLineCharts'
import getResponseDatas from '../../../utils/getResponseDatas'
import Select from '../../../components/Antd/Select/Select'
class Simulation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roadNode: null,
      planData: null,
      interId: null,
      planId: null,
      planName: null,
      getFirstChartData: null,
      getFirstChartDatas: null,
      getSecondChartData: null,
      getSecondChartDatas: null,
      getThirdChartData: null,
      getThirdChartDatas: null,
      getFourChartData: null,
      getFourChartDatas: null,
    }
    this.roadListUrl = '/signal-decision/monitor/roadList' // 路口经纬度列表
    this.getPlanListUrl = '/signal-decision/sim/getPlanList' //获取方案下拉' // 方案
    this.getFirstChartUrl = '/signal-decision/sim/getFirstChart' //左上路口流量
    this.getSecondChartUrl = '/signal-decision//sim/getSecondChart' //右上路口延误时间
    this.getThirdChartUrl = '/signal-decision/sim/getThirdChart' //左下路口排队长度
    this.getFourChartUrl = '/signal-decision/sim/getFourChart' //右下路口停车次数
  }
  componentDidMount = () => {
    // 路口
    this.getRoadData()
  }
  componentDidUpdate = () => {
    // console.log(window.showFlag, '看下是啥...')
    if (window.showFlag) {
      this.setState({
        getFirstChartData: null,
        getSecondChartData: null,
        getThirdChartData: null,
        getFourChartData: null,
      }, () => {
        this.setState({
          getFirstChartData: this.state.getFirstChartDatas,
          getSecondChartData: this.state.getSecondChartDatas,
          getThirdChartData: this.state.getThirdChartDatas,
          getFourChartData: this.state.getFourChartDatas,
        })
      })
      window.showFlag = null
      window.showStatus = null
    }
  }
  getRoadData = () => {
    getResponseDatas('get', this.roadListUrl).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({ roadNode: data, planId: null }, () => {
          this.getPlanData(this.state.roadNode[0].node_id)
        })
      }
    })
  }
  getPlanData = (interId) => {
    getResponseDatas('get', this.getPlanListUrl + '?interId=' + interId).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({ planData: data, interId, planId: data[0] ? data[0].plan_id : null, planName: data[0] ? data[0].plan_name : null}, () => {
          debugger
          console.log(data)
          this.state.planData[0] ? this.planToRender(this.state.planData[0].plan_id) : null
        })
      }
    })
  }
  planToRender = (planId) => {
    let planName = ''
    if(planId instanceof Array){
      planId.map(id => {
        this.state.planData.map(item => {
          if(id === item.plan_id){
            planName += item.plan_name + item.plan_id  + ','
          }
        })
      })
      this.setState({ planName: planName.slice(0, -1) })
      }else{
        this.state.planData.map(item => {
          if(planId === item.plan_id){
            this.setState({ planName: item.plan_name + item.plan_id })
          }
        })
      }
    this.getShowCharts(this.getFirstChartUrl, this.state.interId, planId)
    this.getShowCharts(this.getSecondChartUrl, this.state.interId, planId)
    this.getShowCharts(this.getThirdChartUrl, this.state.interId, planId)
    this.getShowCharts(this.getFourChartUrl, this.state.interId, planId)
  }
  getShowCharts = (url, interId, planId) => {
    getResponseDatas('get', url + "?interId=" + interId + "&planId=" + planId).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        if (url.indexOf("getFirstChart") > -1) {
          this.setState({ getFirstChartData: null })
          let getFirstChartData = []
          data.map(item => {
            let itemArr1 = [], time1 = [], datas1 = [];
            item.map(res => {
              time1.push(res.time)
              datas1.push(res.opt_value)
            })
            itemArr1.push(time1)
            itemArr1.push(datas1)
            getFirstChartData.push(itemArr1)
          })
          this.setState({ getFirstChartData, getFirstChartDatas: getFirstChartData })
        } else if(url.indexOf("getSecondChart") > -1) {
          this.setState({ getSecondChartData: null })
          let getSecondChartData = []
          data.map(item => {
            let itemArr2 = [], time2 = [], datas2 = [];
            item.map(res => {
              time2.push(res.time)
              datas2.push(res.opt_value)
            })
            itemArr2.push(time2)
            itemArr2.push(datas2)
            getSecondChartData.push(itemArr2)
          })
          this.setState({ getSecondChartData, getSecondChartDatas: getSecondChartData })
        } else if(url.indexOf("getThirdChart") > -1) {
          this.setState({ getThirdChartData: null })
          let getThirdChartData = []
          data.map(item => {
            let itemArr3 = [], time3 = [], datas3 = [];
            item.map(res => {
              time3.push(res.time)
              datas3.push(res.opt_value)
            })
            itemArr3.push(time3)
            itemArr3.push(datas3)
            getThirdChartData.push(itemArr3)
          })
          this.setState({ getThirdChartData, getThirdChartDatas: getThirdChartData })
        } else {
          this.setState({ getFourChartData: null })
          let getFourChartData = []
          data.map(item => {
            let itemArr4 = [], time4 = [], datas4 = [];
            item.map(res => {
              time4.push(res.time)
              datas4.push(res.opt_value)
            })
            itemArr4.push(time4)
            itemArr4.push(datas4)
            getFourChartData.push(itemArr4)
          })
          this.setState({ getFourChartData, getFourChartDatas: getFourChartData })

        }
      }
    })
  }
  render() {
    const { roadNode, planData, interId, planId, planName, getFirstChartData, getSecondChartData, getThirdChartData, getFourChartData } = this.state
    return (
      <div className={styles.Simulation}>
        <div className={styles.searchBox}>
          <div className={styles.search}>
            {
              roadNode && <Select defaultValue={roadNode[0].node_id} name="node_name" value="node_id" options={roadNode} onChange={(value) => { this.getPlanData(value) }} /> 
            }         
          </div>
          <div className={styles.search}>
            {
              planData && <Select name="plan_name" value="plan_id" modeStatus={true} options={planData} onChange={(value) => {this.planToRender(value)}} /> 
            }
          </div>
        </div>
        <div className={styles.mainBox}>
          <div className={styles.echartBox}>
            <div className={styles.Title}> 路口流量</div>
            <div className={styles.content}>
              <div className={styles.center}>
                { getFirstChartData && planName && 
                  <OptLineCharts resData={getFirstChartData} legendName={planName} /> 
                }
              </div>
            </div>
          </div>
          <div className={styles.echartBox}>
            <div className={styles.Title}>路口延误时间</div>
            <div className={styles.content}>
              <div className={styles.center}>
                { getSecondChartData && planName && 
                  <OptLineCharts resData={getSecondChartData} legendName={planName}/> 
                }
              </div>
            </div>
          </div>
          <div className={styles.echartBox}>
            <div className={styles.Title}>路口排队长度</div>
            <div className={styles.content}>
              <div className={styles.center}>
                { getThirdChartData && planName && 
                  <OptLineCharts resData={getThirdChartData} legendName={planName} /> 
                }
              </div>
            </div>
          </div>
          <div className={styles.echartBox}>
            <div className={styles.Title}>停车次数</div>
            <div className={styles.content}>
              <div className={styles.center}>
                { getFourChartData && planName && 
                  <OptLineCharts resData={getFourChartData} legendName={planName} /> 
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Simulation
