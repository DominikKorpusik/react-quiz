import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

const initialState = {
  questions: [],
  // Loding, Ready, Active, Finished, Error
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
    <div className="app">
      <Header />

      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}
