import Room from './Room.js';

// Global state for room 7
let room7Cards = [
    { id: 'jalta', name: 'Jalta-konferansen', year: 1945, image: 'assets/images/jalta.jpg', correctSlot: 1 },
    { id: 'korea', name: 'Koreakrigen starter', year: 1950, image: 'assets/images/korea.jpg', correctSlot: 2 },
    { id: 'stalin', name: 'Stalin dør', year: 1953, image: 'assets/images/stalin.jpg', correctSlot: 3 },
    { id: 'sputnik', name: 'Sputnik lanseres', year: 1957, image: 'assets/images/sputnik.jpg', correctSlot: 4 },
    { id: 'cuba', name: 'Cubarevolusjon - Castro/Che', year: 1959, image: 'assets/images/che_castro.jpg', correctSlot: 5 },
    { id: 'jfk', name: 'JFK myrdet', year: 1963, image: 'assets/images/jfk.jpg', correctSlot: 6 },
    { id: 'moon', name: 'Månelanding', year: 1969, image: 'assets/images/manelanding.jpg', correctSlot: 7 },
    { id: 'wall', name: 'Berlinmuren rives', year: 1989, image: 'assets/images/berlinmuren_rives.jpg', correctSlot: 8 }
];

console.log('Room 7 cards initialized:', room7Cards);

let room7DraggedCard = null;
let room7Placements = { slot1: null, slot2: null, slot3: null, slot4: null, slot5: null, slot6: null, slot7: null, slot8: null };
let room7SafeUnlocked = false;

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function initRoom7(retryCount = 0) {
    room7Placements = { slot1: null, slot2: null, slot3: null, slot4: null, slot5: null, slot6: null, slot7: null, slot8: null };
    room7SafeUnlocked = false;
    
    console.log('initRoom7 called - cards already in HTML, no need to render');
}

function startDragCard7(event) {
    room7DraggedCard = event.target.closest('.timeline-card').dataset.cardId;
    event.target.closest('.timeline-card').style.opacity = '0.5';
}

function allowDrop7(event) {
    event.preventDefault();
}

function dropCard7(event, slotNumber) {
    event.preventDefault();
    
    if (!room7DraggedCard) return;
    
    const slot = document.getElementById(`slot${slotNumber}`);
    const card = room7Cards.find(c => c.id === room7DraggedCard);
    
    // Remove card from previous slot if it was placed
    Object.keys(room7Placements).forEach(key => {
        if (room7Placements[key] === room7DraggedCard) {
            room7Placements[key] = null;
        }
    });
    
    // Remove any existing card from this slot
    if (room7Placements[`slot${slotNumber}`]) {
        const existingCard = room7Placements[`slot${slotNumber}`];
        const cardElement = document.querySelector(`[data-card-id="${existingCard}"]`);
        if (cardElement) {
            cardElement.style.display = 'block';
            cardElement.style.opacity = '1';
        }
    }
    
    // Place new card
    room7Placements[`slot${slotNumber}`] = room7DraggedCard;
    
    // Get last digit of year for display
    const lastDigit = card.year % 10;
    
    // Update slot display
    slot.innerHTML = `
        <div class="placed-card">
            <div class="card-image-wrapper">
                <img src="${card.image}" alt="${card.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23444%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 fill=%22%23fff%22 dy=%22.3em%22%3E?%3C/text%3E%3C/svg%3E'">
                <span class="card-digit">${lastDigit}</span>
            </div>
            <p>${card.name}</p>
            <button class="remove-card-btn" onclick="removeCard7(${slotNumber})">✖</button>
        </div>
    `;
    
    // Hide card from card area
    const cardElement = document.querySelector(`[data-card-id="${room7DraggedCard}"]`);
    if (cardElement) {
        cardElement.style.display = 'none';
    }
    
    room7DraggedCard = null;
    checkRoom7Puzzle();
}

function removeCard7(slotNumber) {
    const cardId = room7Placements[`slot${slotNumber}`];
    if (!cardId) return;
    
    // Return card to card area
    const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
    if (cardElement) {
        cardElement.style.display = 'block';
        cardElement.style.opacity = '1';
    }
    
    // Clear slot
    room7Placements[`slot${slotNumber}`] = null;
    const slot = document.getElementById(`slot${slotNumber}`);
    slot.innerHTML = `<p>Slot ${slotNumber}</p>`;
    
    checkRoom7Puzzle();
}

