import Room from './Room.js';

const room6 = new Room(
    6,
    'AVLYTTET MELDING FRA MOSKVA',
    `
    <h3>📻 Morsekode-transmisjon</h3>
    <p>Vi har avlyttet en hemmelig melding fra KGB i Moskva. Meldingen inneholder koordinater til et møtested.</p>
    
    <div id="message6"></div>

    <div style="margin-top:12px; margin-bottom: 20px;">
        <button id="hint6Btn" class="btn" onclick="nextHint6()">💡 Hint (-30 sek)</button>
        <div id="hint6Box" class="hint-box" style="display:block; margin-top:10px; color:#fff;"></div>
    </div>

    <div style="text-align: center; margin: 20px 0;">
        <button class="btn" id="playMorseBtn" onclick="playMorseCode()">▶️ Spill av morsekode</button>
        <button class="btn-small" onclick="stopMorseCode()" style="margin-left: 10px;">⏹️ Stopp</button>
        <p style="color: #00ff41; margin-top: 10px; font-size: 14px;">💡 Dekoder morsekoden for å finne koden</p>
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
        <p style="color: #aaa; font-size: 11px; text-align: center; margin-top: 8px;">Bindestrek (-) i koder = -....-</p>
    </div>

    <div style="background: rgba(0,0,0,0.4); padding: 20px; border-radius: 10px; margin: 20px 0; border: 2px solid #00ff41;">
        <h4 style="color: #00ff41; margin-top: 0;">🗺️ Kart over Moskva</h4>
        <div style="text-align: center; margin: 15px 0;">
            <img src="assets/documents/moskva_kart.png" alt="Kart over Moskva med parker" style="max-width: 100%; border: 2px solid #00ff41; border-radius: 10px;">
        </div>
        <label style="display: block; margin-bottom: 10px;">Hvilket sted matcher koden fra morsemeldingen?</label>
        <div style="display: flex; gap: 10px; align-items: center;">
            <input type="text" id="parkLocation" placeholder="Skriv stedsnavn" style="flex: 1;">
            <button class="btn-small" onclick="checkLocation6()">Sjekk sted 📍</button>
        </div>
        <div class="stamp-container" id="stamp6a"></div>
    </div>

    <div id="agentSection" style="display: none; background: rgba(0,0,0,0.6); padding: 20px; border-radius: 10px; margin: 20px 0; border: 2px solid #ffd93d;">
        <h4 style="color: #ffd93d; margin-top: 0;">�️ Identifiser agenten!</h4>
        <div style="text-align: center; margin: 15px 0;">
            <img src="assets/documents/agent_petrov.png" alt="Agent Petrov med skjulte bokstaver" style="max-width: 100%; border: 2px solid #ffd93d; border-radius: 10px; box-shadow: 0 0 20px rgba(255,217,61,0.3);">
        </div>
        <p style="color: #fff; margin-bottom: 10px;">🔍 Finn de 6 skjulte bokstavene i bildet og sett dem sammen</p>
        <div style="display: flex; gap: 10px; align-items: center;">
            <input type="text" id="agentName" placeholder="XXXXXX" maxlength="6" style="flex: 1;">
            <button class="btn-small" onclick="checkAgent6()">Bekreft agent 🕵️</button>
        </div>
        <div class="stamp-container" id="stamp6b"></div>
    </div>

    <div id="missionInfo" style="display: none; background: rgba(255,217,61,0.1); padding: 20px; border-radius: 10px; margin: 20px 0; border: 2px solid #ffd93d;">
        <h4 style="color: #ffd93d; margin-top: 0;">✅ OPPDRAGSINFORMASJON DEKRYPTERT</h4>
        <p style="color: #fff; font-size: 18px; font-weight: bold; text-align: center; margin: 10px 0;">
            Møtetidspunkt: <span style="color: #00ff41;">23:45</span>
        </p>
        <p style="color: #aaa; text-align: center; font-size: 14px;">Husk dette tidspunktet - det kan være viktig senere!</p>
        <div style="text-align: center; margin-top: 20px;">
            <button class="btn" onclick="completeRoom6()">Fortsett oppdraget →</button>
        </div>
    </div>
    `,
    function check() {
        return window.room6Completed === true;
    },
    'Hint 1: Morsekoden gir en tallkode. Hint 2: Sammenlign koden med kodene på kartet. Hint 3: Bokstavene i bildet danner et navn når de settes sammen i riktig rekkefølge.'
);

