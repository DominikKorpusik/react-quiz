function RestartButton({ dispatch }) {
  return (
    <button
      className="btn btn-next"
      onClick={() => dispatch({ type: "restartQuiz" })}
    >
      Restart Quiz
    </button>
  );
}

export default RestartButton;
