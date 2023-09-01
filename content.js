let isReading = false;
let utterance = null;
let fullPageText = '';
let first = true;

// Fetch all text content of the webpage
fullPageText = document.body.innerText;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'play' && first) {
    if (!isReading) {
      isReading = true;
      readText(fullPageText);
    } 
    else {
      stopReading();
    }
    first = false;
  }
  else if (message.action === 'play' && !first) {
    playSpeech();
  }
  else if (message.action === 'pause') {
    pauseSpeech();
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

function pauseSpeech() {
  if (isReading && !utterance.paused) {
    speechSynthesis.pause();
    isReading = false;
  }
}

function playSpeech() {
  if (isReading && utterance.paused) {
    speechSynthesis.resume();
    isReading = true;
  }
}
