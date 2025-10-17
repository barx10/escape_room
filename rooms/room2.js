import Room from './Room.js';

const room2 = new Room(
    2,
    '🔐 KODEROMMET - ALLIANSER',
    `
        <h3>Militære Allianser</h3>
        <p>Du har funnet en kryptert melding om militære allianser. Løs gåten for å dekryptere den.</p>
        
        <p><strong>Spørsmål:</strong> Hvilke to store militære allianser sto mot hverandre under den kalde krigen?</p>
        
        <div class="map-grid">
            <div class="map-item" onclick="selectAlliance('NATO')">
                <strong>NATO</strong><br>
                <small>Nord-Atlanterhavspakten</small>
            </div>
            <div class="map-item" onclick="selectAlliance('Warszawa')">
                <strong>Warszawapakten</strong><br>
                <small>Øst-Europa allianse</small>
            </div>
            <div class="map-item" onclick="selectAlliance('FN')">
                <strong>FN</strong><br>
                <small>Forente Nasjoner</small>
            </div>
        </div>
        
        <div class="code-input">
            <label for="alliance1">Vest-allianse:</label>
            <input type="text" id="alliance1" placeholder="Skriv navn" readonly>
            <label for="alliance2">Øst-allianse:</label>
            <input type="text" id="alliance2" placeholder="Skriv navn" readonly>
            <button class="btn" onclick="checkRoom2()">Dekrypter</button>
        </div>
    `,
    function check() {
        const alliance1 = document.getElementById('alliance1').value;
        const alliance2 = document.getElementById('alliance2').value;
        
        if (alliance1 === 'NATO' && alliance2 === 'Warszawapakten') {
            showMessage(2, '🎉 Perfekt! Du har identifisert de to store militære alliansene. Koden er dekryptert!');
            setTimeout(nextRoom, 2000);
            return true;
        } else {
            showMessage(2, '❌ Ikke riktig kombinasjon. Velg en vest-allianse og en øst-allianse.', 'error');
            return false;
        }
    },
    'Den ene ble opprettet i 1949 med USA som leder, den andre i 1955 med Sovjetunionen som leder.'
);

export default room2;