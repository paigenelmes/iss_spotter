//Require request
const request = require('request');

//Fetch my IP function
const fetchMyIP = function(callback) {
  //Use request to fetch IP address from JSON API
  request("https://api.ipify.org?format=json", (error, response, body) => {
    //If we get an error, return it via callback
    if (error) {
      callback(error, null);
      return;
    }
    //If the status code is not 200, assume there's a server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    //If no errors, get the IP address, parse the string & return it as an object
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

//Fetch coordinates by IP function
const fetchCoordinatesByIP = function(ip, callback) {
  request(`https://ipwho.is/${ip}`, (error, response, body) => {
    //If we get an error, return it via callback
    if (error) {
      callback(error, null);
      return;
    }
    //Variable for parsed body
    const newBody = JSON.parse(body);
    //If success is false, send an error message via callback
    if (!newBody.success) {
      const message = `Success status is ${newBody.success}. Server message: ${newBody.message} when fetching for IP ${newBody.ip}.`;
      callback(Error(message), null);
      return;
    }
    //If there are no errors, reutrn latitude & longitude as an object via callback
    const { latitude, longitude } = newBody;

    callback(null, {latitude, longitude});

  });
};

//Fetch fly over times function

const fetchISSFlyoverTimes = function(coords, callback) {
  //Variable for URL with latitude & longitude
  const URL = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  //Request function with URL
  request(URL, (error, response, body) => {
    //If we get an error, return it via callback
    if (error) {
      callback(error, null);
      return;
    }
    //If the status code is not 200, assume there's a server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    //If there are no errors, return flyover times via callback
    const flyOverTimes = JSON.parse(body).response;
    callback(null, flyOverTimes);
  });
};

module.exports = { fetchMyIP, fetchCoordinatesByIP, fetchISSFlyoverTimes };