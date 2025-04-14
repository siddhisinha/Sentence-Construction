import { useEffect, useState } from "react";

interface QuestionTextProps {
  sentence: string;
  options: string[];
  onAnswersChange: (answers: string[]) => void;
  selectedAnswers?: string[];
}

export const QuestionText = ({
  sentence,
  options,
  onAnswersChange,
  selectedAnswers = [],
}: QuestionTextProps) => {
  const BLANK_PLACEHOLDER = "___BLANK___";

  const processedSentence = sentence.replace(/_{5,}/g, BLANK_PLACEHOLDER);

  const blankCount = (
    processedSentence.match(new RegExp(BLANK_PLACEHOLDER, "g")) || []
  ).length;

  const [blanks, setBlanks] = useState<string[]>(Array(blankCount).fill(""));
  const [availableOptions, setAvailableOptions] = useState<string[]>(options);

  useEffect(() => {
    setBlanks(Array(blankCount).fill(""));
    setAvailableOptions(options);
  }, [sentence, options, blankCount]);

  useEffect(() => {
    if (selectedAnswers.length > 0) {
      const filledBlanks = blanks.filter((blank) => blank !== "");
      const isDifferent =
        selectedAnswers.length !== filledBlanks.length ||
        selectedAnswers.some((answer, i) => filledBlanks[i] !== answer);

      if (isDifferent) {
        const newBlanks = Array(blankCount).fill("");

        selectedAnswers.forEach((answer, index) => {
          if (index < newBlanks.length) {
            newBlanks[index] = answer;
          }
        });

        setBlanks(newBlanks);

        const remainingOptions = options.filter(
          (option) => !selectedAnswers.includes(option)
        );
        setAvailableOptions(remainingOptions);
      }
    }
  }, [selectedAnswers, options, blankCount]);

  useEffect(() => {
    const currentAnswers = blanks.filter((blank) => blank !== "");

    const isDifferent =
      currentAnswers.length !== selectedAnswers.length ||
      currentAnswers.some((answer, i) => selectedAnswers[i] !== answer);

    if (isDifferent) {
      onAnswersChange(currentAnswers);
    }
  }, [blanks, onAnswersChange, selectedAnswers]);

  const handleSelectOption = (option: string) => {
    const firstEmptyIndex = blanks.findIndex((blank) => blank === "");

    if (firstEmptyIndex !== -1) {
      const newBlanks = [...blanks];
      newBlanks[firstEmptyIndex] = option;
      setBlanks(newBlanks);

      setAvailableOptions(availableOptions.filter((opt) => opt !== option));
    }
  };

  const handleBlankClick = (index: number) => {
    const wordToReturn = blanks[index];
    if (wordToReturn) {
      const newBlanks = [...blanks];
      newBlanks[index] = "";
      setBlanks(newBlanks);

      setAvailableOptions([...availableOptions, wordToReturn]);
    }
  };

  const renderSentence = () => {
    let parts = processedSentence.split(BLANK_PLACEHOLDER);
    let result = [];

    for (let i = 0; i < parts.length; i++) {
      result.push(<span key={`part-${i}`}>{parts[i]}</span>);

      if (i < parts.length - 1) {
        const blankValue = blanks[i];
        result.push(
          <span
            key={`blank-${i}`}
            onClick={() => handleBlankClick(i)}
            className={`inline-block min-w-[100px] mx-1 px-2 py-1 border-b-2 border-gray-400 cursor-pointer ${
              blankValue ? "bg-blue-100" : ""
            }`}
          >
            {blankValue || "_____"}
          </span>
        );
      }
    }

    return result;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-xl p-4 bg-gray-50 rounded-lg">
        {renderSentence()}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
        {availableOptions.map((option) => (
          <button
            key={option}
            onClick={() => handleSelectOption(option)}
            className="px-4 py-2 border rounded bg-white text-black hover:bg-gray-100"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
