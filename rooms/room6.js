import Room from './Room.js';

const room6 = new Room(
    6,
    '📚 ARKIVROMMET - HEMMELIGE DOKUMENTER',
    `
    <h3>Avslør Sovjetiske Planer</h3>
    <p>Du er nå i arkivet. Finn dokumentet som avslører når rakettene ble plassert på Cuba.</p>

    <div class="map-grid">
        <div class="map-item" onclick="selectDocument('oktober')">Oktober 1962</div>
        <div class="map-item" onclick="selectDocument('september')">September 1962</div>
        <div class="map-item" onclick="selectDocument('november')">November 1962</div>
    </div>

    <button class="btn" onclick="checkRoom6()">Åpne dokument</button>
    `,
    function check() {
        if (window.selectedDocument === 'oktober') {
            showMessage(6, '🎉 Funnet! Rakettene ble plassert i oktober.');
            setTimeout(nextRoom, 2000);
            return true;
        } else {
            showMessage(6, '❌ Feil dokument. Prøv igjen.', 'error');
            return false;
        }
    },
    'Sjekk datoene – Cubakrisen eskalerte i oktober 1962.'
);

export default room6;