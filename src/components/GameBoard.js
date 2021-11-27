import { useEffect, useState, useRef } from "react";
import Token from "./Token";
import pentagon from "../images/bg-pentagon.svg";
import triangle from "../images/bg-triangle.svg";

const selections = ["paper", "scissors", "rock", "lizard", "spock"];

function itemItter(arr) {
  let index = 0;
  return function () {
    let item = arr[index];
    index++;
    return item;
  };
}

const GameBoard = ({ gameMode, updateScore, setDifficulty }) => {
  const animationRef = useRef(null);
  const [gameTokens, setGameTokens] = useState(selections);
  const [userInput, setUserInput] = useState("");
  const [houseInput, setHouseInput] = useState("");
  const [result, setResult] = useState("");
  const fetchItem = itemItter(gameTokens);
  const getRandomItem = (arr) => {
    return arr[Math.floor(Math.random(arr.length) * arr.length)];
  };

  useEffect(() => {
    if (!userInput) return;
    setResult(calculateResults(userInput, houseInput));
  }, [userInput]);

  function updateInputs(setUser, setHouse) {
    return function updater(userChoice) {
      setHouse();
      setUser(userChoice);
    };
  }
  const getNewInput = updateInputs(setUserInput, () =>
    setHouseInput(getRandomItem(gameTokens))
  );

  function calculateResults(uI, cI) {
    const weights = {
      paper: ["rock", "spock"],
      scissors: ["paper", "lizard"],
      rock: ["scissors", "lizard"],
      lizard: ["spock", "paper"],
      spock: ["scissors", "rock"],
    };
    if (uI === cI) return "YOU TIED";
    if (weights[uI].includes(cI)) {
      updateScore(1);
      return "YOU WIN";
    }
    if (weights[cI].includes(uI)) {
      updateScore(-1);
      return "YOU LOSE";
    }
  }

  function clearGameState() {
    setUserInput("");
    setHouseInput("");
    setResult("YOU");
  }

  useEffect(() => {
    if (gameMode === "easy") setGameTokens(selections.slice(0, -2));
    if (gameMode === "hard") setGameTokens(selections);
  }, [gameMode]);

  return (
    <>
      {!userInput ? (
        <div className="relative flex h-96 w-96 flex-wrap items-center transform scale-70 sm:scale-75 md:scale-90 2xl:scale-100">
          <img
            className="absolute flex justify-center w-full place-content-center"
            src={gameMode === "hard" ? pentagon : triangle}
            alt={gameMode === "hard" ? "pentagon" : "triangle"}
          />
          <button
            className={`fixed left-0 right-0 m-auto ${
              gameMode === "hard" ? "" : "top-1/4"
            } mt-4 border  rounded-md border-gray-100 font-semibold text-white px-7 py-1.5`}
            onClick={setDifficulty}
          >
            {gameMode === "easy" ? "HARD MODE" : "EASY MODE"}
          </button>
          {gameTokens.map((name) => (
            <Token
              key={name}
              choice={fetchItem()}
              gameMode={gameMode}
              clickEvent={getNewInput}
            />
          ))}
        </div>
      ) : (
        <>
          <div className="flex text-white w-full md:w-2/3 sm:px-11 justify-evenly items-center text-center transform scale-70 sm:scale-100 md:scale-110 lg:scale-125 transition-all">
            <span
              className="relative animate-fade-in sm:w-1/2 flex flex-col items-center whitespace-nowrap"
              onAnimationEnd={(e) => {
                console.log(e.target);
                setTimeout(() => {
                  e.target.nextElementSibling.classList.remove("invisible");
                  e.target.nextElementSibling.classList.add("animate-fade-in");
                }, 750);
                animationRef.current.classList.remove("invisible");
                animationRef.current.classList.add("animate-fade-in");
              }}
            >
              <span className="mb-4 absolute -top-14">YOU PICKED</span>
              <Token
                choice={userInput}
                gameMode={"new"}
                isWinner={(() => result.includes("WIN"))()}
              />
            </span>
            <div className="flex flex-col flex-grow invisible mx-3 md:mx-0 min-w-max sm:w-1/4 max-w-min p-3 font-bold text-gray-50 text-4xl self-end sm:self-auto">
              {result}
              <button
                className="border mt-4 border-gray-100 bg-gray-50 rounded-xl p-4 text-base font-semibold text-blue-600"
                onClick={clearGameState}
              >
                PLAY AGAIN
              </button>
            </div>
            <span
              className="relative sm:w-1/2 flex flex-col items-center whitespace-nowrap invisible"
              ref={animationRef}
            >
              <span className="mb-4 absolute -top-14">THE HOUSE PICKED</span>
              <Token
                choice={houseInput}
                gameMode={"new"}
                isWinner={(() => result.includes("LOSE"))()}
              />
            </span>
          </div>
        </>
      )}
    </>
  );
};
export default GameBoard;
