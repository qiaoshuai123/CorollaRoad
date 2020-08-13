// 异常预警
import React, { Component } from 'react'
import styles from './LoginUser.scss'
import { Pagination, Icon } from 'antd'
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
    }
    this.userListUrl='/signal-decision/user/list' // 获取用户列表
    this.userSaveUrl='/signal-decision/user/save' // 新增用户
    this.userUpdatePwd='/signal-decision/user/updatePassword' // 修改密码
    this.userUpdatePwd='/signal-decision/user/delete' // 删除用户
  }
  componentDidMount = () => {
    this.getUserData(this.state.current, '1')
  }
  getUserData = (pageNo, pageSize) => {
    getResponseDatas('post', this.userListUrl + '?pageNo=' + pageNo + '&pageSize=' + pageSize).then((res) => {
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
      this.getUserData(this.state.current, '1')
    })
    // this.sysUser.pageNo = pageNumber
  }
  render() {
    const { userListData, totalCount, current, addUsersPop, deleteUserPop, changePwdPop } = this.state
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
          <div className={styles.listItemsBox}>
            {/* {userListData.map((item, index) => { */}
            {userListData && userListData.map((item, index) => {
              return (
                <div className={styles.listItems} key={index}>
                  <div className={styles.listTd} ><span className={styles.roadName}>{index+1}</span></div>
                  <div className={styles.listTd} ><span className={styles.roadName}>{item.user_name}</span></div>
                  <div className={styles.listTd} ><span className={styles.roadName}>{item.date_time}</span></div>
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
        </div>
        <div className={styles.GpsMapCenterTime}>
          <div className={styles.page}>当前共{userListData && userListData.length}条，每页显示10条</div><Pagination showQuickJumper current={Number(current)} total={totalCount} onChange={this.handlePagination} />
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
