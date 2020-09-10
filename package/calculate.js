export const PI = 3.14159265358979324;
export const X_PI = 3.14159265358979324 * 3000.0 / 180.0;
/**
 * 是否在中国之外
 * @param  {number} lat latitude
 * @param  {number} lng longitude
 * @return {boolean]} 
 */
export const isOutOfChina = (lat,lng) => {
    if (lng < 72.004 || lng > 137.8347){
        return true;
    }
    if (lat < 0.8293 || lat > 55.8271){
        return true;
    }
    return false;
}

/**
 * 计算偏差后的维度 
 * @param {number} x longitude
 * @param {number} y latitude 
 */
export const transformLat = (x, y) => {
    let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) * 2.0 / 3.0;
    return ret;
}

/**
 * 计算偏差后的经度
 * @param {number} x longitude 
 * @param {number} y latitude
 */
export const transformLng = (x, y) =>  {
    let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * PI) + 300.0 * Math.sin(x / 30.0 * PI)) * 2.0 / 3.0;
    return ret;
}


/**
 * 两点之间的距离
 * @param  {number} latA 起点纬度
 * @param  {number} lngA 起点经度
 * @param  {number} latB 终点纬度
 * @param  {number} lngB 终点经度
 * @return {number}      返回距离(米)
 */
export const distance = (latA, lngA, latB, lngB) => {
    let earthR = 6371000.0;
    let x = Math.cos(latA * PI / 180.0) * Math.cos(latB * PI / 180.0) * Math.cos((lngA - lngB) * PI / 180);
    let y = Math.sin(latA * PI / 180.0) * Math.sin(latB * PI / 180.0);
    let s = x + y;
    if (s > 1) s = 1;
    if (s < -1) s = -1;
    let alpha = Math.acos(s);
    let distance = alpha * earthR;
    return distance;
}