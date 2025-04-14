import Icon from "@/assets/Icon";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store/index";
import { useEffect, useState } from "react";
import questionsData from "../../questions.json";
import {
  setError,
  setLoading,
  setQuestions,
  resetAllAnswers,
} from "@/store/questionSlice";

const SetupScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(resetAllAnswers());
  }, [dispatch]);
  const handleRightClick = (e: any) => {
    e.preventDefault();
    alert("Right-click is disabled!");
  };
  const handleStartQuiz = async () => {
    setIsLoading(true);
    dispatch(setLoading());
  
    try {
      const questions = questionsData.questions;
      dispatch(setQuestions(questions));
      navigate("/quiz");
    } catch (error) {
      console.error("Error:", error);
      dispatch(setError("Failed to load questions."));
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      onContextMenu={handleRightClick}
      className="flex items-center justify-center fixed inset-0 font-normal overflow-y-hidden overflow-hidden px-4 bg-gray-50"
    >
      <div className="p-6 sm:p-10 max-w-xl w-full text-center">
        <div className="flex items-center justify-center">
          <Icon width={100} height={100} fill="#7C8181" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Sentence Construction
        </h1>

        <p className="text-[#7C8181] text-sm sm:text-base mb-6 font-roboto">
          Select the correct words to complete the sentence by arranging the
          provided options in the right order.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="p-4 sm:border-r-2 sm:border-gray-300">
            <h3 className="text-xs text-gray-500 mb-1">Time Per Question</h3>
            <p className="text-lg font-semibold text-gray-800">15 sec</p>
          </div>
          <div className="p-4 sm:border-r-2 sm:border-gray-300">
            <h3 className="text-xs text-gray-500 mb-1">Total Questions</h3>
            <p className="text-lg font-semibold text-gray-800">10</p>
          </div>
          <div className=" p-4 ">
            <h3 className="text-xs text-gray-500 mb-1">Coins</h3>
            <p className="text-lg font-semibold text-gray-800">0</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            className="px-10 bg-white text-[#453FE1] border-[#453FE1] border-2 hover:bg-[#f8f8f8]"
            onClick={() => {
              alert("Coming Soon");
            }}
          >
            Back
          </Button>
          <Button
            className="px-10 bg-[#453FE1] text-[#FFFFFF] hover:bg-[#5752E4] hover:text-[#FFFFFF]"
            onClick={handleStartQuiz}
          >
            {isLoading ? "Loading..." : "Start"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SetupScreen;
