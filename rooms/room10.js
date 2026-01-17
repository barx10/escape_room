import Room from './Room.js';

// Utvidet liste med begreper og forklaringer
const pairs = [
    { id: 1, concept: 'Jernteppet', explanation: 'Skillet mellom øst og vest i Europa' },
    { id: 2, concept: 'Kald krig', explanation: 'Spenning mellom USA og Sovjet uten direkte krig' },
    { id: 3, concept: 'NATO', explanation: 'Vestlig forsvarsallianse dannet i 1949' },
    { id: 4, concept: 'Terrorbalanse', explanation: 'Atomvåpen hindret krig mellom supermaktene' },
    { id: 5, concept: 'KGB', explanation: 'Sovjetunionens hemmelige etterretningstjeneste' },
    { id: 6, concept: 'Warszawapakten', explanation: 'Østblokkens militærallianse mot NATO' },
    { id: 7, concept: 'Cubakrisen', explanation: 'Verden på randen av atomkrig i 1962' },
    { id: 8, concept: 'Berlinmuren', explanation: 'Symbol på delingen av Europa 1961-1989' }
];

const room10 = new Room(
    10,
    'AVSLUTNING — BEGREPSFORSTÅELSE',
    `
    <h3 style="color:#ffd93d;">🔗 Koble begrepene</h3>
    <p style="color:#fff; margin-bottom:15px;">Trekk linjer fra hvert <strong style="color:#ffd93d;">begrep</strong> til riktig <strong style="color:#4ecdc4;">forklaring</strong>. Klikk på et begrep, deretter på forklaringen.</p>
    
    <div id="connect-game-10" class="connect-game">
        <svg id="lines-svg-10" class="lines-svg"></svg>
        <div id="concepts-column-10" class="concepts-column"></div>
        <div id="explanations-column-10" class="explanations-column"></div>
    </div>

    <div id="completion-message-10" style="display:none; text-align:center; margin-top:20px;">
        <h3 style="color:#00ff41">🎉 Alle begreper koblet riktig!</h3>
        <p style="color:#fff;">Oppdraget er fullført...</p>
    </div>
    `,
    function check() {
        return true;
    },
    'Klikk på et begrep til venstre, deretter på forklaringen til høyre for å koble dem sammen.'
);

// Globale variabler for spillet
let selectedConcept10 = null;
let connections10 = [];
let correctConnections10 = 0;

// Farger for linjene
const lineColors = [
    '#ff6b6b', '#4ecdc4', '#ffd93d', '#95e1d3', 
    '#f38181', '#aa96da', '#fcbad3', '#a8d8ea'
];

window.initRoom10 = function () {
    console.log('initRoom10 called - Connect game');
    
    const conceptsColumn = document.getElementById('concepts-column-10');
    const explanationsColumn = document.getElementById('explanations-column-10');
    const svg = document.getElementById('lines-svg-10');
    
    if (!conceptsColumn || !explanationsColumn || !svg) {
        console.error('Connect game elements not found!');
        return;
    }

    // Reset state
    selectedConcept10 = null;
    connections10 = [];
    correctConnections10 = 0;

    // Shuffle explanations for display
    const shuffledExplanations = [...pairs].sort(() => Math.random() - 0.5);

    // Clear columns
    conceptsColumn.innerHTML = '';
    explanationsColumn.innerHTML = '';
    svg.innerHTML = '';

    // Create concept items (left side)
    pairs.forEach((pair, index) => {
        const item = document.createElement('div');
        item.className = 'connect-item concept-item';
        item.dataset.id = pair.id;
        item.dataset.index = index;
        item.innerHTML = `
            <span class="item-text">${pair.concept}</span>
            <div class="connect-dot concept-dot" data-id="${pair.id}"></div>
        `;
        item.onclick = () => selectConcept10(item, pair.id);
        conceptsColumn.appendChild(item);
    });

    // Create explanation items (right side) - shuffled
    shuffledExplanations.forEach((pair, index) => {
        const item = document.createElement('div');
        item.className = 'connect-item explanation-item';
        item.dataset.id = pair.id;
        item.dataset.index = index;
        item.innerHTML = `
            <div class="connect-dot explanation-dot" data-id="${pair.id}"></div>
            <span class="item-text">${pair.explanation}</span>
        `;
        item.onclick = () => selectExplanation10(item, pair.id);
        explanationsColumn.appendChild(item);
    });

    // Add resize listener for redrawing lines
    window.addEventListener('resize', redrawLines10);
};

