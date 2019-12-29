const devPath = 'https://api.heweather.net/s6';
export default {
  '/weather/': {
    target: devPath,
    changeOrigin: false
  }
};
