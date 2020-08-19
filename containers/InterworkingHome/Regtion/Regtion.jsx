// 路口评价
import React, { Component } from 'react'
import { Button, Progress } from 'antd'
import moment from 'moment'
import OptLineCharts from './OptLineCharts/OptLineCharts'
import Select from '../../../components/Antd/Select/Select'
import AntdDatePicker from '../../../components/Antd/DatePicker/DatePicker'
import getResponseDatas from '../../../utils/getResponseDatas'
import styles from './Regtion.scss'

class Regtion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options2: [{ key: '方案一', id: 1 }],
      startDateTime: '2020-08-10 00:00:00',
      endDateTime: '2020-08-10 07:20:00',
      contrastStartDate: '2020-08-10 07:20:00',
      contrastEndDate: '2020-08-10 08:00:00',
      endOpen: false,
      titName: '区域平均流量',
      planId: 'flow',
      typeData: [
        { key: '区域平均流量', value: 'flow' },
        { key: '区域平均延误时间', value: 'delay_time' },
        { key: '区域平均拥堵延时', value: 'congestion_delay' }
      ],
    }
    this.getAreaEvaluateUrl = '/signal-decision/optimize/getAreaEvaluate' //查询区域评价
  }
  componentDidMount = () => {
    $("#getDataCharts").trigger('click')
  }
  getSearchCharts = (startDateTime, endDateTime, contrastStartDate, contrastEndDate, areaId, planId) => {
    const urls = '?initStartTime=' + startDateTime + '&initEndTime=' + endDateTime + '&compareStartTime=' + contrastStartDate + '&compareEndTime=' + contrastEndDate + '&areaId=' + areaId + '&type=' + planId
    getResponseDatas('get', this.getAreaEvaluateUrl + urls).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({ evaluateData: null }, () => {
          let evaluateData = [], itemArr1 = [], itemArr2 = []
          let time1 = [], datas1 = [];
          let time2 = [], datas2 = [];
          data.init.map(item => {
            debugger
            time1.push(item.time)
            datas1.push(item.opt_value)
            // console.log(itemArr1, '对不？')
          })
          itemArr1.push(time1)
          itemArr1.push(datas1)
          evaluateData.push(itemArr1)
          data.compare.map(item => {
            time2.push(item.time)
            datas2.push(item.opt_value)
          })
          itemArr2.push(time2)
          itemArr2.push(datas2)
          evaluateData.push(itemArr2)
          this.setState({ evaluateData })
        })
        // this.setState({ roadNode: data, interId: data[0].node_id },()=>{
        //   $("#getDataCharts").trigger('click')
        // })
      }
    })
  }
  getTypeName = (type) => {
    switch(type) {
      case 'flow':
        this.setState({ titName: '区域平均流量' })
        break;
      case 'delay_time':
        this.setState({ titName: '区域平均延误时间' })
        break;
      case 'congestion_delay':
        this.setState({ titName: '区域平均拥堵延时' })
        break;
    }
  }
  onChange = (field, value) => {
    /*     if (this.props.onChange) {
          this.props.onChange(field, value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '')
        } */
    this.setState({
      [field]: value,
    })
  }

  onStartChange = (value) => {
    this.onChange('startDateTime', value)
  }

  onEndChange = (value) => {
    this.onChange('endDateTime', value)
  }
  disabledStartDate = (startDateTime) => {
    const { endDateTime } = this.state
    if (!startDateTime || !endDateTime) {
      return false
    }
    return startDateTime.valueOf() > endDateTime.valueOf()
  }

  disabledEndDate = (endDateTime) => {
    const { startDateTime } = this.state
    if (!endDateTime || !startDateTime) {
      return false
    }
    return endDateTime.valueOf() <= startDateTime.valueOf()
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true })
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open })
  }
  render() {
    const { typeData, planId, titName, startDateTime, endDateTime, contrastStartDate, contrastEndDate, evaluateData } = this.state
    return (
      <div className={styles.Regtion}>
        <div className={styles.echartsBox}>
          <div className={styles.echartsItem}>
            <div className={styles.echartsItemLeft}>
              <div className={styles.lastDay}>昨日平均拥堵延时</div>
              <div className={styles.nowWeek}>本周:9.23</div>
              <div className={styles.lastWeek}>上周:1.21</div>
            </div>
            <div className={styles.echartsItemRight}>
              <div className={styles.echartsItemOut}>
                <Progress
                  type="circle"
                  strokeLinecap="square"
                  percent={75}
                  strokeColor={{
                    '0%': '#2486CC',
                    '100%': '#0CCAD6',
                  }}
                  format={() => `${'拥堵延时'}`}
                />
              </div>
              <div className={styles.echartsItemIn}>
                <Progress
                  type="circle"
                  strokeColor="F0AA18"
                  strokeLinecap="square"
                  width={100}
                  percent={30}
                  format={() => ''}
                />
              </div>
            </div>
          </div>
          <div className={styles.echartsItem}>
            <div className={styles.echartsItemLeft}>
              <div className={styles.lastDay}>昨日平均延时</div>
              <div className={styles.nowWeek}>本周:9.23</div>
              <div className={styles.lastWeek}>上周:1.21</div>
            </div>
            <div className={styles.echartsItemRight}>
              <div className={styles.echartsItemOut}>
                <Progress
                  type="circle"
                  strokeLinecap="square"
                  percent={75}
                  strokeColor={{
                    '0%': '#2486CC',
                    '100%': '#0CCAD6',
                  }}
                  format={() => `${'拥堵延时'}`}
                />
              </div>
              <div className={styles.echartsItemIn}>
                <Progress
                  type="circle"
                  strokeColor="F0AA18"
                  strokeLinecap="square"
                  width={100}
                  percent={30}
                  format={() => ''}
                />
              </div>
            </div>
          </div>
          <div className={styles.echartsItem}>
            <div className={styles.echartsItemLeft}>
              <div className={styles.lastDay}>昨日晚高峰拥堵延时</div>
              <div className={styles.nowWeek}>本周:9.23</div>
              <div className={styles.lastWeek}>上周:1.21</div>
            </div>
            <div className={styles.echartsItemRight}>
              <div className={styles.echartsItemOut}>
                <Progress
                  type="circle"
                  strokeLinecap="square"
                  percent={75}
                  strokeColor={{
                    '0%': '#2486CC',
                    '100%': '#0CCAD6',
                  }}
                  format={() => `${'拥堵延时'}`}
                />
              </div>
              <div className={styles.echartsItemIn}>
                <Progress
                  type="circle"
                  strokeColor="F0AA18"
                  strokeLinecap="square"
                  width={100}
                  percent={30}
                  format={() => ''}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.searchBox}>
        <div className={styles.search}>评价指标&nbsp;:&nbsp; 
            {
              typeData && <Select defaultValue={planId} name="key" value="value" options={typeData} onChange={(value) => { this.getTypeName(value) }} />
            }
          </div>
          <div className={styles.search}>初始时间&nbsp;:&nbsp; <AntdDatePicker onChange={(field, value) => { console.log(field, value) }} /></div>
          <div className={styles.search}>对比时间&nbsp;:&nbsp; <AntdDatePicker contrastFlag={true} onChange={(field, value) => { console.log(field, value) }} /></div>
          <div className={styles.buttons}>
            <Button id="getDataCharts" type="primary" className={styles.Button} onClick={() => this.getSearchCharts(startDateTime, endDateTime, contrastStartDate, contrastEndDate, '1', planId)}>查&nbsp;&nbsp;&nbsp;&nbsp;询</Button>
          </div>
        </div>
        <div className={styles.mainBox}>
          <div className={styles.Title}> {titName}</div>
          <div className={styles.content}>
            {
              evaluateData && <OptLineCharts resData={evaluateData} />
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Regtion