// Global state for room 6
window.room6LocationCorrect = false;
window.room6AgentCorrect = false;
window.room6Completed = false;

// Morse code generator using Web Audio API
window.morseAudioContext = null;
window.morseTimeout = null;
window.morseIsPlaying = false;

// Mo-': '-...mapping
const morseCode = {
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    '.': '.-.-.-', ' ': ' '
};

// Koden: 132
const messageToPlay = '132';

window.playMorseCode = function () {
    if (window.morseIsPlaying) return;
    window.morseIsPlaying = true;

    const btn = document.getElementById('playMorseBtn');
    if (btn) btn.textContent = '🔊 Spiller...';

    window.morseAudioContext = new (window.AudioContext || window.webkitAudioContext)();

    const dotDuration = 300; // ms - kort pip
    const dashDuration = 900; // ms - langt pip
    const symbolGap = 300; // gap mellom prikker/streker
    const letterGap = 900; // gap mellom tall/tegn
    const wordGap = 1800; // gap mellom ord (mellomrom)

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

window.stopMorseCode = function () {
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

window.checkLocation6 = function () {
    const input = document.getElementById('parkLocation').value.trim().toLowerCase();
    const correctAnswers = ['zoopark', 'zoo park', 'zoo-park', 'moskva zoo'];

    if (correctAnswers.some(ans => input.includes(ans))) {
        window.room6LocationCorrect = true;
        showMessage(6, '✅ Riktig sted! Dra til parken og lokaliser agenten, se nøye på bildet!');
        if (window.playSuccessSound) window.playSuccessSound();

        // Vis stempel
        const stamp = document.getElementById('stamp6a');
        if (stamp) {
            stamp.innerHTML = '<span class="riktig-stamp">✓ RIKTIG!</span>';
            setTimeout(() => { stamp.innerHTML = ''; }, 3000);
        }

        document.getElementById('agentSection').style.display = 'block';
        document.getElementById('parkLocation').disabled = true;
    } else {
        showMessage(6, '❌ Feil sted. Sammenlign koden fra morse med kodene på kartet.', 'error');
    }
};

window.checkAgent6 = function () {
    const input = document.getElementById('agentName').value.trim().toUpperCase();
    const correctAgent = 'PETROV'; // Kan endres til ønsket agentnavn

    if (input === correctAgent) {
        window.room6AgentCorrect = true;
        showMessage(6, '✅ Agent identifisert! Dekrypterer oppdragsinformasjon...');
        if (window.playSuccessSound) window.playSuccessSound();

        // Vis stempel
        const stamp = document.getElementById('stamp6b');
        if (stamp) {
            stamp.innerHTML = '<span class="riktig-stamp">✓ RIKTIG!</span>';
            setTimeout(() => { stamp.innerHTML = ''; }, 3000);
        }

        document.getElementById('missionInfo').style.display = 'block';
        document.getElementById('agentName').disabled = true;
    } else {
        showMessage(6, '❌ Feil agentkode. Se nøye på bildet.', 'error');
    }
};

window.completeRoom6 = function () {
    if (window.room6LocationCorrect && window.room6AgentCorrect) {
        window.room6Completed = true;
        showMessage(6, '🎉 Rom fullført! Møtetidspunktet er lagret.');
        setTimeout(nextRoom, 2000);
    }
};

export default room6;
