import { getArray as newWords } from "./words.js";
import { startTimer, stopTimer, totalSeconds, resetTimer } from "./timer.js";

const wordsField = document.querySelector(".text-block");
const input = document.querySelector(".input");
const timer = document.querySelector(".stopwatch");
const wpmText = document.querySelector(".wpm");
const stopBtn = document.querySelector(".stop");
const generateBtn = document.querySelector(".generate");
const sizeField = document.querySelector('.no-of-words');
let timerStarted = false;
let words = [...newWords(50)];
let results = [];

function setWords(element, array) {
  element.innerHTML = '';
  array.forEach((word, index) => {
    let span = document.createElement("span");
    span.textContent = word;
    span.classList.add("word");
    span.setAttribute('data-correct','');
    if (index === 0) {
      span.classList.add("onscreen");
    }
    element.appendChild(span);
  });
}

setWords(wordsField, words);

function removeFirst() {
  if (wordsField.querySelector(".word")) {
    wordsField.removeChild(wordsField.querySelector(".onscreen"));
  }
  if (wordsField.firstChild) {
    wordsField.firstChild.classList.add("onscreen");
  } else {
    showResults(totalSeconds);
  }
}

function inputStarted() {
  generateBtn.setAttribute('disabled','true');
  if (!timerStarted) {
    startTimer(timer);
    timerStarted = true;
  }
  let wordElement = document.querySelector(".onscreen");
  let wordText = wordElement.textContent;
  let word = input.value;
  if (word.endsWith(" ")) {
    if (word.length === 1) {
      input.value = "";
    } else {
      if (word.trim() !== wordText) {
        results.push(0);
      } else if (word.trim() === wordText) {
        results.push(1);
      }
      words.shift();
      input.value = "";
      removeFirst();
    }
  } else {
    if (word === wordText || wordText.startsWith(word)) {
      wordElement.classList.add("correct");
      wordElement.dataset.correct = word;
      wordElement.classList.remove("wrong");
    } else {
      wordElement.classList.remove("correct");
      wordElement.classList.add("wrong");
    }
  }
}

function showResults(seconds) {
  input.setAttribute("disabled", "");
  stopTimer();
  let result = results.reduce(
    (total, current) => {
      if (current === 1) {
        total.correct += current;
      } else if (current === 0) {
        total.wrong++;
      }
      return total;
    },
    { correct: 0, wrong: 0 }
  );

  let mins = seconds / 60;
  let wpm = ~~((result.correct) / mins);
  wpmText.textContent = `${wpm} WPM`;
  generateBtn.removeAttribute('disabled');
}

function reset() {
  let length = sizeField.value;
  timerStarted = false;
  resetTimer();
  wpmText.textContent = '0WPM';
  timer.textContent = '0:00';
  input.value = '';
  input.removeAttribute('disabled');
  words = newWords(length);
  setWords(wordsField, words);
}

function clickedStop() {
  if (timerStarted) {
    let temp = totalSeconds - 1;
    showResults(temp);
  }
}

input.addEventListener("input", inputStarted);
stopBtn.addEventListener("click", clickedStop);
generateBtn.addEventListener('click',reset);