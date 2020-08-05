import React, { Component } from 'react'
import styles from './Select.scss'
import { Select, message } from 'antd'

const { Option } = Select
class AntdSelect extends Component {
  static defaultProps = {
    onChange: null, // 输入事件
    style: {}, // 修改样式
    Selectstyle: {},
  }
  onChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e)
    } else {
      message.warning(`请绑定onChange事件！`)
    }
  }
  render() {
    return (
      <div style={this.props.Selectstyle} className={styles.AntdSelectBox}>
        <Select
          showSearch
          style={this.props.Selectstyle}
          className={styles.AntdSelect}
          placeholder="请选择"
          optionFilterProp="children"
          onChange={this.onChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
      </div>

    )
  }
}

export default AntdSelect