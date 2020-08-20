import React, { Component } from 'react'
import styles from './Select.scss'
import { Select, message } from 'antd'

const { Option } = Select
class AntdSelect extends Component {
  static defaultProps = {
    onChange: null, // 输入事件
    style: {}, // 修改样式
    defaultValue: undefined,
    value: '',
    name: '',
    options: [],
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
      <div style={this.props.style} className={styles.AntdSelectBox}>
        <Select
          mode={this.props.modeStatus ? "multiple" : ""}
          showSearch
          className={styles.AntdSelect}
          placeholder="请选择"
          optionFilterProp="children"
          onChange={this.onChange}
          value={this.props.defaultValue}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {
            this.props.options.map((item) => {
              return <Option key={item[this.props.value]} value={item[this.props.value]}>{this.props.name === 'plan_name' ? (item[this.props.name] + item[this.props.value]) : item[this.props.name]}</Option>
            })
          }

        </Select>
      </div>

    )
  }
}

export default AntdSelect