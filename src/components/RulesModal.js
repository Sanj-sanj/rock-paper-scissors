import easyRules from "../images/image-rules.svg";
import hardRules from "../images/image-rules-bonus.svg";
import closeModal from "../images/icon-close.svg";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal-root");

const RulesModal = ({ gameMode, clickEvent }) => {
  const elRef = useRef(null);
  if (!elRef.current) elRef.current = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(
    <div className="absolute bg-black bg-opacity-70 top-0 flex w-full h-full justify-center items-center">
      <div className="bg-white px-7 pb-10 pt-6 rounded-xl">
        <span className="flex justify-between mb-4  pb-5">
          <h3 className="text-2xl py-2 font-bold text-gray-500">RULES</h3>
          <button className="py-2" onClick={() => clickEvent(false)}>
            <img src={closeModal} alt="Close this window" />
          </button>
        </span>
        <img
          src={gameMode === "hard" ? hardRules : easyRules}
          alt="The rules of the game"
        />
      </div>
    </div>,
    elRef.current
  );
};
export default RulesModal;
