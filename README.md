<!--
 * @Author: liujinyuan
 * @Date: 2020-09-09 16:22:17
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-10-29 09:42:25
 * @FilePath: \map-transform\README.md
-->
### 安装
```
npm install map-coordinate-transform
```
or
```
yarn add map-coordinate-transform
```

### 使用
```
import transformMap from '../package/index';
const {chinaToBaidu,GPSToBaidu} = transformMap;
```

### API
| 方法名 | 参数 | 说明 |
| ---- | ---- | ---- |
| GPSToChina | lat,lng | GPS坐标系转中国标准坐标系 |
| GPSToBaidu | lat,lng | GPS坐标系转百度坐标系 |
| chinaToGPS | lat,lng | 中国标准坐标系转GPS坐标系 |
| chinaToBaidu | lat,lng | 中国标准坐标系转百度坐标系 |
| baiduToGPS | lat,lng | 百度坐标系转GPS坐标系 |
| baiduToChina | lat,lng | 百度坐标系转中国标准坐标系 |
| GPSToMercator | lat,lng | GPS坐标系转墨卡托坐标系 |
| mercatorToGPS | lat,lng | 墨卡托坐标系转GPS坐标系 |
| isOutOfChina | lat,lng | 判断是否在中国之外 |
| distance | latA, lngA, latB, lngB | 计算两点之间的距离 |
| countLng | lng | 计算lng操过+-180的实际位置 |
`所有坐标点转换都判断了是否在中国之外。`

### 例子
```
let lng = '113.927335',lat = '22.579908'; //GPS坐标系
let baiduLng = GPSToBaidu(lat,lng).lng;
let baiduLat = GPSToBaidu(lat,lng).lat;
```

### 坐标系基本概念
1. 墨卡托坐标系：各大地图采用的投影方式，一种圆柱形地图投影法，保证对象的形状不变形。
2. GPS坐标系：WGS84地理坐标系，硬件设备一般采用该坐标系。中国以外的区域一律采用该坐标系。
3. 中国标准坐标系：GCJ08火星坐标系，是中国在WGS84坐标系进行加密偏移的一种方式，作用于高德，腾讯等地图中。值得注意的是，google等地图当坐标点是在中国时，需要转成中国标准坐标系。
4. 百度坐标系：BD09投影坐标系，百度基于GCJ08上二次偏移后的坐标系，只作用在百度地图上。

### 探索
地图坐标系是一个复杂的概念，要想该明白坐标系如何计算需要查询大量的资料。这些资料在百度上均有解释，这里不做多余复述。这里讲述一下各坐标系在地图中的运用。 
各坐标系都是基于墨卡托投影所来，一般而来，前端所接收的都是GPS坐标系，也便是定位设备、手机系统生成的坐标系。在后端不经过处理的情况下，前端都要对该坐标系根据自身不同的地图进行处理。所以对于项目中所使用的地图采用的坐标系需要清晰的认识。 
一般而言，前端接收坐标系之后进行数据格式的转换。在需要输出时进行将坐标系转换后端传输的坐标以此来保证传参和出参的一致。