function checkRoom7Puzzle() {
    let allCorrect = true;
    
    // Check each placement
    for (let i = 1; i <= 8; i++) {
        const slot = document.getElementById(`slot${i}`);
        const placedCardId = room7Placements[`slot${i}`];
        
        if (!placedCardId) {
            allCorrect = false;
            slot.classList.remove('correct-slot', 'incorrect-slot');
            continue;
        }
        
        const card = room7Cards.find(c => c.id === placedCardId);
        
        if (card.correctSlot === i) {
            slot.classList.remove('incorrect-slot');
            slot.classList.add('correct-slot');
        } else {
            // Only count as attempt if this is a new incorrect placement
            if (!slot.classList.contains('incorrect-slot')) {
                recordFailure(7);
            }
            slot.classList.remove('correct-slot');
            slot.classList.add('incorrect-slot');
            allCorrect = false;
        }
    }
    
    // If all correct, unlock safe
    if (allCorrect && !room7SafeUnlocked) {
        room7SafeUnlocked = true;
        setTimeout(() => {
            document.getElementById('room7Safe').style.display = 'block';
            showMessage(7, '🎉 Riktig rekkefølge! Safe-koden er åpenbaret.');
        }, 500);
    }
}

function checkRoom7Safe() {
    const code = document.getElementById('safeCode7').value;
    if (code === '50379399') {
        showMessage(7, '🎉 Safe åpnet! Du har løst puslespillet.');
        setTimeout(nextRoom, 2000);
        return true;
    } else {
        showMessage(7, '❌ Feil kode. Les sifrene fra bildene i slots 1-8.', 'error');
        return false;
    }
}

function openImageModal7(event, imgSrc, caption) {
    event.stopPropagation(); // Prevent drag from starting
    const modal = document.getElementById('imageModal7');
    const modalImg = document.getElementById('modalImage7');
    const modalCaption = document.getElementById('modalCaption7');
    
    modal.style.display = 'flex';
    modalImg.src = imgSrc;
    modalCaption.textContent = caption;
}

function closeImageModal7() {
    document.getElementById('imageModal7').style.display = 'none';
}

// Expose to window
window.initRoom7 = initRoom7;
window.startDragCard7 = startDragCard7;
window.allowDrop7 = allowDrop7;
window.dropCard7 = dropCard7;
window.removeCard7 = removeCard7;
window.checkRoom7Safe = checkRoom7Safe;
window.openImageModal7 = openImageModal7;
window.closeImageModal7 = closeImageModal7;

