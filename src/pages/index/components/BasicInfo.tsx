/**
 * @name
 * @author MingShined
 */
import React, { Fragment } from 'react';
import { WeatherState } from '../indexPage';
interface Props extends WeatherState {}
const BasicInfo: React.FC<Props> = props => {
  if (!props.weatherInfo) {
    return null;
  }
  const { basic, update, now } = props.weatherInfo;
  return (
    <Fragment>
      <h1>{basic.location}</h1>
      <h1>{now.tmp}℃</h1>
      <p>
        {now.cond_txt} {now.wind_dir} {now.wind_sc}级
      </p>
      <p>{update.loc}发布</p>
    </Fragment>
  );
};
export default BasicInfo;
