const { createContext, useContext, useEffect, useReducer } = require("react");

const QuizContext = createContext();

const sumPoints = (questions) =>
  questions.reduce((acc, question) => acc + question.points, 0);

const SECONDS_PER_QUESTION = 15;

const initialState = {
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  // Loading, Ready, Active, Finished, Error
  status: "loading",
  highscore: 0,
  secondsRemaining: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        highscore: +localStorage.getItem("highscore") || 0,
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      const high =
        state.points > state.highscore ? state.points : state.highscore;
      localStorage.setItem("highscore", high);

      return {
        ...state,
        status: "finished",
        highscore: high,
      };
    case "restartQuiz":
      return {
        ...state,
        index: 0,
        answer: null,
        points: 0,
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const totalPoints = sumPoints(questions);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8000/questions");
        const data = await response.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
        console.error("Error fetching data: ", error);
      }
    }

    fetchData();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        status,
        dispatch,
        numQuestions,
        index,
        points,
        totalPoints,
        answer,
        questions,
        secondsRemaining,
        highscore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }

  return context;
}

export { useQuiz, QuizProvider };
