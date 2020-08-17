import React from 'react'
import getResponseDatas from '../../../../../utils/getResponseDatas'
import styles from './ImgMove.scss'

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
    // const { } = this.props
    // const objs = {
    //   left: this.ImgLeft,
    //   top: this.ImgTop,
    // }
    // getResponseDatas('post', this.updateImageInfo,).then((res) => {
    //   const { code, data } = res.data
    //   if (code === 200) {

    //   }
    // })
    // const nowTime = new Date().getTime()
    // this.imgBox.style.cursor = 'default'
    // const {
    //   ID,
    //   DEVICE_ID,
    //   DETAIL,
    //   UI_WIDTH,
    //   UI_HIGHT,
    // } = this.props.imgMsg
    // if (nowTime - this.timeStap < 200) {
    //   if (DEVICE_ID) {
    //     this.props.getshowDeviceInfo(ID, this.props.InterIds)
    //   } else {
    //     this.props.showNameOfRoad(DETAIL, ID, UI_WIDTH, UI_HIGHT)
    //   }
    // } else {
    //   this.props.geteditDeviceInfoPo(ID, this.ImgLeft, this.ImgTop)
    // }
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
