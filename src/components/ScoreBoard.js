import easyLogo from "../images/logo.svg";
import hardLogo from "../images/logo-bonus.svg";

const ScoreBoard = ({ gameMode, score }) => {
  return (
    <div className="flex p-3 items-center justify-between mt-6 border-2 rounded-lg border-gray-300 w-5/6 sm:w-4/6 md:w-3/6">
      <img
        className={``}
        src={gameMode === "hard" ? hardLogo : easyLogo}
        alt="Rock Paper Scissors"
      />

      <div className="relative flex flex-col justify-center items-center w-32 lg:w-52 h-32 bg-blue-50 text-center text-gray-600 font-semibold rounded-lg">
        <span className="font-bold text-xs">SCORE</span>
        <span className="leading-none text-6xl">{score}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;