function selectConcept10(item, id) {
    // Sjekk om dette begrepet allerede er koblet
    if (connections10.some(c => c.conceptId === id)) return;
    
    // Fjern tidligere valg
    document.querySelectorAll('.concept-item.selected').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Velg dette begrepet
    item.classList.add('selected');
    selectedConcept10 = { element: item, id: id };
    
    // Spill lyd
    playSelectSound();
}

function selectExplanation10(item, id) {
    if (!selectedConcept10) return;
    
    // Sjekk om denne forklaringen allerede er koblet
    if (connections10.some(c => c.explanationId === id)) return;
    
    const conceptId = selectedConcept10.id;
    const conceptElement = selectedConcept10.element;
    const isCorrect = conceptId === id;
    
    // Lag forbindelse
    const connection = {
        conceptId: conceptId,
        explanationId: id,
        conceptElement: conceptElement,
        explanationElement: item,
        isCorrect: isCorrect,
        color: lineColors[connections10.length % lineColors.length]
    };
    
    connections10.push(connection);
    
    // Tegn linje
    drawLine10(connection);
    
    // Oppdater styling
    conceptElement.classList.remove('selected');
    conceptElement.classList.add('connected');
    item.classList.add('connected');
    
    if (isCorrect) {
        conceptElement.classList.add('correct');
        item.classList.add('correct');
        correctConnections10++;
        if (window.playSuccessSound) window.playSuccessSound();
    } else {
        conceptElement.classList.add('incorrect');
        item.classList.add('incorrect');
        if (window.recordFailure) window.recordFailure(10);
        playErrorSound();
    }
    
    selectedConcept10 = null;
    
    // Sjekk om alle er koblet
    if (connections10.length === pairs.length) {
        setTimeout(() => checkAllConnections10(), 500);
    }
}

function drawLine10(connection) {
    const svg = document.getElementById('lines-svg-10');
    const gameContainer = document.getElementById('connect-game-10');
    
    const conceptDot = connection.conceptElement.querySelector('.concept-dot');
    const explanationDot = connection.explanationElement.querySelector('.explanation-dot');
    
    const containerRect = gameContainer.getBoundingClientRect();
    const conceptRect = conceptDot.getBoundingClientRect();
    const explanationRect = explanationDot.getBoundingClientRect();
    
    const x1 = conceptRect.right - containerRect.left;
    const y1 = conceptRect.top + conceptRect.height / 2 - containerRect.top;
    const x2 = explanationRect.left - containerRect.left;
    const y2 = explanationRect.top + explanationRect.height / 2 - containerRect.top;
    
    // Lag en kurvet sti med Bezier-kurve
    const midX = (x1 + x2) / 2;
    const curveOffset = (Math.random() - 0.5) * 40; // Tilfeldig kurve
    
    const pathD = `M ${x1} ${y1} C ${midX + curveOffset} ${y1}, ${midX - curveOffset} ${y2}, ${x2} ${y2}`;
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathD);
    path.setAttribute('stroke', connection.color);
    path.setAttribute('stroke-width', '3');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('data-concept-id', connection.conceptId);
    path.setAttribute('data-explanation-id', connection.explanationId);
    
    // Animasjon - tegn linjen
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.classList.add('animated-line');
    
    // Legg til glød-effekt
    if (connection.isCorrect) {
        path.classList.add('correct-line');
    } else {
        path.classList.add('incorrect-line');
    }
    
    svg.appendChild(path);
    
    // Trigger animasjon
    requestAnimationFrame(() => {
        path.style.strokeDashoffset = '0';
    });
}

function redrawLines10() {
    const svg = document.getElementById('lines-svg-10');
    if (!svg) return;
    
    svg.innerHTML = '';
    connections10.forEach(connection => {
        if (connection.conceptElement && connection.explanationElement) {
            drawLine10(connection);
        }
    });
}

