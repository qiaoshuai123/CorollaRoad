import React, { Component } from 'react'
import { Icon, Select } from 'antd'
import styles from './Regional.scss'
import AreaCharts from './AreaCharts'
import AreaLineCharts from './AreaLineCharts'

const { Option } = Select
class Regional extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAreaConfig: false,
    }
  }
  componentDidMount = () => {

  }
  handleShowAreaConfig = () => {
    this.setState({ showAreaConfig: true })
  }
  hanleHideAreaConf = () => {
    this.setState({ showAreaConfig: false })
  }
  render() {
    const { showAreaConfig } = this.state
    return (
      <div className={styles.Regional}>
        {
          showAreaConfig &&
          <div className={styles.configBox}>
            <div className={styles.confTitle}>区域优化配置 <span className={styles.closeConf} onClick={this.hanleHideAreaConf}><Icon type="close" /></span></div>
            <div className={styles.confContent}>
              <div className={styles.confItem}>
                <div className={styles.title}>
                  <span>干线：</span>
                  <Select defaultValue="1">
                    <Option key="1" value="1">干线1</Option>
                  </Select>
                  <span>优化方案：</span>
                  <Select defaultValue="1">
                    <Option key="1" value="1">方案一</Option>
                  </Select>
                  <span style={{ color: '#00FFFF' }}>方案适用时段：07:00 - 08:00</span>
                </div>
                <div className={styles.greenWaveBox}>
                  <div className={styles.greenWave}>123</div>
                  <div className={styles.greenConf}>
                    <div className={styles.interConf}>
                      <div className={styles.confName}>区域路口：</div>
                      <div className={styles.confMsg}>
                        <Select defaultValue="1">
                          <Option key="1" value="1">花冠路与甲秀南路</Option>
                        </Select>
                      </div>
                    </div>
                    <div className={styles.interConf}>
                      <div className={styles.confName}>正向通行速度：</div>
                      <div className={styles.confMsg}>
                        <div className={styles.interSpeed}><span className={styles.confVal}>37.00</span><span className={styles.confUnit}>千米/小时</span></div>
                      </div>
                    </div>
                    <div className={styles.interConf}>
                      <div className={styles.confName}>反向通行速度：</div>
                      <div className={styles.confMsg}>
                        <div className={styles.interSpeed}><span className={styles.confVal}>37.00</span><span className={styles.confUnit}>千米/小时</span></div>
                      </div>
                    </div>
                    <div className={styles.interConf} style={{ flex: 2, position: 'relative' }}>
                      <div className={styles.splitLine} />
                      <div className={styles.phaseBody}>
                        <div className={styles.phaseItem}>
                          <div className={styles.item}>相位：</div>
                          <div className={styles.item}>绿信比(%)：</div>
                        </div>
                        <div className={styles.phaseValur}>
                          <div className={styles.valueBox}>
                            <div className={styles.values}>东直行左转</div>
                            <div className={styles.values}>东直行左转</div>
                            <div className={styles.values}>东直行左转</div>
                          </div>
                          <div className={styles.valueBox}>
                            <div className={styles.values}>29</div>
                            <div className={styles.values}>34</div>
                            <div className={styles.values}>32</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.interConf}>
                      <div className={styles.confName}>周期(S)：</div>
                      <div className={styles.confMsg}><span className={styles.confVal}>61</span></div>
                    </div>
                    <div className={styles.interConf}>
                      <div className={styles.confName}>方案适用时间段：</div>
                      <div className={styles.confMsg}><span className={styles.confVal}>07：00 -  08：00</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.confItem}>
                <div className={styles.confCharts}>
                  <div className={styles.title}>通过断面车辆数</div>
                  <div className={styles.chartMsg}><AreaLineCharts /></div>
                </div>
                <div className={styles.confCharts}>
                  <div className={styles.title}>占有率</div>
                  <div className={styles.chartMsg}><AreaLineCharts /></div>
                </div>
              </div>
            </div>
          </div>
        }
        <div className={styles.interListBox}>
          <div className={styles.title}>花冠中路区域 <span className={styles.areaConfig} onClick={this.handleShowAreaConfig}>区域优化配置</span></div>
          <ul className={styles.interMsg}>
            <li className={styles.interItem}>
              <div className={styles.interName}>花冠路与甲秀南路</div>
              <div className={styles.interDetails}>
                <div className={styles.detailsItems}>实时相位差</div>
                <div className={styles.detailsItems}>建议相位差</div>
                <div className={styles.detailsItems}>偏移</div>
                <div className={styles.detailsItems}>协调相位</div>
                <div className={styles.detailsItems}>速度</div>
              </div>
              <div className={styles.interDetails}>
                <div className={styles.detailsItems}>38s</div>
                <div className={styles.detailsItems}>38s</div>
                <div className={styles.detailsItems}>38s</div>
                <div className={styles.detailsItems}>0</div>
                <div className={styles.detailsItems}>38m/s</div>
              </div>
            </li>
            <li className={styles.interItem}>
              <div className={styles.interName}>花冠路与甲秀南路</div>
              <div className={styles.interDetails}>
                <div className={styles.detailsItems}>实时相位差</div>
                <div className={styles.detailsItems}>建议相位差</div>
                <div className={styles.detailsItems}>偏移</div>
                <div className={styles.detailsItems}>协调相位</div>
                <div className={styles.detailsItems}>速度</div>
              </div>
              <div className={styles.interDetails}>
                <div className={styles.detailsItems}>38s</div>
                <div className={styles.detailsItems}>38s</div>
                <div className={styles.detailsItems}>38s</div>
                <div className={styles.detailsItems}>0</div>
                <div className={styles.detailsItems}>38m/s</div>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.areaChartsBox}>
          <div className={styles.chartsItem}>
            <div className={styles.title}>区域平均延误</div>
            <div className={styles.chartsWrap}>
              <AreaCharts />
            </div>
          </div>
          <div className={styles.chartsItem}>
            <div className={styles.title}>区域平均速度</div>
            <div className={styles.chartsWrap}>
              <AreaCharts />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Regional
