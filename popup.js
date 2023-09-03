// Fetch the extension version from the manifest
const extensionVersion = chrome.runtime.getManifest().version;

// Update the version placeholder element
const extensionVersionElement = document.getElementById('extensionVersion');
extensionVersionElement.textContent = `v${extensionVersion}`;

let isReading = false;

document.getElementById('Play').addEventListener('click', () => {
  isReading = !isReading;
  const action = isReading ? 'Play' : 'stopReading';
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action });
  });
});

document.getElementById('Pause').addEventListener('click', () => {
  if (isReading) {
    sendMessageToContentScript('Pause');
  }
});

function sendMessageToContentScript(action) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action });
  });
}
