// game.js - Spillmotor for Escape Room

import rooms from './rooms/index.js';

// Konstanter for localStorage
const STORAGE_KEY = 'escaperoom_gamestate';
const RESET_CODE = 'kaldkrig2026'; // Lærerkode for å nullstille

class Game {
    constructor() {
        this.currentRoomIndex = 0; // Start på room 1
        this.startTime = Date.now();
        this.gameTime = 60 * 60 * 1000; // 60 minutter
        this.selectedAlliances = [];
        this.selectedLeaders = [];
        this.selectedLeaders8 = [];
        this.timerInterval = null;
    }
    
    // Lagre spilltilstand til localStorage
    saveState() {
        const state = {
            startTime: this.startTime,
            currentRoomIndex: this.currentRoomIndex,
            failures: window._roomFailures || {},
            savedAt: Date.now()
        };
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch(e) {
            console.log('Kunne ikke lagre spilltilstand:', e);
        }
    }
    
    // Last spilltilstand fra localStorage
    loadState() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const state = JSON.parse(saved);
                // Sjekk at lagret tilstand ikke er for gammel (maks 2 timer)
                if (Date.now() - state.savedAt < 2 * 60 * 60 * 1000) {
                    return state;
                } else {
                    // For gammel tilstand, slett den
                    this.clearState();
                }
            }
        } catch(e) {
            console.log('Kunne ikke laste spilltilstand:', e);
        }
        return null;
    }
    
    // Slett lagret tilstand
    clearState() {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch(e) {
            console.log('Kunne ikke slette spilltilstand:', e);
        }
    }

    init() {
        // Sjekk om det finnes lagret tilstand
        const savedState = this.loadState();
        if (savedState) {
            this.startTime = savedState.startTime;
            this.currentRoomIndex = savedState.currentRoomIndex;
            // Valider at roomIndex er gyldig
            if (this.currentRoomIndex < 0 || this.currentRoomIndex >= rooms.length) {
                console.log('Ugyldig romindeks, nullstiller til 0');
                this.currentRoomIndex = 0;
                this.clearState();
            }
            window._roomFailures = savedState.failures || {};
            console.log('Gjenopprettet spilltilstand fra forrige økt');
        }
        
        this.renderRooms();
        this.startTimer();
        this.updateProgress();
        this.showCurrentRoom();
        
        // Lagre tilstand periodisk (hvert 5. sekund)
        setInterval(() => this.saveState(), 5000);
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

        // Update progress bar to match time elapsed
        const percentElapsed = (elapsed / this.gameTime) * 100;
        document.getElementById('progress').style.width = Math.min(100, percentElapsed) + '%';

        if (remaining <= 0) {
            clearInterval(this.timerInterval);
            alert('⏰ Tiden er ute! Prøv igjen.');
        }
    }

    showMessage(roomId, message, type = 'success') {
        const messageDiv = document.getElementById(`message${roomId}`);
        if (!messageDiv) return; // Sikkerhet mot null
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
        } catch (err) {
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
        this.saveState(); // Lagre når vi bytter rom
    }

    showCurrentRoom() {
        if (!rooms[this.currentRoomIndex]) {
            console.error('Ugyldig romindeks:', this.currentRoomIndex);
            this.currentRoomIndex = 0;
        }
        const roomId = rooms[this.currentRoomIndex].id;
        const roomIndex = this.currentRoomIndex;

        // Fjern active-klassen fra ALLE rom først
        document.querySelectorAll('.room').forEach(room => {
            room.classList.remove('active');
        });

        // Legg til active på kun det aktuelle rommet
        const currentRoomElement = document.getElementById(`room${roomId}`);
        if (currentRoomElement) {
            currentRoomElement.classList.add('active');
        }

        // Fjern alle bakgrunnsklasser først, så legg til riktig
        document.body.classList.remove('room-bg-0', 'room-bg-1', 'room-bg-2', 'room-bg-3', 'room-bg-4', 'room-bg-5', 'room-bg-6', 'room-bg-7', 'room-bg-8', 'room-bg-9');
        document.body.classList.add(`room-bg-${roomIndex}`);

        // Initialize room-specific features after DOM is ready
        if (roomId === 7) {
            // Use requestAnimationFrame to ensure DOM is rendered
            requestAnimationFrame(() => {
                setTimeout(() => {
                    if (typeof window.initRoom7 === 'function') {
                        console.log('Calling initRoom7');
                        window.initRoom7();
                    } else {
                        console.error('initRoom7 function not found!');
                    }
                }, 100);
            });
        } else if (roomId === 9) {
            // Initialize Room 9 memory game
            requestAnimationFrame(() => {
                setTimeout(() => {
                    if (typeof window.initRoom9 === 'function') {
                        console.log('Calling initRoom9');
                        window.initRoom9();
                    } else {
                        console.error('initRoom9 function not found!');
                    }
                }, 100);
            });
        } else if (roomId === 10) {
            // Initialize Room 10 matching game
            requestAnimationFrame(() => {
                setTimeout(() => {
                    if (typeof window.initRoom10 === 'function') {
                        console.log('Calling initRoom10');
                        window.initRoom10();
                    } else {
                        console.error('initRoom10 function not found!');
                    }
                }, 100);
            });
        }

        // Update attempts display for the room when shown
        try { updateAttemptDisplay(roomId); } catch (e) { /* ignore */ }
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
        window._roomFailures = {}; // Reset failures
        
        // Slett lagret tilstand
        this.clearState();
        
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

    gotoRoom(roomNumber) {
        const index = rooms.findIndex(r => r.id === roomNumber);
        if (index !== -1) {
            this.currentRoomIndex = index;
            this.showCurrentRoom();
            this.updateProgress();
            console.log(`Navigerte til rom ${roomNumber}`);
        } else {
            console.error(`Rom ${roomNumber} finnes ikke.`);
        }
    }
}

