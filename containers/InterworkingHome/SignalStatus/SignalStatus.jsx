import React, { Component } from 'react'
import { Select } from 'antd'
import styles from './SignalStatus.scss'

import OptLineCharts from './OptLineCharts'

const { Option } = Select
class SignalStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount = () => {

  }
  render() {
    return (
      <div className={styles.SignalStatus}>
        <div className={styles.interBox}>
          <div className={styles.innerMap}>
            <div className={styles.title}>
              <Select defaultValue="花冠路与甲秀南路">
                <Option key="1" value="花冠路与甲秀南路">花冠路与甲秀南路</Option>
              </Select>
            </div>
          </div>
          <div className={styles.interDetails}>
            <div className={styles.title}>
              优化控制操作：
              <span className={styles.planTime}>
                <Select defaultValue="1">
                  <Option key="1" value="1">方案一（00:00-07:00）</Option>
                </Select>
              </span>
              <span className={styles.exportBtn}>导出</span>
            </div>
            <div className={styles.pahseDetails}>
              <div className={styles.planMsg}>
                <div className={styles.planTitle}>执行方案（方案编号：202006131840020）</div>
                <div className={styles.phaseTable}>
                  <div className={styles.phaseBody}>
                    <div className={styles.phaseItem}>
                      <div className={styles.item}>相位</div>
                      <div className={styles.item}>相位时间(s)</div>
                      <div className={styles.item}>绿信比(%)</div>
                    </div>
                    <div className={styles.phaseValur}>
                      <div className={styles.valueBox}>
                        <div className={styles.values}>东直行左转</div>
                        <div className={styles.values}>东直行左转</div>
                        <div className={styles.values}>东直行左转</div>
                      </div>
                      <div className={styles.valueBox}>
                        <div className={styles.values}>18</div>
                        <div className={styles.values}>21</div>
                        <div className={styles.values}>22</div>
                      </div>
                      <div className={styles.valueBox}>
                        <div className={styles.values}>29</div>
                        <div className={styles.values}>34</div>
                        <div className={styles.values}>32</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.phaseBottom}>
                    <div className={styles.bottomLeft}>周期(S)</div>
                    <div className={styles.bottomRight}>61</div>
                  </div>
                </div>
              </div>
              <div className={styles.planMsg}>
                <div className={styles.planTitle}>建议优化方案</div>
                <div className={styles.phaseTable}>
                  <div className={styles.phaseBody}>
                    <div className={styles.phaseItem}>
                      <div className={styles.item}>相位</div>
                      <div className={styles.item}>相位时间(s)</div>
                      <div className={styles.item}>绿信比(%)</div>
                    </div>
                    <div className={styles.phaseValur}>
                      <div className={styles.valueBox}>
                        <div className={styles.values}>东直行左转</div>
                        <div className={styles.values}>东直行左转</div>
                        <div className={styles.values}>东直行左转</div>
                      </div>
                      <div className={styles.valueBox}>
                        <div className={styles.values}>18</div>
                        <div className={styles.values}>21</div>
                        <div className={styles.values}>22</div>
                      </div>
                      <div className={styles.valueBox}>
                        <div className={styles.values}>29</div>
                        <div className={styles.values}>34</div>
                        <div className={styles.values}>32</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.phaseBottom}>
                    <div className={styles.bottomLeft}>周期(S)</div>
                    <div className={styles.bottomRight}>61</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.interBox}>
          <div className={styles.interInnerBox}>
            <div className={styles.title}>方案预评估</div>
            <div className={styles.optPlanBox}>
              <div className={styles.optCharts}>
                <OptLineCharts />
              </div>
              <div className={styles.optCharts}>
                <OptLineCharts />
              </div>
              <div className={styles.optCharts}>
                <OptLineCharts />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignalStatus
