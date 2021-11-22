import { useEffect, useState } from "react";
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

const GameBoard = ({ gameMode, updateScore }) => {
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
    if (uI === cI) return "TIED";
    if (weights[uI].includes(cI)) {
      updateScore(1);
      return "YOU WIN";
    }
    if (weights[cI].includes(uI)) {
      updateScore(-1);
      return "YOU LOSE";
    }
  }

  useEffect(() => {
    if (gameMode === "easy") setGameTokens(selections.slice(0, -2));
    if (gameMode === "hard") setGameTokens(selections);
  }, [gameMode]);

  return (
    <div className="relative flex h-96 w-96 flex-wrap transform scale-75 sm:scale-100">
      {!userInput ? (
        <>
          <img
            className="absolute flex justify-center w-full place-content-center"
            src={gameMode === "hard" ? pentagon : triangle}
            alt={gameMode === "hard" ? "pentagon" : "triangle"}
          />
          {gameTokens.map((name) => (
            <Token
              key={name}
              choice={fetchItem()}
              gameMode={gameMode}
              clickEvent={getNewInput}
            />
          ))}
        </>
      ) : (
        <>
          <div className="flex w-full justify-between text-center">
            <span className="">
              <Token choice={userInput} gameMode={"new"} />
              YOU PICKED
            </span>
            <span className=" ">
              <Token choice={houseInput} gameMode={"new"} />
              THE HOUSE PICKED
            </span>
          </div>
          <div className="w-full text-center flex flex-col justify-center font-bold text-gray-50 text-4xl">
            {result}
            <button
              className="border mt-4 border-gray-100 bg-gray-50 rounded-xl p-4 text-base font-semibold text-blue-600"
              onClick={() => setUserInput("")}
            >
              PLAY AGAIN
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default GameBoard;
