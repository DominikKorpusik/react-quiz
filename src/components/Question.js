import Options from "./Options";

function Question({ question, dispatch, answer }) {
  const { correctOption, id, options, points, question: quest } = question;

  return (
    <div>
      <h4>{quest}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
