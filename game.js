// game.js - Spillmotor for Escape Room

import rooms from './rooms/index.js';

class Game {
    constructor() {
        this.currentRoomIndex = 0;
        this.startTime = Date.now();
        this.gameTime = 60 * 60 * 1000; // 60 minutter
        this.selectedAlliances = [];
        this.selectedLeaders = [];
    this.selectedLeaders8 = [];
        this.timerInterval = null;
    }

    init() {
        this.renderRooms();
        this.startTimer();
        this.updateProgress();
        this.showCurrentRoom();
    }

    renderRooms() {
        const container = document.querySelector('.container');
        const header = document.querySelector('.header');
        let roomsHtml = '';
        rooms.forEach(room => {
            roomsHtml += room.render();
        });
        // Sett inn etter header
        header.insertAdjacentHTML('afterend', roomsHtml);
    }

    startTimer() {
        this.updateTimer();
        this.timerInterval = setInterval(() => this.updateTimer(), 1000);
    }

    updateTimer() {
        const elapsed = Date.now() - this.startTime;
        const remaining = Math.max(0, this.gameTime - elapsed);
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        
        document.getElementById('timer').textContent = 
            `⏰ Tid igjen: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (remaining <= 0) {
            this.showMessage('timer', '⏰ Tiden er ute! Prøv igjen.', 'error');
            clearInterval(this.timerInterval);
        }
    }

    showMessage(roomId, message, type = 'success') {
        const messageDiv = document.getElementById(`message${roomId}`);
        messageDiv.innerHTML = `<div class="${type}-message">${message}</div>`;
        setTimeout(() => {
            if (type === 'success') {
                messageDiv.innerHTML = '';
            }
        }, 3000);
    }

    showSolvedStamp() {
        // Create overlay with solved stamp
        const overlay = document.createElement('div');
        overlay.className = 'solved-stamp-overlay';
        overlay.innerHTML = `
            <div class="solved-stamp-container">
                <img src="assets/images/løst.png" alt="Løst!" class="solved-stamp-image">
            </div>
        `;
        document.body.appendChild(overlay);
        
        // Play stamp sound using Web Audio API (works everywhere)
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioCtx = new AudioContext();
            
            // Create a deep "thud" sound for stamp
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            // Deep bass frequency for stamp effect
            oscillator.frequency.value = 100;
            oscillator.type = 'sine';
            
            // Quick attack and decay for "thud" effect - 80% høyere volum totalt
            const now = audioCtx.currentTime;
            gainNode.gain.setValueAtTime(1.61, now); // 1.34 * 1.2 = 1.61 (80% høyere enn original)
            gainNode.gain.exponentialRampToValueAtTime(0.020, now + 0.3);
            
            oscillator.start(now);
            oscillator.stop(now + 0.3);
        } catch(err) {
            console.log('Audio generation failed:', err);
        }
        
        // Remove after animation (3 seconds)
        setTimeout(() => {
            overlay.remove();
        }, 3000);
    }

    updateProgress() {
        const progress = (this.currentRoomIndex) * (100 / rooms.length);
        document.getElementById('progress').style.width = progress + '%';
    }

    nextRoom() {
        document.getElementById(`room${rooms[this.currentRoomIndex].id}`).classList.remove('active');
        this.currentRoomIndex++;
        this.showCurrentRoom();
        this.updateProgress();
    }

    showCurrentRoom() {
        const roomId = rooms[this.currentRoomIndex].id;
        document.getElementById(`room${roomId}`).classList.add('active');
        // If entering room 1, add full-screen background class to body
        if (roomId === 1) {
            document.body.classList.add('room-bg-1');
            document.body.classList.remove('room-bg-2');
            document.body.classList.remove('room-bg-3');
        } else if (roomId === 2) {
            document.body.classList.add('room-bg-2');
            document.body.classList.remove('room-bg-1');
            document.body.classList.remove('room-bg-3');
        } else if (roomId === 3) {
            document.body.classList.add('room-bg-3');
            document.body.classList.remove('room-bg-1');
            document.body.classList.remove('room-bg-2');
            document.body.classList.remove('room-bg-4');
        } else if (roomId === 4) {
            document.body.classList.add('room-bg-4');
            document.body.classList.remove('room-bg-1');
            document.body.classList.remove('room-bg-2');
            document.body.classList.remove('room-bg-3');
        } else {
            document.body.classList.remove('room-bg-1');
            document.body.classList.remove('room-bg-2');
            document.body.classList.remove('room-bg-3');
        }
        // Update attempts display for the room when shown
        try { updateAttemptDisplay(roomId); } catch(e) { /* ignore */ }
    }

    showHint(roomNumber) {
        const hint = document.getElementById(`hint${roomNumber}`);
        hint.style.display = hint.style.display === 'none' ? 'block' : 'none';
    }

    restartGame() {
        this.currentRoomIndex = 0;
        this.startTime = Date.now();
        this.selectedAlliances = [];
        this.selectedLeaders = [];
    this.selectedLeaders8 = [];
        
        // Reset alle input felt
        document.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
        
        // Reset alle rom
        document.querySelectorAll('.room').forEach(room => {
            room.classList.remove('active');
        });
        
        // Reset valgte elementer
        document.querySelectorAll('.map-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        // Vis første rom
        this.showCurrentRoom();
        this.updateProgress();
        this.startTimer();
    }
}

// Globale funksjoner for onclick
// Per-room failure tracking and cooldowns
window._roomFailures = {}; // { roomId: {count, cooldownEndsAt, timerId} }

window.recordFailure = function(roomId) {
    if (!window._roomFailures[roomId]) {
        window._roomFailures[roomId] = { count: 0, cooldownEndsAt: 0, timerId: null };
    }
    const state = window._roomFailures[roomId];
    // If currently in cooldown, ignore additional failures
    const now = Date.now();
    if (state.cooldownEndsAt && now < state.cooldownEndsAt) return;

    state.count = (state.count || 0) + 1;
    if (state.count >= 3) {
        // start 60s cooldown
        state.cooldownEndsAt = now + 60 * 1000;
        state.count = 0;
        startCooldown(roomId);
    }
    // update attempts UI
    try { updateAttemptDisplay(roomId); } catch(e) { }
};

function startCooldown(roomId) {
    const roomEl = document.getElementById(`room${roomId}`);
    if (!roomEl) return;
    // create overlay
    let overlay = roomEl.querySelector('.cooldown-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'cooldown-overlay';
        overlay.innerHTML = `<div class="countdown-box"><div class="title">For mange forsøk</div><div class="desc">Vent ett minutt før du kan prøve igjen.</div><div class="time" id="cooldownTime${roomId}">01:00</div></div>`;
        roomEl.appendChild(overlay);
    }

    const state = window._roomFailures[roomId];
    if (state.timerId) clearInterval(state.timerId);
    state.timerId = setInterval(() => {
        const remaining = Math.max(0, Math.floor((state.cooldownEndsAt - Date.now()) / 1000));
        const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
        const ss = String(remaining % 60).padStart(2, '0');
        const el = document.getElementById(`cooldownTime${roomId}`);
        if (el) el.textContent = `${mm}:${ss}`;
        if (remaining <= 0) {
            clearInterval(state.timerId);
            state.timerId = null;
            state.cooldownEndsAt = 0;
            // remove overlay
            const ov = roomEl.querySelector('.cooldown-overlay');
            if (ov) ov.remove();
            // update attempts display after cooldown ends
            try { updateAttemptDisplay(roomId); } catch(e) {}
        }
    }, 250);
}

// Display/update attempts left in the active room
function updateAttemptDisplay(roomId) {
    const roomEl = document.getElementById(`room${roomId}`);
    if (!roomEl) return;
    let state = window._roomFailures[roomId];
    if (!state) state = { count: 0, cooldownEndsAt: 0 };

    // create or find attempts box
    let box = roomEl.querySelector('.attempts-box');
    if (!box) {
        box = document.createElement('div');
        box.className = 'attempts-box';
        roomEl.insertAdjacentElement('afterbegin', box);
    }

    const now = Date.now();
    if (state.cooldownEndsAt && now < state.cooldownEndsAt) {
        const remaining = Math.max(0, Math.floor((state.cooldownEndsAt - now) / 1000));
        const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
        const ss = String(remaining % 60).padStart(2, '0');
        box.textContent = `Låst: ${mm}:${ss}`;
    } else {
        const attemptsLeft = 3 - (state.count || 0);
        box.textContent = `Forsøk igjen: ${attemptsLeft}`;
    }
}

// Clear failure state for a room (call on success)
function clearFailures(roomId) {
    if (window._roomFailures[roomId]) {
        const s = window._roomFailures[roomId];
        if (s.timerId) { clearInterval(s.timerId); s.timerId = null; }
        s.count = 0; s.cooldownEndsAt = 0;
    }
    try { updateAttemptDisplay(roomId); } catch(e) {}
}

window.showSolvedStamp = function() {
    game.showSolvedStamp();
};

window.checkRoom1 = function() {
    const year = parseInt(document.getElementById('year1').value);
    if (year === 1946) {
        clearFailures(1);
        game.showSolvedStamp();
        setTimeout(() => game.nextRoom(), 3000);
    } else {
        game.showMessage(1, '❌ Feil årstall. Prøv igjen! Tenk på slutten av andre verdenskrig.', 'error');
        recordFailure(1);
    }
};

// Hints for room 1 - cycle through 3 hints
window._room1HintIndex = 0;
window.nextHint1 = function() {
    const hints = [
        'Se på tiden rett etter andre verdenskrig.',
        'Winston Churchill holdt en tale om et «jernteppe» som delte Europa.',
        'Det var før NATO ble dannet, men etter 1945.'
    ];
    const box = document.getElementById('hint1Box');
    const btn = document.getElementById('hint1Btn');
    if (!box || !btn) return;

    if (window._room1HintIndex < hints.length) {
        // append the next hint (each hint on its own line)
        const p = document.createElement('p');
        p.textContent = `Hint ${window._room1HintIndex + 1}: ${hints[window._room1HintIndex]}`;
        box.appendChild(p);
        window._room1HintIndex++;
        if (window._room1HintIndex >= hints.length) {
            btn.disabled = true;
            btn.textContent = '💡 Ingen flere hint';
        }
    }
};

// Hints for room 2 - cycle through 3 hints
window._room2HintIndex = 0;
window.nextHint2 = function() {
    const hints = [
        'Den første hendelsen handler om en by som ble delt og blokkert.',
        'Den første militæralliansen ble opprettet kort tid etter blokkaden.',
        'Den siste hendelsen kom som reaksjon på den første alliansen.'
    ];
    const box = document.getElementById('hint2Box');
    const btn = document.getElementById('hint2Btn');
    if (!box || !btn) return;

    if (window._room2HintIndex < hints.length) {
        const p = document.createElement('p');
        p.textContent = `Hint ${window._room2HintIndex + 1}: ${hints[window._room2HintIndex]}`;
        box.appendChild(p);
        window._room2HintIndex++;
        if (window._room2HintIndex >= hints.length) {
            btn.disabled = true;
            btn.textContent = '💡 Ingen flere hint';
        }
    }
};

// Hints for room 3 - cycle through 3 hints
window._room3HintIndex = 0;
window.nextHint3 = function() {
    const hints = [
        'Sommermåned.',
        'Arbeidet startet etter en dramatisk økning i flyktninger fra øst.',
        'Det skjedde før høsten samme år.'
    ];
    const box = document.getElementById('hint3Box');
    const btn = document.getElementById('hint3Btn');
    if (!box || !btn) return;

    if (window._room3HintIndex < hints.length) {
        const p = document.createElement('p');
        p.textContent = `Hint ${window._room3HintIndex + 1}: ${hints[window._room3HintIndex]}`;
        box.appendChild(p);
        window._room3HintIndex++;
        if (window._room3HintIndex >= hints.length) {
            btn.disabled = true;
            btn.textContent = '💡 Ingen flere hint';
        }
    }
};

// legacy selectAlliance removed (room2 now uses selectEvent2/ resetSequence2)

// Room 2: timeline selection handlers
window._room2Sequence = [];
window.selectEvent2 = function(eventKey) {
    // add to sequence if not already full
    if (!window._room2Sequence) window._room2Sequence = [];
    if (window._room2Sequence.length >= 4) return;
    window._room2Sequence.push(eventKey);
    const seqBox = document.getElementById('sequence2');
    if (seqBox) {
        const labels = window._room2Sequence.map((k, i) => `${i+1}. ${formatEventLabel(k)}`);
        seqBox.textContent = labels.join(' \n');
    }
};

window.resetSequence2 = function() {
    window._room2Sequence = [];
    const seqBox = document.getElementById('sequence2');
    if (seqBox) seqBox.textContent = '';
};

window.checkRoom2 = function() {
    const seq = window._room2Sequence || [];
    const correct = ['Berlin','NATO','Korea','Warszawa'];
    if (seq.length !== correct.length) {
        game.showMessage(2, '❌ Du må velge alle hendelsene i en rekkefølge før du sjekker.', 'error');
        recordFailure(2);
        return;
    }
    for (let i = 0; i < correct.length; i++) {
        if (seq[i] !== correct[i]) {
            game.showMessage(2, '❌ Feil rekkefølge. Tenk kronologisk — begynn med det eldste.', 'error');
            recordFailure(2);
            return;
        }
    }
    clearFailures(2);
    game.showSolvedStamp();
    setTimeout(() => game.nextRoom(), 3000);
};

function formatEventLabel(key) {
    switch(key) {
        case 'NATO': return 'Opprettelsen av NATO';
        case 'Warszawa': return 'Opprettelsen av Warszawapakten';
        case 'Berlin': return 'Berlinblokaden';
        case 'Korea': return 'Koreakrigen';
        default: return key;
    }
}

window.checkRoom3 = function() {
    const year = parseInt(document.getElementById('berlinYear').value);
    const month = parseInt(document.getElementById('berlinMonth').value);
    
    if (year === 1961 && month === 8) {
        game.showMessage(3, '🎉 Riktig! Berlinmuren ble bygget i august 1961. Safen er åpen!');
        clearFailures(3);
        document.getElementById('morseCode').style.display = 'block';
        // Reveal the button to open the morse alphabet modal in Room 3
        const showBtn = document.getElementById('showMorseBtn');
        if (showBtn) showBtn.style.display = 'inline-block';
    } else {
        game.showMessage(3, '❌ Feil dato. Muren ble bygget "over natten" i 1961.', 'error');
        recordFailure(3);
    }
};

// Modal handlers for morse alphabet (Room 3)
window.showMorseAlphabet = function() {
    const modal = document.getElementById('morseModal');
    if (!modal) return;
    modal.style.display = 'block';
};

window.closeMorseAlphabet = function() {
    const modal = document.getElementById('morseModal');
    if (!modal) return;
    modal.style.display = 'none';
};

window.checkMorse = function() {
    const answer = document.getElementById('morseAnswer').value.toLowerCase();
    if (answer === 'yes we can' || answer === 'yeswecan') {
        clearFailures(3);
        game.showSolvedStamp();
        setTimeout(() => game.nextRoom(), 3000);
    } else {
        game.showMessage(3, '❌ Feil dekoding. Prøv igjen med morse-tabellen.', 'error');
        recordFailure(3);
    }
};

window.selectLeader = function(leader) {
    event.target.closest('.map-item').classList.toggle('selected');
    
    if (game.selectedLeaders.includes(leader)) {
        game.selectedLeaders = game.selectedLeaders.filter(l => l !== leader);
    } else {
        game.selectedLeaders.push(leader);
    }
};

// Room 4 decryption tracking
window.decryptedMessages = [];

// Room 4 message checking
window.checkMessage = function(messageNumber) {
    console.log('checkMessage called for message', messageNumber);
    const input = document.getElementById(`message${messageNumber}`).value.trim().toUpperCase();
    console.log('Input:', input);
    let correctAnswer = '';
    
    switch(messageNumber) {
        case 1:
            correctAnswer = 'WE MUST STOP THE MISSILES';
            break;
        case 2:
            correctAnswer = 'WE WILL REMOVE THEM';
            break;
        case 3:
            correctAnswer = 'IT HAPPENED IN 13 DAYS';
            break;
    }
    
    console.log('Correct answer:', correctAnswer);
    console.log('Match:', input === correctAnswer);
    
    if (input === correctAnswer) {
        if (!window.decryptedMessages.includes(messageNumber)) {
            window.decryptedMessages.push(messageNumber);
        }
        
        const messageBox = document.getElementById(`message${messageNumber}`).closest('.message-box');
        if (messageBox) {
            messageBox.style.borderColor = '#00ff41';
            messageBox.style.backgroundColor = 'rgba(0, 255, 65, 0.1)';
        }
        
        game.showMessage(4, `✅ Melding ${messageNumber} dekryptert: "${correctAnswer}"`, 'success');

        // Pling-lyd
        console.log('Playing sound...');
        const audio = document.getElementById('pling-audio');
        if (audio) {
            audio.currentTime = 0;
            audio.play().then(() => {
                console.log('Sound played successfully');
            }).catch(err => {
                console.error('Error playing sound:', err);
            });
        } else {
            console.error('Audio element not found!');
        }

        // Stempel
        console.log('Showing stamp...');
        const stamp = document.getElementById(`stamp${messageNumber}`);
        if (stamp) {
            stamp.innerHTML = '<span class="riktig-stamp">✓ RIKTIG!</span>';
            console.log('Stamp added to DOM');
            setTimeout(() => { 
                stamp.innerHTML = ''; 
                console.log('Stamp removed');
            }, 3000);
        } else {
            console.error('Stamp container not found!');
        }
        
        // Show final code section when all messages are decrypted
        if (window.decryptedMessages.length === 3) {
            document.getElementById('finalCodeSection').style.display = 'block';
            game.showMessage(4, '🎊 Alle meldinger dekryptert! Nå kan du finne den siste koden.', 'success');
        }
    } else {
        console.log('Wrong answer');
        game.showMessage(4, `❌ Feil dekryptering av melding ${messageNumber}. Prøv igjen!`, 'error');
    }
};

window.checkRoom4 = function() {
    const days = parseInt(document.getElementById('crisisDays').value);
    
    if (days === 13 && window.decryptedMessages.length === 3) {
        clearFailures(4);
        game.showSolvedStamp();
        setTimeout(() => game.nextRoom(), 3000);
    } else if (window.decryptedMessages.length < 3) {
        game.showMessage(4, '❌ Du må dekryptere alle tre meldingene først!', 'error');
        recordFailure(4);
    } else {
        game.showMessage(4, '❌ Feil antall dager. Les meldingene du dekrypterte nøye.', 'error');
        recordFailure(4);
    }
};

// Nye funksjoner for rom 6-11
window.selectedDocument = '';
window.selectDocument = function(doc) {
    window.selectedDocument = doc;
    document.querySelectorAll('.map-item').forEach(item => {
        item.classList.remove('selected');
    });
    event.target.closest('.map-item').classList.add('selected');
};
window.checkRoom5 = function() {
    if (window.selectedDocument === 'oktober') {
        clearFailures(5);
        game.showSolvedStamp();
        setTimeout(() => game.nextRoom(), 3000);
    } else {
        game.showMessage(5, '❌ Feil dokument. Prøv igjen.', 'error');
        recordFailure(5);
    }
};

window.checkRoom6 = function() {
    const count = parseInt(document.getElementById('rocketCount').value);
    if (count === 42) {
        clearFailures(6);
        game.showSolvedStamp();
        setTimeout(() => game.nextRoom(), 3000);
    } else {
        game.showMessage(6, '❌ Feil antall. Lytt nøye.', 'error');
        recordFailure(6);
    }
};

window.checkRoom7 = function() {
    const years = parseInt(document.getElementById('yearsAfter').value);
    if (years === 5) {
        clearFailures(7);
        game.showSolvedStamp();
        setTimeout(() => game.nextRoom(), 3000);
    } else {
        game.showMessage(7, '❌ Feil. Regn: 1945 + X = ca. 1950.', 'error');
        recordFailure(7);
    }
};

window.selectedLeaders8 = [];
window.selectLeader8 = function(leader) {
    event.target.closest('.map-item').classList.toggle('selected');
    
    if (window.selectedLeaders8.includes(leader)) {
        window.selectedLeaders8 = window.selectedLeaders8.filter(l => l !== leader);
    } else {
        window.selectedLeaders8.push(leader);
    }
};

window.checkRoom8 = function() {
    if (window.selectedLeaders8.includes('Kennedy') && window.selectedLeaders8.includes('Khrushchev') && !window.selectedLeaders8.includes('Castro')) {
        clearFailures(8);
        game.showSolvedStamp();
        setTimeout(() => game.nextRoom(), 3000);
    } else {
        game.showMessage(8, '❌ Feil valg. Castro var ikke hovedforhandler.', 'error');
        recordFailure(8);
    }
};

window.checkRoom9 = function() {
    const word = document.getElementById('codeword').value.toLowerCase();
    if (word === 'tøvær') {
        clearFailures(9);
        game.showSolvedStamp();
        setTimeout(() => game.nextRoom(), 3000);
    } else {
        game.showMessage(9, '❌ Feil kodeord. Prøv igjen.', 'error');
        recordFailure(9);
    }
};

window.showHint = function(roomNumber) {
    game.showHint(roomNumber);
};

window.restartGame = function() {
    game.restartGame();
};

window.nextRoom = function() {
    game.nextRoom();
};

window.showMessage = function(roomId, message, type) {
    game.showMessage(roomId, message, type);
};

window.updateProgress = function() {
    game.updateProgress();
};

window.updateTimer = function() {
    game.updateTimer();
};

// Initialiser spillet når det eksplisitt blir startet fra UI (briefing)
const game = new Game();

// Eksporter eller gjør tilgjengelig en global funksjon for å starte spillet
window.startGame = function() {
    // Vis spillcontainer og skjul landingsside hvis begge finnes
    const landing = document.getElementById('landingPage');
    const gameContainer = document.getElementById('gameContainer');
    if (landing) landing.style.display = 'none';
    if (gameContainer) gameContainer.style.display = 'block';

    // Vis fast tilbakeknapp
    const backBtn = document.getElementById('fixedBackBtn');
    if (backBtn) backBtn.style.display = 'block';

    // Hvis første rom er room 1, vis fullskjerms bakgrunn nå
    if (rooms[0] && rooms[0].id === 1) {
        document.body.classList.add('room-bg-1');
    }

    // Initialiser spillobjektet
    game.init();
};

// Cancel / abort mission: reset game and return to landing page
window.cancelMission = function() {
    // stop timer
    try { clearInterval(game.timerInterval); } catch(e) {}
    // reset game state
    try { game.restartGame(); } catch(e) {}

    // hide game container, show landing
    const gameContainer = document.getElementById('gameContainer');
    const landing = document.getElementById('landingPage');
    if (gameContainer) gameContainer.style.display = 'none';
    if (landing) landing.style.display = 'block';

    // hide fixed back button
    const backBtn = document.getElementById('fixedBackBtn');
    if (backBtn) backBtn.style.display = 'none';

    // reset body backgrounds
    document.body.classList.remove('room-bg-1');
    document.body.classList.remove('room-bg-2');
    document.body.classList.remove('room-bg-3');

    // navigate to landing page URL (optional: keep on same page)
    // window.location.href = 'index.html';
};

// Hvis siden lastes med ?start=1 i URL, start spillet automatisk
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('start') === '1') {
        // Vent et lite øyeblikk for at DOM er klar
        setTimeout(() => window.startGame(), 50);
    }
});