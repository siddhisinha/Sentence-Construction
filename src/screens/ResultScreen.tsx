import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { Button } from "@/components/ui/button";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect } from "react";

const ResultsScreen = () => {
  const navigate = useNavigate();
  const { questions, userAnswers } = useSelector(
    (state: RootState) => state.questions
  );
  useEffect(() => {
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && (e.key === "r" || e.key === "R")) || e.key === "F5") {
        e.preventDefault();
        alert(
          "Reloading is disabled during the quiz. Please complete it first."
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener("contextmenu", handleRightClick);

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleRightClick);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const calculateScore = () => {
    let correctCount = 0;

    questions.forEach((question) => {
      const userAnswerArray = userAnswers[question.questionId] || [];
      const correctAnswerArray = question.correctAnswer;

      if (
        userAnswerArray.length === correctAnswerArray.length &&
        userAnswerArray.every((answer, i) => answer === correctAnswerArray[i])
      ) {
        correctCount++;
      }
    });

    return {
      correct: correctCount,
      total: questions.length,
      percentage:
        questions.length > 0
          ? Math.round((correctCount / questions.length) * 100)
          : 0,
    };
  };

  const score = calculateScore();

  const hasUserAnswer = (questionId: string) => {
    const userAnswerArray = userAnswers[questionId] || [];
    return userAnswerArray.length > 0;
  };
  const getFilledSentence = (sentence: string, answers: string[]) => {
    let index = 0;
    return sentence.replace(/_{5,}/g, () => answers[index++] || "______");
  };

  const handleRetakeQuiz = () => {
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-[#F8F8F8] shadow-md rounded-2xl p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Sentence Completion
      </h1>

      <div className="flex flex-col items-center justify-center mb-6">
        <div className="w-28 h-28 mb-4">
          <CircularProgressbar
            value={score.percentage}
            text={`${score.percentage}%`}
            styles={buildStyles({
              textColor: "#22c55e",
              pathColor: "#22c55e",
              trailColor: "#e5e7eb",
              textSize: "24px",
            })}
          />
        </div>
        <p className="text-center text-[18px] text-gray-700 max-w-xl">
          {score.percentage >= 90
            ? "While you correctly formed most sentences, there are a couple of areas where improvements can be made. Try reviewing the incorrect ones for more details."
            : score.percentage >= 60
            ? "You're on the right track! Review the incorrect ones to improve."
            : "Consider reviewing the basic sentence patterns and retrying the quiz."}
        </p>
      </div>

      <div className="text-center mb-6">
        <Button
          onClick={handleRetakeQuiz}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Go to Dashboard
        </Button>
      </div>

      {questions.map((question, index) => {
        const userAnswerArray = userAnswers[question.questionId] || [];
        const correctAnswerArray = question.correctAnswer;
        const hasAnswer = hasUserAnswer(question.questionId);
        const isCorrect =
          userAnswerArray.length === correctAnswerArray.length &&
          userAnswerArray.every(
            (answer, i) => answer === correctAnswerArray[i]
          );

        return (
          <div
            key={question.questionId}
            className={` mb-20 py-4 shadow-2xl rounded-lg bg-[#FFFFFF]
              ${isCorrect ? "shadow-[#f0fdf4]" : "shadow-rose-50"}`}
          >
            <div className="flex flex-row justify-between px-5">
              <span className="bg-[#e0e1e1] text-[16px] rounded-sm p-1">
                Prompt
              </span>
              <span>{index + 1}/10</span>
            </div>
            <p className="flex items-star mt-8 text-[#414343] text-[18px] p-2">
              {getFilledSentence(question.question, correctAnswerArray)}
            </p>
            <div className="px-2 mt-10">
              <div className="flex justify-items-start px-3">
                <span className=" font-semibold text-[18px] text-[#616464]">
                  Your response{" "}
                </span>{" "}
                <span
                  className={`rounded ml-1.5 px-1 text-[18px] ${
                    isCorrect
                      ? "text-[#317F39] bg-[#e4ffe6]"
                      : hasAnswer
                      ? "text-[#9E2930] bg-[#f8d7d9]"
                      : "text-[#9E2930] bg-[#f8d7d9]"
                  }`}
                >
                  {isCorrect
                    ? "Correct"
                    : hasAnswer
                    ? "Incorrect"
                    : "No Response"}
                </span>
              </div>
              <p className="mt-7 px-1 text-[#2A2D2D] text-[18px]">
                {" "}
                {hasAnswer
                  ? getFilledSentence(question.question, userAnswerArray)
                  : null}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResultsScreen;
