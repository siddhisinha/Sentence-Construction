import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/";
import { selectAnswer } from "../store/questionSlice";
import { Stepper } from "../common/stepper";
import { TimerAndQuit } from "../common/TimerAndQuit";
import { QuestionText } from "../common/QuestionText";
import { NextButton } from "../common/NextButton";

const QuestionScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { questions, userAnswers, status, error } = useSelector(
    (state: RootState) => state.questions
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [seconds, setSeconds] = useState(15);
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);

  const currentQuestion = questions?.[currentStep];
  const totalSteps = questions?.length ?? 0;
  const handleRightClick = (e: any) => {
    e.preventDefault();
    alert("Right-click is disabled!");
  };
  useEffect(() => {
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === "r") || e.key === "F5") {
        e.preventDefault();
        alert("Reload is disabled during the quiz!");
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener("contextmenu", handleRightClick);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleRightClick);
    };
  }, []);

  useEffect(() => {
    setSeconds(15);
    if (currentQuestion) {
      const savedAnswers = userAnswers[currentQuestion.questionId] || [];
      setCurrentAnswers(savedAnswers);
    } else {
      setCurrentAnswers([]);
    }
  }, [currentStep, currentQuestion, userAnswers]);

  useEffect(() => {
    if (seconds <= 0) {
      return;
    }

    const timer = setInterval(() => setSeconds((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  useEffect(() => {
    if (seconds === 0) {
      const timeoutId = setTimeout(() => handleNext(), 100);
      return () => clearTimeout(timeoutId);
    }
  }, [seconds]);

  useEffect(() => {
    if (status !== "loading" && (!questions || questions.length === 0)) {
      navigate("/");
    }
  }, [questions, status, navigate]);

  const handleAnswersChange = (answers: string[]) => {
    setCurrentAnswers(answers);
  };

  const saveCurrentAnswers = () => {
    if (currentQuestion && currentAnswers.length > 0) {
      dispatch(
        selectAnswer({
          questionId: currentQuestion.questionId,
          selectedAnswers: currentAnswers,
        })
      );
    }
  };

  const handleNext = () => {
    saveCurrentAnswers();

    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      navigate("/results");
    }
  };

  const handleQuit = () => {
    saveCurrentAnswers();

    navigate("/results");
  };

  if (status === "loading") {
    return <div className="text-center p-8">Loading questions...</div>;
  }

  if (status === "failed") {
    return (
      <div className="text-center p-8 text-red-500">
        Failed to load questions: {error}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate("/")}
        >
          Back to Setup
        </button>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center p-8">
        No questions available.
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate("/")}
        >
          Back to Setup
        </button>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="text-center p-8">
        Question not found for step: {currentStep}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate("/")}
        >
          Back to Setup
        </button>
      </div>
    );
  }

  const blankCount = (currentQuestion.question.match(/_{5,}/g) || []).length;
  const isNextDisabled = currentAnswers.length < blankCount;

  return (
    <div
      onContextMenu={handleRightClick}
      className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6"
    >
      <h1 className="text-2xl font-bold mb-4">Question {currentStep + 1}</h1>

      <TimerAndQuit seconds={seconds} onQuit={handleQuit} />

      <Stepper
        currentStep={currentStep}
        totalSteps={totalSteps}
        className="grid grid-cols-10 gap-2 mb-6"
      />
      <p
        className="font-semibold text-[20px] leading-[22px] text-center py-2
"
      >
        Select the missing words in the correct order
      </p>

      <QuestionText
        sentence={currentQuestion.question}
        options={currentQuestion.options || []}
        onAnswersChange={handleAnswersChange}
        selectedAnswers={currentAnswers}
      />
      <div className="flex justify-end">
        <NextButton
          disabled={isNextDisabled}
          onClick={handleNext}
          isLastQuestion={currentStep === totalSteps - 1}
        />
      </div>
    </div>
  );
};

export default QuestionScreen;
