let isReading = false;
let utterance = null;
let fullPageText = '';

// Fetch all text content of the webpage
fullPageText = document.body.innerText;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'Play') {
    console.log('Play');
    if (!isReading) {
      isReading = true;
      readText(fullPageText);
    } 
  } 
  else if (message.action === 'Pause') {
    console.log('Pause');
    pause();
  }
});

function readText(text) {
  if (isReading) {
    utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }
}

function pause() {
  speechSynthesis.pause();
  isReading = false;
}
