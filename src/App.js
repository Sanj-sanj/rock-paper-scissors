import { useState } from "react";
import ReactDOM from "react-dom";
import "tailwindcss/tailwind.css";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";
import RulesModal from "./components/RulesModal";
/* 
<App>
  <ScoreBoard>
  <choises />
  <score>
  </ ScoreBoard>
  <gameBoard>
    <choseStyle>
    <game sequence>
  </ gameBoard>
</ App>
*/

const App = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [score, setScore] = useState(0);

  function updateScore(pointsEarned) {
    setScore(score + pointsEarned);
  }

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-blue-600">
      <div className="flex flex-col w-full items-center justify-center">
        <ScoreBoard gameMode={difficulty} score={score} />
        <button
          className="mt-4 border bg-purple-200 rounded-md border-purple-400 px-4 py-2"
          onClick={() => {
            difficulty === "easy"
              ? setDifficulty("hard")
              : setDifficulty("easy");
          }}
        >
          Change difficulty{" "}
        </button>
      </div>
      <GameBoard
        gameMode={difficulty}
        updateScore={(points) => updateScore(points)}
      />
      <button
        className="border border-gray-100 px-14 py-1.5 rounded-xl text-white font-semibold"
        onClick={() => setShowModal(!showModal)}
      >
        RULES
      </button>
      {showModal ? (
        <RulesModal gameMode={difficulty} clickEvent={setShowModal} />
      ) : null}
      <div className="attribution bg-gray-50 w-full">
        Challenge by Frontend Mentor Coded by{" "}
        <button href="#">Your Name Here</button>.
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
