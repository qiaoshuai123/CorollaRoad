// 路口评价
import React, { Component } from 'react'
import styles from './Evaluation.scss'
import OptLineCharts from './OptLineCharts'
import Select from '../../../components/Antd/Select/Select'
import AntdDatePicker from '../../../components/Antd/DatePicker/DatePicker'
import { Button, DatePicker, Upload } from 'antd'
import Popup from '../../../components/Popup/Popup'
import moment from 'moment'

const Uploadprops = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  defaultFileList: [
    {
      uid: '1',
      name: 'xxx.png',
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/xxx.png',
    },
  ],
}
class Evaluation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options1: [{ key: '花冠路与话甲秀南路', id: 1 }],
      options2: [{ key: '方案一', id: 1 }],
      dataImportPop: null,
      startDateTime: moment('2020-06-26 11:00:00'),
      endDateTime: moment('2020-06-26 12:00:00'),
      endOpen: false,
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
    const { options1, options2, dataImportPop, startDateTime, endDateTime, endOpen } = this.state
    return (
      <div className={styles.Evaluation}>
        <div className={styles.searchBox}>
          <div className={styles.search}>路口名称&nbsp;:&nbsp; <Select style={{ width: '135px' }} defaultValue={1} name="key" value="id" options={options1} onChange={(value) => { console.log(value) }} /></div>
          <div className={styles.search}>评价指标&nbsp;:&nbsp; <Select style={{ width: '135px' }} defaultValue={1} name="key" value="id" options={options2} onChange={(value) => { console.log(value) }} /></div>
          <div className={styles.search}>初始时间&nbsp;:&nbsp; <AntdDatePicker onChange={(field, value) => { console.log(field, value) }} /></div>
          <div className={styles.search}>对比时间&nbsp;:&nbsp; <AntdDatePicker onChange={(field, value) => { console.log(field, value) }} /></div>
          <div className={styles.buttons}>
            <Button type="primary" className={styles.Button} onClick={() => { this.setState({ dataImportPop: true }) }}>数据导入</Button>
            <Button type="primary" className={styles.Button}>查&nbsp;&nbsp;&nbsp;&nbsp;询</Button>
          </div>
        </div>
        <div className={styles.mainBox}>
          <div className={styles.Title}> 路口流量</div>
          <div className={styles.content}>
            <div className={styles.center}>
              <OptLineCharts />
            </div>
          </div>
        </div>
        {dataImportPop ?
          <Popup
            Title="数据导入"
            Close={() => { this.setState({ dataImportPop: null }) }}
            Confirm={() => { this.setState({ dataImportPop: null }) }}
          >
            <div className={styles.FromContent}>
              <span className={styles.Title}>数据起始时间&nbsp;:</span>
              <DatePicker
                disabledDate={this.disabledStartDate}
                showTime={{
                  format: 'HH:mm',
                }}
                minuteStep={10}
                format="YYYY-MM-DD HH:mm"
                value={startDateTime}
                placeholder="开始时间"
                onChange={this.onStartChange}
                onOpenChange={this.handleStartOpenChange}
              />
            </div>
            <div className={styles.FromContent}>
              <span className={styles.Title}>数据结束时间&nbsp;:</span>
              <DatePicker
                disabledDate={this.disabledEndDate}
                showTime={{
                  format: 'HH:mm',
                }}
                format="YYYY-MM-DD HH:mm"
                value={endDateTime}
                placeholder="结束时间"
                onChange={this.onEndChange}
                open={endOpen}
                onOpenChange={this.handleEndOpenChange}
              />
            </div>
            <div className={styles.FromContent}>
              <Upload {...Uploadprops}>
                <Button type="primary">
                  文件选择
                </Button>
              </Upload>
            </div>
          </Popup> : null}
      </div>
    )
  }
}

export default Evaluation
