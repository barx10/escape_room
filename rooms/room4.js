import Room from './Room.js';

let decryptedMessages = [];

const room4 = new Room(
    4,
    'CUBAKRISEN',
    `
        <h3>🔐 Hemmelige meldinger fra krisen</h3>
        <p>CIA har avlyttet tre krypterte meldinger mellom de involverte lederne under Cubakrisen. 
        Du må dekryptere meldingene for å finne den hemmelige koden som avverget atomkrigen.</p>

        <div class="encrypted-messages">
            <div class="message-box">
                <h4>📡 Melding 1 - Fra Washington (Caesar cipher, shift 1)</h4>
                <p class="encrypted-text">XF NVTU TUPQ UIF NJTTJMFT</p>
                <div class="decrypt-input">
                    <input type="text" id="decrypt1" placeholder="Dekrypter meldingen..." maxlength="25">
                    <button class="btn-small" onclick="checkMessage(1)">Dekrypter</button>
                </div>
                <p class="hint">💡 Tips: Hver bokstav er forskjøvet 1 plass fremover i alfabetet</p>
                    <div class="stamp-container" id="stamp1"></div>
            </div>

            <div class="message-box">
                <h4>📡 Melding 2 - Fra Moskva (Caesar cipher, shift 3)</h4>
                <p class="encrypted-text">ZH ZLOO GHSORT WKHP</p>
                <div class="decrypt-input">
                    <input type="text" id="decrypt2" placeholder="Dekrypter meldingen..." maxlength="25">
                    <button class="btn-small" onclick="checkMessage(2)">Dekrypter</button>
                </div>
                <p class="hint">💡 Tips: Hver bokstav er forskjøvet 3 plasser fremover i alfabetet</p>
                    <div class="stamp-container" id="stamp2"></div>
            </div>

            <div class="message-box">
                <h4>📡 Melding 3 - Fra Havana</h4>
                <p class="encrypted-text">WON LANOITAREPO SELISSIM TEIVOS</p>
                <div class="decrypt-input">
                    <input type="text" id="decrypt3" placeholder="Dekrypter meldingen..." maxlength="50">
                    <button class="btn-small" onclick="checkMessage(3)">Dekrypter</button>
                </div>
                <p class="hint">💡 Tips: Tenk på en uvanlig måte</p>
                    <div class="stamp-container" id="stamp3"></div>
            </div>
        </div>

        <div class="final-code-section" style="display: none;" id="finalCodeSection">
            <h3>🎯 Siste steg!</h3>
            <p>Alle tre meldingene er dekryptert! Men det er én ting til...</p>
            <p>CIA har avlyttet en siste hemmelig melding sendt fra Kreml til Cuba:</p>
            
            <div style="background: #1a1a1a; padding: 20px; border-radius: 10px; margin: 20px 0; border: 2px solid #00ff41;">
                <div style="text-align: center; margin-bottom: 15px; color: #00ff41; font-size: 18px;">📟 HEMMELIG TELEGRAF 📟</div>
                <div style="font-family: 'Courier New', monospace; font-size: 24px; text-align: center; color: #fff; letter-spacing: 3px; line-height: 2;">
                    ·–––– / ····– / ·–––– / ––––– / ·–––– / ––––· / –···· / ··––– / –– / ··· / –·–
                </div>
            </div>
            
            <div style="background: rgba(0,255,65,0.1); padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #00ff41;">
                <p style="margin: 5px 0; color: #00ff41;"><strong>🔑 MORSEALFABET:</strong></p>
                <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; font-family: monospace; font-size: 13px;">
                    <span>A ·–</span> <span>B –···</span> <span>C –·–·</span> <span>D –··</span> <span>E ·</span>
                    <span>F ··–·</span> <span>G ––·</span> <span>H ····</span> <span>I ··</span> <span>J ·–––</span>
                    <span>K –·–</span> <span>L ·–··</span> <span>M ––</span> <span>N –·</span> <span>O –––</span>
                    <span>P ·––·</span> <span>Q ––·–</span> <span>R ·–·</span> <span>S ···</span> <span>T –</span>
                    <span>U ··–</span> <span>V ···–</span> <span>W ·––</span> <span>X –··–</span> <span>Y –·––</span>
                    <span>Z ––··</span>
                    <span style="grid-column: span 5; margin-top: 5px; border-top: 1px solid #00ff41; padding-top: 8px;">
                        0 –––––  | 1 ·––––  | 2 ··–––  | 3 ···––  | 4 ····–  | 5 ·····  | 6 –····  | 7 ––···  | 8 –––··  | 9 ––––·
                    </span>
                </div>
                <p style="margin-top: 10px; font-size: 14px; color: #aaa;">💡 Tips: Bruk både bokstaver og tall når du dekrypterer</p>
            </div>
            
            <div class="code-input">
                <input type="text" id="crisisDate" placeholder="XXXXXXXXXXX" maxlength="11">
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