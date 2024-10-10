import React, { useEffect, useState } from "react";
import axios from "axios";

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // Menyimpan jumlah jawaban benar
  const [incorrectAnswersCount, setIncorrectAnswersCount] = useState(0); // Menyimpan jumlah jawaban salah
  const [isLoading, setIsLoading] = useState(true);
  const [quizFinished, setQuizFinished] = useState(false); // Untuk mengecek apakah quiz sudah selesai

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

          return {
            question: questionData.question,
            answers: shuffledAnswers,
            correct_answer: questionData.correct_answer,
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

  const handleAnswerClick = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];

    // Jika jawaban benar, tambahkan ke jumlah jawaban benar
    if (selectedAnswer === currentQuestion.correct_answer) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    } else {
      // Jika jawaban salah, tambahkan ke jumlah jawaban salah
      setIncorrectAnswersCount(incorrectAnswersCount + 1);
    }

    // Lanjutkan ke pertanyaan berikutnya atau akhiri quiz jika sudah soal terakhir
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true); // Menandai quiz sudah selesai
    }
  };

  if (isLoading) {
    return <p>Loading questions...</p>;
  }

  // Jika quiz sudah selesai, tampilkan hasil akhir
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
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-purple-500 min-h-screen p-5 flex items-center">
      <div className="bg-purple-100 mx-auto p-3 w-1/3 rounded-lg">
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
