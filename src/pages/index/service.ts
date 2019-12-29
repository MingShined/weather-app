import { httpGet } from 'src/utils/request';

const WeatherService = {
  /** @name 基础信息 */
  async getWeatherInfo(params = {}) {
    const url = '/weather/now';
    return httpGet(url, params);
  },
  /** @name 太阳高度 */
  async getSunInfo(params = {}) {
    const url = '/solar/solar-elevation-angle';
    return httpGet(url, params);
  },
  /** @name 未来天气 */
  async getFutureInfo(params = {}) {
    const url = '/weather/forecast';
    return httpGet(url, params);
  },
  /** @name 历史天气 */
  async historyInfo(params = {}) {
    const url = '/weather/historical';
    return httpGet(url, params);
  },
  /** @name 空气信息 */
  async getAirInfo(params = {}) {
    const url = '/air/now';
    return httpGet(url, params);
  },
};

export default WeatherService;
