import Room from './Room.js';

// Global state for room 8
window.room8TimeUnlocked = false;
window.room8BalanceComplete = false;
window.room8DraggedCard = null;
window.room8Placements = {
    ussr: [],
    neutral: [],
    usa: []
};

// Correct placements
window.room8Cards = [
    { id: 'missiles-cuba', text: 'Fjern sovjetiske missiler fra Cuba', zone: 'ussr' },
    { id: 'inspection', text: 'Aksepter amerikansk inspeksjon', zone: 'ussr' },
    { id: 'weapons-stop', text: 'Stopp våpentransporter til Cuba', zone: 'ussr' },
    { id: 'missiles-turkey', text: 'Fjern Jupiter-missiler fra Tyrkia', zone: 'usa' },
    { id: 'no-invasion', text: 'Løfte om ikke å invadere Cuba', zone: 'usa' },
    { id: 'blockade-end', text: 'Avslutt marineblokaden', zone: 'usa' },
    { id: 'hotline', text: 'Etabler direkte kommunikasjonslinje (hotline)', zone: 'neutral' },
    { id: 'un-observers', text: 'FN-observatører til Cuba', zone: 'neutral' }
];

const room8 = new Room(
    8,
    'FORHANDLINGENE',
    `
    <h3>🕰️ DE HEMMELIGE FORHANDLINGENE</h3>
    <div id="message8"></div>

    <div style="margin-top:12px; margin-bottom: 20px;">
        <button id="hint8Btn" class="btn" onclick="nextHint8()">💡 Hint (-30 sek)</button>
        <div id="hint8Box" class="hint-box" style="display:block; margin-top:10px; color:#fff;"></div>
    </div>
    
    <div style="background: rgba(0,0,0,0.6); padding: 20px; border-radius: 10px; margin: 20px 0; border: 2px solid #ffd93d;">
        <h4 style="color: #ffd93d; margin-top: 0;">📂 KLASSIFISERT DOKUMENT</h4>
        <p>CIA har avdekket tidspunktet for de hemmelige forhandlingene mellom Kennedy og Khrusjtsjov.</p>
        <p style="color: #aaa; font-size: 14px;">💡 Tips: Agent Petrov avslørte dette i en tidligere melding...</p>
        
        <div style="display: flex; gap: 10px; align-items: center; margin-top: 15px;">
            <label style="color: #fff;">Møtetidspunkt (TT:MM):</label>
            <input type="text" id="meetingTime8" placeholder="00:00" maxlength="5" style="width: 120px;">
            <button class="btn-small" onclick="checkMeetingTime8()">Lås opp 🔓</button>
        </div>
        <div class="stamp-container" id="stamp8time"></div>
    </div>

    <div id="balanceSection8" style="display: none;">
        <h4 style="color: #00ff41; margin-top: 20px;">⚖️ BALANSER FORHANDLINGENE</h4>
        <p>Plasser kompromissene i riktige soner for å løse krisen. Begge supermakter må gi noe, og noen tiltak er felles.</p>
        
        <div id="message8balance" style="margin: 15px 0;"></div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin: 20px 0; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 10px;">
            ${window.room8Cards.map(card => `
                <div class="balance-card" draggable="true" ondragstart="startDragCard8(event)" data-card-id="${card.id}">
                    ${card.text}
                </div>
            `).join('')}
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin: 20px 0;">
            <div class="balance-zone" id="zone-ussr" ondrop="dropCard8(event, 'ussr')" ondragover="allowDrop8(event)" style="border: 3px solid #ff4444; background: rgba(255,68,68,0.1);">
                <h4 style="color: #ff4444; text-align: center;">🇷🇺 USSR GIR</h4>
                <div class="zone-cards" id="cards-ussr"></div>
            </div>
            
            <div class="balance-zone" id="zone-neutral" ondrop="dropCard8(event, 'neutral')" ondragover="allowDrop8(event)" style="border: 3px solid #ffd93d; background: rgba(255,217,61,0.1);">
                <h4 style="color: #ffd93d; text-align: center;">🤝 FELLES/NØYTRAL</h4>
                <div class="zone-cards" id="cards-neutral"></div>
            </div>
            
            <div class="balance-zone" id="zone-usa" ondrop="dropCard8(event, 'usa')" ondragover="allowDrop8(event)" style="border: 3px solid #4444ff; background: rgba(68,68,255,0.1);">
                <h4 style="color: #4444ff; text-align: center;">🇺🇸 USA GIR</h4>
                <div class="zone-cards" id="cards-usa"></div>
            </div>
        </div>

        <div style="text-align: center;">
            <button class="btn" onclick="checkBalance8()">Bekreft forhandlinger ✅</button>
        </div>
    </div>
    `,
    function check() {
        return window.room8BalanceComplete === true;
    },
    'Tidspunktet var 23:45. USSR ga missiler, inspeksjon og våpenstopp. USA ga Tyrkia-missiler, ikke-invasjon og blokkade-slutt. Felles var hotline og FN-observatører.'
);

