const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiYWhpc2hrb3ZhbGFtIiwiYSI6ImNsMWU0cGZmZTBpNm8zZHJ1N2U5aDgyejYifQ.cFZPKbajhMdqYYED3qxxeQ&limit=1";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect", undefined);
    } else if (body.features.length == 0) {
      callback("In correct cordinates. Try something else!", undefined);
    } else {
      const long = body.features[0].center[0];
      const lat = body.features[0].center[1];
      const location = body.features[0].place_name;

      const data = {
        longitude: long,
        latitude: lat,
        location,
      };

      callback(undefined, data);
    }
  });
};

module.exports = geocode;
