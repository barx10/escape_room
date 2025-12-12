import Room from './Room.js';

const room8 = new Room(
    7,
    'TIDSKODE - HEMMELIG BEREGNING',
    `
    <h3>Dechiffrer tidskoden</h3>
    <p>Du har funnet en kryptert melding som inneholder en tidskode. For å låse opp neste dokument må du regne ut det riktige tallet.</p>

    <div style="background:rgba(0,0,0,0.3); padding:15px; margin:10px 0; border:1px solid #e94560;">
        <p style="color:#00ff41; font-family:monospace;">🔐 KRYPTERT TIDSKODE</p>
        <p style="color:#fff; margin-top:10px;">Berlinmuren ble bygget i år: <strong>1961</strong></p>
        <p style="color:#fff;">Cubakrisen skjedde året etter: <strong>1962</strong></p>
        <p style="color:#fff; margin-top:10px;">Trekk Berlins år fra Cubas år, og multipliser med antall Berliner sektorer (det var <strong>4</strong> okkupasjonssoner).</p>
        <p style="color:#e94560; margin-top:8px;">Deretter legg til antall dager Cubakrisen varte (hint: du fant dette i rom 4).</p>
    </div>

    <p><strong>Formel:</strong> (Cuba-år − Berlin-år) × Antall sektorer + Antall krisedager = ?</p>

    <div class="code-input">
        <label for="yearsAfter">Tidskode:</label>
        <input type="number" id="yearsAfter" placeholder="XX" min="1" max="100">
        <button class="btn" onclick="checkRoom7()">Lås opp</button>
    </div>
    `,
    function check() {
        const years = parseInt(document.getElementById('yearsAfter').value);
        // (1962 - 1961) × 4 + 13 = 1 × 4 + 13 = 17
        if (years === 17) {
            showMessage(7, '🎉 Korrekt! (1962-1961) × 4 + 13 = 17.');
            setTimeout(nextRoom, 2000);
            return true;
        } else {
            showMessage(7, '❌ Feil beregning. Sjekk formelen nøye.', 'error');
            return false;
        }
    },
    'Hint: Følg formelen steg for steg. Husk 13-dagerskrigen fra Rom 4.'
);

export default room8;