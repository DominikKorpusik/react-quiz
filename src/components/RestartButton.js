import { useQuiz } from "../contexts/QuizContext/QuizContext";

function RestartButton() {
  const { dispatch } = useQuiz();
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
