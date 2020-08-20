import React from 'react'
import getResponseDatas from '../../../../../utils/getResponseDatas'

class ImgMove extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.drag = false
    this.updateImageInfo = '/signal-decision/road/updateImageInfo' // 更新图元信息
  }
  componentDidMount = () => {
    document.addEventListener('mousemove', (e) => {
      if (this.drag) {
        const movePageX = e.pageX
        const movePageY = e.pageY
        this.ImgLeft = `${this.defaultLeft + (movePageX - this.defaultX)}`
        this.ImgTop = `${this.defaultTop + (movePageY - this.defaultY)}`
        const PrimitWidth = 1000 - this.imgBox.offsetWidth
        const PrimitHeight = 800 - this.imgBox.offsetHeight
        if (this.ImgLeft < 0) {
          this.ImgLeft = 0
        }
        if (this.ImgTop < 0) {
          this.ImgTop = 0
        }
        if (this.ImgLeft > PrimitWidth) {
          this.ImgLeft = PrimitWidth
        }
        if (this.ImgTop > PrimitHeight) {
          this.ImgTop = PrimitHeight
        }
        this.imgBox.style.left = `${this.ImgLeft}px`
        this.imgBox.style.top = `${this.ImgTop}px`
      }
    })
    document.addEventListener('mouseup', () => {
      this.drag = false
    })
  }
  // 转格式
  getFormData = (obj) => {
    let str = ''
    for (const i in obj) {
      str += `${i}=${obj[i]}&`
    }
    return str
  }
  handleDeviceDown = (e) => {
    this.timeStap = new Date().getTime()
    this.drag = true
    this.defaultX = e.pageX
    this.defaultY = e.pageY
    this.defaultLeft = parseInt(this.imgBox.style.left, 0)
    this.defaultTop = parseInt(this.imgBox.style.top, 0)
    this.imgBox.style.cursor = 'move'
  }

  handleDeviceUp = () => {
    const { node_id, device_id, device_img, angle, } = this.props.pictureInformation
    console.log(node_id, device_id, device_img, angle, 'ssdsd')
    const objs = {
      angle,
      deviceId: device_id,
      // nodeId: JSON.stringify(node_id),
      deviceImg: device_img,
      left: this.ImgLeft,
      top: this.ImgTop,
    }
    // console.log(this.getFormData(objs), 'sssssssssss')
    getResponseDatas('post', `${this.updateImageInfo}?${this.getFormData(objs)}`,).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        console.log(data, 'ssff')
      }
    })
  }
  render() {
    const {
      top, left, angle, device_img
    } = this.props.pictureInformation
    const imgStyle = {
      position: 'absolute', top: `${top}px`, left: `${left}px`, userSelect: 'none', transform: `rotate(${angle}deg)`, cursor: 'pointer',
    }
    return (
      <React.Fragment>
        <img
          onMouseDown={this.handleDeviceDown}
          onMouseUp={this.handleDeviceUp}
          style={imgStyle}
          ref={(input) => { this.imgBox = input }}
          draggable="false"
          src={require(`../img/${device_img}`)}
          alt=""
        />
      </React.Fragment>
    )
  }
}

export default ImgMove
