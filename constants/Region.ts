import { Dimensions } from 'react-native';

  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE = 38.1549896;
  const LONGITUDE = -96.1923437;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default {
    latitude: LATITUDE,    // location latitude
    longitude: LONGITUDE,  // location longitude
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
}