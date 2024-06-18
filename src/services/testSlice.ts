import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SingleChoiceQuestion {
    id: string;
    type: 'singleChoice';
    questionText: string;
    options: string[];
    correctAnswer: string;
}

interface MultipleChoiceQuestion {
    id: string;
    type: 'multipleChoice';
    questionText: string;
    options: string[];
    correctAnswers: string[];
}

interface ShortAnswerQuestion {
    id: string;
    type: 'shortAnswer';
    questionText: string;
    correctAnswer: string;
}

interface LongAnswerQuestion {
    id: string;
    type: 'longAnswer';
    questionText: string;
    correctAnswer: string;
}

export type Question = SingleChoiceQuestion | MultipleChoiceQuestion | ShortAnswerQuestion | LongAnswerQuestion;

interface TestState {
    questions: Question[];
    currentQuestionIndex: number;
    answers: { [questionId: string]: any };
    timeRemaining: number;
    isTestFinished: boolean;
}

const loadState = (): TestState | undefined => {
    try {
        const serializedState = localStorage.getItem('testState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Не удалось загрузить состояние из localStorage:", err);
        return undefined;
    }
};

const saveState = (state: TestState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('testState', serializedState);
    } catch (err) {
        console.error("Не удалось сохранить состояние в localStorage:", err);
    }
};

const initialState: TestState = loadState() || {
    questions: [],
    currentQuestionIndex: 0,
    answers: {},
    timeRemaining: 60, // минута в секундах
    isTestFinished: false,
};

const sliceName = 'test';

export const testSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setQuestions(state, action: PayloadAction<Question[]>) {
            state.questions = action.payload;
            saveState(state);
        },
        setAnswer(state, action: PayloadAction<{ questionId: string; answer: any }>) {
            state.answers[action.payload.questionId] = action.payload.answer;
            saveState(state);
        },
        resetTest(state) {
            state.answers = {};
            state.currentQuestionIndex = 0;
            state.isTestFinished = false;
            state.timeRemaining = 60; // Сброс времени на 1 минуту
            saveState(state);
        },
        finishTest(state) {
            state.isTestFinished = true;
            saveState(state);
        },
        nextQuestion(state) {
            if (state.currentQuestionIndex < state.questions.length - 1) {
                state.currentQuestionIndex++;
                saveState(state);
            }
        },
        prevQuestion(state) {
            if (state.currentQuestionIndex > 0) {
                state.currentQuestionIndex--;
                saveState(state);
            }
        },
        setTimeRemaining(state, action: PayloadAction<number>) {
            state.timeRemaining = action.payload;
            saveState(state);
        },
        decrementTime(state) {
            if (state.timeRemaining > 0) {
                state.timeRemaining--;
                saveState(state);
            }
        },
    },
});

export const { setQuestions, setAnswer, resetTest, finishTest, nextQuestion, prevQuestion, setTimeRemaining, decrementTime } = testSlice.actions;
export default testSlice.reducer;
