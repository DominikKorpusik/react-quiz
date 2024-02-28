function FinishScreen({ points, totalPoints, highscore }) {
  const percentage = ((points / totalPoints) * 100).toFixed(2);
  let emoji;
  if (percentage === 100) {
    emoji = "🎉";
  } else if (percentage >= 80) {
    emoji = "👍";
  } else {
    emoji = "👎";
  }

  return (
    <>
      <p className="result">
        {emoji} You scored <strong>{points}</strong> out of {totalPoints} (
        {percentage})%
      </p>
      <div className="highscore">(Highscore: {highscore} points)</div>
    </>
  );
}

export default FinishScreen;
