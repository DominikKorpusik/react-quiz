import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch, secondsRemaining]);

  return (
    <div className="timer">
      {minutes <= 9 ? `0${minutes}` : minutes}:
      {seconds <= 9 ? `0${seconds}` : seconds}
    </div>
  );
}

export default Timer;
