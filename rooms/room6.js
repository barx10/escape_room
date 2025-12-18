import Room from './Room.js';

const room6 = new Room(
    4,
    'HEMMELIGE DOKUMENTER',
    `
    <h3>📂 Klassifiserte CIA-arkiver</h3>
    <p>Du har tilgang til hemmelige dokumenter fra Cubakrisen. Les nøye gjennom dokumentene og svar på spørsmålene.</p>

    <div style="text-align: center; margin: 20px 0;">
        <button class="btn" onclick="const v = document.getElementById('documentImage'); v.style.display = v.style.display === 'none' ? 'block' : 'none';">Åpne/Lukk dokument 📄</button>
    </div>

    <div id="documentImage" style="display: none; text-align: center; margin: 20px 0;">
        <img src="assets/documents/oppgave.png" alt="Hemmelig dokument" style="max-width: 100%; border: 2px solid #00ff41; border-radius: 10px; box-shadow: 0 0 20px rgba(0,255,65,0.3);">
    </div>

    <div style="background: rgba(0,0,0,0.4); padding: 20px; border-radius: 10px; margin: 20px 0; border: 2px solid #00ff41;">
        <h4 style="color: #00ff41; margin-top: 0;">🔐 SPØRSMÅL - Finn svarene i dokumentene</h4>
        
        <div style="margin: 15px 0;">
            <label style="display: block; margin-bottom: 5px;">1. Hvor mange operative raketter estimerte CIA var plassert på Cuba?</label>
            <button class="btn-small" onclick="const v = document.getElementById('vedleggA'); v.style.display = v.style.display === 'none' ? 'block' : 'none';">Åpne/Lukk Vedlegg A 📎</button>
            <div id="vedleggA" style="display: none; margin-top: 10px; position: relative;">
                <img src="assets/documents/vedlegg-a-r4.png" alt="Vedlegg A" style="max-width: 100%; border: 1px solid #00ff41; border-radius: 5px;">
                <div class="stamp-container" id="stamp-q1"></div>
            </div>
            <div style="display: flex; gap: 10px; align-items: center; margin-top: 10px;">
                <input type="number" id="rocketCount" style="width: 150px;">
                <button class="btn-small" id="btn-q1" onclick="checkAnswer6(1)">Sjekk svar ✓</button>
            </div>
        </div>

        <div style="margin: 15px 0;">
            <label style="display: block; margin-bottom: 5px;">2. Hva var avstanden fra ubåt utenfor Cuba til Tampa, Floride US? (i km)</label>
            <button class="btn-small" onclick="const v = document.getElementById('vedleggB'); v.style.display = v.style.display === 'none' ? 'block' : 'none';">Åpne/Lukk Vedlegg B 📎</button>
            <div id="vedleggB" style="display: none; margin-top: 10px; position: relative;">
                <img src="assets/documents/vedlegg-b.png" alt="Vedlegg B" style="max-width: 100%; border: 1px solid #00ff41; border-radius: 5px;">
                <div class="stamp-container" id="stamp-q2"></div>
            </div>
            <div style="display: flex; gap: 10px; align-items: center; margin-top: 10px;">
                <input type="number" id="distance" style="width: 150px;">
                <button class="btn-small" id="btn-q2" onclick="checkAnswer6(2)">Sjekk svar ✓</button>
            </div>
        </div>

        <div style="margin: 15px 0;">
            <label style="display: block; margin-bottom: 5px;">3. Hvem var U-2 piloten som tok de avgjørende bildene?</label>
            <button class="btn-small" onclick="const v = document.getElementById('vedleggC'); v.style.display = v.style.display === 'none' ? 'block' : 'none';">Åpne/Lukk Vedlegg C 📎</button>
            <div id="vedleggC" style="display: none; margin-top: 10px; position: relative;">
                <img src="assets/documents/vedlegg-c.png" alt="Vedlegg C" style="max-width: 100%; border: 1px solid #00ff41; border-radius: 5px;">
                <div class="stamp-container" id="stamp-q3"></div>
            </div>
            <div style="display: flex; gap: 10px; align-items: center; margin-top: 10px;">
                <input type="text" id="pilotName" style="width: 250px;">
                <button class="btn-small" id="btn-q3" onclick="checkAnswer6(3)">Sjekk svar ✓</button>
            </div>
        </div>

        <div style="margin: 15px 0;">
            <label style="display: block; margin-bottom: 5px;">4. Hva var kodenavnet på den amerikanske blokaden?</label>
            <button class="btn-small" onclick="const v = document.getElementById('vedleggD'); v.style.display = v.style.display === 'none' ? 'block' : 'none';">Åpne/Lukk Vedlegg D 📎</button>
            <div id="vedleggD" style="display: none; margin-top: 10px; position: relative;">
                <img src="assets/documents/vedlegg-d.png" alt="Vedlegg D" style="max-width: 100%; border: 1px solid #00ff41; border-radius: 5px;">
                <div class="stamp-container" id="stamp-q4"></div>
            </div>
            <div style="display: flex; gap: 10px; align-items: center; margin-top: 10px;">
                <input type="text" id="operationName" style="width: 250px;">
                <button class="btn-small" id="btn-q4" onclick="checkAnswer6(4)">Sjekk svar ✓</button>
            </div>
        </div>
    </div>

    <button class="btn" onclick="checkRoom6()">Verifiser svar 🔍</button>
    `,
    function check() {
        return true; // Handled by window.checkRoom6
    },
    'CIA estimerte 42 raketter. Avstanden var 1850 km. Major Rudolf Anderson tok bildene. Kodenavnet var Operation Quarantine.'
);

export default room6;