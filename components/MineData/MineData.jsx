import React, { Component } from 'react'
import $bus from '../../utils/events'
import styles from './MineData.scss'
import markIcon from '../../containers/images/icon_mark.png'
import videoIcon from '../../containers/images/icon_video.png'
class MineData extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.marker = null
    this.infowindow = 0
  }
  componentDidMount() {
    this.handlerenderMineMap()
    this.messageInformation()
  }
  messageInformation = () => {
    $bus.on('message', (text) => {
      console.log(text, '改变数据')
    })
  }
  // 添加坐标点
  addMarker = () => {
    const _this = this;
    if (this.map) {
      this.infowindow += 1
      const el = document.createElement('div')
      el.id = 'marker'
      el.style['background-image'] = `url(${markIcon})`
      el.style['background-size'] = 'cover'
      el.style.width = '18px'
      el.style.height = '28px'
      this.lnglat = this.map.getCenter()
      this.marker = new window.minemap.Marker(el, { offset: [-9, -14] })
        .setLngLat(this.lnglat)
        .setPopup(this.showInterInfo())
        .addTo(this.map)
      el.addEventListener('click', function(){
        _this.map.setCenter([_this.lnglat.lng+0.00000001, _this.lnglat.lat+0.00000001]); //设置地图层级
        _this.map.flyTo({
          center: [_this.lnglat.lng+0.0000001, _this.lnglat.lat+0.00000001],
          zoom: 13.8,
      });
      })
    }
  }
  // 自定义信息窗体
  showInterInfo = () => {
    // this.removeInterInfo()
    const lnglat = this.map.getCenter()
    // const id = `removeInterInfo${this.infowindow}`
    const infoHtml = `
      <div style="width:400px;height:120px;background-size:100% 100%;">
        <div style="position:relative;height:50px;padding-left:20px;line-height:50px;font-size:16px;">
          花冠路与甲秀南路
          <div style="background:url(${videoIcon}) no-repeat;width:17px;height:21px;position:absolute;top:10px;right:10px;cursor:pointer;"></div>
        </div>
        <div style="display:flex;font-size:14px;">
          <div style="flex:1;">
            <p style="height:32px;line-height:32px;padding-left:40px">所属城区 ：兴宁区</p>
            <p style="height:32px;line-height:32px;padding-left:40px">信号优化状态 ：信号机自主控制优化方案运行</p>
          </div>
        </div>
      </div>
    `
    this.popup = new window.minemap.Popup({ closeOnClick: true, closeButton: false, offset: [-1, -18] })
      .setLngLat([lnglat.lng, lnglat.lat])
      .setHTML(infoHtml)
      .addTo(this.map)
    // document.getElementById(id).addEventListener('click', this.removeInterInfo)
    return this.popup
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
    map.on('click', (e) => {

    })
    this.map = map
    this.addMarker()
    
  }
  render() {
    return (
      <div id="mapContainer" className={styles.mapBox} />
    )
  }
}

export default MineData