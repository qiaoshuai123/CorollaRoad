import React from 'react'
import styles from './Header.scss'
import { Menu, Dropdown, Icon, Avatar, Badge, } from 'antd'
import $bus from '../../utils/events'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: null,
    }
    this.menu = (
      <Menu onClick={this.handleUserMenu}>
        <Menu.Item key='1'>
          <span>
            返回主页
          </span>
        </Menu.Item>
        {/* <Menu.Item key='2'>
          <span>
            修改密码
          </span>
        </Menu.Item> */}
        <Menu.Item key='3'>
          <span>
            退出登录
          </span>
        </Menu.Item>
      </Menu >
    )
  }
  componentDidMount = () => {
    const t = setTimeout(() => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.setState({
        userInfo
      })
      clearTimeout(t);
    }, 50)
  }
  handleUserMenu = ({ key }, e) => {
    if (key === '1') {
      this.props.history.push('/interworkingHome/Monitoring')
      $bus.emit('messageRouter', 'goMonitoring')
    } else if (key === '2') {
      // this.props.history.push('/login')
    } else if (key === '3') {
      localStorage.clear()
      this.props.history.push('/')
    }
  }
  render() {
    const { userInfo } = this.state
    return (
      <div className={styles.headerWrapper}>
        <div className={styles.header_left}>
          <span />
        花冠路交通信号控制决策系统
      </div>
        {/* <div className={styles.header_center}>
        {
          this.navItems.map(item =>
            (
              <div className={selectNum === item.id ? styles.active : ''} onClick={() => this.SelectButton(item)} key={item.id}>
                {item.name}
                <div className={styles.child}>
                  {
                    item.child && item.child.map(items => <div key={items.id} onClick={e => this.SelectButtonChild(e, items)}>{items.name}</div>)
                  }
                </div>
              </div>
            ))
        }
      </div> */}
        <div className={styles.header_right} style={{ width: '130px' }}>
          {/* <span><Icon type="setting" /></span>
        <span>
          <Badge count={13}>
            <Icon type="bell" />
          </Badge>
        </span>
        <span><Icon type="user" /></span> */}
          <Icon type="user" style={{ marginRight: '5px' }} /><Dropdown overlay={this.menu}>
            <b onClick={e => e.preventDefault()}>
              hello,{userInfo !==null && userInfo} <Icon type="down" />
            </b>
          </Dropdown>
        </div>
      </div >
    )
  }
}

export default Header