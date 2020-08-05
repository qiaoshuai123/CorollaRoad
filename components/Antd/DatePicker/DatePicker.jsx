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
      startDateTime: moment('2020-06-26 11:00:00'),
      endDateTime: moment('2020-06-26 12:00:00'),
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
    const { startDateTime, endDateTime, endOpen } = this.state
    return (
      <div className={styles.DatePicker}>
        <div className={styles.PickerItem} style={this.props.style}>
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
        &nbsp;至&nbsp;
        <div className={styles.PickerItem}>
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
      </div>
    )
  }
}

export default datePicker
