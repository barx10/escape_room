import Room from './Room.js';

const room4 = new Room(
    4,
    '📡 KOMMUNIKASJONSSENTERET - CUBAKRISEN',
    `
        <h3>13 Dager som Rystet Verden</h3>
        <p>Du har funnet den hemmelige planen! Cubakrisen pågår akkurat nå. Hvilke to ledere forhandler om verdens skjebne?</p>
        
        <div class="map-grid">
            <div class="map-item" onclick="selectLeader('Kennedy')">
                <strong>John F. Kennedy</strong><br>
                <small>USA President</small>
            </div>
            <div class="map-item" onclick="selectLeader('Khrushchev')">
                <strong>Nikita Khrushchev</strong><br>
                <small>Sovjetisk leder</small>
            </div>
            <div class="map-item" onclick="selectLeader('Castro')">
                <strong>Fidel Castro</strong><br>
                <small>Cubansk leder</small>
            </div>
        </div>
        
        <p><strong>Siste kode:</strong> Hvor mange dager varte Cubakrisen?</p>
        
        <div class="code-input">
            <label for="crisisDays">Antall dager:</label>
            <input type="number" id="crisisDays" placeholder="XX" min="1" max="30">
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
    'Krisen varte fra 14. til 28. oktober 1962. Tell dagene!'
);

export default room4;