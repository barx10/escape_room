import Room from './Room.js';

const room9 = new Room(
    9,
    'SISTE BEVIS — FLUKTRUTEN',
    `
    <h3>Send bevisene</h3>
    <p>Du må sende bevisene videre. Bruk kodeordet for å sikre kommunikasjonen.</p>

    <div class="code-input">
        <label for="codeword">Kodeord:</label>
        <input type="text" id="codeword" placeholder="Skriv ord">
        <button class="btn" onclick="checkRoom9()">Send</button>
    </div>
    `,
    function check() {
        const word = document.getElementById('codeword').value.toLowerCase();
        if (word === 'tøvær') {
            showMessage(9, '🎉 Sendt! Bevisene er ute.');
            setTimeout(nextRoom, 2000);
            return true;
        } else {
            showMessage(9, '❌ Feil kodeord. Prøv igjen.', 'error');
            return false;
        }
    },
    'Kodeordet er navnet på operasjonen.'
);

export default room9;
