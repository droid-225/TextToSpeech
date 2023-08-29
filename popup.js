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

// Button listeners
document.getElementById('toBeginning').addEventListener('click', () => {
  sendMessageToContentScript('toBeginning');
});

document.getElementById('lastWord').addEventListener('click', () => {
  sendMessageToContentScript('lastWord');
});

document.getElementById('pausePlay').addEventListener('click', () => {
  sendMessageToContentScript('pausePlay');
});

document.getElementById('nextWord').addEventListener('click', () => {
  sendMessageToContentScript('nextWord');
});

document.getElementById('nextChunk').addEventListener('click', () => {
  sendMessageToContentScript('nextChunk');
});

function sendMessageToContentScript(action) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action });
  });
}
