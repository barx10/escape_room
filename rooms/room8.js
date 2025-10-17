import Room from './Room.js';

const room8 = new Room(
    8,
    '🔒 SIKKERHETSROMMET - KODEKNUSING',
    `
    <h3>Knek Sikkerhetskoden</h3>
    <p>Hvor mange år etter slutten av andre verdenskrig startet den kalde krigen?</p>

    <div class="code-input">
        <label for="yearsAfter">Antall år:</label>
        <input type="number" id="yearsAfter" placeholder="X" min="1" max="10">
        <button class="btn" onclick="checkRoom8()">Lås opp</button>
    </div>
    `,
    function check() {
        const years = parseInt(document.getElementById('yearsAfter').value);
        if (years === 5) {
            showMessage(8, '🎉 Korrekt! 5 år etter 1945.');
            setTimeout(nextRoom, 2000);
            return true;
        } else {
            showMessage(8, '❌ Feil. Regn: 1945 + X = ca. 1950.', 'error');
            return false;
        }
    },
    'Andre verdenskrig sluttet i 1945, kald krig startet rundt 1950.'
);

export default room8;