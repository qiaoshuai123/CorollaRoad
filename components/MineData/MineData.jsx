import React, { Component } from 'react'
import $bus from '../../utils/events'
import styles from './MineData.scss'
import markIcon from '../../containers/images/icon_mark.png'
import videoIcon from '../../containers/images/icon_video.png'
import getResponseDatas from '../../utils/getResponseDatas'

class MineData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapRoadList: [], // 地图所有点位
    }
    this.marker = null
    this.infowindow = 0
    this.roadList = '/signal-decision/monitor/roadList' // 地图点位

  }
  componentDidMount() {
    this.handlerenderMineMap()
    // this.messageInformation()
    this.mapRender() // 初始化地图点位
    this.goMapBtn()
  }
  getInterData = (data, index) => {
    if (this.popup) {
      this.popup.remove();
      this.popup = null;
    }
    if (location.href.indexOf('/interworkingHome/Surveillance') > -1) {
      localStorage.setItem('isGpsMap', JSON.stringify(false))
    } else {
      this.props.history.push('/interworkingHome/Surveillance')
    }
    localStorage.setItem('nodeData', JSON.stringify(data))
    localStorage.setItem('currentIndex', index)

  }
  goMapBtn = () => {
    $bus.on('goMapBtn', (obj) => {
      console.log(obj, 'sss')
      // const objs = {}
      // objs.lng = obj.unit_longitude
      // objs.lat = obj.unit_latitude
      // this.infowindow += 1
      // const el = document.createElement('div')
      // el.id = 'marker'
      // el.style['background-image'] = `url(${markIcon})`
      // el.style['background-size'] = 'cover'
      // el.style.width = '18px'
      // el.style.height = '28px'
      // el.style.zIndex = '9'
      // this.lnglat = objs
      // this.fixedPopup = new window.minemap.Popup(el, { offset: [-9, -14] })
      //   .setLngLat([obj.unit_longitude, obj.unit_latitude])
      //   .setPopup(this.showInterInfo(obj))
      //   .addTo(this.map)
      // // this.map.panTo([objs.lng + 0.0000001, objs.lat + 0.00000001])
    })
    window.getInterData = this.getInterData
  }
  mapRender = () => {
    getResponseDatas('get', this.roadList).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({
          mapRoadList: data,
        }, () => {
          this.addMarker(data)
        })
      }
    })
  }
  // 添加坐标点
  addMarker = (positionList) => {
    if (this.map) {
      positionList.forEach((item, index) => {
        const objs = {}
        objs.lng = item.unit_longitude
        objs.lat = item.unit_latitude
        this.infowindow += 1
        const el = document.createElement('div')
        el.id = 'marker' + item.node_id
        el.style['background-image'] = `url(${markIcon})`
        el.style['background-size'] = 'cover'
        el.style.width = '18px'
        el.style.height = '28px'
        this.lnglat = objs
        this.marker = new window.minemap.Marker(el, { offset: [-9, -14] })
          .setLngLat(this.lnglat)
          .setPopup(this.showInterInfo(item, item.node_id))
          .addTo(this.map)
        el.addEventListener('click', () => {
          this.fixedPopup = null
          this.map.panTo([objs.lng + 0.0000001, objs.lat + 0.00000001])
        })
      })
    }
  }
  // 自定义信息窗体
  showInterInfo = (information, index) => {
    localStorage.setItem('nodeData', null)
    localStorage.setItem('currentIndex', null)
    // this.removeInterInfo()
    const lnglat = this.map.getCenter()
    // const id = `removeInterInfo${this.infowindow}`
    const infoHtml = `
      <div style="width:400px;height:120px;background-size:100% 100%;">
        <div style="position:relative;height:50px;padding-left:20px;line-height:50px;font-size:16px;">
          ${information.node_name}
          <div onClick='getInterData(`+ JSON.stringify(information) + ',' + index + `)' style="background:url(${videoIcon}) no-repeat;width:17px;height:21px;position:absolute;top:10px;right:10px;cursor:pointer;"></div>
        </div>
        <div style="display:flex;font-size:14px;">
          <div style="flex:1;">
            <p style="height:32px;line-height:32px;padding-left:40px">所属城区 ：${information.district_name}</p>
            <p style="height:32px;line-height:32px;padding-left:40px">信号优化状态 ：${information.node_name}</p>
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
      zoom: 11,
      pitch: 0,
      maxZoom: 17,
      minZoom: 3,
    })
    map.on('click', (e) => {

    })
    this.map = map
  }
  render() {
    return (
      <div id="mapContainer" className={styles.mapBox} />
    )
  }
}

export default MineData
