import Room from './Room.js';

const room6 = new Room(
    5,
    '1962 — ARKIVROMMET',
    `
    <h3>Arkiv: Finn den kritiske måneden</h3>
    <p>Du har funnet et hemmelig CIA-arkiv med U-2 fly-rekognosering over Cuba. Ett av disse dokumentene viser når amerikanske etterretning <strong>oppdaget</strong> de sovjetiske rakettene.</p>

    <div style="background:rgba(0,0,0,0.3); padding:12px; margin:10px 0; border-left:3px solid #00ff41;">
        <p style="color:#00ff41; font-style:italic;">📸 "U-2 fly fotograferte SS-4 mellomdistanseraketter i oppbygning. President Kennedy ble informert dagen etter."</p>
    </div>

    <p><strong>Spørsmål:</strong> I hvilken måned oppdaget USA rakettene og eskalerte krisen?</p>

    <div class="map-grid">
        <div class="map-item" onclick="selectDocument('august')">August 1962</div>
        <div class="map-item" onclick="selectDocument('september')">September 1962</div>
        <div class="map-item" onclick="selectDocument('oktober')">Oktober 1962</div>
        <div class="map-item" onclick="selectDocument('november')">November 1962</div>
        <div class="map-item" onclick="selectDocument('desember')">Desember 1962</div>
        <div class="map-item" onclick="selectDocument('juli')">Juli 1962</div>
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