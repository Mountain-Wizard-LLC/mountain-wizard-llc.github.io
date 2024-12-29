document.addEventListener('DOMContentLoaded', () => {
  const cardFiles = ['wizard.txt', 'groom.txt', 'bride.txt', 'cowboy.txt', 'cowgirl.txt', 'lumberjack.txt', 'lumberjill.txt', 'werewolf.txt', 'vampire.txt', 'witch.txt'];
  const container = document.getElementById('cardContainer');
  const searchInput = document.getElementById('searchInput');

  async function loadCards() {
    container.innerHTML = '';
    for (const fileName of cardFiles) {
      const textFilePath = `cards/${fileName}`;
      try {
        const response = await fetch(textFilePath);
        const text = await response.text();
        const lines = text.split('\n');
        
        const imagePath = `images/${lines[0].trim()}`;
        const title = lines[1].trim();
        const description = lines[2].trim();
        const tags = lines.find(line => line.startsWith('tags:')).split(': ')[1];
        const link1 = lines.find(line => line.startsWith('link1:')).split(': ')[1];
        const link2 = lines.find(line => line.startsWith('link2:')).split(': ')[1];

        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.tags = tags; // Store tags for search

        const img = document.createElement('img');
        img.src = imagePath;
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
        buyButton.addEventListener('click', () => showPopup(imagePath, description, link1, link2));
        card.appendChild(buyButton);

        container.appendChild(card);
      } catch (error) {
        console.error('Error fetching file:', error);
      }
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
