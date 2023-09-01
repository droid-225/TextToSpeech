let isReading = false;
let utterance = null;
let fullPageText = '';

// Fetch all text content of the webpage
document.addEventListener('DOMContentLoaded', () => {
  fullPageText = document.body.innerText;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startReading') {
    if (!isReading) {
      isReading = true;
      readText(fullPageText);
    } else {
      stopReading();
    }
  } else if (message.action === 'pausePlay') {
    pausePlay();
  }
});

function readText(text) {
  if (isReading) {
    utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);

    utterance.onend = () => {
      if (isReading) {
        stopReading();
      }
    };
  }
}

function stopReading() {
  if (utterance) {
    utterance.onend = null;
    speechSynthesis.cancel();
  }
  isReading = false;
}

function pausePlay() {
  if (isReading) {
    if (utterance.paused) {
      speechSynthesis.resume();
    } else {
      speechSynthesis.pause();
    }
  }
}
