let isReading = false;
let readingText = '';

// Read Until Spacebar is Pressed
function readText() {
  if (isReading && readingText !== '') {
    const utterance = new SpeechSynthesisUtterance(readingText);
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
      isReading = false;
      readingText = '';
      speechSynthesis.cancel();
    } else {
      const chunk = remainingText.slice(0, nextSpaceIndex + 1);
      const utterance = new SpeechSynthesisUtterance(chunk);
      speechSynthesis.speak(utterance);

      utterance.onend = () => {
        if (isReading) {
          readNextChunk();
        }
      };
    }
  }
}

// Listen for spacebar press to stop reading
window.addEventListener('keydown', (event) => {
  if (isReading && event.keyCode === 32) { // Space bar key code
    isReading = false;
    readingText = '';
    speechSynthesis.cancel();
  }
});
