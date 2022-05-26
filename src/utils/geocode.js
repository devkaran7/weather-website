const request = require("request");

const geoCode = (address, callback) => {
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZGV2a2FyYW4xMjMxIiwiYSI6ImNsM2gybGpieDBxamcza24weXoyc2ppaWoifQ.yDmvUHFIxnZrTd0E7prqBA&limit=1";
  request({url, json : true}, (error, {body}) => {
    if (error) {
      callback("unable to connect to location service");
    } else if (body.features.length === 0) {
      callback("unable to find location, try another search");
    } else {
      const data = body.features[0];
      callback(undefined, {
        longitude : data.center[0], 
        latitude : data.center[1],
        location : data.place_name
      });
    }
  })
}

module.exports = geoCode;