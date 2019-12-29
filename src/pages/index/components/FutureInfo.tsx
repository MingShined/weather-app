/**
 * @name
 * @author MingShined
 */
import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { WeatherState } from '../indexPage';
import WeatherService from '../service';
import { useStateReducer } from 'racc';
interface Props extends WeatherState {}
const getInitState = () => ({
  futureInfo: [] as any[]
});
type State = ReturnType<typeof getInitState>;
const FutureInfo: React.FC<Props> = props => {
  const [state, setState] = useStateReducer<State>(getInitState());
  useEffect(() => {
    getWeatherInfo();
  }, [props.location]);
  const getWeatherInfo = async () => {
    const { data, status } = (await WeatherService.getFutureInfo({
      location: props.location
    })) as any;
    if (status === 200) {
      const futureInfo = data.HeWeather6[0].daily_forecast;
      setState({ futureInfo });
    }
  };
  return (
    <Row type="flex" justify="space-around">
      {state.futureInfo.map((item, index) => (
        <Col key={index}>
          <h1>{item.date}</h1>
          <p>最高： {item.tmp_max}</p>
          <p>最低： {item.tmp_min}</p>
          <p>
            <img
              width="20"
              height="20"
              src={`https://cdn.heweather.com/cond_icon/${item.cond_code_d}.png`}
              alt=""
            />
            {item.cond_txt_d} 转
            <img
              width="20"
              height="20"
              src={`https://cdn.heweather.com/cond_icon/${item.cond_code_n}.png`}
              alt=""
            />
            {item.cond_txt_n}
          </p>
        </Col>
      ))}
    </Row>
  );
};
export default FutureInfo;
