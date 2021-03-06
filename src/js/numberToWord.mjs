const ones = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

const tens = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

const multiplyWords = [
  "",
  "hundred",
  "thousand",
  "million",
  "billion",
  "trillion",
  "quadrillion",
  //bigint from here
  "quintillion",
];
const multiply = [1, 100]; // the other numbers are processed
const division = [100, 10]; // the other numbers are processed

const toHundred = (numberToHundred) => {
  if (numberToHundred < 20) {
    return ones[numberToHundred]; // 1-19
  }

  if (numberToHundred % 10 === 0) {
    return tens[Math.floor(numberToHundred / 10)]; //20 ,30,40,50...
  }

  return tens[Math.floor(numberToHundred / 10)] + "-" + ones[numberToHundred % 10];
};

const computedMultiply = (i) => {
  return multiply[i] || 10 ** ((i - 1) * 3);
};

const numberToText = (number, englishTrans = true) => {
  const isNegative = number < 0;
  let textArray = [];
  number = Math.abs(number);

  // ---errors, specials
  const errorArray = [
    [number === 0, ["zero", false]],
    [!number, ["Gimme' Numbers!", true]],
    [number >= Number.MAX_SAFE_INTEGER, ["This number is out of workspace", true]],
  ];

  for (let i = 0; i < errorArray.length; i++) {
    if (errorArray[i][0]) {
      return errorArray[i][1];
    }
  }

  // --- text engine
  let i = 0;

  while (number >= computedMultiply(i) || i === multiplyWords.length) {
    const thousandsToHundreds =
      englishTrans && number > 1000 && number < 2000 && i === 1; // English word 1000 -2000
    const computedDivision = thousandsToHundreds ? 100 : division[i] || 1000;
    const partNumber = Math.floor(number / computedMultiply(i)) % computedDivision;

    if (partNumber !== 0) {
      textArray.unshift(multiplyWords[i]);
    }

    if (partNumber < 100) {
      textArray.unshift(toHundred(partNumber));
    }
    if (partNumber > 100) {
      textArray.unshift(` and ${toHundred(partNumber % 100)}`);
    }
    if (partNumber > 99) {
      textArray.unshift(`
    ${toHundred(Math.floor(partNumber / 100))} hundred`);
    }

    if ((i === 0) & (partNumber !== 0) & (number !== 1)) {
      textArray.unshift("and");
    }

    i++;
    thousandsToHundreds && i++;
  }

  isNegative && textArray.unshift("negative");

  return [textArray.join(" ").trim(), false];
};

// if you want to run the test one time in line server,  comment the next line
export { numberToText };

if (typeof exports !== "undefined") {
  module.exports = numberToText;
}
