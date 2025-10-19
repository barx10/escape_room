import Room from './Room.js';

const room6 = new Room(
    5,
    '1962 — ARKIVROMMET',
    `
    <h3>Arkiv: Finn datoen</h3>
    <p>Du blar i hemmelige dokumenter som viser når sovjetiske raketter ble plassert på Cuba. Velg riktig måned.</p>

    <div class="map-grid">
        <div class="map-item" onclick="selectDocument('oktober')">Oktober 1962</div>
        <div class="map-item" onclick="selectDocument('september')">September 1962</div>
        <div class="map-item" onclick="selectDocument('november')">November 1962</div>
    </div>

    <button class="btn" onclick="checkRoom5()">Åpne dokument</button>
    `,
    function check() {
        if (window.selectedDocument === 'oktober') {
            showMessage(5, '🎉 Funnet! Rakettene ble plassert i oktober.');
            setTimeout(nextRoom, 2000);
            return true;
        } else {
            showMessage(5, '❌ Feil dokument. Prøv igjen.', 'error');
            return false;
        }
    },
    'Cubakrisen eskalerte i oktober 1962 — riktig dokument viser dette.'
);

export default room6;