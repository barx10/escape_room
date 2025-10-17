import Room from './Room.js';

const room7 = new Room(
    7,
    '📻 KOMMUNIKASJONSROMMET - AVLYTTEDE MELDINGER',
    `
    <h3>Hør på Khrushchev og Castro</h3>
    <p>Du hører avlyttede meldinger. Hvor mange raketter er det på Cuba?</p>

    <div class="code-input">
        <label for="rocketCount">Antall raketter:</label>
        <input type="number" id="rocketCount" placeholder="XX" min="1" max="100">
        <button class="btn" onclick="checkRoom7()">Bekreft</button>
    </div>
    `,
    function check() {
        const count = parseInt(document.getElementById('rocketCount').value);
        if (count === 42) {
            showMessage(7, '🎉 Riktig! Det var 42 raketter på Cuba.');
            setTimeout(nextRoom, 2000);
            return true;
        } else {
            showMessage(7, '❌ Feil antall. Lytt nøye.', 'error');
            return false;
        }
    },
    'Meldingen nevner 42 raketter.'
);

export default room7;