function checkAllConnections10() {
    if (correctConnections10 === pairs.length) {
        // Alle riktige!
        document.getElementById('completion-message-10').style.display = 'block';
        if (window.clearFailures) window.clearFailures(10);
        if (window.showSolvedStamp) window.showSolvedStamp();
        
        // Legg til feiring-effekt på linjene
        document.querySelectorAll('.animated-line').forEach(line => {
            line.classList.add('celebration');
        });
        
        setTimeout(() => {
            showSplashScreen10();
        }, 3000);
    } else {
        // Noen feil - gi mulighet til å prøve igjen
        setTimeout(() => {
            const wrongConnections = connections10.filter(c => !c.isCorrect);
            wrongConnections.forEach(conn => {
                // Fjern feil linjer
                const svg = document.getElementById('lines-svg-10');
                const path = svg.querySelector(`path[data-concept-id="${conn.conceptId}"]`);
                if (path) {
                    path.classList.add('fade-out');
                    setTimeout(() => path.remove(), 500);
                }
                
                // Reset elementer
                conn.conceptElement.classList.remove('connected', 'incorrect');
                conn.explanationElement.classList.remove('connected', 'incorrect');
            });
            
            // Fjern feil fra connections
            connections10 = connections10.filter(c => c.isCorrect);
        }, 1500);
    }
}

function playSelectSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.frequency.value = 600;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) { }
}

function playErrorSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.frequency.value = 200;
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.3);
    } catch (e) { }
}

function showSplashScreen10() {
    document.getElementById('connect-game-10').style.display = 'none';
    document.getElementById('completion-message-10').style.display = 'none';

    // Fjern eventuell eksisterende splash-screen
    const existingSplash = document.getElementById('splash-screen-10');
    if (existingSplash) existingSplash.remove();

    // Beregn tid
    let timeText = '-- minutter -- sekunder';
    if (window.game && window.game.startTime) {
        const elapsedMs = Date.now() - window.game.startTime;
        const totalSeconds = Math.floor(elapsedMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        timeText = `${minutes} minutt${minutes !== 1 ? 'er' : ''} ${seconds.toString().padStart(2, '0')} sekunder`;
    }

    // Opprett splash-screen og legg til body
    const splashScreen = document.createElement('div');
    splashScreen.id = 'splash-screen-10';
    splashScreen.className = 'splash-screen';
    splashScreen.style.display = 'flex';
    splashScreen.innerHTML = `
        <div class="splash-content">
            <div class="splash-header">
                <h1>HEMMELIGHETER AVSLØRT</h1>
                <p class="classified-badge">TIDLIGERE KLASSIFISERT — NÅ ÅPNET</p>
            </div>
            <div class="splash-body">
                <img src="assets/images/achievements.png" alt="Agent Debrief" class="splash-image">
                <div class="debrief-report">
                    <h2>OPPDRAGSRAPPORT - FULLFØRT</h2>
                    <div class="time-display">
                        <p>Oppdraget fullført på:</p>
                        <h3 id="elapsed-time">${timeText}</h3>
                    </div>
                    <div class="success-message">
                        <p><strong>Du er nå ekspert på den kalde krigen.</strong></p>
                        <p>Gjennom analysen og dekrypteringen av hemmeligheter har du forstått det komplekse spillet mellom supermaktene.</p>
                        <p style="margin-top: 20px;"><strong>Du har lært:</strong></p>
                        <ul style="text-align: left; display: inline-block;">
                            <li>✓ Hvordan jernteppet delte verden</li>
                            <li>✓ Rollene til NATO og supermaktene</li>
                            <li>✓ Konsekvensene av terrorbalansen</li>
                            <li>✓ Betydningen av diplomati over konflikt</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="splash-footer">
                <button class="btn replay-btn" id="replay-btn-10" style="background: linear-gradient(45deg, #4ecdc4, #44a08d); font-size: 16px; padding: 12px 30px; margin-right: 10px;">🔄 Spill på nytt</button>
                <button class="btn home-btn" id="home-btn-10" style="background: linear-gradient(45deg, #e94560, #c23a51); font-size: 16px; padding: 12px 30px;">🏠 Gå til forside</button>
            </div>
        </div>
    `;
    document.body.appendChild(splashScreen);
    
    // Legg til event listeners etter at elementene er lagt til DOM
    document.getElementById('replay-btn-10').addEventListener('click', function() {
        // Fjern splash-screen
        const splash = document.getElementById('splash-screen-10');
        if (splash) splash.remove();
        
        // Restart spillet
        if (window.restartGame) {
            window.restartGame();
        }
    });
    
    document.getElementById('home-btn-10').addEventListener('click', function() {
        // Gå til forsiden
        window.location.href = 'index.html';
    });
}

export default room10;
