import { useQuiz } from "../contexts/QuizContext/QuizContext";

function Progress() {
  const { index, numQuestions, points, totalPoints } = useQuiz();
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
