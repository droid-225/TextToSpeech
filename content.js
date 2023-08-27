// content.js

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
