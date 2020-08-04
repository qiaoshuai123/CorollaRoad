import React, { Component } from 'react'
import styles from './Popup.scss'
import Drags from '../../utils/drags'
import { Icon, Button, message } from 'antd'

class Popup extends Component {
  static defaultProps = {
    NewStyle: {}, // 修改的样式
    children: null, // 显示的内容
    Title: '', // 弹窗名称
    Close: null, // 关闭弹窗
    Confirm: null, // 确认事件
  }
  handleClck = (name) => {
    if (this.props[name]) {
      this.props[name]()
    } else {
      message.warning(`请绑定${name}事件！`)
    }
  }
  handleStopP = (e) => {
    console.log(e);
    e.stopPropagation()
  }
  render() {
    return (
      <div className={styles.PopupBox}>
        <div className={styles.Popup} style={this.props.NewStyle} ref={(el) => { el ? el.onmousedown = Drags : null }}>
          <div className={styles.headre}>
            {this.props.Title}
            <Icon type="close" className={styles.close} onClick={() => { this.handleClck('Close') }} />
          </div>
          <div className={styles.content} onMouseDown={this.handleStopP}>
            {this.props.children}
          </div>
          <div className={styles.footer}>
            <Button className={styles.Button} onClick={() => { this.handleClck('Close') }}>确&nbsp;&nbsp;认</Button>
            <Button className={styles.Button} onClick={() => { this.handleClck('Confirm') }}>取&nbsp;&nbsp;消</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Popup