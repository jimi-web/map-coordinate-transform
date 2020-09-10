/*
 * @Author: liujinyuan
 * @Date: 2020-09-09 16:22:17
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-09-10 15:42:22
 * @FilePath: \map-transform\src\App.js
 */
import React from 'react';
import './App.css';
import './base.css';
import {chinaToBaidu,GPSToBaidu} from './transform'
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.map = null;
    this.state = {
      lng:'113.927335',
      lat:'22.579908'
    }
  }
  render() {
    return (
      <div className="App">
        <div id="map" className="map">

        </div>
        <div className="map-transform-contral">
          <div className="map-transform-input">
            <label htmlFor="lng">经度</label>
            <input id="lng" type="text" defaultValue={this.state.lng} onChange={(e) => this.onChange(e,'lng')}></input>
            <label htmlFor="lat">纬度</label>
            <input id="lat" type="text" defaultValue={this.state.lat} onChange={(e) => this.onChange(e,'lat')}></input>
          </div>
          <div className="map-transform-button">
            <div>请选择您的坐标系：</div>
            <button onClick={() => this.onButton('baidu')}>百度</button>
            <button onClick={() => this.onButton('GPS')}>GPS</button>
            <button onClick={() => this.onButton('zh')}>中国标准</button>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    // 创建地图实例 
    
    this.map = new window.BMap.Map("map");
    // 创建点坐标  
    var p = new window.BMap.Point(this.state.lng, this.state.lat);
    // 初始化地图，设置中心点坐标和地图级别  
    this.map .centerAndZoom(p, 15);
    // var marker = new window.BMap.Marker(point);        // 创建标注    
    // map.addOverlay(marker);

    this.map .addControl(new window.BMap.NavigationControl());
    this.map .addControl(new window.BMap.ScaleControl());
  }

  onChange = (e,key) => {
    this.setState({
      [key]:e.target.value
    })
  }

  onButton = (value) => {
    let lng,lat;
    switch (value) {
      case 'baidu':
        lng = this.state.lng;
        lat = this.state.lat;
        break;
      case 'GPS':
        lng = chinaToBaidu(this.state.lat,this.state.lng).lng;
        lat = chinaToBaidu(this.state.lat,this.state.lng).lat;
        break;
      case 'zh':
        lng = GPSToBaidu(this.state.lat,this.state.lng).lng;
        lat = GPSToBaidu(this.state.lat,this.state.lng).lat;
        break;
    
      default:
        lng = this.state.lng;
        lat = this.state.lat;
        break;
    }
    var point = new window.BMap.Point(lng, lat);
    var marker = new window.BMap.Marker(point);
    var labelContent = 'lng:' + lng + '&nbsp;&nbsp;lat:' + lat;
    var labelSize = new window.BMap.Size(-70, -20)
    var label = new window.BMap.Label(labelContent, {
      offset: labelSize
    })
    marker.setLabel(label)
    this.map.addOverlay(marker);

  }

}