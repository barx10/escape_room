import Room from './Room.js';

const room7 = new Room(
    5,
    'AVLYTTET MELDING FRA MOSKVA',
    `
    <h3>📻 Morsekode-transmisjon</h3>
    <p>Vi har avlyttet en hemmelig melding fra KGB i Moskva. Meldingen inneholder koordinater til et møtested.</p>

    <div style="text-align: center; margin: 20px 0;">
        <button class="btn" id="playMorseBtn" onclick="playMorseCode()">▶️ Spill av morsekode</button>
        <button class="btn-small" onclick="stopMorseCode()" style="margin-left: 10px;">⏹️ Stopp</button>
        <p style="color: #00ff41; margin-top: 10px; font-size: 14px;">💡 Dekoder morsekoden for å finne koordinatene</p>
        <p style="color: #aaa; font-size: 12px; margin-top: 5px;">Kort pip = prikk (.) | Langt pip = strek (-) | Pause = mellomrom</p>
    </div>

    <div style="background: rgba(0,0,0,0.5); padding: 15px; border-radius: 10px; margin: 20px 0; border: 1px solid #00ff41;">
        <h4 style="color: #00ff41; margin: 0 0 10px 0; text-align: center;">📋 Morse-kodetabell (tall)</h4>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; text-align: center; font-family: monospace;">
            <div style="background: rgba(0,255,65,0.1); padding: 8px; border-radius: 5px;"><span style="color: #ffd93d;">0</span><br><span style="color: #fff;">-----</span></div>
            <div style="background: rgba(0,255,65,0.1); padding: 8px; border-radius: 5px;"><span style="color: #ffd93d;">1</span><br><span style="color: #fff;">.----</span></div>
            <div style="background: rgba(0,255,65,0.1); padding: 8px; border-radius: 5px;"><span style="color: #ffd93d;">2</span><br><span style="color: #fff;">..---</span></div>
            <div style="background: rgba(0,255,65,0.1); padding: 8px; border-radius: 5px;"><span style="color: #ffd93d;">3</span><br><span style="color: #fff;">...--</span></div>
            <div style="background: rgba(0,255,65,0.1); padding: 8px; border-radius: 5px;"><span style="color: #ffd93d;">4</span><br><span style="color: #fff;">....-</span></div>
            <div style="background: rgba(0,255,65,0.1); padding: 8px; border-radius: 5px;"><span style="color: #ffd93d;">5</span><br><span style="color: #fff;">.....</span></div>
            <div style="background: rgba(0,255,65,0.1); padding: 8px; border-radius: 5px;"><span style="color: #ffd93d;">6</span><br><span style="color: #fff;">-....</span></div>
            <div style="background: rgba(0,255,65,0.1); padding: 8px; border-radius: 5px;"><span style="color: #ffd93d;">7</span><br><span style="color: #fff;">--...</span></div>
            <div style="background: rgba(0,255,65,0.1); padding: 8px; border-radius: 5px;"><span style="color: #ffd93d;">8</span><br><span style="color: #fff;">---..</span></div>
            <div style="background: rgba(0,255,65,0.1); padding: 8px; border-radius: 5px;"><span style="color: #ffd93d;">9</span><br><span style="color: #fff;">----.</span></div>
        </div>
        <p style="color: #aaa; font-size: 11px; text-align: center; margin-top: 8px;">Punktum (.) i koordinater = .-.-.-</p>
    </div>

    <div style="background: rgba(0,0,0,0.4); padding: 20px; border-radius: 10px; margin: 20px 0; border: 2px solid #00ff41;">
        <label style="display: block; margin-bottom: 10px;">🗺️ Hvilken park i Moskva peker koordinatene til?</label>
        <div style="display: flex; gap: 10px; align-items: center;">
            <input type="text" id="parkLocation" placeholder="Navn på park" style="flex: 1;">
            <button class="btn-small" onclick="checkLocation7()">Sjekk lokasjon 📍</button>
        </div>
    </div>

    <div id="agentSection" style="display: none; background: rgba(0,0,0,0.6); padding: 20px; border-radius: 10px; margin: 20px 0; border: 2px solid #ffd93d;">
        <h4 style="color: #ffd93d; margin-top: 0;">📸 Overvåkningsbilde fra parken</h4>
        <div style="text-align: center; margin: 15px 0;">
            <img src="assets/documents/agent_photo.png" alt="Agent i parken" style="max-width: 100%; border: 2px solid #ffd93d; border-radius: 10px; box-shadow: 0 0 20px rgba(255,217,61,0.3);">
        </div>
        <p style="color: #fff; margin-bottom: 10px;">🔍 Finn kodenavnet på agenten i bildet</p>
        <div style="display: flex; gap: 10px; align-items: center;">
            <input type="text" id="agentName" placeholder="Agentkode" style="flex: 1;">
            <button class="btn-small" onclick="checkAgent7()">Bekreft agent 🕵️</button>
        </div>
    </div>

    <div id="missionInfo" style="display: none; background: rgba(255,217,61,0.1); padding: 20px; border-radius: 10px; margin: 20px 0; border: 2px solid #ffd93d;">
        <h4 style="color: #ffd93d; margin-top: 0;">✅ OPPDRAGSINFORMASJON DEKRYPTERT</h4>
        <p style="color: #fff; font-size: 18px; font-weight: bold; text-align: center; margin: 10px 0;">
            Møtetidspunkt: <span style="color: #00ff41;">23:45</span>
        </p>
        <p style="color: #aaa; text-align: center; font-size: 14px;">Husk dette tidspunktet - det kan være viktig senere!</p>
        <div style="text-align: center; margin-top: 20px;">
            <button class="btn" onclick="completeRoom7()">Fortsett oppdraget →</button>
        </div>
    </div>
    `,
    function check() {
        return window.room7Completed === true;
    },
    'Hint 1: Morsekoden inneholder tall som er koordinater. Hint 2: Parken er kjent for sin grønne fontene. Hint 3: Agentens kode kan være skjult i bildet - se etter tekst eller symboler.'
);

