import React, { useEffect, useState } from 'react';
import { setAnswer } from '../../services/testSlice';
import { RootState } from '../../services/store';
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks';

interface ShortAnswerQuestionProps {
    question: {
        id: string;
        questionText: string;
        correctAnswer: string;
    };
}

const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({ question }) => {
    const dispatch = useAppDispatch();
    const savedAnswer = useAppSelector((state: RootState) => state.test.answers[question.id]) || '';
    const [answer, setAnswerState] = useState(savedAnswer);

    useEffect(() => {
        dispatch(setAnswer({ questionId: question.id, answer }));
    }, [answer, dispatch, question.id]);

    return (
        <div>
            <p>{question.questionText}</p>
            <input
                type="text"
                value={answer}
                onChange={(e) => setAnswerState(e.target.value)}
            />
        </div>
    );
};

export default ShortAnswerQuestion;
