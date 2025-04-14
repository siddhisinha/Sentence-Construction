import QuestionScreen from "@/screens/QuestionScreen";
import ResultScreen from "@/screens/ResultScreen";
import SetupScreen from "@/screens/SetupScreen";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SetupScreen />} />
        <Route path="/quiz" element={<QuestionScreen />} />
        <Route path="/results" element={<ResultScreen />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