// Check meeting time
window.checkMeetingTime8 = function() {
    const input = document.getElementById('meetingTime8').value.trim();
    
    if (input === '23:45') {
        window.room8TimeUnlocked = true;
        showMessage(8, '✅ Tidspunkt korrekt! Forhandlingsdokumentene er åpnet.');
        
        // Vis stempel
        const stamp = document.getElementById('stamp8time');
        if (stamp) {
            stamp.innerHTML = '<span class="riktig-stamp">✓ RIKTIG!</span>';
            setTimeout(() => { stamp.innerHTML = ''; }, 3000);
        }
        
        document.getElementById('meetingTime8').disabled = true;
        document.getElementById('balanceSection8').style.display = 'block';
    } else {
        showMessage(8, '❌ Feil tidspunkt. Sjekk meldingen fra agent Petrov (rom 6).', 'error');
    }
};

// Drag and drop functions
window.startDragCard8 = function(event) {
    window.room8DraggedCard = event.target.dataset.cardId;
    event.target.style.opacity = '0.5';
};

window.allowDrop8 = function(event) {
    event.preventDefault();
};

window.dropCard8 = function(event, zone) {
    event.preventDefault();
    
    if (!window.room8DraggedCard) return;
    
    const cardId = window.room8DraggedCard;
    const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
    
    // Remove from previous zone
    ['ussr', 'neutral', 'usa'].forEach(z => {
        const index = window.room8Placements[z].indexOf(cardId);
        if (index > -1) {
            window.room8Placements[z].splice(index, 1);
        }
    });
    
    // Add to new zone
    window.room8Placements[zone].push(cardId);
    
    // Hide original card
    cardElement.style.display = 'none';
    cardElement.style.opacity = '1';
    
    // Update zone display
    updateZoneDisplay8(zone);
    
    window.room8DraggedCard = null;
};

function updateZoneDisplay8(zone, showRemoveButtons = false) {
    const zoneContainer = document.getElementById(`cards-${zone}`);
    zoneContainer.innerHTML = '';
    
    window.room8Placements[zone].forEach(cardId => {
        const card = window.room8Cards.find(c => c.id === cardId);
        const isCorrect = card.zone === zone;
        const cardDiv = document.createElement('div');
        cardDiv.className = 'placed-balance-card';
        cardDiv.dataset.cardId = cardId;
        
        // Show indicator after check
        let indicatorHtml = '';
        if (showRemoveButtons) {
            if (isCorrect) {
                indicatorHtml = '<span class="check-indicator correct-indicator">✓</span>';
            } else {
                indicatorHtml = '<span class="check-indicator incorrect-indicator">✖</span>';
            }
        }
        
        // Only show remove button after check, and only for incorrect placements
        const removeButtonStyle = (showRemoveButtons && !isCorrect) ? '' : 'display: none;';
        cardDiv.innerHTML = `
            ${indicatorHtml}
            ${card.text}
            <button class="remove-card-btn" onclick="removeCard8('${cardId}', '${zone}')" style="margin-top: 5px; ${removeButtonStyle}">✖</button>
        `;
        zoneContainer.appendChild(cardDiv);
    });
}

window.removeCard8 = function(cardId, zone) {
    // Remove from zone
    const index = window.room8Placements[zone].indexOf(cardId);
    if (index > -1) {
        window.room8Placements[zone].splice(index, 1);
    }
    
    // Show original card
    const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
    if (cardElement) {
        cardElement.style.display = 'block';
    }
    
    // Update display
    updateZoneDisplay8(zone);
};

window.checkBalance8 = function() {
    // Check if all cards are placed
    const totalPlaced = window.room8Placements.ussr.length + 
                        window.room8Placements.neutral.length + 
                        window.room8Placements.usa.length;
    
    if (totalPlaced !== 8) {
        // Show message in balance section
        const msgDiv = document.getElementById('message8balance');
        if (msgDiv) {
            msgDiv.innerHTML = `<div class="error-message">❌ Du må plassere alle 8 kompromisser først. Du har plassert ${totalPlaced} av 8.</div>`;
            setTimeout(() => { msgDiv.innerHTML = ''; }, 3000);
        }
        return;
    }
    
    // Count correct placements
    let correctCount = 0;
    
    window.room8Cards.forEach(card => {
        const placedZone = ['ussr', 'neutral', 'usa'].find(z => 
            window.room8Placements[z].includes(card.id)
        );
        
        if (placedZone === card.zone) {
            correctCount++;
        }
    });
    
    if (correctCount === 8) {
        window.room8BalanceComplete = true;
        const msgDiv = document.getElementById('message8balance');
        if (msgDiv) {
            msgDiv.innerHTML = '<div class="success-message">🎉 Perfekt balansert! Forhandlingene var vellykkede og krigen ble avverget.</div>';
        }
        setTimeout(nextRoom, 2500);
    } else {
        // Record one failure attempt per check
        recordFailure(8);
        
        // Update displays to show remove buttons on incorrect cards
        ['ussr', 'neutral', 'usa'].forEach(zone => {
            updateZoneDisplay8(zone, true);
        });
        
        const msgDiv = document.getElementById('message8balance');
        if (msgDiv) {
            msgDiv.innerHTML = `<div class="error-message">📊 ${correctCount} av 8 riktig plassert. Fjern de feilplasserte og prøv igjen!</div>`;
            setTimeout(() => { msgDiv.innerHTML = ''; }, 4000);
        }
    }
};
export default room8;
