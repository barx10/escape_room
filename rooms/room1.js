import Room from './Room.js';

const room1 = new Room(
    1,
    '1946–1949 — ETTERKRIGSTIDEN',
    `
        <h3>Oppdragsintroduksjon — starten på den kalde krigen</h3>
        <p><strong>Agent,</strong> du har funnet et hemmelig dokument fra etterretningen. Det inneholder ledetråder til når spenningene mellom øst og vest begynte.</p>

        <div class="encrypted-document" style="background:rgba(0,0,0,0.4); padding:15px; border-left:3px solid #e94560; margin:15px 0;">
            <p style="font-style:italic; color:#00ff41;">📄 KLASSIFISERT NOTAT - Mars 1947</p>
            <p>"Winston Churchill holdt en dramatisk tale i Fulton, Missouri. Han advarte om et <strong>'jernteppe'</strong> som hadde falt over Europa, fra Østersjøen til Adriaterhavet."</p>
            <p style="margin-top:10px; color:#e94560;">"Denne talen markerte vendepunktet. Det var <strong>året etter krigens slutt</strong> at spenningene virkelig ble synlige for verden."</p>
        </div>

        <p><strong>Gåte:</strong> Når endte andre verdenskrig i Europa? Legg til 1 år for å finne når den kalde krigen startet.</p>

        <div class="code-input">
            <label for="year1">Årstall for den kalde krigens start:</label>
            <input type="number" id="year1" min="1900" max="2000">
            <button class="btn" onclick="checkRoom1()">Lås opp</button>
        </div>

        <div style="margin-top:14px;">
            <button id="hint1Btn" class="btn" onclick="nextHint1()">💡 Hint</button>
            <div id="hint1Box" class="hint-box" style="display:block; margin-top:10px; color:#fff;"></div>
        </div>
    `,
    function check() {
        const year = parseInt(document.getElementById('year1').value);
        if (year === 1946) {
            showMessage(1, '🎉 Korrekt! Den kalde krigen startet rett etter andre verdenskrig. Tilgang innvilget!');
            try { clearFailures(1); } catch(e) {}
            setTimeout(nextRoom, 2000);
            return true;
        } else {
            showMessage(1, '❌ Feil årstall. Prøv igjen! Tenk på slutten av andre verdenskrig.', 'error');
            try { recordFailure(1); } catch(e) {}
            return false;
        }
    },
    ''
);

export default room1;