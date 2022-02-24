//import { numberToText } from "./numberToWords";

import { numberToText } from "./numberToWord.mjs";

const loadFunct = () => {
  const numberInput = document.querySelector("#numberInput");
  const answerDiv = document.querySelector(".answer");
  const typeChck = document.querySelector("#typeCheck");
  const answerTypes = ["textAnswer", "warningAnswer"];
  const convertButton = document.querySelector("button");

  const inputChanged = (e) => {
    // delete the last display
    answerTypes.forEach((answerType) => {
      const insertedContent = document.querySelector(`.${answerType}`);
      if (insertedContent) {
        insertedContent.parentNode.removeChild(insertedContent);
      }
    });

    const textFromNumber = numberToText(
      parseInt(numberInput.value),
      typeChck.checked
    );
    console.log(textFromNumber);

    answerDiv.insertAdjacentHTML(
      "beforeend",
      `<div class="${textFromNumber[1] ? answerTypes[1] : answerTypes[0]}">${
        textFromNumber[0]
      }</div>`
    );
  };

  convertButton.addEventListener("click", inputChanged);
  numberInput.addEventListener("change", inputChanged);
};

window.addEventListener("load", loadFunct);
