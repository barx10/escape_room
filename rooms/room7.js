import Room from './Room.js';

const room7 = new Room(
    6,
    '1962 — AVLYTTEDE MELDINGER',
    `
    <h3>Avlytting fra oktober 1962</h3>
    <p>Gjennom avlytting hører du indikasjoner på hvor mange raketter som var plassert. Skriv inn antallet.</p>

    <div class="code-input">
        <label for="rocketCount">Antall raketter:</label>
        <input type="number" id="rocketCount" placeholder="XX" min="1" max="100">
    <button class="btn" onclick="checkRoom6()">Bekreft</button>
    </div>
    `,
    function check() {
        const count = parseInt(document.getElementById('rocketCount').value);
        if (count === 42) {
            showMessage(6, '🎉 Riktig! Det var 42 raketter på Cuba.');
            setTimeout(nextRoom, 2000);
            return true;
        } else {
            showMessage(6, '❌ Feil antall. Lytt nøye.', 'error');
            return false;
        }
    },
    'Hint: Avlyttede rapporter fra Cuba nevner tallet 42.'
);

export default room7;