import React from 'react'
import styles from './DatePicker.scss'
import { DatePicker } from 'antd'
import moment from 'moment'

class datePicker extends React.Component {
  static defaultProps = {
    style: {}, // 修改样式 
  }
  constructor(props) {
    super(props)
    this.state = {
      startDateTime: moment('2020-08-10 00:00:00'),
      endDateTime: moment('2020-08-10 07:20:00'),
      contrastStartDate: moment('2020-08-10 07:20:00'),
      contrastEndDate: moment('2020-08-10 08:00:00'),
      endOpen: false,
    }
  }

  componentDidMount = () => {

  }
  onChange = (field, value) => {
    if (this.props.onChange) {
      this.props.onChange(field, value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '')
    }
    this.setState({
      [field]: value,
    })
  }

  onStartChange = (value) => {
    if (this.props.contrastFlag) {
      this.onChange('contrastStartDate', value)
    } else {
      this.onChange('startDateTime', value)
    }
  }

  onEndChange = (value) => {
    if (this.props.contrastFlag) {
      this.onChange('contrastEndDate', value)
    } else {
      this.onChange('endDateTime', value)
    }
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
  disabledStartDates = (contrastStartDate) => {
    const { contrastEndDate } = this.state
    if (!contrastStartDate || !contrastEndDate) {
      return false
    }
    return contrastStartDate.valueOf() > contrastEndDate.valueOf()
  }

  disabledEndDates = (contrastEndDate) => {
    const { contrastStartDate } = this.state
    if (!contrastEndDate || !contrastStartDate) {
      return false
    }
    return contrastEndDate.valueOf() <= contrastStartDate.valueOf()
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
    const { startDateTime, endDateTime, contrastStartDate, contrastEndDate, endOpen } = this.state
    return (
      <div className={styles.DatePicker}>
        <div className={styles.PickerItem} style={this.props.style}>
          <DatePicker
            disabledDate={this.props.contrastFlag ? this.disabledStartDates :  this.disabledStartDate}
            showTime={{
              format: 'HH:mm',
            }}
            minuteStep={10}
            format="YYYY-MM-DD HH:mm"
            value={this.props.contrastFlag ? contrastStartDate : startDateTime}
            placeholder="开始时间"
            onChange={this.onStartChange}
            onOpenChange={this.handleStartOpenChange}
          />
        </div>
        &nbsp;至&nbsp;
        <div className={styles.PickerItem}>
          <DatePicker
            disabledDate={this.props.contrastFlag ? this.disabledEndDates : this.disabledEndDate}
            showTime={{
              format: 'HH:mm',
            }}
            format="YYYY-MM-DD HH:mm"
            value={this.props.contrastFlag ? contrastEndDate : endDateTime}
            placeholder="结束时间"
            onChange={this.onEndChange}
            open={endOpen}
            onOpenChange={this.handleEndOpenChange}
          />
        </div>
      </div>
    )
  }
}

export default datePicker
