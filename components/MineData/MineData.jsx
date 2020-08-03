import React, { Component } from 'react'
import styles from './MineData.scss'

class MineData extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    this.handlerenderMineMap()
  }
  handlerenderMineMap = () => {
    /* 初始化地图实例 */
    const map = new window.minemap.Map({
      container: 'mapContainer',
      style: '//minedata.cn/service/solu/style/id/2301',
      center: [106.706278, 26.590897],
      zoom: 13.8,
      pitch: 0,
      maxZoom: 17,
      minZoom: 3,
    })
    this.map = map
    map.on('click', (e) => {

    })
  }
  render() {
    return (
      <div id="mapContainer" className={styles.mapBox}/>
    )
  }
}

export default MineData