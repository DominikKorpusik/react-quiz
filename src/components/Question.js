import Options from "./Options";
import { useQuiz } from "../contexts/QuizContext/QuizContext";

function Question() {
  const { questions, index } = useQuiz();
  const { question } = questions[index];

  return (
    <div>
      <h4>{question}</h4>
      <Options />
    </div>
  );
}

export default Question;
