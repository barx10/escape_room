import Room from './Room.js';

let decryptedMessages = [];

const room4 = new Room(
    4,
    '1962 — CUBAKRISEN (DEKRYPTERING)',
    `
        <h3>🔐 Hemmelige meldinger fra krisen</h3>
        <p>CIA har avlyttet tre krypterte meldinger mellom de involverte lederne under Cubakrisen. 
        Du må dekryptere meldingene for å finne den hemmelige koden som avverget atomkrigen.</p>

        <div class="encrypted-messages">
            <div class="message-box">
                <h4>📡 Melding 1 - Fra Washington</h4>
                <p class="encrypted-text">XF NVTU TUPQ UIF NJTTJMFT</p>
                <div class="decrypt-input">
                    <input type="text" id="message1" placeholder="Dekrypter meldingen..." maxlength="25">
                    <button class="btn-small" onclick="checkMessage(1)">Dekrypter</button>
                </div>
                <p class="hint">💡 Tips: Ser ut som Caesar cipher - prøv forskjellige shift-verdier</p>
                    <div class="stamp-container" id="stamp1"></div>
            </div>

            <div class="message-box">
                <h4>📡 Melding 2 - Fra Moskva</h4>
                <p class="encrypted-text">ZH ZLOO UHPRYH WKHP</p>
                <div class="decrypt-input">
                    <input type="text" id="message2" placeholder="Dekrypter meldingen..." maxlength="25">
                    <button class="btn-small" onclick="checkMessage(2)">Dekrypter</button>
                </div>
                <p class="hint">💡 Tips: Samme metode som melding 1, men annen shift-verdi</p>
                    <div class="stamp-container" id="stamp2"></div>
            </div>

            <div class="message-box">
                <h4>📡 Melding 3 - Fra Havana</h4>
                <p class="encrypted-text">SYAD 31 NI DENEPPAH TI</p>
                <div class="decrypt-input">
                    <input type="text" id="message3" placeholder="Dekrypter meldingen..." maxlength="25">
                    <button class="btn-small" onclick="checkMessage(3)">Dekrypter</button>
                </div>
                <p class="hint">💡 Tips: Denne bruker en annen metode - se på ordenes struktur</p>
                    <div class="stamp-container" id="stamp3"></div>
            </div>
        </div>

        <div class="final-code-section" style="display: none;" id="finalCodeSection">
            <h3>🎯 Siste steg!</h3>
            <p>Alle tre meldingene er dekryptert! Nå må du finne den hemmelige koden.</p>
            <p><strong>Spørsmål:</strong> Hvor mange dager varte Cubakrisen?</p>
            <p class="hint">💡 Tips: Svaret står i en av meldingene du dekrypterte</p>
            
            <div class="code-input">
                <input type="number" id="crisisDays" placeholder="Antall dager..." min="1" max="30">
                <button class="btn" onclick="checkRoom4()">Stopp krisen! 🚀</button>
            </div>
        </div>
    `,
    function check() {
        // This function is now handled by window.checkRoom4 in game.js
        return true;
    },
    'Cubakrisen varte fra 14. til 28. oktober 1962 — 13 kritiske dager. Kennedy og Khrushchev forhandlet om å fjerne raketter.'
);

export default room4;