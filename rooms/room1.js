import Room from './Room.js';

const room1 = new Room(
    1,
    '🏛️ INNGANGSPARTIET - BRIEFING',
    `
        <h3>Oppdragsbriefing</h3>
        <p><strong>Agent,</strong> velkommen til Operasjon Tøvær. Det er oktober 1962, og verden står på randen av atomkrig. Du har infiltrert et forlatt KGB-kontor i Berlin.</p>
        
        <p><strong>Din oppgave:</strong> Samle beviser om sovjetiske planer og forhindre eskalering av Cubakrisen.</p>
        
        <p><strong>Første gåte:</strong> Når startet den kalde krigen offisielt? Skriv årstallet for å få tilgang til bygningen.</p>
        
        <div class="code-input">
            <label for="year1">Årstall:</label>
            <input type="number" id="year1" placeholder="19XX" min="1900" max="2000">
            <button class="btn" onclick="checkRoom1()">Lås opp</button>
        </div>
    `,
    function check() {
        const year = parseInt(document.getElementById('year1').value);
        if (year >= 1946 && year <= 1947) {
            showMessage(1, '🎉 Korrekt! Den kalde krigen startet rett etter andre verdenskrig. Tilgang innvilget!');
            setTimeout(nextRoom, 2000);
            return true;
        } else {
            showMessage(1, '❌ Feil årstall. Prøv igjen! Tenk på slutten av andre verdenskrig.', 'error');
            return false;
        }
    },
    'Tenk på slutten av andre verdenskrig og når spenningene mellom USA og Sovjetunionen begynte å øke. Winston Churchill holdt sin berømte "jernteppe"-tale i 1946.'
);

export default room1;