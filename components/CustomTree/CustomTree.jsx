import React from 'react'
import { Icon } from 'antd'
import { NavLink } from 'react-router-dom'
import styles from './CustomTree.scss'

class CustomTree extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expendsKey: [1],
    }
    this.loopDate = [
      {
        name: '人工智能+信号决策',
        id: 1,
        children: [
          {
            name: '路口优化',
            id: 11,
            path: '/interworkingHome/signalStatus',
          },
          {
            name: '区域优化',
            id: 12,
            path: '/interworkingHome/Regional',
          },
        ],
      },
      {
        name: '交通信号评价模型',
        id: 2,
        children: [
          {
            name: '路口运行状态监测模型',
            path: '/interworkingHome/Surveillance',
            id: 21,
          },
          {
            name: '交通流分析',
            path: '/interworkingHome/Trafficanalysis',
            id: 22,
          },
          {
            name: '异常路口预警',
            path: '/interworkingHome/Abnormalwarning',
            id: 23,
          },
        ],
      },
      {
        name: '交通管控优化效果评估模型',
        id: 3,
        children: [
          {
            name: '路口评价',
            path: '/interworkingHome/Evaluation',
            id: 31,
          },
          {
            name: '区域评价',
            path: '/interworkingHome/Regtion',
            id: 32,
          },
        ],
      },
      {
        name: '仿真评价数据分析',
        id: 4,
        children: [
        ],
      },
    ]
  }
  componentDidMount = () => { }
  handleTreeSelect = (e) => {
    e.stopPropagation()
    const id = Number(e.currentTarget.getAttribute('id'))
    const index = this.state.expendsKey.indexOf(id)
    if (index >= 0) {
      this.state.expendsKey.splice(index, 1)
    } else {
      this.state.expendsKey.push(id)
    }
    console.log(this.state.expendsKey)
    this.setState({ expendsKey: this.state.expendsKey })
  }

  render() {
    const { expendsKey } = this.state
    const loop = data => (
      data.map((item) => {
        const isOpen = expendsKey.indexOf(item.id) >= 0
        if (item.children && item.children.length) {
          return (
            <li className={styles.childLi} key={item.id} id={item.id} onClick={this.handleTreeSelect}>
              <span className={styles.childIcon}><Icon type={isOpen ? 'environment' : 'environment'} theme="filled" /></span>
              <span className={styles.childNode}>{item.name}</span>
              {
                isOpen &&
                <ul className={styles.childTree}>
                  {loop(item.children)}
                </ul>
              }
            </li>
          )
        }
        return (
          <li className={styles.childLi} key={item.id} id={item.id} onClick={this.handleTreeSelect}>
            <span className={styles.childIcon}><Icon type={isOpen ? 'environment' : 'environment'} theme="filled" /></span>
            <NavLink to={item.path} className={styles.childNode}>{item.name}</NavLink>
          </li>
        )
      })
    )
    return (
      <div className={styles.treeWrapper}>
        <ul className={styles.treeList}>
          {
            this.loopDate.map((item) => {
              const isOpen = expendsKey.indexOf(item.id) >= 0
              return (
                <li className={styles.treeLi} key={item.id} id={item.id} onClick={this.handleTreeSelect}>
                  <span className={styles.treeNode}>{item.name}</span>
                  <span className={styles.treeIcon}>
                    <Icon type={isOpen ? 'up' : 'down'} theme="outlined" />
                  </span>
                  {
                    isOpen &&
                    <ul className={styles.childTree} key={item.id}>
                      {loop(item.children)}
                    </ul>
                  }
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default CustomTree
