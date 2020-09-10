
import { isOutOfChina,distance } from './calculate';
import { GPSToChina,GPSToBaidu,chinaToGPS,chinaToBaidu,baiduToGPS,baiduToChina,GPSToMercator,mercatorToGPS } from './transform';

const transformMap = {
    isOutOfChina,
    distance,
    GPSToChina,
    GPSToBaidu,
    chinaToGPS,
    chinaToBaidu,
    baiduToGPS,
    baiduToChina,
    GPSToMercator,
    mercatorToGPS
}

export default transformMap;