import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [incorrectAnswersCount, setIncorrectAnswersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
        );
        const data = response.data.results;

        // Fungsi untuk mendekode karakter HTML
        const decodeHtml = (html) => {
          const txt = document.createElement("textarea");
          txt.innerHTML = html;
          return txt.value;
        };

        const formattedQuestions = data.map((questionData) => {
          const allAnswers = [
            ...questionData.incorrect_answers,
            questionData.correct_answer,
          ].map(decodeHtml); // Dekode jawaban

          return {
            question: decodeHtml(questionData.question), // Dekode pertanyaan
            answers: allAnswers.sort(() => Math.random() - 0.5),
            correct_answer: decodeHtml(questionData.correct_answer), // Dekode jawaban benar
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

  // Mengatur timer
  useEffect(() => {
    let interval = null;

    if (!quizFinished && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setQuizFinished(true);
    }

    return () => clearInterval(interval); // Hentikan interval saat komponen unmounted atau timer berhenti
  }, [timer, quizFinished]);

  // Menangani jawaban yang dipilih
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
  };

  // Menangani pengulangan kuis
  const handleRetry = () => {
    setCorrectAnswersCount(0);
    setIncorrectAnswersCount(0);
    setCurrentQuestionIndex(0);
    setQuizFinished(false);
    setTimer(60); // Reset timer ke 5 menit
  };

  if (isLoading) {
    return <p>Loading questions...</p>;
  }

  if (quizFinished) {
    return (
      <div className="bg-purple-500 min-h-screen p-5 flex items-center">
        <div className="bg-purple-100 mx-auto p-5 w-full sm:w-1/3 rounded-lg">
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
          <div className="flex space-x-3 justify-center pt-2 font-bold">
            <Link
              to="/quizapp"
              className="bg-purple-500 hover:bg-purple-700 p-1 rounded-sm"
              onClick={handleRetry} // Menangani pengulangan kuis di sini
            >
              Retry
            </Link>
            <Link
              to="/dashboard"
              className="bg-purple-500 hover:bg-purple-700 p-1 rounded-sm"
            >
              Quit
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  // Menghitung menit dan detik dari timer
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="bg-purple-500 min-h-screen p-5 flex items-center">
      <div className="bg-purple-100 mx-auto p-3 sm:w-1/3 w-full rounded-lg">
        <div className="p-1 flex justify-between">
          <p className="p-1 rounded-sm bg-purple-500">
            {currentQuestionIndex + 1}/{questions.length}
          </p>
          <p className="text-center text-red-500">
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}{" "}
            {/* Menampilkan format MM:SS */}
          </p>
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
