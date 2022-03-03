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

test("minus 100", () => {
  expect(numberToText(-100)).toEqual(["negative one hundred", false]);
});

test("1001", () => {
  expect(numberToText(1001, false)).toEqual(["one thousand and one", false]);
});

test("1000000", () => {
  expect(numberToText(1_000_000)).toEqual(["one million", false]);
});

test("1000000000000000", () => {
  expect(numberToText(1000000000000000)).toEqual(["one quadrillion", false]);
});
