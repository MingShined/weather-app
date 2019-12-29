/**
 * @name
 * @author MingShined
 */
import React, { Fragment, useEffect, useState } from 'react';
import WeatherService from './service';
import moment from 'moment';
import { DatePick } from 'racc';
interface Props {
  location: { query: { location: string } };
}
const HistoryWeather: React.FC<Props> = props => {
  const [historyInfo, setHistoryInfo] = useState({});
  useEffect(() => {
    getHistoryInfo(moment().format('YYYY-MM-DD'));
  }, []);
  const getHistoryInfo = async (date: string) => {
    const params = { date, location: props.location.query.location };
    const { data, status } = await WeatherService.historyInfo(params);
    if (status === 200) {
      setHistoryInfo(data);
    }
  };
  return (
    <Fragment>
      <DatePick onChange={date => getHistoryInfo(date)} />
    </Fragment>
  );
};
export default HistoryWeather;
