import Room from './Room.js';

const room10 = new Room(
    10,
    'AVSLUTNING — BEGREPSFORSTÅELSE',
    `
    <h3>Nøkkelbegreper fra den kalde krigen</h3>
    <p>For å avslutte oppdraget må du bevise at du forstår de viktigste begrepene. Koble hver <strong>Begrep</strong> med riktig <strong>Forklaring</strong>.</p>

    <div id="memory-grid" class="memory-grid">
        <!-- Cards will be injected here by initRoom10 -->
    </div>

    <div id="completion-message" style="display:none; text-align:center; margin-top:20px;">
        <h3 style="color:#00ff41">Begrepsforståelse bekreftet!</h3>
        <p>Oppdraget er fullført...</p>
    </div>
    `,
    function check() {
        // Fallback check logic handled by initRoom10/game.js
        return true;
    },
    'Klikk på et Begrep og deretter på Forklaringen som hører til.'
);

// Define pairs - Begrep og Forklaring
const pairs = [
    { id: 1, concept: 'Jernteppet', explanation: 'Skillet mellom øst og vest' },
    { id: 2, concept: 'Kald Krig', explanation: 'Spenningen mellom USA og Sovjet uten direkte krig' },
    { id: 3, concept: 'NATO', explanation: 'Vestlig forsvarsallianse dannet 1949' },
    { id: 4, concept: 'Terrorbalanse', explanation: 'Begge sider hadde atomvåpen og kunne ødelegge hverandre' },
    { id: 5, concept: 'KGB', explanation: 'Sovjetisk hemmelightstjeneste' },
    { id: 6, concept: 'CIA', explanation: 'Amerikansk etterretningtjeneste' },
    { id: 7, concept: 'Bipolær verden', explanation: 'To rivaliserende supermakter dominerte' },
    { id: 8, concept: 'Ideologisk krig', explanation: 'Kamp mellom kommunisme og kapitalisme' },
    { id: 9, concept: 'Rustningskappløpet', explanation: 'Konkurranse om å ha mest og beste våpen' },
    { id: 10, concept: 'Propaganda', explanation: 'Offentlig informasjon brukt for å påvirke meninger' }
];

window.initRoom10 = function() {
    const grid = document.getElementById('memory-grid');
    if (!grid) return;

    grid.innerHTML = '';
    let cards = [];

    // Create card objects
    pairs.forEach(pair => {
        cards.push({
            id: pair.id,
            text: pair.concept,
            type: 'concept',
            matchId: pair.id
        });
        cards.push({
            id: pair.id,
            text: pair.explanation,
            type: 'explanation',
            matchId: pair.id
        });
    });

    // Shuffle cards
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    // Render cards
    cards.forEach((card, index) => {
        const el = document.createElement('div');
        el.className = 'memory-card';
        el.dataset.index = index;
        el.dataset.id = card.id;
        el.dataset.type = card.type;

        el.innerHTML = `
            <div class="card-type ${card.type}">${card.type === 'concept' ? 'BEGREP' : 'FORKLARING'}</div>
            <div>${card.text}</div>
        `;

        el.onclick = () => handleCardClick(el, card);
        grid.appendChild(el);
    });
};

let selectedCards = [];
let isLocked = false;

function handleCardClick(el, cardData) {
    if (isLocked) return;
    if (el.classList.contains('matched')) return;
    if (el.classList.contains('selected')) {
        // Deselect if clicking same card
        el.classList.remove('selected');
        selectedCards = selectedCards.filter(c => c.el !== el);
        return;
    }

    // Select card
    el.classList.add('selected');
    selectedCards.push({ el, ...cardData });

    // Check if 2 cards selected
    if (selectedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    isLocked = true;
    const [card1, card2] = selectedCards;

    // Check if match (same ID, different types)
    if (card1.id === card2.id && card1.type !== card2.type) {
        // Match found
        setTimeout(() => {
            card1.el.classList.remove('selected');
            card2.el.classList.remove('selected');
            card1.el.classList.add('matched');
            card2.el.classList.add('matched');

            selectedCards = [];
            isLocked = false;

            checkWin();
        }, 300);
    } else {
        // No match
        setTimeout(() => {
            card1.el.classList.add('error');
            card2.el.classList.add('error');

            setTimeout(() => {
                card1.el.classList.remove('selected', 'error');
                card2.el.classList.remove('selected', 'error');
                selectedCards = [];
                isLocked = false;
            }, 800);
        }, 500);
    }
}

function checkWin() {
    const matched = document.querySelectorAll('.memory-card.matched').length;
    if (matched === pairs.length * 2) {
        document.getElementById('completion-message').style.display = 'block';
        if (window.clearFailures) window.clearFailures(10);
        if (window.showSolvedStamp) window.showSolvedStamp();
        setTimeout(() => {
            if (window.nextRoom) window.nextRoom();
        }, 3000);
    }
}

export default room10;
