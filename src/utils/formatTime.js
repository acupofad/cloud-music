
const formatTime = function (my_time) {
  var days = my_time / 1000 / 60 / 60 / 24;
  var daysRound = Math.floor(days);
  var hours = my_time / 1000 / 60 / 60 - (24 * daysRound);
  var hoursRound = Math.floor(hours);
  var minutes = my_time / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
  var minutesRound = Math.floor(minutes);
  var seconds = my_time / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
  seconds = Math.round(seconds)
  seconds = seconds < 10 ? '0' + seconds : seconds
  var time = hoursRound ? hoursRound + ':' + minutesRound + ':' + seconds : minutesRound + ':' + seconds
  return time;
}

export default formatTime