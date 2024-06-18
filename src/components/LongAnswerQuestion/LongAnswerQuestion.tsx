import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAnswer } from '../../services/testSlice';
import { RootState } from '../../services/store';

interface LongAnswerQuestionProps {
    question: {
        id: string;
        questionText: string;
        correctAnswer: string;
    };
}

const LongAnswerQuestion: React.FC<LongAnswerQuestionProps> = ({ question }) => {
    const dispatch = useDispatch();
    const savedAnswer = useSelector((state: RootState) => state.test.answers[question.id]) || '';
    const [answer, setAnswerState] = useState(savedAnswer);

    useEffect(() => {
        dispatch(setAnswer({ questionId: question.id, answer }));
    }, [answer, dispatch, question.id]);

    return (
        <div>
            <p>{question.questionText}</p>
            <textarea
                value={answer}
                onChange={(e) => setAnswerState(e.target.value)}
            />
        </div>
    );
};

export default LongAnswerQuestion;