// Global state for room 7
window.room7LocationCorrect = false;
window.room7AgentCorrect = false;
window.room7Completed = false;

// Morse code generator using Web Audio API
window.morseAudioContext = null;
window.morseTimeout = null;
window.morseIsPlaying = false;

// Morse code mapping
const morseCode = {
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    '.': '.-.-.-', ' ': ' '
};

// Koordinatene: 55.7303 37.6009
const messageToPlay = '55.7303 37.6009';

window.playMorseCode = function() {
    if (window.morseIsPlaying) return;
    window.morseIsPlaying = true;
    
    const btn = document.getElementById('playMorseBtn');
    if (btn) btn.textContent = '🔊 Spiller...';
    
    window.morseAudioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    const dotDuration = 200; // ms - kort pip
    const dashDuration = 600; // ms - langt pip
    const symbolGap = 200; // gap mellom prikker/streker
    const letterGap = 600; // gap mellom tall/tegn
    const wordGap = 1200; // gap mellom ord (mellomrom)
    
    let currentTime = 0;
    
    function playTone(duration, startTime) {
        const oscillator = window.morseAudioContext.createOscillator();
        const gainNode = window.morseAudioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(window.morseAudioContext.destination);
        
        oscillator.frequency.value = 600; // Hz - classic morse tone
        oscillator.type = 'sine';
        
        const start = window.morseAudioContext.currentTime + startTime / 1000;
        oscillator.start(start);
        oscillator.stop(start + duration / 1000);
    }
    
    // Convert message to morse and schedule tones
    for (let char of messageToPlay) {
        const morse = morseCode[char];
        if (!morse) continue;
        
        if (char === ' ') {
            currentTime += wordGap;
            continue;
        }
        
        for (let symbol of morse) {
            if (symbol === '.') {
                playTone(dotDuration, currentTime);
                currentTime += dotDuration + symbolGap;
            } else if (symbol === '-') {
                playTone(dashDuration, currentTime);
                currentTime += dashDuration + symbolGap;
            }
        }
        currentTime += letterGap;
    }
    
    // Reset button after playback
    window.morseTimeout = setTimeout(() => {
        window.morseIsPlaying = false;
        const btn = document.getElementById('playMorseBtn');
        if (btn) btn.textContent = '▶️ Spill av morsekode';
    }, currentTime + 500);
};

window.stopMorseCode = function() {
    if (window.morseAudioContext) {
        window.morseAudioContext.close();
        window.morseAudioContext = null;
    }
    if (window.morseTimeout) {
        clearTimeout(window.morseTimeout);
    }
    window.morseIsPlaying = false;
    const btn = document.getElementById('playMorseBtn');
    if (btn) btn.textContent = '▶️ Spill av morsekode';
};

window.checkLocation7 = function() {
    const input = document.getElementById('parkLocation').value.trim().toLowerCase();
    const correctAnswers = ['gorkij', 'gorky', 'gorkij park', 'gorky park', 'gorky-parken', 'gorkij-parken'];
    
    if (correctAnswers.some(ans => input.includes(ans))) {
        window.room7LocationCorrect = true;
        showMessage(5, '✅ Korrekt lokasjon! Overvåkningsbildet åpnes...');
        document.getElementById('agentSection').style.display = 'block';
        document.getElementById('parkLocation').disabled = true;
    } else {
        showMessage(5, '❌ Feil lokasjon. Sjekk koordinatene nøye.', 'error');
    }
};

window.checkAgent7 = function() {
    const input = document.getElementById('agentName').value.trim().toUpperCase();
    const correctAgent = 'PETROV'; // Kan endres til ønsket agentnavn
    
    if (input === correctAgent) {
        window.room7AgentCorrect = true;
        showMessage(5, '✅ Agent identifisert! Dekrypterer oppdragsinformasjon...');
        document.getElementById('missionInfo').style.display = 'block';
        document.getElementById('agentName').disabled = true;
    } else {
        showMessage(5, '❌ Feil agentkode. Se nøye på bildet.', 'error');
    }
};

window.completeRoom7 = function() {
    if (window.room7LocationCorrect && window.room7AgentCorrect) {
        window.room7Completed = true;
        showMessage(5, '🎉 Rom fullført! Møtetidspunktet er lagret.');
        setTimeout(nextRoom, 2000);
    }
};

export default room7;