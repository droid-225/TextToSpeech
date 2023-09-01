let isReading = false;
let utterance = null;
let fullPageText = '';

// Fetch all text content of the webpage
fullPageText = document.body.innerText;

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
        readNextChunk();
      }
    };
  }
}

function readNextChunk() {
  if (isReading) {
    const remainingText = utterance.text.slice(utterance.charIndex);
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
