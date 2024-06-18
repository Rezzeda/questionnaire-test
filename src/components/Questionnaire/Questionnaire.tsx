import React, { useEffect } from 'react';
import SingleChoiceQuestion from '../SingleChoiceQuestion/SingleChoiceQuestion';
import MultipleChoiceQuestion from '../MultipleChoiceQuestion/MultipleChoiceQuestion';
import ShortAnswerQuestion from '../ShortAnswerQuestion/ShortAnswerQuestion';
import LongAnswerQuestion from '../LongAnswerQuestion/LongAnswerQuestion';
import QuestionNavigation from '../QuestionNavigation/QuestionNavigation';
import ProgressIndicator from '../../components/ProgressIndicator/ProgressIndicator';
import { Question } from '../../services/types';
import Results from '../Results/Results';
import { decrementTime, finishTest, setAnswer, setTimeRemaining } from '../../services/testSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks';
import { currentQuestionIndexSelector, currentTimeSelector, isTestFinishedSelector, questionSelector } from '../../services/selectors';
import styles from './Questionnaire.module.scss'

const Questionnaire: React.FC = () => {
    const dispatch = useAppDispatch();
    const questions = useAppSelector(questionSelector);
    const currentTime = useAppSelector(currentTimeSelector);
    const isTestFinished = useAppSelector(isTestFinishedSelector);
    const currentQuestionIndex = useAppSelector(currentQuestionIndexSelector);

    useEffect(() => {
        if (currentTime <= 0) {
            dispatch(finishTest());
        }
    }, [currentTime, dispatch]);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(decrementTime());
        }, 1000);

        return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
    }, [dispatch]);

    const renderQuestion = (question: Question) => {
        switch (question.type) {
            case 'singleChoice':
                return <SingleChoiceQuestion question={question} />;
            case 'multipleChoice':
                return <MultipleChoiceQuestion question={question} />;
            case 'shortAnswer':
                return <ShortAnswerQuestion question={question} />;
            case 'longAnswer':
                return <LongAnswerQuestion question={question} />;
            default:
                return null;
        }
    };

    const handleRestartTest = () => {
        // Сброс таймера и состояния теста
        dispatch(setAnswer({ questionId: '', answer: '' })); // Очищаем ответы
        dispatch(setTimeRemaining(60)); // Снова устанавливаем время на 10 минут
    };

    if (isTestFinished) {
        return <Results />;
    }

    // Форматирование времени в минуты и секунды
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    const formattedTime = `${minutes} мин ${seconds < 10 ? '0' : ''}${seconds} сек`;

    return (
        <div className={styles.questionnaire}>
            <ProgressIndicator />
            <p>Оставшееся время выполнения теста: {formattedTime}</p>
            {questions.map((question, index) => (
                <div key={question.id} style={{ display: index === currentQuestionIndex ? 'block' : 'none' }}>
                    {renderQuestion(question)}
                </div>
            ))}
            <QuestionNavigation />
            <button className={styles.questionnaire__button} onClick={handleRestartTest}>Перезапустить тест</button>
        </div>
    );
};

export default Questionnaire;