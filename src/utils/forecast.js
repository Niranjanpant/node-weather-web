const request = require("request");

const forecast = (lat, lon, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f1c1641caa3ad52e4ea6ec830541db52`;
  request(
    {
      url,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        callback("unable to display forecast", undefined);
      } else if (body.message) {
        callback("unable to find location", undefined);
      } else {
        callback(undefined, body.current);
      }
    }
  );
};

module.exports = forecast;
