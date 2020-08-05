import React, { Component } from 'react'
import styles from './Input.scss'
import { Input, message } from 'antd'

class AntdInput extends Component {
  static defaultProps = {
    onChange: null, // 输入事件
    style: {}, // 修改样式
    Inputstyle: {},
  }
  onChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e.target.value)
    } else {
      message.warning(`请绑定onChange事件！`)
    }
  }
  render() {
    return (
      <div style={this.props.Inputstyle} className={styles.AntdInputBox}>
        <Input onChange={this.onChange} className={styles.AntdInput} />
      </div>

    )
  }
}

export default AntdInput 