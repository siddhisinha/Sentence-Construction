import { createSlice,PayloadAction } from '@reduxjs/toolkit';

interface Question {
  questionId: string;
  question: string;
  questionType: string;
  answerType: string;
  options?: string[]; 
  correctAnswer: string[];
}

interface QuestionsState {
  questions: Question[];
  userAnswers: Record<string, string[]>; 
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}


const initialState: QuestionsState = {
  questions: [],
  userAnswers: {},
  status: 'idle',
  error: null,
};



const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    selectAnswer: (state, action: PayloadAction<{ questionId: string; selectedAnswers: string[] }>) => {
      const { questionId, selectedAnswers } = action.payload;
      state.userAnswers[questionId] = selectedAnswers;
    },
    clearAnswer: (state, action: PayloadAction<string>) => {
      delete state.userAnswers[action.payload];
    },
    resetAllAnswers: (state) => {
      state.userAnswers = {};
    },
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
      state.status = 'succeeded';
    },
    setLoading: (state) => {
      state.status = 'loading';
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});

export const { selectAnswer, clearAnswer, resetAllAnswers, setQuestions,setLoading,setError } = questionSlice.actions;
export default questionSlice.reducer;