// game.js - Spillmotor for Escape Room

import rooms from './rooms/index.js';

class Game {
    constructor() {
        this.currentRoomIndex = 0;
        this.startTime = Date.now();
        this.gameTime = 60 * 60 * 1000; // 60 minutter
        this.selectedAlliances = [];
        this.selectedLeaders = [];
        this.selectedLeaders9 = [];
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

    updateProgress() {
        const progress = (this.currentRoomIndex) * (100 / 11);
        document.getElementById('progress').style.width = progress + '%';
    }

    nextRoom() {
        document.getElementById(`room${rooms[this.currentRoomIndex].id}`).classList.remove('active');
        this.currentRoomIndex++;
        this.showCurrentRoom();
        this.updateProgress();
    }

    showCurrentRoom() {
        document.getElementById(`room${rooms[this.currentRoomIndex].id}`).classList.add('active');
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
        this.selectedLeaders9 = [];
        
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
window.checkRoom1 = function() {
    const year = parseInt(document.getElementById('year1').value);
    if (year >= 1946 && year <= 1947) {
        game.showMessage(1, '🎉 Korrekt! Den kalde krigen startet rett etter andre verdenskrig. Tilgang innvilget!');
        setTimeout(() => game.nextRoom(), 2000);
    } else {
        game.showMessage(1, '❌ Feil årstall. Prøv igjen! Tenk på slutten av andre verdenskrig.', 'error');
    }
};

window.selectAlliance = function(alliance) {
    document.querySelectorAll('.map-item').forEach(item => {
        item.classList.remove('selected');
    });
    event.target.closest('.map-item').classList.add('selected');
    
    if (alliance === 'NATO') {
        document.getElementById('alliance1').value = 'NATO';
    } else if (alliance === 'Warszawa') {
        document.getElementById('alliance2').value = 'Warszawapakten';
    }
};

window.checkRoom2 = function() {
    const alliance1 = document.getElementById('alliance1').value;
    const alliance2 = document.getElementById('alliance2').value;
    
    if (alliance1 === 'NATO' && alliance2 === 'Warszawapakten') {
        game.showMessage(2, '🎉 Perfekt! Du har identifisert de to store militære alliansene. Koden er dekryptert!');
        setTimeout(() => game.nextRoom(), 2000);
    } else {
        game.showMessage(2, '❌ Ikke riktig kombinasjon. Velg en vest-allianse og en øst-allianse.', 'error');
    }
};

window.checkRoom3 = function() {
    const year = parseInt(document.getElementById('berlinYear').value);
    const month = parseInt(document.getElementById('berlinMonth').value);
    
    if (year === 1961 && month === 8) {
        game.showMessage(3, '🎉 Riktig! Berlinmuren ble bygget i august 1961. Safen er åpen!');
        document.getElementById('morseCode').style.display = 'block';
    } else {
        game.showMessage(3, '❌ Feil dato. Muren ble bygget "over natten" i 1961.', 'error');
    }
};

window.checkMorse = function() {
    const answer = document.getElementById('morseAnswer').value.toLowerCase();
    if (answer === 'yes we can' || answer === 'yeswecan') {
        game.showMessage(3, '🎉 Morse-koden dekryptert! "YES WE CAN" - du kan gå videre!');
        setTimeout(() => game.nextRoom(), 2000);
    } else {
        game.showMessage(3, '❌ Feil dekoding. Prøv igjen med morse-tabellen.', 'error');
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

window.checkRoom4 = function() {
    const days = parseInt(document.getElementById('crisisDays').value);
    const hasKennedy = game.selectedLeaders.includes('Kennedy');
    const hasKhrushchev = game.selectedLeaders.includes('Khrushchev');
    
    if (days === 13 && hasKennedy && hasKhrushchev) {
        game.showMessage(4, '🎉 Fantastisk! Du har stoppet atomkrigen! Kennedy og Khrushchev forhandlet i 13 dager.');
        setTimeout(() => game.nextRoom(), 2000);
    } else {
        game.showMessage(4, '❌ Ikke helt riktig. Sjekk lederne og antall dager (14.-28. oktober).', 'error');
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

window.checkRoom6 = function() {
    if (window.selectedDocument === 'oktober') {
        game.showMessage(6, '🎉 Funnet! Rakettene ble plassert i oktober.');
        setTimeout(() => game.nextRoom(), 2000);
    } else {
        game.showMessage(6, '❌ Feil dokument. Prøv igjen.', 'error');
    }
};

window.checkRoom7 = function() {
    const count = parseInt(document.getElementById('rocketCount').value);
    if (count === 42) {
        game.showMessage(7, '🎉 Riktig! Det var 42 raketter på Cuba.');
        setTimeout(() => game.nextRoom(), 2000);
    } else {
        game.showMessage(7, '❌ Feil antall. Lytt nøye.', 'error');
    }
};

window.checkRoom8 = function() {
    const years = parseInt(document.getElementById('yearsAfter').value);
    if (years === 5) {
        game.showMessage(8, '🎉 Korrekt! 5 år etter 1945.');
        setTimeout(() => game.nextRoom(), 2000);
    } else {
        game.showMessage(8, '❌ Feil. Regn: 1945 + X = ca. 1950.', 'error');
    }
};

window.selectedLeaders9 = [];
window.selectLeader9 = function(leader) {
    event.target.closest('.map-item').classList.toggle('selected');
    
    if (window.selectedLeaders9.includes(leader)) {
        window.selectedLeaders9 = window.selectedLeaders9.filter(l => l !== leader);
    } else {
        window.selectedLeaders9.push(leader);
    }
};

window.checkRoom9 = function() {
    if (window.selectedLeaders9.includes('Kennedy') && window.selectedLeaders9.includes('Khrushchev') && !window.selectedLeaders9.includes('Castro')) {
        game.showMessage(9, '🎉 Riktig! Kennedy og Khrushchev forhandlet.');
        setTimeout(() => game.nextRoom(), 2000);
    } else {
        game.showMessage(9, '❌ Feil valg. Castro var ikke hovedforhandler.', 'error');
    }
};

window.checkRoom10 = function() {
    const word = document.getElementById('codeword').value.toLowerCase();
    if (word === 'tøvær') {
        game.showMessage(10, '🎉 Sendt! Bevisene er ute.');
        setTimeout(() => game.nextRoom(), 2000);
    } else {
        game.showMessage(10, '❌ Feil kodeord. Prøv igjen.', 'error');
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

// Initialiser spillet
const game = new Game();
window.addEventListener('DOMContentLoaded', () => {
    game.init();
});