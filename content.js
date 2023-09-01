let isReading = false;
let readingText = '';
let utterance = null;
let fullPageText = '';

// Fetch all text content of the webpage
document.addEventListener('DOMContentLoaded', () => {
  fullPageText = document.body.innerText;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startReading') {
    if (!isReading) {
      readingText = fullPageText;
      isReading = true;
      readText();
    } 
    else {
      stopReading();
    }
  } 
  else if (message.action === 'pausePlay') {
    if (isReading) {
      pausePlay();
    }
  } 
});

function readText() {
  if (isReading && readingText !== '') {
    utterance = new SpeechSynthesisUtterance(readingText);
    speechSynthesis.speak(utterance);

    utterance.onend = () => {
      if (isReading) {
        readNextChunk();
      }
    };
  }
}

function readNextChunk() {
  if (isReading && readingText !== '') {
    const remainingText = readingText.slice(utterance.charIndex);
    const nextSpaceIndex = remainingText.indexOf(' ');

    if (nextSpaceIndex === -1) {
      // End of text reached
      stopReading();
    } else {
      const chunk = remainingText.slice(0, nextSpaceIndex + 1);
      utterance = new SpeechSynthesisUtterance(chunk);
      speechSynthesis.speak(utterance);

      utterance.onend = () => {
        if (isReading) {
          readNextChunk();
        }
      };
    }
  }
}

function stopReading() {
  if (utterance) {
    utterance.onend = null;
    speechSynthesis.cancel();
  }
  isReading = false;
  readingText = '';
}

// Implement other functionalities like toBeginning, lastWord, and pausePlay
function pausePlay() {
  if (isReading && utterance) {
    if (speechSynthesis.speaking) {
      if (speechSynthesis.paused) {
        speechSynthesis.resume();
      } 
      else {
        speechSynthesis.pause();
      }
    }
  }
}

