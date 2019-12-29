/**
 * @name
 * @author MingShined
 */
import React, { Fragment, useEffect } from 'react';
import { WeatherState } from '../indexPage';
import WeatherService from '../service';
import { useStateReducer } from 'racc';
interface Props extends WeatherState {}
const getInitState = () => ({
  airInfo: {} as any
});
type State = ReturnType<typeof getInitState>;
const AirInfo: React.FC<Props> = props => {
  const [state, setState] = useStateReducer<State>(getInitState());
  useEffect(() => {
    getWeatherInfo();
  }, [props.location]);
  const getWeatherInfo = async () => {
    const { data, status } = (await WeatherService.getAirInfo({
      location: props.location
    })) as any;
    if (status === 200) {
      const airInfo = data.HeWeather6[0].air_now_city;
      setState({ airInfo });
    }
  };
  return (
    <Fragment>
      <p>空气质量: {state.airInfo.qlty}</p>
      <p>空气质量指数: {state.airInfo.aqi}</p>
      <p>主要污染方式: {state.airInfo.main}</p>
      <p>pm25: {state.airInfo.pm25}</p>
    </Fragment>
  );
};
export default AirInfo;
