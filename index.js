//Requriements
const { fetchMyIP, fetchCoordinatesByIP, fetchISSFlyoverTimes } = require('./iss');

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