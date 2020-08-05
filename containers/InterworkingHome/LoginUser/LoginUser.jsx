// 异常预警
import React, { Component } from 'react'
import styles from './LoginUser.scss'
import { Pagination, Icon } from 'antd'
import Popup from '../../../components/Popup/Popup'
import Input from '../../../components/Antd/Input/Input'

class LoginUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addUsersPop: null,
      deleteUserPop: null,
      changePwdPop: null,
    }
  }
  componentDidMount = () => {

  }

  render() {
    const { addUsersPop, deleteUserPop, changePwdPop } = this.state
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
                  <span className={styles.Item} onClick={() => { this.setState({ changePwdPop: true }) }}>修改密码</span>
                  <span className={styles.Item} onClick={() => { this.setState({ deleteUserPop: true }) }}>删除用户</span>
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
              <div className={styles.FromContent}>
                错误提示文案
              </div>
              <div className={styles.FromContent}>
                账&nbsp;号&nbsp;名&nbsp;称&nbsp;:&nbsp;<Input onChange={(value) => { console.log(value) }} />
              </div>
              <div className={styles.FromContent}>
                账&nbsp;号&nbsp;密&nbsp;码&nbsp;:&nbsp;<Input Password="true" onChange={(value) => { console.log(value) }} />
              </div>
            </Popup> :
            null}
        {
          deleteUserPop ?
            <Popup
              Title="删除用户"
              Close={() => { this.setState({ deleteUserPop: null }) }}
              Confirm={() => { this.setState({ deleteUserPop: null }) }}
            >
              <div className={styles.PopupContent}>确认删除该用户吗?</div>
            </Popup> :
            null}
        {changePwdPop ?
          <Popup
            Title="修改密码"
            Close={() => { this.setState({ changePwdPop: null }) }}
            Confirm={() => { this.setState({ changePwdPop: null }) }}
          >
            <div className={styles.FromContent}>
              错误提示文案
            </div>
            <div className={styles.FromContent}>
              <span className={styles.Title}>请输入原始密码&nbsp;:</span><Input Password="true" onChange={(value) => { console.log(value) }} />
            </div>
            <div className={styles.FromContent}>
              <span className={styles.Title}>请输入新密码&nbsp;:</span><Input Password="true" onChange={(value) => { console.log(value) }} />
            </div>
            <div className={styles.FromContent}>
              <span className={styles.Title}>请再次输入新密码&nbsp;:</span><Input Password="true" onChange={(value) => { console.log(value) }} />
            </div>
          </Popup> : null}
      </div>
    )
  }
}

export default LoginUser
