const questionEl = document.getElementById("question"); // Fixed typo here
const questionFromEl = document.getElementById("questionfrom");
const scoreEl = document.getElementById("score");

let storeAnswer;
let score = localStorage.getItem("score");

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateQuestion = () => { // Fixed typo here
    const randomNumber1 = randomNumber(1, 10);
    const randomNumber2 = randomNumber(1, 10);
    const questionType = randomNumber(1,4);

    let firstNumber;
    let SecondNumber;

    if (randomNumber1 > randomNumber2 && questionType > 2) {
        firstNumber = randomNumber1;
        SecondNumber = randomNumber2;
    } else{
        firstNumber = randomNumber2;
        SecondNumber = randomNumber1;
    }


    let question;
    let answer;

    switch (questionType) {
        case 1:
            question = `Q. What is ${firstNumber} multiply by ${SecondNumber}?`;
            answer = firstNumber * SecondNumber;
            break;
        case 2:
            question = `Q. What is ${firstNumber} Add by ${SecondNumber}?`;
            answer = firstNumber + SecondNumber;
             break;
        case 3:
                question = `Q. What is ${firstNumber} Subtract by ${SecondNumber}?`;
                answer = firstNumber - SecondNumber;
                 break;
        case 4:
                question = `Q. What is ${firstNumber} Divided by ${SecondNumber}?`;
                answer = firstNumber / SecondNumber;
                break;
        default:
            question = `Q. What is ${firstNumber} Divided by ${SecondNumber}?`;
                answer = firstNumber / SecondNumber;
            break;
    }

    return {question, answer}; // Fixed typo here
};

const showQuestion = () => { // Fixed typo here
    const { question, answer } = generateQuestion();
    scoreEl.innerText = score;
    questionEl.innerText = question;
    storeAnswer = answer;
};
showQuestion();

const checkAnswer = (event) => {
    event.preventDefault();

    const formData = new FormData(questionFromEl);
    const userAnswer = parseInt(formData.get("answer"));

    if (userAnswer === storeAnswer) {
        score += 1;
        Toastify({
            text: `You are wrong and your score is ${score}`,
            className: "info",
            gravity: "bottom",
            position: "center",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
          }).showToast();
    } else {
        score -= 1;
        Toastify({
            text: `You are wrong and your score is ${score}`,
            className: "info",
            gravity: "bottom",
            position: "center",
            style: {
              background: "linear-gradient(to right, #e33217, #ff001e)",
            }
          }).showToast();
    }

    scoreEl.innerText = score;
    localStorage.setItem("score", score);
    event.target.reset();
    showQuestion(); // Show next question after answer check
    // document.getElementById("ansinput").value = '';
};
