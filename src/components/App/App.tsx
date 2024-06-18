import React, { useEffect } from 'react';
import Questionnaire from '../Questionnaire/Questionnaire';
import { setQuestions } from '../../services/testSlice';
import { Question } from '../../services/types';
import styles from './App.module.scss'
import { useAppDispatch } from '../../hooks/appHooks';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const mockQuestions: Question[] = [
      {
        id: '1',
        type: 'singleChoice',
        questionText: 'Вопрос с выбором одного варинта ответа',
        options: ['Правильный', 'Неправильный1', 'Неправильный2', 'Неправильный3'],
        correctAnswer: 'Правильный'
      },
      {
        id: '2',
        type: 'multipleChoice',
        questionText: 'Вопрос с выбором нескольких варинтов ответа',
        options: ['Правильный', 'Неправильный1', 'Правильный2', 'Неправильный2'],
        correctAnswers: ['Правильный', 'Правильный2']
      },
      {
        id: '3',
        type: 'shortAnswer',
        questionText: 'Этот вопрос предполагает короткий ответ',
        correctAnswer: 'короткий ответ'
      },
      {
        id: '4',
        type: 'longAnswer',
        questionText: 'Этот вопрос предполагает развернутый ответ',
        correctAnswer: 'развернутый ответ развернутый ответ развернутый ответ развернутый ответ развернутый ответ развернутый ответ'
      },
    ];
    dispatch(setQuestions(mockQuestions));
  }, [dispatch]);

  return (
    <main className={styles.testing}>
      <h1 className={styles.testing__title}>Тестирование знаний</h1>
      <Questionnaire />
    </main>
  );
};

export default App;