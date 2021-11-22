import rock from "../images/icon-rock.svg";
import paper from "../images/icon-paper.svg";
import scissors from "../images/icon-scissors.svg";
import lizard from "../images/icon-lizard.svg";
import spock from "../images/icon-spock.svg";

const options = { rock, paper, scissors, lizard, spock };

/* make the token have an :afte that is an absolute ciecle with border bottom for shade, do same for inner circle */

const Token = ({ choice, gameMode, clickEvent }) => {
  const themes = {
    rock: "bg-red-500 border-b-4 border-red-700",
    paper: "bg-blue-300 border-b-4 border-blue-500",
    scissors: "bg-yellow-300 border-b-4 border-yellow-500",
    lizard: "bg-purple-300 border-b-4 border-purple-500",
    spock: "bg-green-300 border-b-4 border-green-500",
  };
  const position = {
    rock:
      gameMode === "hard"
        ? "top-28 left-56"
        : gameMode === "easy"
        ? "top-10 left-28"
        : "",
    paper:
      gameMode === "hard"
        ? "top-16 left-72"
        : gameMode === "easy"
        ? "absolute -top-16 -left-14"
        : "",
    scissors:
      gameMode === "hard"
        ? "-top-16 -left-11"
        : gameMode === "easy"
        ? "absolute -top-16 left-32"
        : "",
    lizard:
      gameMode === "hard"
        ? "top-28 right-40"
        : gameMode === "easy"
        ? "bg-purple-300 border-b-4 border-purple-500"
        : "",
    spock:
      gameMode === "hard"
        ? "bottom-64 right-14"
        : gameMode === "easy"
        ? "bg-green-300 border-b-4 border-green-500"
        : "",
  };
  //   console.log(choice);
  const colorTheme = themes[choice];
  const coords = position[choice];
  return choice ? (
    <button
      className={`flex justify-center h-40 w-40 items-center relative rounded-full border-b-4 border-gray-700 ${colorTheme} ${coords} focus:ring-8`}
      onClick={() => clickEvent(choice)}
    >
      <div
        className=" flex justify-center  h-32 w-32 items-center rounded-full bg-white border-t-8 border-gray-200"
        // style={{ width: "42vw" }}
      >
        <img
          className="w-14"
          alt="Selection token for game."
          src={options[choice]}
        />
      </div>
    </button>
  ) : null;
};
export default Token;
