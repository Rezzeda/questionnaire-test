import React from 'react';
import { finishTest, nextQuestion, prevQuestion } from '../../services/testSlice';
import { Question } from '../../services/types';
import { answersSelector, currentQuestionIndexSelector, questionSelector } from '../../services/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks';
import styles from './QuestionNavigation.module.scss'

const QuestionNavigation: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentQuestionIndex = useAppSelector(currentQuestionIndexSelector);
    const questions = useAppSelector(questionSelector);
    const answers = useAppSelector(answersSelector);

    // Проверка на наличие вопросов и корректность индекса
    if (!questions || questions.length === 0 || currentQuestionIndex >= questions.length) {
        return null; // Или рендерим сообщение об ошибке/пустом состоянии
    } 

    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = answers[currentQuestion.id];

    const isAnswered = (question: Question, answer: any): boolean => {
        switch (question.type) {
            case 'singleChoice':
                return typeof answer === 'string' && answer.trim() !== '';
            case 'multipleChoice':
                return Array.isArray(answer) && answer.length > 0;
            case 'shortAnswer':
                return typeof answer === 'string' && answer.trim() !== '';
            case 'longAnswer':
                return typeof answer === 'string' && answer.trim() !== '';
            default:
                return false;
        }
    };

    const canMoveToNextQuestion = isAnswered(currentQuestion, currentAnswer);

    const handleNextClick = () => {
        if (canMoveToNextQuestion) {
            if (currentQuestionIndex === questions.length - 1) {
                // Если это последний вопрос, завершаем тест
                dispatch(finishTest());
            } else {
                dispatch(nextQuestion());
            }
        } else {
            alert('Пожалуйста, ответьте на текущий вопрос перед переходом к следующему.');
        }
    };

    return (
        <div className={styles.questionNavigation}>
            <button
                className={styles.questionNavigation__button}
                onClick={() => dispatch(prevQuestion())}
                disabled={currentQuestionIndex === 0}
            >
                Назад
            </button>
            <button
                className={styles.questionNavigation__button}
                onClick={handleNextClick}
                disabled={!canMoveToNextQuestion}
            >
                {currentQuestionIndex === questions.length - 1 ? 'Завершить тест' : 'Вперед'}
            </button>
        </div>
    );
};

export default QuestionNavigation;