// Globale funksjoner for onclick
// Per-room failure tracking and cooldowns
window._roomFailures = {}; // { roomId: {count, cooldownEndsAt, timerId} }

window.recordFailure = function (roomId) {
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
    try { updateAttemptDisplay(roomId); } catch (e) { }
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
            try { updateAttemptDisplay(roomId); } catch (e) { }
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
    try { updateAttemptDisplay(roomId); } catch (e) { }
}

window.showSolvedStamp = function () {
    game.showSolvedStamp();
};

window.checkRoom1 = function () {
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
window.nextHint1 = function () {
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
        // Trekk fra 30 sekunder
        applyHintPenalty();
    }
};

// Hints for room 2 - cycle through 3 hints
window._room2HintIndex = 0;
window.nextHint2 = function () {
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
        // Trekk fra 30 sekunder
        applyHintPenalty();
    }
};

// Hints for room 3 - cycle through 3 hints
window._room3HintIndex = 0;
window.nextHint3 = function () {
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
        // Trekk fra 30 sekunder
        applyHintPenalty();
    }
};

// Hints for room 4 - cycle through 3 hints
window._room4HintIndex = 0;
window.nextHint4 = function() {
    const hints = [
        'Melding 1: Flytt hver bokstav ett steg tilbake i alfabetet.',
        'Melding 2: Flytt hver bokstav tre steg tilbake i alfabetet.',
        'Melding 3: Les meldingen baklengs, ord for ord.'
    ];
    const box = document.getElementById('hint4Box');
    const btn = document.getElementById('hint4Btn');
    if (!box || !btn) return;

    if (window._room4HintIndex < hints.length) {
        const p = document.createElement('p');
        p.textContent = `Hint ${window._room4HintIndex + 1}: ${hints[window._room4HintIndex]}`;
        box.appendChild(p);
        window._room4HintIndex++;
        if (window._room4HintIndex >= hints.length) {
            btn.disabled = true;
            btn.textContent = '💡 Ingen flere hint';
        }
        applyHintPenalty();
    }
};

// Hints for room 5 - cycle through 3 hints
window._room5HintIndex = 0;
window.nextHint5 = function() {
    const hints = [
        'Kartkoordinatene finner du ved å lese av rutenett på kartet.',
        'Kombiner bokstaver fra de tre stedene du finner.',
        'De skjulte bokstavene danner et ord når du setter dem sammen i riktig rekkefølge.'
    ];
    const box = document.getElementById('hint5Box');
    const btn = document.getElementById('hint5Btn');
    if (!box || !btn) return;

    if (window._room5HintIndex < hints.length) {
        const p = document.createElement('p');
        p.textContent = `Hint ${window._room5HintIndex + 1}: ${hints[window._room5HintIndex]}`;
        box.appendChild(p);
        window._room5HintIndex++;
        if (window._room5HintIndex >= hints.length) {
            btn.disabled = true;
            btn.textContent = '💡 Ingen flere hint';
        }
        applyHintPenalty();
    }
};

