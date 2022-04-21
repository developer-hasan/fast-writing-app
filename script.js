const DataController = (function () {
  const data = {
    texts: [
      {
        id: 2,
        text: "start with a easy one...",
        highScore: 45,
      },
      {
        id: 3,
        text: "hello world this is the worlds most fun typing game!",
        highScore: 74,
      },
      {
        id: 4,
        text: "this is a hard one Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quia necessitatibus exercitationem possimus voluptates obcaecati perferendis expedita? Minima, distinctio commodi exercitationem ab, provident facilis aspernatur veniam omnis maiores dolor laborum.",
        highScore: 80,
      },
    ],
    indexOfText: 0,
    currentText: "",
    completedTexts: [],
    isStarted: false,
    falsePresses: 0,
  };

  // de-structure data
  let {
    texts,
    indexOfText,
    currentText,
    isStarted,
    completedTexts,
    falsePresses,
  } = data;

  return {
    getTexts: function () {
      return texts;
    },
    getText: function (index) {
      return texts[index] || texts[texts.length - 1];
    },
    getCharIndex: function () {
      return indexOfText;
    },
    setCharIndex: function (index) {
      if (currentText.text.length >= index) {
        indexOfText = index;
      }
    },
    getLastCharIndex: function () {
      return currentText.text.length - 1;
    },
    getCurrentText: function () {
      return currentText;
    },
    setCurrentText: function (text) {
      currentText = text;
    },
    isGameStarted: function () {
      return isStarted;
    },
    startGame: function () {
      isStarted = true;
    },
    stopGame: function () {
      isStarted = false;
    },
    addCompletedText: function (text) {
      completedTexts = [...completedTexts, text];
    },
    isGameOver: function () {
      return texts.length === completedTexts.length;
    },
    isTextCompleted: function () {
      return indexOfText === this.getCurrentText().text.length && isStarted;
    },
    getCompletedTexts: function () {
      return completedTexts;
    },
    setCompletedTexts: function (texts) {
      completedTexts = texts;
    },
    countFalsePresses: function () {
      falsePresses++;
    },
    resetFalsePresses: function () {
      falsePresses = 0;
    },
    getFalsePresses: function () {
      return falsePresses;
    },
    isHighScore: function (score) {
      const isHigh = currentText.highScore < score ? true : false;
      return isHigh;
    },
    setHighScoreOfText: function (text, score) {
      texts = texts.map((item) => {
        if (text.id === item.id) {
          return {
            ...item,
            highScore: score,
          };
        }
        return item;
      });
    },
  };
})();
const UIController = (function () {
  const Selectors = {
    textContainer: ".text-container",
    startBtn: ".start",
    chars: ".text-container span",
    status: ".status",
    score: "#score",
    elapsedTime: "#elapsed-time",
    falsePresses: "#false-presses",
    highScore: "#high-score",
    scoreIndicator: ".right .score-bar .background",
    pressIndicator: ".left div.press-indicator",
    statusModal: ".left .status-modal",
    modalOverlay: ".left .modal-overlay",
    btnCloseModal: ".left button.btn-close-modal",
    falsePressedText: ".right .false-pressed-text",
  };

  return {
    getSelectors: function () {
      return Selectors;
    },
    setChars: function (text) {
      const container = document.querySelector(Selectors.textContainer);
      container.innerHTML = "";
      return text.split("").map((char) => {
        const span = document.createElement("span");
        span.innerText = char;
        container.appendChild(span);
        return span;
      });
    },
    getChars: function () {
      return document.querySelectorAll(Selectors.chars);
    },
    btnInvisible: function () {
      document.querySelector(Selectors.startBtn).classList.add("hidden");
    },
    btnVisible: function () {
      document.querySelector(Selectors.startBtn).classList.remove("hidden");
    },
    showStatusModal: function (score, time, highScore, falsePresses) {
      document.querySelector(Selectors.score).innerHTML = score;
      document.querySelector(Selectors.elapsedTime).innerText = time;
      document.querySelector(Selectors.falsePresses).innerText = falsePresses;
      document.querySelector(Selectors.highScore).innerText = highScore;
      document.querySelector(Selectors.modalOverlay).classList.add("visible");
      document.querySelector(Selectors.statusModal).classList.add("visible");
    },
    hideStatusModal: function () {
      document
        .querySelector(Selectors.modalOverlay)
        .classList.remove("visible");
      document.querySelector(Selectors.statusModal).classList.remove("visible");
    },
    updateCurrentText: function (text) {
      document.querySelector(Selectors.textContainer).innerText = text.text;
    },
    addPointer: function (index = 0) {
      this.getChars().item(index).classList.add("pointer");
    },
    removePointer: function (index = 0) {
      this.getChars().item(index).classList.remove("pointer");
    },
    setAsPassed: function (index = 0) {
      this.getChars().item(index).classList.add("opacity-black");
    },
    getScoreIndicator: function () {
      return document.querySelector(Selectors.scoreIndicator);
    },
    dangerBackground: function () {
      const pressIndicator = document.querySelector(Selectors.pressIndicator);
      pressIndicator.classList.add("danger");
      setTimeout(() => {
        pressIndicator.classList.remove("danger");
      }, 50);
    },
    successBackground: function () {
      const pressIndicator = document.querySelector(Selectors.pressIndicator);
      pressIndicator.classList.add("success");
      setTimeout(() => {
        pressIndicator.classList.remove("success");
      }, 50);
    },
    scoreBarColorHandler: function (score) {
      score = parseInt(score);
      const bar = document.querySelector(Selectors.scoreIndicator);
      if (score < 70) {
        bar.classList.add("lowScore");
        bar.classList.remove("highScore");
      } else {
        bar.classList.add("highScore");
        bar.classList.remove("lowScore");
      }
    },
    isModalVisible: function () {
      return document
        .querySelector(Selectors.statusModal)
        .classList.contains("visible");
    },
    falsePressedTextVisible: function () {
      const element = document.querySelector(Selectors.falsePressedText);
      element.classList.add("visible");
      setTimeout(() => {
        element.classList.remove("visible");
      }, 100);
    },
  };
})();
const AudioController = (function () {
  const AudioSrc = {
    // success: [
    //   "/audio/success0.wav",
    //   "/audio/success1.wav",
    //   "/audio/success2.wav",
    //   "/audio/success3.wav",
    //   "/audio/success4.wav",
    // ],
    success: "/audio/success4.wav",
    danger: "/audio/danger.mp3",
    finished: "/audio/finished2.wav",
    highScore: "/audio/highscore.wav",
  };

  return {
    successPress: function () {
      new Audio(AudioSrc.success).play();
    },
    dangerPress: function () {
      new Audio(AudioSrc.danger).play();
    },
    textFinished: function () {
      new Audio(AudioSrc.finished).play();
    },
    newHighScore: function () {
      new Audio(AudioSrc.highScore).play();
    },
  };
})();
const AppController = (function (data, ui, audio) {
  let timer = null;
  let millisecondsPerText = null;
  let score = 0;

  // FUNCTIONS
  const calculateElapsedTime = (milliseconds) => {
    const mins = milliseconds / 1000;
    const text = "s";
    return mins.toFixed(0) + text;
  };
  const resetText = () => {
    ui.setChars(data.getCurrentText().text);
    const chars = ui.getChars();
    data.setCharIndex(0);
    chars.item(data.getCharIndex()).classList.add("pointer");
  };

  const setup = () => {
    data.setCurrentText(data.getText(0));
    resetText();
  };

  const move = () => {
    const charIndex = data.getCharIndex();
    const chars = ui.getChars();
    data.setCharIndex(charIndex + 1);

    if (data.getCharIndex() <= data.getLastCharIndex()) {
      ui.addPointer(charIndex + 1);
      ui.removePointer(charIndex);
      ui.setAsPassed(charIndex);
    }
    ui.removePointer(charIndex);
    ui.setAsPassed(charIndex);
  };

  const calculateScore = (length, milliseconds) => {
    let score = parseInt((length / (milliseconds / 15)) * 700);
    length += 0.001;
    score = score > 100 ? 100 : score;
    return score;
  };

  const onTextCompleted = () => {
    clearInterval(timer);

    data.stopGame();

    ui.btnVisible();

    const currentTextIndex = data.getTexts().indexOf(data.getCurrentText());

    const elapsedTime = calculateElapsedTime(millisecondsPerText);

    millisecondsPerText = 0;

    let textScore = score;

    if (data.isHighScore(score)) {
      data.setHighScoreOfText(data.getCurrentText(), score);
      console.log(data.getTexts());
      textScore = `${score} <span class="green">(high scor)</span>`;
      audio.newHighScore();
    } else {
      audio.textFinished();
    }

    // add to completed text array
    data.addCompletedText({
      ...data.getCurrentText(),
      score,
      elapsedTime,
    });

    const falsePresses = data.getFalsePresses();
    const highScore = data.getCurrentText().highScore;
    ui.showStatusModal(textScore, elapsedTime, highScore, falsePresses);

    data.setCurrentText(data.getText(currentTextIndex + 1));

    resetText();
  };

  const startGame = (e) => {
    ui.setChars(data.getCurrentText().text);

    data.setCharIndex(0);

    // resetText();

    ui.hideStatusModal();

    data.startGame();

    ui.btnInvisible();

    data.resetFalsePresses();

    timer = setInterval(() => {
      score = calculateScore(data.getCharIndex(), millisecondsPerText);
      ui.getScoreIndicator().style.height = `${score}%`;
      ui.scoreBarColorHandler(score);
      millisecondsPerText += 100;
    }, 100);
  };

  // APP

  window.addEventListener("DOMContentLoaded", (e) => {
    setup();
  });

  window.addEventListener("keydown", (e) => {
    if (data.isGameStarted()) {
      const currentChar = data.getCurrentText().text[data.getCharIndex()];
      if (e.key === currentChar) {
        move();
        ui.successBackground();
        audio.successPress();
      } else if (!(e.key.length > 1)) {
        data.countFalsePresses();
        ui.dangerBackground();
        ui.falsePressedTextVisible();
        audio.dangerPress();
      }
    }
    if (data.isTextCompleted()) {
      onTextCompleted();
      console.log(data.getCompletedTexts());
    }

    if (data.isGameOver()) {
      const firstText = data.getText(0);
      data.setCurrentText(firstText);
      data.setCompletedTexts([]);
      console.log(data.getCompletedTexts());
      console.log(data.isGameOver());
    }
  });

  window.addEventListener("keyup", (e) => {
    const isEnterPressed = e.key === "Enter";
    if (isEnterPressed && !data.isGameStarted() && !ui.isModalVisible()) {
      startGame();
    }
    if (ui.isModalVisible() && isEnterPressed) {
      ui.hideStatusModal();
    }
  });

  // start btn click
  document
    .querySelector(ui.getSelectors().startBtn)
    .addEventListener("click", startGame);
  // modal close btn click
  document
    .querySelector(ui.getSelectors().btnCloseModal)
    .addEventListener("click", ui.hideStatusModal);
  // modal overlay click
  document
    .querySelector(ui.getSelectors().modalOverlay)
    .addEventListener("click", ui.hideStatusModal);
})(DataController, UIController, AudioController);
