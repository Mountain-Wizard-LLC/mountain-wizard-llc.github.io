document.addEventListener('DOMContentLoaded', () => {
  const csvFilePath = 'cards/cards.csv';
  const container = document.getElementById('cardContainer');
  const searchInput = document.getElementById('searchInput');

  async function loadCards() {
    container.innerHTML = '';
    try {
      const response = await fetch(csvFilePath);
      const csvText = await response.text();

      // Parse CSV
      const rows = csvText
        .split('\n')
        .filter(row => row.trim() !== '') // Remove empty rows
        .map(row => row.match(/(?:[^,"']+|"[^"]*")+/g).map(cell => cell.replace(/(^"|"$)/g, '').trim()));

      const [header, ...data] = rows; // Separate header from data rows

      data.forEach(row => {
        if (row.length < header.length) return; // Skip incomplete rows

        const [image, title, description, tags, link1, link2] = row;
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.tags = tags; // Store tags for search

        const img = document.createElement('img');
        img.src = `images/${image}`;
        img.alt = title;
        card.appendChild(img);

        const cardTitle = document.createElement('h3');
        cardTitle.textContent = title;
        card.appendChild(cardTitle);

        const cardDescription = document.createElement('p');
        cardDescription.textContent = description;
        card.appendChild(cardDescription);

        const buyButton = document.createElement('button');
        buyButton.textContent = 'Buy';
        buyButton.addEventListener('click', () => showPopup(img.src, description, link1, link2));
        card.appendChild(buyButton);

        container.appendChild(card);
      });
    } catch (error) {
      console.error('Error fetching or parsing CSV file:', error);
    }
  }

  function filterCards() {
    const searchTerm = searchInput.value.toLowerCase();
    const cards = container.getElementsByClassName('card');

    Array.from(cards).forEach(card => {
      const tags = card.dataset.tags.toLowerCase();
      if (tags.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  searchInput.addEventListener('input', filterCards);
  loadCards();
});
