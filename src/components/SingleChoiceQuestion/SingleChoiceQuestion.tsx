import React, { useEffect, useState } from 'react';
import { setAnswer } from '../../services/testSlice';
import { RootState } from '../../services/store';
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks';
import styles from './SingleChoiceQuestion.module.scss'

interface SingleChoiceQuestionProps {
    question: {
        id: string;
        questionText: string;
        options: string[];
        correctAnswer: string;
    };
}

const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({ question }) => {
    const dispatch = useAppDispatch();
    const savedAnswer = useAppSelector((state: RootState) => state.test.answers[question.id]) || '';
    const [selectedOption, setSelectedOption] = useState(savedAnswer);

    useEffect(() => {
        dispatch(setAnswer({ questionId: question.id, answer: selectedOption }));
    }, [selectedOption, dispatch, question.id]);

    return (
        <div className={styles.SingleChoiceQuestion}>
            <p className={styles.SingleChoiceQuestion__questionText}>{question.questionText}</p>
            {question.options.map((option) => (
                <div className={styles.SingleChoiceQuestion__option} key={option}>
                    <input
                        className={styles.SingleChoiceQuestion__input}
                        type="radio"
                        id={`${question.id}-${option}`}
                        name={question.id}
                        value={option}
                        checked={selectedOption === option}
                        onChange={() => setSelectedOption(option)}
                    />
                    <label
                        className={styles.SingleChoiceQuestion__label}
                        htmlFor={`${question.id}-${option}`}>{option}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default SingleChoiceQuestion;