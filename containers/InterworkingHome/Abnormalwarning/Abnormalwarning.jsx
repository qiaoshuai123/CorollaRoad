// 异常预警
import React, { Component } from 'react'
import styles from './Abnormalwarning.scss'
import { Pagination, Icon } from 'antd'
import Popup from '../../../components/Popup/Popup'

class Abnormalwarning extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addUsersPop: null,
    }
  }
  componentDidMount = () => {

  }

  render() {
    const { addUsersPop } = this.state
    return (
      <div className={styles.Abnormalwarning}>
        <div className={styles.userHeade}>
          用户管理
          <span className={styles.AddUser} onClick={() => { this.setState({ addUsersPop: true }) }}><Icon type="plus" /> 新增用户</span>
        </div>
        <div className={styles.userMain}>
          <div className={styles.listItems}>
            <div className={styles.listTd} >序号</div>
            <div className={styles.listTd} >用户名称</div>
            <div className={styles.listTd} >创建时间</div>
            <div className={styles.listTd} >操作</div>
          </div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 5, 6, 6, 5].map((item, index) => {
            return (
              <div className={styles.listItems} key={index}>
                <div className={styles.listTd} ><span className={styles.roadName}>1111</span></div>
                <div className={styles.listTd} ><span className={styles.roadName}>1111</span></div>
                <div className={styles.listTd} ><span className={styles.roadName}>1111</span></div>
                <div className={styles.listTd} >
                  <span className={styles.Item} >修改密码</span>
                  <span className={styles.Item} >删除用户</span>
                </div>
              </div>)
          })}
          {
            null ? <div className={styles.noData}>当前查询无数据</div> : null
          }
        </div>
        <div className={styles.userFooter}>
          <div className={styles.page}><span className={styles.count}>当前共{30}条，每页显示10条</span><Pagination showQuickJumper current={1} total={30} /></div>
        </div>
        {
          addUsersPop ?
            <Popup
              Title="新增用户"
              Close={() => { this.setState({ addUsersPop: null }) }}
              Confirm={() => { this.setState({ addUsersPop: null }) }}
            >
              asdasdasdsd
            </Popup> :
            null}
      </div>
    )
  }
}

export default Abnormalwarning