// Hints for room 6 - cycle through 3 hints
window._room6HintIndex = 0;
window.nextHint6 = function() {
    const hints = [
        'Lytt nøye til morsekoden - kort pip er prikk, langt pip er strek.',
        'Sammenlign koden du dekoder med tallene på stedene på kartet.',
        'Agentnavnet består av bokstavene som er skjult i bildet - se nøye etter!'
    ];
    const box = document.getElementById('hint6Box');
    const btn = document.getElementById('hint6Btn');
    if (!box || !btn) return;

    if (window._room6HintIndex < hints.length) {
        const p = document.createElement('p');
        p.textContent = `Hint ${window._room6HintIndex + 1}: ${hints[window._room6HintIndex]}`;
        box.appendChild(p);
        window._room6HintIndex++;
        if (window._room6HintIndex >= hints.length) {
            btn.disabled = true;
            btn.textContent = '💡 Ingen flere hint';
        }
        applyHintPenalty();
    }
};

// Hints for room 7 - cycle through 3 hints
window._room7HintIndex = 0;
window.nextHint7 = function() {
    const hints = [
        'Tenk på verdenshistorien fra slutten av andre verdenskrig og fremover.',
        'Jalta-konferansen var før Koreakrigen som var før Stalin døde.',
        'Safe-koden er siste siffer i årstallene når de er i riktig rekkefølge.'
    ];
    const box = document.getElementById('hint7Box');
    const btn = document.getElementById('hint7Btn');
    if (!box || !btn) return;

    if (window._room7HintIndex < hints.length) {
        const p = document.createElement('p');
        p.textContent = `Hint ${window._room7HintIndex + 1}: ${hints[window._room7HintIndex]}`;
        box.appendChild(p);
        window._room7HintIndex++;
        if (window._room7HintIndex >= hints.length) {
            btn.disabled = true;
            btn.textContent = '💡 Ingen flere hint';
        }
        applyHintPenalty();
    }
};

// Hints for room 8 - cycle through 3 hints
window._room8HintIndex = 0;
window.nextHint8 = function() {
    const hints = [
        'Møtetidspunktet ble avslørt av agent Petrov i rom 6 - sjekk oppdragsinformasjonen.',
        'USSR måtte fjerne sine missiler, akseptere inspeksjon og stoppe våpentransporter.',
        'USA lovte å ikke invadere Cuba, fjerne sine missiler fra Tyrkia og avslutte blokaden.'
    ];
    const box = document.getElementById('hint8Box');
    const btn = document.getElementById('hint8Btn');
    if (!box || !btn) return;

    if (window._room8HintIndex < hints.length) {
        const p = document.createElement('p');
        p.textContent = `Hint ${window._room8HintIndex + 1}: ${hints[window._room8HintIndex]}`;
        box.appendChild(p);
        window._room8HintIndex++;
        if (window._room8HintIndex >= hints.length) {
            btn.disabled = true;
            btn.textContent = '💡 Ingen flere hint';
        }
        applyHintPenalty();
    }
};

// Funksjon for å trekke fra tid når hint brukes
function applyHintPenalty() {
    if (game && game.startTime) {
        // Trekk fra 30 sekunder ved å flytte starttiden fremover
        game.startTime -= 30 * 1000;
        game.showMessage('timer', '⏱️ -30 sekunder! Hint koster tid.', 'error');
    }
}

// legacy selectAlliance removed (room2 now uses selectEvent2/ resetSequence2)

// Room 2: timeline selection handlers
window._room2Sequence = [];
window.selectEvent2 = function (eventKey) {
    // add to sequence if not already full
    if (!window._room2Sequence) window._room2Sequence = [];
    if (window._room2Sequence.length >= 4) return;
    window._room2Sequence.push(eventKey);
    const seqBox = document.getElementById('sequence2');
    if (seqBox) {
        const labels = window._room2Sequence.map((k, i) => `${i + 1}. ${formatEventLabel(k)}`);
        seqBox.textContent = labels.join(' \n');
    }
};

window.resetSequence2 = function () {
    window._room2Sequence = [];
    const seqBox = document.getElementById('sequence2');
    if (seqBox) seqBox.textContent = '';
};

