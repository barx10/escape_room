import Room from './Room.js';

const room8 = new Room(
    7,
    'TIDSFORSTÅELSE - KODEKNUSING',
    `
    <h3>Plasser hendelsene i tid</h3>
    <p>For å gjøre videre tolkning, regn ut hvor mange år etter 1945 de tidlige spenningene ble tydelige.</p>

    <div class="code-input">
        <label for="yearsAfter">Antall år etter 1945:</label>
        <input type="number" id="yearsAfter" placeholder="X" min="1" max="10">
    <button class="btn" onclick="checkRoom7()">Lås opp</button>
    </div>
    `,
    function check() {
        const years = parseInt(document.getElementById('yearsAfter').value);
        if (years === 5) {
            showMessage(7, '🎉 Korrekt! 5 år etter 1945.');
            setTimeout(nextRoom, 2000);
            return true;
        } else {
            showMessage(7, '❌ Feil. Regn: 1945 + X = ca. 1950.', 'error');
            return false;
        }
    },
    'Tenk 1945 + X = cirka 1950; dette hjelper deg å forstå rekkefølgen av hendelser.'
);

export default room8;