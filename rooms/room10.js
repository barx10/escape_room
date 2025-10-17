import Room from './Room.js';

const room10 = new Room(
    10,
    '🚀 FLUKTRUTEN - SISTE BEVIS',
    `
    <h3>Send Bevisene</h3>
    <p>Skriv kodeordet for å sende bevisene om Cubakrisen til vestlige myndigheter.</p>

    <div class="code-input">
        <label for="codeword">Kodeord:</label>
        <input type="text" id="codeword" placeholder="Skriv ord">
        <button class="btn" onclick="checkRoom10()">Send</button>
    </div>
    `,
    function check() {
        const word = document.getElementById('codeword').value.toLowerCase();
        if (word === 'tøvær') {
            showMessage(10, '🎉 Sendt! Bevisene er ute.');
            setTimeout(nextRoom, 2000);
            return true;
        } else {
            showMessage(10, '❌ Feil kodeord. Prøv igjen.', 'error');
            return false;
        }
    },
    'Kodeordet er navnet på operasjonen.'
);

export default room10;