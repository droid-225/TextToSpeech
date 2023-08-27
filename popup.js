// popup.js

// Fetch the extension version from the manifest
const extensionVersion = chrome.runtime.getManifest().version;

// Update the version placeholder element
const extensionVersionElement = document.getElementById('extensionVersion');
extensionVersionElement.textContent = `v${extensionVersion}`;

// 'Read Selected Text' Button Event Listener
document.getElementById('startReading').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'readSelectedText' });
    });
  });

// Make the popup draggable
const popup = document.getElementById('popup');
let isDragging = false;

popup.addEventListener('mousedown', (e) => {
  isDragging = true;
  const initialX = e.clientX - popup.getBoundingClientRect().left;
  const initialY = e.clientY - popup.getBoundingClientRect().top;

  const onMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - initialX;
      const newY = e.clientY - initialY;
      popup.style.left = newX + 'px';
      popup.style.top = newY + 'px';
    }
  };

  const onMouseUp = () => {
    isDragging = false;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
});

// Close the popup
const closeBtn = document.getElementById('closeBtn');
closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
});
