const { getFlyOverTimes } = require('./index');
const {nextISSTimesForMyLocation} = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    getFlyOverTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
