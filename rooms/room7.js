import Room from './Room.js';

const room7 = new Room(
    6,
    '1962 — AVLYTTEDE MELDINGER',
    `
    <h3>Dekrypter avlyttingen</h3>
    <p>Du har avlyttet en fragmentert melding fra sovjetiske offiserer på Cuba. Meldingen diskuterer rakettutrustningen:</p>

    <div style="background:rgba(0,0,0,0.3); padding:15px; margin:10px 0; border:1px solid #e94560;">
        <p style="color:#00ff41; font-family:monospace;">📡 [AVLYTTET RADIOKOMMUNIKASJON - 22. oktober 1962]</p>
        <p style="color:#fff; margin-top:8px;">"...vi har <strong>24 SS-4</strong> mellomdistanseraketter operasjonelle..."</p>
        <p style="color:#fff;">"...i tillegg er <strong>16 SS-5</strong> interkontinentale raketter..."</p>
        <p style="color:#fff;">"...samt <strong>2 ekstra</strong> raketter til reserve..."</p>
        <p style="color:#e94560; margin-top:8px; font-style:italic;">[Overføring brutt]</p>
    </div>

    <p><strong>Gåte:</strong> Beregn det totale antallet raketter på Cuba.</p>

    <div class="code-input">
        <label for="rocketCount">Totalt antall raketter:</label>
        <input type="number" id="rocketCount" placeholder="XX" min="1" max="100">
        <button class="btn" onclick="checkRoom6()">Bekreft</button>
    </div>
    `,
    function check() {
        const count = parseInt(document.getElementById('rocketCount').value);
        if (count === 42) {
            showMessage(6, '🎉 Riktig! 24 + 16 + 2 = 42 raketter på Cuba.');
            setTimeout(nextRoom, 2000);
            return true;
        } else {
            showMessage(6, '❌ Feil antall. Sjekk utregningen nøye.', 'error');
            return false;
        }
    },
    'Hint: Legg sammen alle rakettypene nevnt i meldingen: SS-4 + SS-5 + reserve.'
);

export default room7;