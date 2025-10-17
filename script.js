let currentRoom = 1;
let startTime = null;
let gameTime = 60 * 60 * 1000; // 60 minutter
let selectedAlliances = [];
let selectedLeaders = [];
let timerStarted = false;

// Start mission function
function startMission() {
    // Hide landing page
    document.getElementById('landingPage').style.display = 'none';
    
    // Show game container
    document.getElementById('gameContainer').style.display = 'block';
    
    // Start timer
    startTime = Date.now();
    timerStarted = true;
    updateTimer();
    
    // Add fade-in animation
    document.getElementById('gameContainer').style.animation = 'fadeIn 1s ease-in';
}

// Timer funksjon
function updateTimer() {
    if (!timerStarted || !startTime) return;
    
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, gameTime - elapsed);
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    
    document.getElementById('timer').textContent = 
        `⏰ Tid igjen: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (remaining > 0) {
        setTimeout(updateTimer, 1000);
    } else {
        showMessage('timer', '⏰ Tiden er ute! Prøv igjen.', 'error');
    }
}

function showMessage(roomId, message, type = 'success') {
    const messageDiv = document.getElementById(`message${roomId}`);
    messageDiv.innerHTML = `<div class="${type}-message">${message}</div>`;
    setTimeout(() => {
        if (type === 'success') {
            messageDiv.innerHTML = '';
        }
    }, 3000);
}

function updateProgress() {
    const progress = (currentRoom - 1) * 25;
    document.getElementById('progress').style.width = progress + '%';
}

function nextRoom() {
    document.getElementById(`room${currentRoom}`).classList.remove('active');
    currentRoom++;
    document.getElementById(`room${currentRoom}`).classList.add('active');
    updateProgress();
}

function showHint(roomNumber) {
    const hint = document.getElementById(`hint${roomNumber}`);
    hint.style.display = hint.style.display === 'none' ? 'block' : 'none';
}

// Rom 1: Årstall for kald krig
function checkRoom1() {
    const year = parseInt(document.getElementById('year1').value);
    if (year >= 1946 && year <= 1947) {
        showMessage(1, '🎉 Korrekt! Den kalde krigen startet rett etter andre verdenskrig. Tilgang innvilget!');
        setTimeout(nextRoom, 2000);
    } else {
        showMessage(1, '❌ Feil årstall. Prøv igjen! Tenk på slutten av andre verdenskrig.', 'error');
    }
}

// Rom 2: Allianser
function selectAlliance(alliance) {
    document.querySelectorAll('.map-item').forEach(item => {
        item.classList.remove('selected');
    });
    event.target.closest('.map-item').classList.add('selected');
    
    if (alliance === 'NATO') {
        document.getElementById('alliance1').value = 'NATO';
    } else if (alliance === 'Warszawa') {
        document.getElementById('alliance2').value = 'Warszawapakten';
    }
}

function checkRoom2() {
    const alliance1 = document.getElementById('alliance1').value;
    const alliance2 = document.getElementById('alliance2').value;
    
    if (alliance1 === 'NATO' && alliance2 === 'Warszawapakten') {
        showMessage(2, '🎉 Perfekt! Du har identifisert de to store militære alliansene. Koden er dekryptert!');
        setTimeout(nextRoom, 2000);
    } else {
        showMessage(2, '❌ Ikke riktig kombinasjon. Velg en vest-allianse og en øst-allianse.', 'error');
    }
}

// Rom 3: Berlinmuren og morse
function checkRoom3() {
    const year = parseInt(document.getElementById('berlinYear').value);
    const month = parseInt(document.getElementById('berlinMonth').value);
    
    if (year === 1961 && month === 8) {
        showMessage(3, '🎉 Riktig! Berlinmuren ble bygget i august 1961. Safen er åpen!');
        document.getElementById('morseCode').style.display = 'block';
    } else {
        showMessage(3, '❌ Feil dato. Muren ble bygget "over natten" i 1961.', 'error');
    }
}

function checkMorse() {
    const answer = document.getElementById('morseAnswer').value.toLowerCase();
    if (answer === 'yes we can' || answer === 'yeswecan') {
        showMessage(3, '🎉 Morse-koden dekryptert! "YES WE CAN" - du kan gå videre!');
        setTimeout(nextRoom, 2000);
    } else {
        showMessage(3, '❌ Feil dekoding. Prøv igjen med morse-tabellen.', 'error');
    }
}

// Rom 4: Cubakrisen
function selectLeader(leader) {
    event.target.closest('.map-item').classList.toggle('selected');
    
    if (selectedLeaders.includes(leader)) {
        selectedLeaders = selectedLeaders.filter(l => l !== leader);
    } else {
        selectedLeaders.push(leader);
    }
}

function checkRoom4() {
    const days = parseInt(document.getElementById('crisisDays').value);
    const hasKennedy = selectedLeaders.includes('Kennedy');
    const hasKhrushchev = selectedLeaders.includes('Khrushchev');
    
    if (days === 13 && hasKennedy && hasKhrushchev) {
        showMessage(4, '🎉 Fantastisk! Du har stoppet atomkrigen! Kennedy og Khrushchev forhandlet i 13 dager.');
        setTimeout(nextRoom, 2000);
    } else {
        showMessage(4, '❌ Ikke helt riktig. Sjekk lederne og antall dager (14.-28. oktober).', 'error');
    }
}

function restartGame() {
    currentRoom = 1;
    startTime = Date.now();
    selectedAlliances = [];
    selectedLeaders = [];
    timerStarted = true;
    
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
    document.getElementById('room1').classList.add('active');
    updateProgress();
    updateTimer();
}