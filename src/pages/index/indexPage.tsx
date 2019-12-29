/**
 * @name
 * @author MingShined
 */
import React, { Fragment, useEffect, useRef } from 'react';
import BasicInfo from './components/BasicInfo';
import WeatherService from './service';
import FutureInfo from './components/FutureInfo';
import SunInfo from './components/SunInfo';
import { useStateReducer } from 'racc';
import Loading from 'src/common/loading';
import { Input, Icon, Button } from 'antd';
import Link from 'umi/link';
import AirInfo from './components/AirInfo';
declare var serverUrl: string;
declare var key: string;

const getInitState = () => ({
  weatherInfo: null as any,
  location: 'auto_ip'
});
export type WeatherState = ReturnType<typeof getInitState>;

interface WeatherProps {}
const IndexPage: React.FC<WeatherProps> = props => {
  const [state, setState] = useStateReducer<WeatherState>(getInitState());
  const inputRef = useRef<any>(null);
  useEffect(() => {
    getWeatherInfo();
  }, [state.location]);
  const getWeatherInfo = async () => {
    const { data, status } = (await WeatherService.getWeatherInfo({
      location: state.location
    })) as any;
    if (status === 200) {
      const weatherInfo = data.HeWeather6[0];
      setState({ weatherInfo });
    }
  };
  const handleSearch = () => {
    const location = inputRef.current.state.value;
    setState({ location });
  };
  const handleShowStarMap = () => {
    window.open(`${serverUrl}/map/cloudmap?key=${key}`);
  };
  if (!state.weatherInfo) {
    return <Loading />;
  }
  return (
    <Fragment>
      <Input
        ref={inputRef}
        onPressEnter={handleSearch}
        prefix={<Icon type="search" />}
        style={{ width: 200 }}
      />
      <Link to={`/index/history?location=${state.weatherInfo.basic.cid}`}>
        历史天气
      </Link>
      <a onClick={handleShowStarMap}>
        星图
      </a>
      <BasicInfo {...state} />
      <SunInfo {...state} />
      <AirInfo {...state} />
      <FutureInfo {...state} />
    </Fragment>
  );
};
export default IndexPage;
