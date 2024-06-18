import React from 'react';
import { resetTest } from '../../services/testSlice';
import { Question } from '../../services/types';
import styles from './Results.module.scss'
import { answersSelector, questionSelector } from '../../services/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks';

const Results: React.FC = () => {
    const questions = useAppSelector(questionSelector);
    const answers = useAppSelector(answersSelector);
    const dispatch = useAppDispatch();

    const checkAnswer = (question: Question, userAnswer: any): boolean => {
        switch (question.type) {
            case 'singleChoice':
                return question.correctAnswer === userAnswer;
            case 'multipleChoice':
                return Array.isArray(userAnswer) &&
                    question.correctAnswers.length === userAnswer.length &&
                    userAnswer.every((ans: string) => question.correctAnswers.includes(ans));
            case 'shortAnswer':
                return question.correctAnswer.toLowerCase() === userAnswer?.toLowerCase();
            case 'longAnswer':
                return userAnswer.trim() !== '';
            default:
                return false;
        }
    };

    const handleRestart = () => {
        dispatch(resetTest());
        window.location.reload(); // Перезагружает страницу для сброса состояния
    };

    return (
        <div className={styles.results}>
            <h2 className={styles.results__title}>Результаты</h2>
            {questions.map((question) => {
                const userAnswer = answers[question.id];
                const isCorrect = checkAnswer(question, userAnswer);

                let correctAnswerDisplay;
                switch (question.type) {
                    case 'singleChoice':
                        correctAnswerDisplay = question.correctAnswer;
                        break;
                    case 'multipleChoice':
                        correctAnswerDisplay = question.correctAnswers.join(', ');
                        break;
                    case 'shortAnswer':
                        correctAnswerDisplay = question.correctAnswer;
                        break;
                    case 'longAnswer':
                        correctAnswerDisplay = question.correctAnswer;
                        break;
                    default:
                        correctAnswerDisplay = 'Н/Д';
                }

                return (
                    <div key={question.id} className={styles.results__text}>
                        <p style={{ color: isCorrect ? 'green' : 'red' }}>{isCorrect ? 'Правильно' : 'Неправильно'}</p>
                        <p>Вопрос: {question.questionText}</p>
                        <p>Ваш ответ: {Array.isArray(userAnswer) ? userAnswer.join(', ') : userAnswer}</p>
                        <p>Правильный ответ: {correctAnswerDisplay}</p>
                    </div>
                );
            })}
            <button className={styles.results__button} onClick={handleRestart}>Перезапустить тест</button>
        </div>
    );
};

export default Results;

