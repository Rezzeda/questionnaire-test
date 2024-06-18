import React, { useEffect, useState } from 'react';
import { setAnswer } from '../../services/testSlice';
import { RootState } from '../../services/store';
import styles from './MultipleChoiceQuestion.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks';

interface MultipleChoiceQuestionProps {
    question: {
        id: string;
        questionText: string;
        options: string[];
        correctAnswers: string[];
    };
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ question }) => {
    const dispatch = useAppDispatch();
    const savedAnswer = useAppSelector((state: RootState) => state.test.answers[question.id]) || [];
    const [selectedOptions, setSelectedOptions] = useState<string[]>(savedAnswer);

    const handleChange = (option: string) => {
        const updatedOptions = selectedOptions.includes(option)
            ? selectedOptions.filter((item) => item !== option)
            : [...selectedOptions, option];
        setSelectedOptions(updatedOptions);
    };

    useEffect(() => {
        dispatch(setAnswer({ questionId: question.id, answer: selectedOptions }));
    }, [selectedOptions, dispatch, question.id]);

    return (
        <div className={styles.MultipleChoiceQuestion}>
            <p className={styles.MultipleChoiceQuestion__questionText}>{question.questionText}</p>
            {question.options.map((option) => (
                <div className={styles.MultipleChoiceQuestion__option} key={option}>
                    <input
                        className={styles.MultipleChoiceQuestion__input}
                        type="checkbox"
                        id={`${question.id}-${option}`}
                        name={question.id}
                        value={option}
                        checked={selectedOptions.includes(option)}
                        onChange={() => handleChange(option)}
                    />
                    <label
                        className={styles.MultipleChoiceQuestion__label}
                        htmlFor={`${question.id}-${option}`}>{option}</label>
                </div>
            ))}
        </div>
    );
};

export default MultipleChoiceQuestion;