//Requriements
const { fetchMyIP, fetchCoordinatesByIP, fetchISSFlyoverTimes, nextISSTimesForMyLocation } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

fetchCoordinatesByIP('207.216.92.136', (error, coordinates) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned coodinates:' , coordinates);
});

const myCoordinates = { latitude: 49.1579401, longitude: -121.9514666 };

fetchISSFlyoverTimes(myCoordinates, (error, flyOverTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned fly over times:', flyOverTimes);
});

const getFlyOverTimes = function(flyOverTimes) {
  for (const time of flyOverTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, flyOverTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  getFlyOverTimes(flyOverTimes);
  
});

module.exports = {getFlyOverTimes};