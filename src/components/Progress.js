function Progress({ index, numQuestions, points, totalPoints }) {
  return (
    <header className="progress">
      <progress max={numQuestions - 1} value={index} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints}
      </p>
    </header>
  );
}

export default Progress;
