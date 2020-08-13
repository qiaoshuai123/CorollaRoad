// 路口评价
import React, { Component } from 'react'
import { Button, Progress } from 'antd'
import moment from 'moment'
import OptLineCharts from './OptLineCharts/OptLineCharts'
import Select from '../../../components/Antd/Select/Select'
import AntdDatePicker from '../../../components/Antd/DatePicker/DatePicker'
import styles from './Regtion.scss'

class Regtion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options2: [{ key: '方案一', id: 1 }],
      startDateTime: '2020-08-10 00:00',
      endDateTime: '2020-08-10 23:59',
      endOpen: false,
      titName: '区域平均流量',
      planId: 'flow',
      typeData: [
        { key: '区域平均流量', value: 'flow' },
        { key: '区域平均延误时间', value: 'delay_time' },
        { key: '区域平均拥堵延时', value: 'congestion_delay' }
      ],
    }
  }
  componentDidMount = () => {

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
    const { options2, titName, dataImportPop, startDateTime, endDateTime, endOpen } = this.state
    return (
      <div className={styles.Regtion}>
        <div className={styles.echartsBox}>
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
        </div>
        <div className={styles.searchBox}>
          <div className={styles.search}>评价指标&nbsp;:&nbsp; <Select style={{ width: '135px' }} defaultValue={1} name="key" value="id" options={options2} onChange={(value) => { console.log(value) }} /></div>
          <div className={styles.search}>初始时间&nbsp;:&nbsp; <AntdDatePicker onChange={(field, value) => { console.log(field, value) }} /></div>
          <div className={styles.search}>对比时间&nbsp;:&nbsp; <AntdDatePicker onChange={(field, value) => { console.log(field, value) }} /></div>
          <div className={styles.buttons}>
            <Button type="primary" className={styles.Button}>查&nbsp;&nbsp;&nbsp;&nbsp;询</Button>
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
