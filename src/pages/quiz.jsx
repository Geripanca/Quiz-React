import React, { useEffect, useState } from "react";
import axios from "axios";

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [incorrectAnswersCount, setIncorrectAnswersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timer, setTimer] = useState(40);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
        );
        const data = response.data.results;

        const formattedQuestions = data.map((questionData) => {
          const allAnswers = [
            ...questionData.incorrect_answers,
            questionData.correct_answer,
          ];
          const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

          // Menghilangkan karakter HTML
          const decodeHtml = (html) => {
            const parser = new DOMParser();
            const decodedString =
              parser.parseFromString(html, "text/html").body.textContent || "";
            return decodedString;
          };

          return {
            question: decodeHtml(questionData.question),
            answers: shuffledAnswers.map(decodeHtml), // Dekode setiap jawaban juga
            correct_answer: decodeHtml(questionData.correct_answer),
          };
        });

        setQuestions(formattedQuestions);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (currentQuestionIndex < questions.length) {
      setTimer(40);
      const id = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(id);
            handleTimeUp();
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      setIntervalId(id);
    }

    return () => clearInterval(intervalId);
  }, [currentQuestionIndex, questions.length]);

  const handleTimeUp = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleAnswerClick = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correct_answer) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    } else {
      setIncorrectAnswersCount(incorrectAnswersCount + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }

    setTimer(40);
  };

  if (isLoading) {
    return <p>Loading questions...</p>;
  }

  if (quizFinished) {
    return (
      <div className="bg-purple-500 min-h-screen p-5 flex items-center">
        <div className="bg-purple-100 mx-auto p-5 w-1/3 rounded-lg">
          <h1 className="text-5xl pb-3 text-center font-bold">Quiz Selesai!</h1>
          <p className="text-xl text-center">
            Jumlah Jawaban Benar: {correctAnswersCount}
          </p>
          <p className="text-xl text-center">
            Jumlah Jawaban Salah: {incorrectAnswersCount}
          </p>
          <p className="text-xl text-center">
            Jumlah Soal Terjawab: {correctAnswersCount + incorrectAnswersCount}
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-purple-500 min-h-screen p-5 flex items-center">
      <div className="bg-purple-100 mx-auto p-3 w-1/3 rounded-lg">
        <div className="p-1 flex justify-between">
          <p className="p-1 rounded-sm bg-purple-500 text-white">
            Soal {currentQuestionIndex + 1}/{questions.length}
          </p>
          <p className="text-center text-red-500">{timer} detik</p>
        </div>
        <h1 className="text-5xl pb-3 text-center font-bold">Quiz</h1>
        <div>
          <h3 className="text-xl font-semibold">{currentQuestion.question}</h3>
          <ul className="mt-4">
            {currentQuestion.answers.map((answer, idx) => (
              <li
                className="bg-purple-400 hover:bg-purple-700 p-3 rounded-lg my-2 cursor-pointer"
                key={idx}
                onClick={() => handleAnswerClick(answer)}
              >
                {answer}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;
