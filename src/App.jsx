import React, { useState } from 'react';
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';


function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const { width, height } = useWindowSize();

  const countryFlags = {
    "France": "fr",
    "Français": "fr",
    "Paris": "fr",
    "Lyon": "fr",
    "Marseille": "fr",
    "Toulouse": "fr",
    "Brésil": "br",
    "Espagnol": "es",
    "Anglais": "gb",
    "Portugais": "pt",
    "Italie": "it",
    "Mexique": "mx",
    "Allemagne": "de",
    "Chine": "cn",
    "Canada": "ca",
    "USA": "us",
    "Australie": "au",
    "Japon": "jp",
    "Yen": "jp",
    "Won": "kr",
    "Euro": "eu",
    "Dollar": "us",
    "Pakistan": "pk",
    "Inde": "in",
    "Bangladesh": "bd",
    "Népal": "np",
    "Madagascar": "mg",
    "Sydney": "au",
    "Melbourne": "au",
    "Canberra": "au",
    "Perth": "au",
    "Kenya": "ke",
    "Égypte": "eg",
    "Bénin": "bj",
    "Ethiopie": "et",
    "Toronto": "ca",
    "Ottawa": "ca",
    "Vancouver": "ca",
    "Montréal": "ca"
  };
  

  const questions = [
    {
      question: "Quelle est la capitale de la France ?",
      options: ["Paris", "Lyon", "Marseille", "Toulouse"],
      answer: "Paris"
    },
    {
      question: "Quelle est la langue du Brésil ?",
      options: ["Espagnol", "Anglais", "Portugais", "Français"],
      answer: "Portugais"
    },
    {
      question: "Quel pays est célèbre pour la pizza ?",
      options: ["Mexique", "Italie", "Allemagne", "Chine"],
      answer: "Italie"
    },
    {
      question: "Quelle est la capitale du Canada ?",
      options: ["Toronto", "Ottawa", "Vancouver", "Montréal"],
      answer: "Ottawa"
    },
    {
      question: "Quel pays a une feuille d’érable sur son drapeau ?",
      options: ["USA", "Brésil", "Canada", "Australie"],
      answer: "Canada"
    },
    {
      question: "Quelle est la monnaie du Japon ?",
      options: ["Yen", "Won", "Dollar", "Euro"],
      answer: "Yen"
    },
    {
      question: "Quel pays est connu pour le Taj Mahal ?",
      options: ["Pakistan", "Inde", "Bangladesh", "Népal"],
      answer: "Inde"
    },
    {
      question: "Quel pays est une île ?",
      options: ["France", "Allemagne", "Italie", "Madagascar"],
      answer: "Madagascar"
    },
    {
      question: "Quelle est la capitale de l’Australie ?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      answer: "Canberra"
    },
    {
      question: "Quel pays est situé en Afrique de l'Ouest ?",
      options: ["Kenya", "Égypte", "Bénin", "Ethiopie"],
      answer: "Bénin"
    }
  ];

  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(Array(questions.length).fill(null));
  const [answeredQuestions, setAnsweredQuestions] = useState(Array(questions.length).fill(false));

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const handleAnswerSelection = (option) => {
    const currentIndex = currentPage - 1;

    if (answeredQuestions[currentIndex]) return;

    const updatedSelected = [...selectedAnswer];
    updatedSelected[currentIndex] = option;
    setSelectedAnswer(updatedSelected);

    if (option === questions[currentIndex].answer) {
      setScore(prev => prev + 1);
    }

    const updatedAnswered = [...answeredQuestions];
    updatedAnswered[currentIndex] = true;
    setAnsweredQuestions(updatedAnswered);
  };

  const handleRestart = () => {
    setCurrentPage(1);
    setScore(0);
    setSelectedAnswer(Array(questions.length).fill(null));
    setAnsweredQuestions(Array(questions.length).fill(false));
  };
  
  return (
    <>
      <div className="container py-5 text-center">
        <div className="d-flex justify-content-between align-items-center mb-4 px-3">
          <h1 className="text-white fs-5 fs-md-4 fs-lg-3 m-0">Country Quiz</h1>
          <button className="btn btn-secondary points ">{score}/10 Points</button>
          {score === 10 && (
  <>
    <Confetti width={width} height={height} />
    <div className="congrats-popup">
      <div className="congrats-content text-white">
        🎉 Félicitations ! Tu as obtenu 10/10 ! 🏆
      </div>
    </div>
  </>
)}

        </div>
      </div>

      <div className="custom-container mx-auto p-4">
        <div className="circles-container d-flex justify-content-center mb-4">
          {[...Array(10)].map((_, index) => (
            <button 
              key={index}
              onClick={() => handleClick(index + 1)}
              className={`circle ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <h4>{questions[currentPage - 1].question}</h4>
        <div className="options-grid mt-4">
          {questions[currentPage - 1].options.map((option, index) => {
            let className = "btn option-btn";
            const selected = selectedAnswer[currentPage - 1];
            const correctAnswer = questions[currentPage - 1].answer;

            if (selected) {
              if (option === correctAnswer) {
                className += " correct";
              } else if (option === selected) {
                className += " incorrect";
              }
            }

            return (
              <button 
                key={index} 
                className={className}
                onClick={() => handleAnswerSelection(option)}
                disabled={!!selected}
              >
                <img
  src={`https://flagcdn.com/w40/${countryFlags[option]?.toLowerCase()}.png`}
  alt={option}
  className="me-2"
  style={{ width: '25px', height: '18px', objectFit: 'cover', }}
/>
{option}


              </button>
            );
          })}
           
        </div>

        <div className="text-center mt-5">
  <button className="btn option" onClick={handleRestart}>
    🔁 Recommencer le quiz
  </button>
</div>

        
      </div>
      
    </>
  );
}

export default App;
