const numberToText = require("./numberToWord.mjs");

test("english numbers translate on", () => {
  expect(numberToText(1234)).toEqual(["twelve hundred and thirty-four", false]);
});

test("english numbers translate off", () => {
  expect(numberToText(1234, false)).toEqual([
    "one thousand two hundred and thirty-four",
    false,
  ]);
});

test("zero number", () => {
  expect(numberToText(0)).toEqual(["zero", false]);
});

test("negatvive one number", () => {
  expect(numberToText(-1)).toEqual(["negative one", false]);
});

test("one number", () => {
  expect(numberToText(1)).toEqual(["one", false]);
});

test("high valid number ", () => {
  expect(numberToText(1123456789454326)).toEqual([
    "one quadrillion one hundred and twenty-three trillion four hundred and fifty-six billion seven hundred and eighty-nine million four hundred and fifty-four thousand three hundred and twenty-six",
    false,
  ]);
});

test("give a text", () => {
  expect(numberToText("asda")).toEqual(["Gimme' Numbers!", true]);
});

test("empty input", () => {
  expect(numberToText()).toEqual(["Gimme' Numbers!", true]);
});

test("more than safe number", () => {
  expect(numberToText(9007199254740991)).toEqual([
    "This number is out of workspace",
    true,
  ]);
});

test("more than safe number negative", () => {
  expect(numberToText(-9007199254740991)).toEqual([
    "This number is out of workspace",
    true,
  ]);
});
