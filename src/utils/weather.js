const request = require("request");

const weatherCode = (latitude, longitude , callback) => {
  const url = "http://api.weatherstack.com/current?access_key=13fd9caa755243da6709204cdb748bf5&query=" + latitude + "," + longitude;
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("unable to connect to weather service");
    } else if (body.error) {
      callback("unable to find location");
    } else {
      const data = body.current;
      callback(undefined, {
        description : data.weather_descriptions[0],
        summary :  `It is currently ${data.temperature} degress out. It feels like ${data.feelslike} degress out.`
      });
    }
  });
}

module.exports = weatherCode;