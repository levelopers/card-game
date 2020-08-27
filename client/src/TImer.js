import React, { useEffect, useState } from 'react'

export default function Timer({ startTime, now, timeUsed }) {
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().getTime())
    }, 1000);
  }, []);
  if (!!timeUsed) {
    clearInterval()
    return (
      <h3>Elapsed Time: {timeUsed}</h3>
    )
  }
  if (!!startTime) {
    return (
      <h3>Elapsed Time: {msToTime(currentTime - startTime)}</h3>
    )
  }
  return null
}

function msToTime(s) {
  s = Math.floor(s / 1000);
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return hrs + ':' + mins + ':' + secs;
}