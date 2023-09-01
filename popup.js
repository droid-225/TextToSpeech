// Fetch the extension version from the manifest
const extensionVersion = chrome.runtime.getManifest().version;

// Update the version placeholder element
const extensionVersionElement = document.getElementById('extensionVersion');
extensionVersionElement.textContent = `v${extensionVersion}`;

let isReading = false;

document.getElementById('startReading').addEventListener('click', () => {
  isReading = !isReading;
  const action = isReading ? 'startReading' : 'stopReading';
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action });
  });
});

document.getElementById('pausePlay').addEventListener('click', () => {
  if (isReading) {
    sendMessageToContentScript('pausePlay');
  }
});

function sendMessageToContentScript(action) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action });
  });
}
