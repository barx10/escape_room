import Room from './Room.js';

// Define pairs - Begrep og Forklaring
const pairs = [
    { id: 1, concept: 'Jernteppet', explanation: 'Skillet mellom øst og vest' },
    { id: 2, concept: 'Kald Krig', explanation: 'Spenningen mellom USA og Sovjet uten direkte krig' },
    { id: 3, concept: 'NATO', explanation: 'Vestlig forsvarsallianse dannet 1949' },
    { id: 4, concept: 'Terrorbalanse', explanation: 'Begge sider hadde atomvåpen og kunne ødelegge hverandre' },
    { id: 5, concept: 'KGB', explanation: 'Sovjetisk hemmelightstjeneste' }
];

const room10 = new Room(
    10,
    'AVSLUTNING — BEGREPSFORSTÅELSE',
    `
    <h3 style="color:#ffd93d;">Nøkkelbegreper fra den kalde krigen</h3>
    <p style="color:#fff; margin-bottom:20px;">For å avslutte oppdraget må du bevise at du forstår de viktigste begrepene. Koble hvert <strong>Begrep</strong> med riktig <strong>Forklaring</strong>.</p>

    <div id="memory-grid" style="display:grid; grid-template-columns:repeat(5, 1fr); gap:15px; margin:20px 0;">
        <div class="memory-card" data-id="1" data-type="concept" onclick="handleCardClick10(this)" 
             style="display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(0,0,0,0.85); color:#fff; min-height:100px; border:2px solid #e94560; border-radius:8px; padding:15px; cursor:pointer;">
            <div style="font-size:10px; text-transform:uppercase; color:#ffd93d; margin-bottom:5px;">BEGREP</div>
            <div style="text-align:center;">Jernteppet</div>
        </div>
        <div class="memory-card" data-id="1" data-type="explanation" onclick="handleCardClick10(this)"
             style="display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(0,0,0,0.85); color:#fff; min-height:100px; border:2px solid #e94560; border-radius:8px; padding:15px; cursor:pointer;">
            <div style="font-size:10px; text-transform:uppercase; color:#4ecdc4; margin-bottom:5px;">FORKLARING</div>
            <div style="text-align:center;">Skillet mellom øst og vest</div>
        </div>
        <div class="memory-card" data-id="2" data-type="concept" onclick="handleCardClick10(this)"
             style="display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(0,0,0,0.85); color:#fff; min-height:100px; border:2px solid #e94560; border-radius:8px; padding:15px; cursor:pointer;">
            <div style="font-size:10px; text-transform:uppercase; color:#ffd93d; margin-bottom:5px;">BEGREP</div>
            <div style="text-align:center;">Kald Krig</div>
        </div>
        <div class="memory-card" data-id="2" data-type="explanation" onclick="handleCardClick10(this)"
             style="display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(0,0,0,0.85); color:#fff; min-height:100px; border:2px solid #e94560; border-radius:8px; padding:15px; cursor:pointer;">
            <div style="font-size:10px; text-transform:uppercase; color:#4ecdc4; margin-bottom:5px;">FORKLARING</div>
            <div style="text-align:center;">Spenningen mellom USA og Sovjet uten direkte krig</div>
        </div>
        <div class="memory-card" data-id="3" data-type="concept" onclick="handleCardClick10(this)"
             style="display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(0,0,0,0.85); color:#fff; min-height:100px; border:2px solid #e94560; border-radius:8px; padding:15px; cursor:pointer;">
            <div style="font-size:10px; text-transform:uppercase; color:#ffd93d; margin-bottom:5px;">BEGREP</div>
            <div style="text-align:center;">NATO</div>
        </div>
        <div class="memory-card" data-id="3" data-type="explanation" onclick="handleCardClick10(this)"
             style="display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(0,0,0,0.85); color:#fff; min-height:100px; border:2px solid #e94560; border-radius:8px; padding:15px; cursor:pointer;">
            <div style="font-size:10px; text-transform:uppercase; color:#4ecdc4; margin-bottom:5px;">FORKLARING</div>
            <div style="text-align:center;">Vestlig forsvarsallianse dannet 1949</div>
        </div>
        <div class="memory-card" data-id="4" data-type="concept" onclick="handleCardClick10(this)"
             style="display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(0,0,0,0.85); color:#fff; min-height:100px; border:2px solid #e94560; border-radius:8px; padding:15px; cursor:pointer;">
            <div style="font-size:10px; text-transform:uppercase; color:#ffd93d; margin-bottom:5px;">BEGREP</div>
            <div style="text-align:center;">Terrorbalanse</div>
        </div>
        <div class="memory-card" data-id="4" data-type="explanation" onclick="handleCardClick10(this)"
             style="display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(0,0,0,0.85); color:#fff; min-height:100px; border:2px solid #e94560; border-radius:8px; padding:15px; cursor:pointer;">
            <div style="font-size:10px; text-transform:uppercase; color:#4ecdc4; margin-bottom:5px;">FORKLARING</div>
            <div style="text-align:center;">Begge sider hadde atomvåpen og kunne ødelegge hverandre</div>
        </div>
        <div class="memory-card" data-id="5" data-type="concept" onclick="handleCardClick10(this)"
             style="display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(0,0,0,0.85); color:#fff; min-height:100px; border:2px solid #e94560; border-radius:8px; padding:15px; cursor:pointer;">
            <div style="font-size:10px; text-transform:uppercase; color:#ffd93d; margin-bottom:5px;">BEGREP</div>
            <div style="text-align:center;">KGB</div>
        </div>
        <div class="memory-card" data-id="5" data-type="explanation" onclick="handleCardClick10(this)"
             style="display:flex; flex-direction:column; align-items:center; justify-content:center; background:rgba(0,0,0,0.85); color:#fff; min-height:100px; border:2px solid #e94560; border-radius:8px; padding:15px; cursor:pointer;">
            <div style="font-size:10px; text-transform:uppercase; color:#4ecdc4; margin-bottom:5px;">FORKLARING</div>
            <div style="text-align:center;">Sovjetisk hemmelightstjeneste</div>
        </div>
    </div>

    <div id="completion-message" style="display:none; text-align:center; margin-top:20px;">
        <h3 style="color:#00ff41">🎉 Begrepsforståelse bekreftet!</h3>
        <p style="color:#fff;">Oppdraget er fullført...</p>
    </div>

    <div id="splash-screen" class="splash-screen" style="display:none;">
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
                        <h3 id="elapsed-time">-- minutter -- sekunder</h3>
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
                <button class="btn replay-btn" onclick="restartGame()" style="background: linear-gradient(45deg, #4ecdc4, #44a08d); font-size: 16px; padding: 12px 30px;">🔄 Spill på nytt</button>
            </div>
        </div>
    </div>
    `,
    function check() {
        return true;
    },
    'Klikk på et Begrep og deretter på Forklaringen som hører til.'
);

