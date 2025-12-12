import Room from './Room.js';

const room3 = new Room(
    3,
    '1961-1989 — BERLINMUREN',
    `
        <p>Etter år med flukt fra øst til vest, ble byen stengt. Dokumenter antyder at myndighetene kalte det et «beskyttelsestiltak». Men hva var egentlig hensikten?. Finn riktig dato for når muren ble bygget.</p>

        <div class="code-input">
            <label for="berlinYear">År (YYYY):</label>
            <input type="number" id="berlinYear" min="1950" max="1970">
            <label for="berlinMonth">Måned (nummer):</label>
            <input type="number" id="berlinMonth" min="1" max="12">
            <button class="btn" onclick="checkRoom3()">Åpne safe</button>
        </div>

        <div style="margin-top:12px;">
            <button id="hint3Btn" class="btn" onclick="nextHint3()">💡 Hint</button>
            <div id="hint3Box" class="hint-box" style="display:block; margin-top:10px; color:#fff;"></div>
        </div>

        <div class="morse-display" id="morseCode" style="display: none;">
            🔊 Morse-kode funnet: ..-. .-. . . -.. --- --
        </div>

        <div style="margin-top:10px;">
            <!-- Button to open morse alphabet modal (hidden until safe opens) -->
            <button id="showMorseBtn" class="btn" style="display:none;" onclick="showMorseAlphabet()">Vis morse-alfabet</button>
        </div>

        <!-- Morse alphabet inline box (Room 3) -->
        <div id="morseModal" class="inline-modal" style="display:none;">
            <div class="modal-content">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <h3>Morse-alfabet</h3>
                    <button class="modal-close" onclick="closeMorseAlphabet()">✖</button>
                </div>
                <p style="white-space: pre-wrap;">A: .-    B: -...  C: -.-.  D: -..\nE: .    F: ..-.  G: --.   H: ....\nI: ..   J: .---  K: -.-   L: .-..\nM: --   N: -.    O: ---   P: .--.\nQ: --.- R: .-.   S: ...   T: -\nU: ..-  V: ...-  W: .--   X: -..-\nY: -.-- Z: --..\n0: ----- 1: .---- 2: ..--- 3: ...-- 4: ....-\n5: ..... 6: -.... 7: --... 8: ---.. 9: ----.</p>
                <div style="text-align:right; margin-top:8px;"><button class="btn" onclick="closeMorseAlphabet()">Lukk</button></div>
            </div>
        </div>

        <div class="code-input">
            <label for="morseAnswer">Dekoder morse-koden:</label>
            <input type="text" id="morseAnswer" placeholder="Engelsk ord">
            <button class="btn" onclick="checkMorse()">Dekoder</button>
        </div>
    `,
    function check() {
        const answer = document.getElementById('morseAnswer').value.toLowerCase().replace(/\s/g, '');
        if (answer === 'freedom') {
            showMessage(3, '🎉 Morse-koden dekryptert! "FREEDOM" - det vestlige Berlins drøm.');
            setTimeout(nextRoom, 2000);
            return true;
        } else {
            showMessage(3, '❌ Feil dekoding. Bruk morse-tabellen og dekoder nøye.', 'error');
            return false;
        }
    },
    ''
);

export default room3;