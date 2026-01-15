import Room from './Room.js';

const room9 = new Room(
    9,
    'FLUKTRUTEN — ÅRSAK & VIRKNING',
    `
    <h3>Sikkerhetssjekk: Koble hendelsene</h3>
    <p>For å åpne fluktruten må du bevise at du forstår sammenhengene i den kalde krigen. Koble hver <strong>Årsak</strong> med riktig <strong>Virkning</strong>.</p>

    <div id="memory-grid" class="memory-grid">
        <!-- Cards will be injected here by initRoom9 -->
    </div>

    <div id="completion-message" style="display:none; text-align:center; margin-top:20px;">
        <h3 style="color:#00ff41">Fluktrute godkjent!</h3>
        <p>Systemene åpnes...</p>
    </div>
    `,
    function check() {
        // Fallback check logic handled by initRoom9/game.js
        return true;
    },
    'Klikk på en Årsak-brikke og deretter på Virkningen som hører til.'
);

// Define pairs
const pairs = [
    { id: 1, cause: 'Sovjet plasserer atomraketter på Cuba', effect: 'USA innfører en marineblokade' },
    { id: 2, cause: 'Berlinmuren bygges', effect: 'Flukt fra øst til vest stanses' },
    { id: 3, cause: 'Begge sider har atomvåpen (Terrorbalanse)', effect: 'Ingen tør å starte åpen krig' },
    { id: 4, cause: 'NATO opprettes i vest', effect: 'Sovjetunionen danner Warszawapakten' },
    { id: 5, cause: 'Cubakrisen ender fredelig', effect: '«Den røde telefonen» opprettes' },
    { id: 6, cause: 'Marshallhjelpen lanseres', effect: 'Vest-Europa får økonomisk støtte fra USA' },
    { id: 7, cause: 'Sovjet skyter opp Sputnik 1', effect: 'Romkappløpet starter for fullt' },
    { id: 8, cause: 'Churchill snakker om «Jernteppet»', effect: 'Skillet mellom Øst og Vest blir tydelig' },
    { id: 9, cause: 'Stalin blokkerer Berlin (1948)', effect: 'Vestmaktene svarer med en luftbro' },
    { id: 10, cause: 'Tyskland deles i okkupasjonssoner', effect: 'Opprettelsen av DDR og Vest-Tyskland' }
];

window.initRoom9 = function() {
    const grid = document.getElementById('memory-grid');
    if (!grid) return;

    grid.innerHTML = '';
    let cards = [];

    // Create card objects
    pairs.forEach(pair => {
        cards.push({
            id: pair.id,
            text: pair.cause,
            type: 'cause',
            matchId: pair.id
        });
        cards.push({
            id: pair.id,
            text: pair.effect,
            type: 'effect',
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
            <div class="card-type ${card.type}">${card.type === 'cause' ? 'ÅRSAK' : 'VIRKNING'}</div>
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

    // Check if match (same ID, different types ensures they are a pair, though ID check is enough given unique pairs)
    if (card1.id === card2.id && card1.type !== card2.type) {
        // Match found
        setTimeout(() => {
            card1.el.classList.remove('selected');
            card2.el.classList.remove('selected');
            card1.el.classList.add('matched');
            card2.el.classList.add('matched');

            // Play success sound (optional, reused from game.js patterns if accessible, otherwise silent)

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
        if (window.clearFailures) window.clearFailures(9);
        if (window.showSolvedStamp) window.showSolvedStamp();
        setTimeout(() => {
            if (window.nextRoom) window.nextRoom();
        }, 3000);
    }
}

export default room9;
