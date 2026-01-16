import Room from './Room.js';

const room2 = new Room(
    2,
    'OPPBYGGING AV ALLIANSER',
    `
        <h3>Tidslinje</h3>
        <p>Sett disse hendelsene i riktig kronologisk rekkefølge (eldst først):</p>

        <ol>
            <li>Opprettelsen av NATO</li>
            <li>Opprettelsen av Warszawapakten</li>
            <li>Berlinblokaden</li>
            <li>Koreakrigen</li>
        </ol>

        <p><strong>Hvordan:</strong> Trykk på hendelsene i den rekkefølgen du mener er korrekt. Valgte hendelser vises i rekkefølgen nedenfor. Du kan tilbakestille hvis du gjør en feil.</p>

        <div class="timeline-choices">
            <button class="btn timeline-btn" onclick="selectEvent2('NATO')">Opprettelsen av NATO</button>
            <button class="btn timeline-btn" onclick="selectEvent2('Warszawa')">Opprettelsen av Warszawapakten</button>
            <button class="btn timeline-btn" onclick="selectEvent2('Berlin')">Berlinblokaden</button>
            <button class="btn timeline-btn" onclick="selectEvent2('Korea')">Koreakrigen</button>
        </div>

        <div class="code-input" style="margin-top:12px;">
            <label>Din rekkefølge:</label>
            <div id="sequence2" class="sequence-box" aria-live="polite" style="min-height:48px; padding:8px; background:rgba(0,0,0,0.3); border-radius:6px; color:#fff;"></div>
            <div style="margin-top:10px;">
                <button class="btn" onclick="checkRoom2()">Sjekk rekkefølge</button>
                <button class="btn" onclick="resetSequence2()" style="margin-left:8px;">Tilbakestill</button>
            </div>
        </div>
                <div style="margin-top:14px;">
                    <button id="hint2Btn" class="btn" onclick="nextHint2()">💡 Hint (-30 sek)</button>
                    <div id="hint2Box" class="hint-box" style="display:block; margin-top:10px; color:#fff;"></div>
                </div>
    `,
    function check() {
        // Check handled by global handler
        const seq = window._room2Sequence || [];
        const correct = ['Berlin','NATO','Korea','Warszawa'];
        if (seq.length !== correct.length) {
            showMessage(2, '❌ Du må velge alle hendelsene i en rekkefølge før du sjekker.', 'error');
            return false;
        }
        for (let i = 0; i < correct.length; i++) {
            if (seq[i] !== correct[i]) {
                showMessage(2, '❌ Feil rekkefølge. Tenk kronologisk — begynn med det eldste.', 'error');
                return false;
            }
        }
        showMessage(2, '🎉 Perfekt! Tidslinjen er korrekt.', 'success');
        setTimeout(nextRoom, 2000);
        return true;
    },
    ''
);

export default room2;