// Global state
let selectedCards10 = [];
let isLocked10 = false;

window.handleCardClick10 = function(el) {
    if (isLocked10) return;
    if (el.classList.contains('matched')) return;
    
    if (el.classList.contains('selected')) {
        el.classList.remove('selected');
        el.style.borderColor = '#e94560';
        selectedCards10 = selectedCards10.filter(c => c !== el);
        return;
    }

    el.classList.add('selected');
    el.style.borderColor = '#ffd93d';
    el.style.boxShadow = '0 0 15px rgba(255, 217, 61, 0.4)';
    selectedCards10.push(el);

    if (selectedCards10.length === 2) {
        checkMatch10();
    }
};

function checkMatch10() {
    isLocked10 = true;
    const [card1, card2] = selectedCards10;
    const id1 = card1.dataset.id;
    const id2 = card2.dataset.id;
    const type1 = card1.dataset.type;
    const type2 = card2.dataset.type;

    if (id1 === id2 && type1 !== type2) {
        // Match!
        setTimeout(() => {
            card1.classList.remove('selected');
            card2.classList.remove('selected');
            card1.classList.add('matched');
            card2.classList.add('matched');
            card1.style.borderColor = '#00ff41';
            card2.style.borderColor = '#00ff41';
            card1.style.background = 'rgba(0, 255, 65, 0.2)';
            card2.style.background = 'rgba(0, 255, 65, 0.2)';
            card1.style.boxShadow = 'none';
            card2.style.boxShadow = 'none';
            
            selectedCards10 = [];
            isLocked10 = false;
            checkWin10();
        }, 300);
    } else {
        // No match
        setTimeout(() => {
            card1.style.borderColor = '#ff4444';
            card2.style.borderColor = '#ff4444';
            card1.style.background = 'rgba(255, 68, 68, 0.3)';
            card2.style.background = 'rgba(255, 68, 68, 0.3)';
            
            setTimeout(() => {
                card1.classList.remove('selected');
                card2.classList.remove('selected');
                card1.style.borderColor = '#e94560';
                card2.style.borderColor = '#e94560';
                card1.style.background = 'rgba(0,0,0,0.85)';
                card2.style.background = 'rgba(0,0,0,0.85)';
                card1.style.boxShadow = 'none';
                card2.style.boxShadow = 'none';
                selectedCards10 = [];
                isLocked10 = false;
            }, 800);
        }, 300);
    }
}

function checkWin10() {
    const matched = document.querySelectorAll('#room10 .memory-card.matched').length;
    if (matched === 10) {
        document.getElementById('completion-message').style.display = 'block';
        if (window.clearFailures) window.clearFailures(10);
        if (window.showSolvedStamp) window.showSolvedStamp();

        setTimeout(() => {
            showSplashScreen10();
        }, 3000);
    }
}

function showSplashScreen10() {
    document.getElementById('memory-grid').style.display = 'none';
    document.getElementById('completion-message').style.display = 'none';

    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        splashScreen.style.display = 'block';

        if (window.game && window.game.startTime) {
            const elapsedMs = Date.now() - window.game.startTime;
            const totalSeconds = Math.floor(elapsedMs / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;

            const timeDisplay = document.getElementById('elapsed-time');
            if (timeDisplay) {
                timeDisplay.textContent = `${minutes} minutt${minutes !== 1 ? 'er' : ''} ${seconds.toString().padStart(2, '0')} sekunder`;
            }
        }
    }
}

export default room10;