const room7 = new Room(
    7,
    'TIDSFORSTÅELSE — KRONOLOGISK KODE',
    `
    <h3>Plasser hendelsene i kronologisk rekkefølge</h3>
    <p>Dra kortene til riktige slots for å åpne safen. Rekkefølgen avslører koden.</p>

    <div class="timeline-slots">
        <div class="timeline-slot" id="slot1" ondrop="dropCard7(event, 1)" ondragover="allowDrop7(event)">
            <p>Slot 1</p>
        </div>
        <div class="timeline-slot" id="slot2" ondrop="dropCard7(event, 2)" ondragover="allowDrop7(event)">
            <p>Slot 2</p>
        </div>
        <div class="timeline-slot" id="slot3" ondrop="dropCard7(event, 3)" ondragover="allowDrop7(event)">
            <p>Slot 3</p>
        </div>
        <div class="timeline-slot" id="slot4" ondrop="dropCard7(event, 4)" ondragover="allowDrop7(event)">
            <p>Slot 4</p>
        </div>
        <div class="timeline-slot" id="slot5" ondrop="dropCard7(event, 5)" ondragover="allowDrop7(event)">
            <p>Slot 5</p>
        </div>
        <div class="timeline-slot" id="slot6" ondrop="dropCard7(event, 6)" ondragover="allowDrop7(event)">
            <p>Slot 6</p>
        </div>
        <div class="timeline-slot" id="slot7" ondrop="dropCard7(event, 7)" ondragover="allowDrop7(event)">
            <p>Slot 7</p>
        </div>
        <div class="timeline-slot" id="slot8" ondrop="dropCard7(event, 8)" ondragover="allowDrop7(event)">
            <p>Slot 8</p>
        </div>
    </div>

    <div class="timeline-cards" id="room7Cards">
        <div class="timeline-card" draggable="true" data-card-id="moon" ondragstart="startDragCard7(event)">
            <div class="card-image-wrapper">
                <img src="assets/images/manelanding.jpg" alt="Månelanding" onclick="openImageModal7(event, 'assets/images/manelanding.jpg', 'Månelanding')">
                <span class="card-digit">9</span>
            </div>
            <p>Månelanding</p>
        </div>
        <div class="timeline-card" draggable="true" data-card-id="jalta" ondragstart="startDragCard7(event)">
            <div class="card-image-wrapper">
                <img src="assets/images/jalta.jpg" alt="Jalta-konferansen" onclick="openImageModal7(event, 'assets/images/jalta.jpg', 'Jalta-konferansen')">
                <span class="card-digit">5</span>
            </div>
            <p>Jalta-konferansen</p>
        </div>
        <div class="timeline-card" draggable="true" data-card-id="jfk" ondragstart="startDragCard7(event)">
            <div class="card-image-wrapper">
                <img src="assets/images/jfk.jpg" alt="JFK myrdet" onclick="openImageModal7(event, 'assets/images/jfk.jpg', 'JFK myrdet')">
                <span class="card-digit">3</span>
            </div>
            <p>JFK myrdet</p>
        </div>
        <div class="timeline-card" draggable="true" data-card-id="korea" ondragstart="startDragCard7(event)">
            <div class="card-image-wrapper">
                <img src="assets/images/korea.jpg" alt="Koreakrigen starter" onclick="openImageModal7(event, 'assets/images/korea.jpg', 'Koreakrigen starter')">
                <span class="card-digit">0</span>
            </div>
            <p>Koreakrigen starter</p>
        </div>
        <div class="timeline-card" draggable="true" data-card-id="wall" ondragstart="startDragCard7(event)">
            <div class="card-image-wrapper">
                <img src="assets/images/berlinmuren_rives.jpg" alt="Berlinmuren rives" onclick="openImageModal7(event, 'assets/images/berlinmuren_rives.jpg', 'Berlinmuren rives')">
                <span class="card-digit">9</span>
            </div>
            <p>Berlinmuren rives</p>
        </div>
        <div class="timeline-card" draggable="true" data-card-id="sputnik" ondragstart="startDragCard7(event)">
            <div class="card-image-wrapper">
                <img src="assets/images/sputnik.jpg" alt="Sputnik lanseres" onclick="openImageModal7(event, 'assets/images/sputnik.jpg', 'Sputnik lanseres')">
                <span class="card-digit">7</span>
            </div>
            <p>Sputnik lanseres</p>
        </div>
        <div class="timeline-card" draggable="true" data-card-id="stalin" ondragstart="startDragCard7(event)">
            <div class="card-image-wrapper">
                <img src="assets/images/stalin.jpg" alt="Stalin dør" onclick="openImageModal7(event, 'assets/images/stalin.jpg', 'Stalin dør')">
                <span class="card-digit">3</span>
            </div>
            <p>Stalin dør</p>
        </div>
        <div class="timeline-card" draggable="true" data-card-id="cuba" ondragstart="startDragCard7(event)">
            <div class="card-image-wrapper">
                <img src="assets/images/che_castro.jpg" alt="Cubarevolusjon" onclick="openImageModal7(event, 'assets/images/che_castro.jpg', 'Cubarevolusjon - Castro/Che')">
                <span class="card-digit">9</span>
            </div>
            <p>Cubarevolusjon - Castro/Che</p>
        </div>
    </div>

    <div id="room7Safe" style="display: none; margin-top: 20px;">
        <h3>🔐 Safe åpnet!</h3>
        <p>Hint: Les siste siffer fra hvert bilde i rekkefølge for å få koden.</p>
        <div class="code-input">
            <label for="safeCode7">Safe-kode (8 siffer):</label>
            <input type="text" id="safeCode7" placeholder="########" maxlength="8">
            <button class="btn" onclick="checkRoom7Safe()">Lås opp</button>
        </div>
    </div>

    <!-- Image Modal -->
    <div id="imageModal7" class="image-modal" onclick="closeImageModal7()" style="display: none;">
        <span class="image-modal-close">&times;</span>
        <img class="image-modal-content" id="modalImage7">
        <div class="image-modal-caption" id="modalCaption7"></div>
    </div>
    `,
    function check() {
        return checkRoom7Safe();
    },
    'Hendelsene må sorteres fra tidligst til senest. Les sifrene på bildene når de er i riktig rekkefølge.'
);

export default room7;
