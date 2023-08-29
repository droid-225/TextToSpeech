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
    } else {
      stopReading();
    }
  } else if (message.action === 'toBeginning') {
    if (isReading) {
      toBeginning();
    }
  } else if (message.action === 'lastWord') {
    if (isReading) {
      lastWord();
    }
  } else if (message.action === 'pausePlay') {
    if (isReading) {
      pausePlay();
    }
  } else if (message.action === 'nextWord') {
    if (isReading) {
      nextWord();
    }
  } else if (message.action === 'nextChunk') {
    if (isReading) {
      nextChunk();
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


function toBeginning() {
  // Implement your logic to jump to the beginning of the text
}

function lastWord() {
  // Implement your logic to jump to the previous word
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

function nextWord() {
  // Implement your logic to jump to the next word
}
