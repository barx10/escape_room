import Room from './Room.js';

const room3 = new Room(
    3,
    '🕵️ SPIONASJEKONTORET - BERLINMUREN',
    `
        <h3>Den Delte Byen</h3>
        <p>Du har funnet hemmelige dokumenter om Berlinmuren. Når ble muren bygget?</p>
        
        <p><strong>Bakgrunn:</strong> Berlin ble delt etter andre verdenskrig. Øst-Tyskland bygget en mur for å stoppe folk fra å flykte til vest.</p>
        
        <div class="code-input">
            <label for="berlinYear">År for Berlinmurens bygging:</label>
            <input type="number" id="berlinYear" placeholder="19XX" min="1950" max="1970">
            <label for="berlinMonth">Måned (nummer):</label>
            <input type="number" id="berlinMonth" placeholder="XX" min="1" max="12">
            <button class="btn" onclick="checkRoom3()">Åpne safe</button>
        </div>
        
        <div class="morse-display" id="morseCode" style="display: none;">
            🔊 Morse-kode funnet: -.-- . ... / .-- . / -.-. .- -.
        </div>
        
        <div class="code-input">
            <label for="morseAnswer">Dekoder morse-koden:</label>
            <input type="text" id="morseAnswer" placeholder="Engelsk ord">
            <button class="btn" onclick="checkMorse()">Dekoder</button>
        </div>
    `,
    function check() {
        // Dette er for første del, men siden det er to deler, kanskje ikke bruke check her.
        // Kanskje lage separate funksjoner.
        // For enkelhet, la check være for morse, og håndter dato separat.
        const answer = document.getElementById('morseAnswer').value.toLowerCase();
        if (answer === 'yes we can' || answer === 'yeswecan') {
            showMessage(3, '🎉 Morse-koden dekryptert! "YES WE CAN" - du kan gå videre!');
            setTimeout(nextRoom, 2000);
            return true;
        } else {
            showMessage(3, '❌ Feil dekoding. Prøv igjen med morse-tabellen.', 'error');
            return false;
        }
    },
    'Muren ble bygget "over natten" i august 1961. Morse: Y=-.-- E=. S=... W=.-- E=. C=-.-. A=.- N=-.'
);

export default room3;