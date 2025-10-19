import Room from './Room.js';

const room4 = new Room(
    4,
    '1962 — CUBAKRISEN (OPPTRAPPING)',
    `
        <h3>1962 — 13 dager som rystet verden</h3>
        <p>Avlyttede planer og diplomatisk kommunikasjon viser at verdens ledere står i forhandlinger. Identifiser hvem som leder forhandlingene.</p>

        <div class="map-grid">
            <div class="map-item" onclick="selectLeader('Kennedy')">
                <strong>John F. Kennedy</strong><br>
                <small>President, USA</small>
            </div>
            <div class="map-item" onclick="selectLeader('Khrushchev')">
                <strong>Nikita Khrushchev</strong><br>
                <small>Leder, Sovjetunionen</small>
            </div>
            <div class="map-item" onclick="selectLeader('Castro')">
                <strong>Fidel Castro</strong><br>
                <small>Leder, Cuba</small>
            </div>
        </div>

        <p><strong>Siste kode:</strong> Hvor mange dager varte krisen (bruk historiekildene)?</p>

        <div class="code-input">
            <label for="crisisDays">Antall dager:</label>
            <input type="number" id="crisisDays" placeholder="13" min="1" max="30">
            <button class="btn" onclick="checkRoom4()">Stopp krisen!</button>
        </div>
    `,
    function check() {
        const days = parseInt(document.getElementById('crisisDays').value);
        const hasKennedy = selectedLeaders.includes('Kennedy');
        const hasKhrushchev = selectedLeaders.includes('Khrushchev');
        
        if (days === 13 && hasKennedy && hasKhrushchev) {
            showMessage(4, '🎉 Fantastisk! Du har stoppet atomkrigen! Kennedy og Khrushchev forhandlet i 13 dager.');
            setTimeout(nextRoom, 2000);
            return true;
        } else {
            showMessage(4, '❌ Ikke helt riktig. Sjekk lederne og antall dager (14.-28. oktober).', 'error');
            return false;
        }
    },
    'Cubakrisen varte fra 14. til 28. oktober 1962 — 13 kritiske dager.'
);

export default room4;