window.checkRoom2 = function () {
    const seq = window._room2Sequence || [];
    const correct = ['Berlin', 'NATO', 'Korea', 'Warszawa'];
    if (seq.length !== correct.length) {
        game.showMessage(2, `❌ Du må velge alle 4 hendelsene først. Du har valgt ${seq.length} av 4.`, 'error');
        return;
    }
    
    // Count correct positions
    let correctCount = 0;
    for (let i = 0; i < correct.length; i++) {
        if (seq[i] === correct[i]) {
            correctCount++;
        }
    }
    
    if (correctCount === 4) {
        clearFailures(2);
        game.showSolvedStamp();
        setTimeout(() => game.nextRoom(), 3000);
    } else {
        game.showMessage(2, `📊 ${correctCount} av 4 riktig plassert. Tenk kronologisk — begynn med det eldste.`, 'error');
        recordFailure(2);
    }
};

function formatEventLabel(key) {
    switch (key) {
        case 'NATO': return 'Opprettelsen av NATO';
        case 'Warszawa': return 'Opprettelsen av Warszawapakten';
        case 'Berlin': return 'Berlinblokaden';
        case 'Korea': return 'Koreakrigen';
        default: return key;
    }
}

window.checkRoom3 = function () {
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
window.showMorseAlphabet = function () {
    const modal = document.getElementById('morseModal');
    if (!modal) return;
    modal.style.display = 'block';
};

window.closeMorseAlphabet = function () {
    const modal = document.getElementById('morseModal');
    if (!modal) return;
    modal.style.display = 'none';
};

window.checkMorse = function () {
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

window.selectLeader = function (leader) {
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
window.checkMessage = function (messageNumber) {
    console.log('checkMessage called for message', messageNumber);
    const inputElement = document.getElementById(`decrypt${messageNumber}`);

    if (!inputElement) {
        console.error(`Input element decrypt${messageNumber} not found!`);
        return;
    }

    if (!inputElement.value) {
        console.error(`Input element has no value property!`);
        return;
    }

    const input = inputElement.value.trim().toUpperCase();
    console.log('Input:', input);
    let correctAnswer = '';

    switch (messageNumber) {
        case 1:
            correctAnswer = 'WE MUST STOP THE MISSILES';
            break;
        case 2:
            correctAnswer = 'WE WILL DEPLOY THEM';
            break;
        case 3:
            correctAnswer = 'SOVIET MISSILES OPERATIONAL NOW';
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

        // Pling-lyd med Web Audio API
        console.log('Playing sound...');
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioCtx = new AudioContext();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            const now = audioCtx.currentTime;
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            oscillator.start(now);
            oscillator.stop(now + 0.2);
            console.log('Sound played successfully');
        } catch (err) {
            console.error('Error playing sound:', err);
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
        recordFailure(4);
    }
};

window.checkRoom4 = function () {
    const dateInput = document.getElementById('crisisDate').value;
    console.log('checkRoom4 called');
    console.log('Date entered:', dateInput);
    console.log('Decrypted messages count:', window.decryptedMessages.length);
    console.log('Decrypted messages:', window.decryptedMessages);

    if (dateInput === '14101962MSK' && window.decryptedMessages.length === 3) {
        console.log('Room 4 solved!');
        clearFailures(4);
        game.showSolvedStamp();
        setTimeout(() => game.nextRoom(), 3000);
    } else if (window.decryptedMessages.length < 3) {
        console.log('Not all messages decrypted');
        game.showMessage(4, '❌ Du må dekryptere alle tre meldingene først!', 'error');
        recordFailure(4);
    } else {
        console.log('Wrong date');
        game.showMessage(4, '❌ Feil kode. Husk både dato og tidssone!', 'error');
        recordFailure(4);
    }
};

// Nye funksjoner for rom 6-11
// Rom 5: Hemmelige dokumenter
window.checkRoom5 = function () {
    const rocketCount = parseInt(document.getElementById('rocketCount').value);
    const distance = parseInt(document.getElementById('distance').value);
    const pilotName = document.getElementById('pilotName').value.trim().toUpperCase();
    const operationName = document.getElementById('operationName').value.trim().toUpperCase();

    console.log('Room 6 check:', { rocketCount, distance, pilotName, operationName });

    const correctAnswers = {
        rockets: 42,
        distance: 1850,
        pilot: 'RUDOLF ANDERSON',
        operation: 'OPERATION QUARANTINE'
    };

    // Check all answers
    if (rocketCount === correctAnswers.rockets &&
        distance === correctAnswers.distance &&
        (pilotName === correctAnswers.pilot || pilotName === 'MAJOR RUDOLF ANDERSON') &&
        (operationName === correctAnswers.operation || operationName === 'QUARANTINE')) {

        clearFailures(5);
        game.showSolvedStamp();
        setTimeout(() => game.nextRoom(), 3000);
    } else {
        let errors = [];
        if (rocketCount !== correctAnswers.rockets) errors.push('rakettantall');
        if (distance !== correctAnswers.distance) errors.push('avstand');
        if (pilotName !== correctAnswers.pilot && pilotName !== 'MAJOR RUDOLF ANDERSON') errors.push('pilot');
        if (operationName !== correctAnswers.operation && operationName !== 'QUARANTINE') errors.push('operasjonsnavn');

        game.showMessage(5, `❌ Feil i: ${errors.join(', ')}. Sjekk dokumentene nøye!`, 'error');
        recordFailure(5);
    }
};

// Rom 5: Sjekk individuelle svar

// Check individual answers in Room 5 and show stamp
window.checkAnswer5 = function (questionNumber) {
    const correctAnswers = {
        1: 42,
        2: 1850,
        3: ['RUDOLF ANDERSON', 'MAJOR RUDOLF ANDERSON'],
        4: ['OPERATION QUARANTINE']
    };

    let isCorrect = false;
    let value;

    switch (questionNumber) {
        case 1:
            value = parseInt(document.getElementById('rocketCount').value);
            isCorrect = value === correctAnswers[1];
            break;
        case 2:
            value = parseInt(document.getElementById('distance').value);
            isCorrect = value === correctAnswers[2];
            break;
        case 3:
            value = document.getElementById('pilotName').value.trim().toUpperCase();
            isCorrect = correctAnswers[3].includes(value);
            break;
        case 4:
            value = document.getElementById('operationName').value.trim().toUpperCase();
            isCorrect = correctAnswers[4].includes(value);
            break;
    }

    if (isCorrect) {
        // Make button green
        const button = document.getElementById(`btn-q${questionNumber}`);
        if (button) {
            button.style.backgroundColor = '#00ff41';
            button.style.color = '#000';
            button.textContent = '✓ Riktig!';
        }

        // Play sound
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioCtx = new AudioContext();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            const now = audioCtx.currentTime;
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            oscillator.start(now);
            oscillator.stop(now + 0.2);
        } catch (err) {
            console.error('Error playing sound:', err);
        }

        // Show stamp
        const stamp = document.getElementById(`stamp-q${questionNumber}`);
        if (stamp) {
            stamp.innerHTML = '<span class="riktig-stamp">✓ RIKTIG!</span>';
            setTimeout(() => {
                stamp.innerHTML = '';
            }, 3000);
        }
    } else {
        // Record failure
        recordFailure(5);

        // Visual feedback for wrong answer
        const button = document.getElementById(`btn-q${questionNumber}`);
        if (button) {
            button.style.backgroundColor = '#ff4444';
            button.textContent = '✗ Feil';
            setTimeout(() => {
                button.style.backgroundColor = '';
                button.textContent = 'Sjekk svar ✓';
            }, 1500);
        }
    }
};

// Rom 6: Avlyttet melding fra Moskva (morse) - handlers er i room6.js

window.checkRoom7 = function () {
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
window.selectLeader8 = function (leader) {
    event.target.closest('.map-item').classList.toggle('selected');

    if (window.selectedLeaders8.includes(leader)) {
        window.selectedLeaders8 = window.selectedLeaders8.filter(l => l !== leader);
    } else {
        window.selectedLeaders8.push(leader);
    }
};

window.checkRoom8 = function () {
    if (window.selectedLeaders8.includes('Kennedy') && window.selectedLeaders8.includes('Khrushchev') && !window.selectedLeaders8.includes('Castro')) {
        clearFailures(8);
        game.showSolvedStamp();
        setTimeout(() => game.nextRoom(), 3000);
    } else {
        game.showMessage(8, '❌ Feil valg. Castro var ikke hovedforhandler.', 'error');
        recordFailure(8);
    }
};

// Room 9 logic is handled via window.initRoom9 in room9.js
window.checkRoom9 = function () {
    // Legacy support/fallback
    const puzzleSolved = document.querySelectorAll('.memory-card.matched').length === 20;
    if (puzzleSolved) {
        return true;
    }
    return false;
};

window.showHint = function (roomNumber) {
    game.showHint(roomNumber);
};

window.restartGame = function () {
    game.restartGame();
};

window.nextRoom = function () {
    game.nextRoom();
};

window.showMessage = function (roomId, message, type) {
    game.showMessage(roomId, message, type);
};

window.gotoRoom = function (roomNumber) {
    game.gotoRoom(roomNumber);
};

window.updateProgress = function () {
    game.updateProgress();
};

window.updateTimer = function () {
    game.updateTimer();
};

// Initialiser spillet når det eksplisitt blir startet fra UI (briefing)
const game = new Game();

// Gjør game tilgjengelig globalt for testing
window.game = game;

// Hjelpefunksjon for å hoppe til et rom under testing
window.gotoRoom = function (roomNumber) {
    game.currentRoomIndex = roomNumber - 1;
    game.showCurrentRoom();
    game.updateProgress();
    console.log(`Hoppet til rom ${roomNumber}`);
};

// Eksporter eller gjør tilgjengelig en global funksjon for å starte spillet
window.startGame = function () {
    // Vis spillcontainer og skjul landingsside hvis begge finnes
    const landing = document.getElementById('landingPage');
    const gameContainer = document.getElementById('gameContainer');
    if (landing) landing.style.display = 'none';
    if (gameContainer) gameContainer.style.display = 'block';

    // Vis fast tilbakeknapp
    const backBtn = document.getElementById('fixedBackBtn');
    if (backBtn) backBtn.style.display = 'block';

    // Sett bakgrunn for første rom
    document.body.classList.add('room-bg-0');

    // Initialiser spillobjektet
    game.init();
};

// Cancel / abort mission: reset game and return to landing page
window.cancelMission = function () {
    // stop timer
    try { clearInterval(game.timerInterval); } catch (e) { }
    // reset game state
    try { game.restartGame(); } catch (e) { }

    // hide game container, show landing
    const gameContainer = document.getElementById('gameContainer');
    const landing = document.getElementById('landingPage');
    if (gameContainer) gameContainer.style.display = 'none';
    if (landing) landing.style.display = 'block';

    // hide fixed back button
    const backBtn = document.getElementById('fixedBackBtn');
    if (backBtn) backBtn.style.display = 'none';

    // reset body backgrounds
    document.body.classList.remove('room-bg-0', 'room-bg-1', 'room-bg-2', 'room-bg-3', 'room-bg-4', 'room-bg-5', 'room-bg-6', 'room-bg-7', 'room-bg-8', 'room-bg-9');

    // navigate to landing page URL (optional: keep on same page)
    // window.location.href = 'index.html';
};

// Hvis siden lastes med ?start=1 i URL, start spillet automatisk
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    
    // Sjekk for reset-kode fra lærer
    const resetParam = params.get('reset');
    if (resetParam === RESET_CODE) {
        try {
            localStorage.removeItem(STORAGE_KEY);
            console.log('Spilltilstand nullstilt av lærer');
            // Fjern reset fra URL så den ikke blir lagret
            window.history.replaceState({}, '', window.location.pathname);
        } catch(e) {}
    }
    
    if (params.get('start') === '1') {
        // Sjekk om det er en room parameter (f.eks ?start=1&room=5)
        const roomParam = params.get('room');
        if (roomParam) {
            const roomIndex = parseInt(roomParam) - 1; // Konverter til 0-indeksert
            if (roomIndex >= 0 && roomIndex < rooms.length) {
                game.currentRoomIndex = roomIndex;
            }
        }
        // Vent et lite øyeblikk for at DOM er klar
        setTimeout(() => window.startGame(), 50);
    }
});

// Global funksjon for å nullstille spillet (krever kode)
window.resetGame = function(code) {
    if (code === RESET_CODE) {
        game.clearState();
        game.restartGame();
        console.log('Spillet er nullstilt');
        return true;
    } else {
        console.log('Feil kode. Spillet ble ikke nullstilt.');
        return false;
    }
};

// DEV: Enkel nullstilling - Ctrl+Shift+R i konsoll
window.devReset = function() {
    localStorage.removeItem(STORAGE_KEY);
    console.log('🔄 Dev reset: Spilltilstand slettet. Refresh siden.');
};

// DEV: Tastatursnarvei Ctrl+Shift+D for dev reset + refresh
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        localStorage.removeItem(STORAGE_KEY);
        console.log('🔄 Dev reset utført');
        location.reload();
    }
});