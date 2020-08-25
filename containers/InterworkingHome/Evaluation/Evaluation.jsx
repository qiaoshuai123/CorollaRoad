// 路口评价
import React, { Component } from 'react'
import styles from './Evaluation.scss'
import OptLineCharts from './OptLineCharts'
import Select from '../../../components/Antd/Select/Select'
import AntdDatePicker from '../../../components/Antd/DatePicker/DatePicker'
import { Button, DatePicker, Upload, message } from 'antd'
import Popup from '../../../components/Popup/Popup'
import getResponseDatas from '../../../utils/getResponseDatas'
import moment from 'moment'
// const _this = this
// const Uploadprops = {
//   action: '',
//   onChange({ file, fileList }) {
//     if (file.status !== 'uploading') {
//       console.log(file, fileList);
//       _this.setState({ uploadFileData: file },()=>{
//         console.log(this.state.uploadFileData, '变了吗？？？')
//       })
//     }
//   },
//   defaultFileList: [
//     {
//       uid: '1',
//       name: 'xxx.xlsx',
//       status: 'done',
//       response: 'Server Error 500', // custom error message to show
//       url: 'http://www.baidu.com/xxx.png',
//     },
//   ],
// }
class Evaluation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      typeData: [
        { key: '路口流量', value: 'flow' },
        { key: '路口延误时间', value: 'delay_time' },
        { key: '路口停车次数', value: 'stop_num' },
        { key: '路口排队长度', value: 'line_up_length' },
        { key: '路口平均速度', value: 'avg_speed' },
        // { key: '通过断面车辆数', value: 'section_flow' },
        // { key: '占有率', value: 'occupancy' },
        // { key: '流量时间间隔', value: 'flow_time' },
        // { key: '旅行时间', value: 'travel_time' }
      ],
      roadNode: null,
      evaluateData: null,
      interId: null,
      titName: '路口流量',
      planId: 'flow',
      dataImportPop: null,
      startDateTime: '2020-08-04 00:00:00',
      endDateTime: '2020-08-04 23:59:59',
      contrastStartDate: '2020-08-11 00:00:00',
      contrastEndDate: '2020-08-11 23:59:59',
      endOpen: false,
      uploadFileData: null,
    }
    const _that = this
    this.Uploadprops = {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
          console.log(file, fileList);
          _that.setState({ uploadFileData: file.originFileObj }, ()=>{
            console.log(_that.state.uploadFileData, '变了吗？？？')
          })
        }
      },
      defaultFileList: [
        // {
        //   uid: '1',
        //   name: 'xxx.xlsx',
        //   status: 'done',
        //   response: 'Server Error 500', // custom error message to show
        //   url: 'http://www.baidu.com/xxx.xlsx',
        // },
      ],
    }
    this.roadListUrl = '/signal-decision/monitor/roadList' // 路口经纬度列表
    this.getRoadEvaluateUrl = '/signal-decision/optimize/getRoadEvaluate' // 查询路口评价
    this.insertByExcelUrl = '/signal-decision/optimize/insertByExcel' // 数据导入
  }
  componentDidMount = () => {
    // 路口
    this.getRoadData()
  }
  getRoadData = () => {
    getResponseDatas('get', this.roadListUrl).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({ roadNode: data, interId: data[0].node_id }, () => {
        // this.setState({ roadNode: data, interId: data[0].node_id }, () => {
          $("#getDataCharts").trigger('click')
        })
      }
    })
  }
  insertByExcel = (startDateTime, endDateTime, file) => {
    if (file === null){
      message.info('请先上传文件！')
      return
    }
    const formFile = new FormData()
    //加入文件对象,向接口传入两个参数file,id
    formFile.append("file", file);
    getResponseDatas('post', this.insertByExcelUrl + "?endTime="+ endDateTime +"&startTime=" + startDateTime, formFile).then((res) => {
      const { code, data } = res.data
      if (code === 200 && data > 0) {
        message.info('导入成功'+ data + '条数据！')
        this.setState({
          dataImportPop: null
        })
      }
    })
  }
  getSearchCharts = (startDateTime, endDateTime, contrastStartDate, contrastEndDate, interId, planId) => {
    const urls = '?initStartTime=' + startDateTime + '&initEndTime=' + endDateTime + '&compareStartTime=' + contrastStartDate + '&compareEndTime=' + contrastEndDate + '&interId=' + interId + '&type=' + planId
    getResponseDatas('get', this.getRoadEvaluateUrl + urls).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        // console.log(data, '返回数据.')
        this.setState({ evaluateData: null }, () => {
          let evaluateData = [], itemArr1 = [], itemArr2 = []
          let time1 = [], datas1 = [];
          let time2 = [], datas2 = [];
          data.init.map(item => {
            debugger
            time1.push(item.time)
            datas1.push(item.opt_value === 0 ? "" : item.opt_value)
            // console.log(itemArr1, '对不？')
          })
          itemArr1.push(time1)
          itemArr1.push(datas1)
          evaluateData.push(itemArr1)
          data.compare.map(item => {
            time2.push(item.time)
            datas2.push(item.opt_value === 0 ? "" : item.opt_value)
          })
          itemArr2.push(time2)
          itemArr2.push(datas2)
          evaluateData.push(itemArr2)
          this.setState({ evaluateData })
        })
      }
    })
  }
  getTypeName = (type) => {
    switch (type) {
      case 'flow':
        this.setState({ titName: '路口流量' })
        break;
      case 'delay_time':
        this.setState({ titName: '路口延误时间' })
        break;
      case 'stop_num':
        this.setState({ titName: '路口停车次数' })
        break;
      case 'line_up_length':
        this.setState({ titName: '路口排队长度' })
        break;
      case 'avg_speed':
        this.setState({ titName: '路口平均速度' })
        break;
    }
  }
  getPlanData = (field, value) => {
    this.setState({
      [field]: value,
    })
  }
  onChange = (field, value) => {
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
    const { roadNode, titName, evaluateData, typeData, uploadFileData, dataImportPop, startDateTime, endDateTime, contrastStartDate, contrastEndDate, interId, planId, endOpen } = this.state
    return (
      <div className={styles.Evaluation}>
        <div className={styles.searchBox}>
          <div className={styles.search}>路口名称&nbsp;:&nbsp;
            {
              roadNode && <Select defaultValue={interId ? interId : roadNode[0].node_id} name="node_name" value="node_id" options={roadNode} onChange={(value) => { this.getPlanData('interId', value) }} />
            }
          </div>
          <div className={styles.search} style={{ margin: '0' }}>评价指标&nbsp;:&nbsp;
            {
              typeData && <Select defaultValue={planId} name="key" value="value" options={typeData} onChange={(value) => { this.getTypeName(value) }} />
            }
          </div>
          <div className={styles.search}>初始时间&nbsp;:&nbsp; <AntdDatePicker onChange={(field, value) => { this.onChange(field, value) }} /></div>
          <div className={styles.search} style={{ margin: '0' }}>对比时间&nbsp;:&nbsp; <AntdDatePicker contrastFlag={true} onChange={(field, value) => { this.onChange(field, value) }} /></div>
          <div className={styles.buttons}>
            <Button id="getDataCharts" type="primary" className={styles.Button} onClick={() => { this.getSearchCharts(startDateTime, endDateTime, contrastStartDate, contrastEndDate, interId, planId) }}>查&nbsp;&nbsp;&nbsp;&nbsp;询</Button>
            <Button type="primary" className={styles.Button} onClick={() => { this.setState({ dataImportPop: true, uploadFileData: null }) }}>数据导入</Button>
          </div>
        </div>
        <div className={styles.mainBox}>
          <div className={styles.Title}>{titName} </div>
          <div className={styles.content}>
            <div className={styles.center}>
              {
                evaluateData && <OptLineCharts resData={evaluateData} />
              }
            </div>
          </div>
        </div>
        {dataImportPop ?
          <Popup
            Title="数据导入"
            Close={() => { this.insertByExcel(startDateTime, endDateTime, uploadFileData) }}
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
                value={moment(startDateTime)}
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
                value={moment(endDateTime)}
                placeholder="结束时间"
                onChange={this.onEndChange}
                open={endOpen}
                onOpenChange={this.handleEndOpenChange}
              />
            </div>
            <div className={styles.FromContent}>
              <Upload {...this.Uploadprops}>
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
