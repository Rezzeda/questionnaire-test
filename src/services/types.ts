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
