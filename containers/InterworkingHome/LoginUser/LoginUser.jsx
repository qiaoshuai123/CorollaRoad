// 异常预警
import React, { Component } from 'react'
import styles from './LoginUser.scss'
import { Pagination, Icon, message } from 'antd'
import Popup from '../../../components/Popup/Popup'
import Input from '../../../components/Antd/Input/Input'
import getResponseDatas from '../../../utils/getResponseDatas'
class LoginUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addUsersPop: null,
      deleteUserPop: null,
      changePwdPop: null,
      // userListData: [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10],
      userListData: null,
      totalCount: 1,
      current: '1',
      userName: '',
      userPwd: '',
      userId: '', 
      oldPassword: '', 
      newPassword: '', 
      rightPassword: '',
      keyWords: '', // 搜索用关键词
    }
    this.userListUrl='/signal-decision/user/list' // 获取用户列表
    this.userSaveUrl='/signal-decision/user/save' // 新增用户
    this.userUpdatePwdUrl='/signal-decision/user/updatePassword' // 修改密码
    this.userDelUrl='/signal-decision/user/delete' // 删除用户
  }
  componentDidMount = () => {
    this.getUserData(this.state.current, '10')
  }
  getUserData = (pageNo, pageSize, userName) => {
    getResponseDatas('post', this.userListUrl + '?pageNo=' + pageNo + '&pageSize=' + pageSize + '&keyWords=' + userName).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({ userListData: data.list, totalCount: data.totalCount},()=>{
          console.log(this.state.userListData, '列表')
        })
      }
    })
  }
  handlePagination = (pageNumber) => {
    console.log('Page: ', pageNumber)
    this.setState({
      current: pageNumber
    }, () => {
      this.getUserData(this.state.current, '10')
    })
    // this.sysUser.pageNo = pageNumber
  }
  onChange = (field, value) => {
    this.setState({
      [field]: value,
    }, () => {
      if (field === 'keyWords'){
        this.getUserData(this.state.current, '10', value)
      }
    })
  }
  addUserFn = (loginName, password) => {
    if (loginName === '') {
      message.info('用户账号不能为空！')
      $("#loginName").focus()
      return
    }
    if (password === '') {
      message.info('密码不能为空！')
      $("#password").focus()
      return
    }
    getResponseDatas('post', this.userSaveUrl + '?loginName=' + loginName + '&password=' + password).then((res) => {
      const { code } = res.data
      if (code === 200) {
        message.info(res.data.message)
        this.setState({ addUsersPop: null })
        this.getUserData('1', '10')
      }
    })
  }
  updateUserFn = (userId, oldPassword, newPassword, rightPassword ) => {
    if (oldPassword === '') {
      message.info('旧密码不能为空！')
      $("#oldPassword").focus()
      return
    }
    if (newPassword === '') {
      message.info('新密码不能为空！')
      $("#newPassword").focus()
      return
    }
    if (rightPassword === '') {
      message.info('确认密码不能为空！')
      $("#rightPassword").focus()
      return
    }
    if (rightPassword !== newPassword) {
      message.info('确认密码与新密码不一致！')
      $("#rightPassword").focus()
      return
    }
    getResponseDatas('post', this.userUpdatePwdUrl + '?userId=' + userId + '&oldPassword=' + oldPassword + '&newPassword=' + newPassword).then((res) => {
      const { code, data } = res.data
      if (code === 200 && data === 1) {
        message.info(res.data.message)
        this.setState({ changePwdPop: null })
        this.getUserData('1', '10')
      }
    })
  }
  delUserFn = (userId) => {
    getResponseDatas('post', this.userDelUrl + '?userId=' + userId).then((res) => {
      const { code } = res.data
      if (code === 200 && data === 1) {
        message.info(res.data.message)
        this.setState({ deleteUserPop: null })
        this.getUserData('1', '10')
      }
    })
  }
  render() {
    const { userListData, totalCount, current, addUsersPop, deleteUserPop, changePwdPop, userName, userPwd, userId, keyWords, oldPassword, newPassword, rightPassword } = this.state
    return (
      <div className={styles.Abnormalwarning}>
        <div className={styles.userHeade}>
          用户管理
          <span className={styles.AddUser} onClick={() => { this.setState({ addUsersPop: true }) }}><Icon type="plus" /> 新增用户</span>
          <span className={styles.AddUser}><Input onChange={(value) => { this.onChange('keyWords', value) }} /></span>
          <span className={styles.AddUser} style={{marginRight: '-25px'}}>用户名称：</span>
        </div>
        <div className={styles.userMain}>
          <div className={styles.listItems}>
            <div className={styles.listTd} >序号</div>
            <div className={styles.listTd} >用户名称</div>
            <div className={styles.listTd} >创建时间</div>
            <div className={styles.listTd} >操作</div>
          </div>
          <div className={styles.listItemsBox}>
            {userListData && userListData.map((item, index) => {
              const num = current * 10 + index + 1 - 10;
              return (
                <div className={styles.listItems} key={index}>
                  <div className={styles.listTd} ><span className={styles.roadName}>{num}</span></div>
                  <div className={styles.listTd} ><span className={styles.roadName}>{item.userName}</span></div>
                  <div className={styles.listTd} ><span className={styles.roadName}>{item.dateTime}</span></div>
                  <div className={styles.listTd} >
                    <span className={styles.Item} onClick={() => { this.setState({ changePwdPop: true, userId: item.id }) }}>修改密码</span>
                    <span className={styles.Item} onClick={() => { this.setState({ deleteUserPop: true, userId: item.id }) }}>删除用户</span>
                  </div>
                </div>)
            })}
            {
              null ? <div className={styles.noData}>当前查询无数据</div> : null
            }
          </div>
        </div>
        <div className={styles.GpsMapCenterTime}>
          <div className={styles.page}>当前共{totalCount}条，每页显示10条</div><Pagination showQuickJumper current={Number(current)} total={totalCount} onChange={this.handlePagination} />
        </div>
        {
          addUsersPop ?
            <Popup
              Title="新增用户"
              Close={() => { this.addUserFn(userName, userPwd) }}
              Confirm={() => { this.setState({ addUsersPop: null }) }}
            >
              <div className={styles.FromContent}>
                错误提示文案
              </div>
              <div className={styles.FromContent}>
                账&nbsp;号&nbsp;名&nbsp;称&nbsp;:&nbsp;<Input id='loginName' placeholder='请输入' onChange={(value) => { this.onChange('userName', value) }} />
              </div>
              <div className={styles.FromContent}>
                账&nbsp;号&nbsp;密&nbsp;码&nbsp;:&nbsp;<Input id='password' placeholder='请输入' Password="true" onChange={(value) => { this.onChange('userPwd', value) }} />
              </div>
            </Popup> :
            null}
        {
          deleteUserPop ?
            <Popup
              Title="删除用户"
              Close={() => { this.delUserFn(userId) }}
              Confirm={() => { this.setState({ deleteUserPop: null }) }}
            >
              <div className={styles.PopupContent}>确认删除该用户吗?</div>
            </Popup> :
            null}
        {changePwdPop ?
          <Popup
            Title="修改密码"
            Close={() => { this.updateUserFn(userId, oldPassword, newPassword, rightPassword) }}
            Confirm={() => { this.setState({ changePwdPop: null }) }}
          >
            <div className={styles.FromContent}>
              错误提示文案
            </div>
            <div className={styles.FromContent}>
              <span className={styles.Title}>请输入原始密码&nbsp;:</span><Input id='oldPassword' placeholder='请输入' Password="true" onChange={(value) => { this.onChange('oldPassword', value) }} />
            </div>
            <div className={styles.FromContent}>
              <span className={styles.Title}>请输入新密码&nbsp;:</span><Input id='newPassword' placeholder='请输入' Password="true" onChange={(value) => { this.onChange('newPassword', value) }} />
            </div>
            <div className={styles.FromContent}>
              <span className={styles.Title}>请再次确认新密码&nbsp;:</span><Input id='rightPassword' placeholder='请输入' Password="true" onChange={(value) => { this.onChange('rightPassword', value) }} />
            </div>
          </Popup> : null}
      </div>
    )
  }
}

export default LoginUser
