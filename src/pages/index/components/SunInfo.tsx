/**
 * @name
 * @author MingShined
 */
import React, { Fragment, useEffect } from 'react';
import { WeatherState } from '../indexPage';
import WeatherService from '../service';
import moment from 'moment';
import { useStateReducer } from 'racc';
interface Props extends WeatherState {}
const getInitState = () => ({
  sunInfo: {} as any
});
type State = ReturnType<typeof getInitState>;
const SunInfo: React.FC<Props> = props => {
  if (!props.weatherInfo) {
    return null;
  }
  const [state, setState] = useStateReducer<State>(getInitState());
  useEffect(() => {
    getSuninfo();
  }, [props.weatherInfo]);
  const getSuninfo = async () => {
    const date = moment().format('YYYYMMDD');
    const time = moment().format('HHmm');
    const { lat, lon } = props.weatherInfo.basic;
    const params = { lon, lat, date, time, alt: 100, tz: 8 };
    const { data, status } = (await WeatherService.getSunInfo(params)) as any;
    if (status === 200) {
      const sunInfo = data.HeWeather6[0].solar_elevation_angle;
      setState({ sunInfo });
    }
  };
  return (
    <Fragment>
      <p>太阳高度角: {state.sunInfo.solar_elevation_angle}</p>
      <p>太阳方位角: {state.sunInfo.solar_azimuth_angle}</p>
      <p>太阳时: {state.sunInfo.solar_elevation_angle}</p>
      <p>时角: {state.sunInfo.hour_angle}</p>
    </Fragment>
  );
};
export default SunInfo;
