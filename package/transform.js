
import { isOutOfChina,transformLat,transformLng,PI,X_PI } from './calculate';

export const delta = (lat, lng) => {
    const a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
    const ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
    let dLat = transformLat(lng - 105.0, lat - 35.0);
    let dLng = transformLng(lng - 105.0, lat - 35.0);
    const radLat = lat / 180.0 * PI;
    let magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    let sqrtMagic = Math.sqrt(magic);
    dLat = dLat * 180.0 / (a * (1 - ee) / (magic * sqrtMagic) * PI);
    dLng = dLng * 180.0 / (a / sqrtMagic * Math.cos(radLat) * PI);
    return { 'lat': dLat, 'lng': dLng };
}

/**
 * WGS-84 to GCJ-02 GPS坐标转中国坐标
 * @param  {number} wgsLat GPS纬度
 * @param  {number} wgsLng GPS经度
 * @return {object}        返回中国坐标经纬度对象
 */
export const GPSToChina = (wgsLat, wgsLng) => {
    if (isOutOfChina(wgsLat, wgsLng)){
        return { 'lat': wgsLat, 'lng': wgsLng };
    }
    let d = delta(wgsLat, wgsLng);
    return { 'lat': Number(wgsLat) + Number(d.lat), 'lng': Number(wgsLng) + Number(d.lng) };
}


/**
 * GPS坐标转百度坐标
 * @param {number} gpsLat GPS纬度
 * @param {number} gpsLng GPS经度
 */
export const GPSToBaidu = (gpsLat,gpsLng) => {
    const china = GPSToChina(gpsLat,gpsLng);
    const baidu = chinaToBaidu(china.lat,china.lng);
    return baidu;
}

/**
 * GCJ-02 to WGS-84 中国标准坐标转GPS坐标
 * @param  {number} gcjLat 中国标准坐标纬度
 * @param  {number} gcjLng 中国标准坐标经度
 * @return {object}        返回GPS经纬度对象
 */
export const chinaToGPS = (gcjLat, gcjLng) => {
    if (isOutOfChina(gcjLat, gcjLng))
    return { 'lat': gcjLat, 'lng': gcjLng };
    let d = delta(gcjLat, gcjLng);
    return { 'lat': Number(gcjLat) - Number(d.lat), 'lng': Number(gcjLng) - Number(d.lng) };
}


/**
 * GCJ-02 to BD-09 中国标准坐标转百度坐标(精确)
 * @param  {number} gcjLat  中国标准坐标纬度
 * @param  {number} gcjLng  中国标准坐标经度
 * @return {object}         返回百度经纬度对象
 */
export const chinaToBaidu = (gcjLat, gcjLng) => {
    let x = gcjLng,
        y = gcjLat;
    let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
    let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
    let bdLng = z * Math.cos(theta) + 0.0065;
    let bdLat = z * Math.sin(theta) + 0.006;
    return { 'lat': bdLat, 'lng': bdLng };
}

/**
 * 百度转GPS坐标
 * @param {number} gpsLat GPS纬度
 * @param {number} gpsLng GPS经度
 */
export const baiduToGPS = (gpsLat,gpsLng) => {
    let china = baiduToChina(gpsLat,gpsLng);
    let gps = chinaToGPS(china.lat,china.lng);
    return gps;
}
/**
 * BD-09 to GCJ-02 百度坐标转中国标准坐标
 * @param  {number} bdLat  百度坐标纬度
 * @param  {number} bdLng  百度坐标经度
 * @return {object}        返回中国标准经纬度对象
 */
export const baiduToChina=(bdLat, bdLng) => {
    let x = bdLng - 0.0065,
        y = bdLat - 0.006;
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
    let gcjLng = z * Math.cos(theta);
    let gcjLat = z * Math.sin(theta);
    return { 'lat': gcjLat, 'lng': gcjLng };
}

/**
 * WGS-84 to Web mercator GPS坐标转墨卡托坐标
 * @param  {number} wgsLat GPS纬度
 * @param  {number} wgsLng GPS经度
 * @return {object}        返回墨卡托经纬度对象
 */
export const GPSToMercator = (wgsLat, wgsLng) => {
    let x = wgsLng * 20037508.34 / 180.0;
    let y = Math.log(Math.tan((90.0 + wgsLat) * PI / 360.0)) / (PI / 180.0);
    y = y * 20037508.34 / 180.0;
    return { 'lat': y, 'lng': x };
}


/**
 * Web mercator to WGS-84 墨卡托坐标转GPS坐标
 * @param  {number} mercatorLat 墨卡托纬度
 * @param  {number} mercatorLng 墨卡托经度
 * @return {object} 返回GPS经纬度对象
 */
export const mercatorToGPS = (mercatorLat, mercatorLng) =>  {
    let x = mercatorLng / 20037508.34 * 180.0;
    let y = mercatorLat / 20037508.34 * 180.0;
    y = 180 / PI * (2 * Math.atan(Math.exp(y * PI / 180.0)) - PI / 2);
    return { 'lat': y, 'lng': x };
}




