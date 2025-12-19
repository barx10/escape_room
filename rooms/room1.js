import Room from './Room.js';

const room1 = new Room(
    1,
    'ETTERKRIGSTIDEN',
    `
        <h3>Oppdragsintroduksjon — starten på den kalde krigen</h3>
        <p><strong>Agent,</strong> oppdraget starter i etterkrigstiden. For å forstå hvorfor verden senere kom i krise, må du først plassere når den kalde krigen begynte.</p>

        <p><strong>Din oppgave:</strong> Bekreft når den kalde krigen startet slik at du får tilgang til videre etterforskning.</p>

        <p><strong>Første gåte:</strong> Når begynte spenningene mellom USA og Sovjetunionen å bli tydelige? Skriv årstall.</p>

        <div class="code-input">
            <label for="year1">Årstall (YYYY):</label>
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