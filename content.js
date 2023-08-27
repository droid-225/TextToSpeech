// content.js

// Read Selected Text
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'readSelectedText') {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      readText(selectedText);
    }
  }
});

function readText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

// Read Until Spacebar is Pressed
let isReading = false;
let readingText = '';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startReading') {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      if (!isReading) {
        readingText = selectedText + ' ' + window.getSelection().anchorNode.textContent.slice(window.getSelection().anchorOffset);
        isReading = true;
        readText();
      }
    }
  }
});

function readText() {
  if (isReading && readingText) {
    const utterance = new SpeechSynthesisUtterance(readingText);
    speechSynthesis.speak(utterance);

    utterance.onend = () => {
      if (isReading) {
        window.addEventListener('keydown', stopReadingOnSpace);
      }
    };
  }
}

function stopReadingOnSpace(event) {
  if (event.keyCode === 32) { // Space bar key code
    isReading = false;
    readingText = '';
    window.removeEventListener('keydown', stopReadingOnSpace);
    speechSynthesis.cancel();
  }
}

