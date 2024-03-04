import AppLayout from "./AppLayout";
import { QuizProvider } from "../contexts/QuizContext/QuizContext";

export default function App() {
  return (
    <div className="app">
      <QuizProvider>
        <AppLayout />
      </QuizProvider>
    </div>
  );
}
