import { useQuiz } from "../contexts/QuizContext/QuizContext";

function NextButton() {
  const { dispatch, answer, index, numQuestions } = useQuiz();
  if (answer === null) return null;
  const isLastQuestion = numQuestions - 1 === index;

  return (
    <button
      className="btn btn-next"
      onClick={() =>
        dispatch({ type: isLastQuestion ? "finish" : "nextQuestion" })
      }
    >
      {isLastQuestion ? "Finish" : "Next"}
    </button>
  );
}

export default NextButton;
