import { RootState } from "./store";
import { testSlice } from "./testSlice";

export const questionSelector = (state: RootState) => state[testSlice.name].questions;
export const currentQuestionIndexSelector = (state: RootState) => state[testSlice.name].currentQuestionIndex;
export const answersSelector = (state: RootState) => state[testSlice.name].answers;
export const currentTimeSelector = (state: RootState) => state[testSlice.name].timeRemaining;
export const isTestFinishedSelector = (state: RootState) => state[testSlice.name].isTestFinished;
