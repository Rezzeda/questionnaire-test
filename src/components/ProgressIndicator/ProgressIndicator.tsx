import React from 'react';
import { useAppSelector } from '../../hooks/appHooks';
import { currentQuestionIndexSelector, questionSelector } from '../../services/selectors';
import styles from './ProgressIndicator.module.scss';

const ProgressIndicator: React.FC = () => {
    const questions = useAppSelector(questionSelector);
    const currentQuestionIndex = useAppSelector(currentQuestionIndexSelector);


    return (
        <ul className={styles.ProgressIndicator}>
            {questions.map((_, index) => {
                const backgroundColor = index < currentQuestionIndex
                    ? 'black'
                    : index === currentQuestionIndex
                        ? 'green'
                        : 'gray';

                return (
                    <li key={index} className={styles.ProgressIndicator__indicator} style={{ 
                        backgroundColor 
                    }}></li>
                );
            })}
        </ul>
    );
};

export default ProgressIndicator;
