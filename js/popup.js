function showPopup(imageSrc, description, buyLink) {
  console.log('showPopup called'); // Debug log
  const popup = document.getElementById('popup');
  const popupContent = document.getElementById('popupContent');

  popupContent.innerHTML = `
    <button id="closePopup">X</button>
    <img src="${imageSrc}" alt="Popup Image" style="width: 100%; max-width: 300px; margin-bottom: 10px;">
    <p>${description}</p>
    <div class="popup-buttons">
      <a href="${buyLink}" target="_blank">
        <button>Buy Now</button>
      </a>
    </div>
  `;

  popup.style.display = 'flex'; // Show popup with flexbox

  // Rebind the Close button event listener dynamically
  const closePopupButton = document.getElementById('closePopup');
  closePopupButton.addEventListener('click', () => {
    popup.style.display = 'none';
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('popup');
  const closePopupButton = document.getElementById('closePopup');

  // Log to verify button exists
  console.log('Popup:', popup);
  console.log('Close button:', closePopupButton);

  if (popup && closePopupButton) {
    // Hide the popup on page load
    popup.style.display = 'none';

    // Add event listener to the Close button
    closePopupButton.addEventListener('click', () => {
      console.log('Close button clicked'); // Debug log
      popup.style.display = 'none'; // Hide the popup
    });
  } else {
    console.error('Popup or Close button not found!');
  }
});
