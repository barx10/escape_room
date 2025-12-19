import Room from './Room.js';

const room10 = new Room(
    10,
    'AVSLUTNING — OPPDRAG FULLFØRT',
    `
        <h3>🎉 Gratulerer, Agent!</h3>
        <p>Du har gjennomført etterforskningen og bidratt til å hindre eskalering under Cubakrisen.</p>
        
        <div class="success-message">
            <h3>Oppdragsrapport:</h3>
            <p>✅ Forstått starten på den kalde krigen (1946–1947)</p>
            <p>✅ Identifisert hovedalliansene (NATO vs Warszawapakten)</p>
            <p>✅ Lært om Berlinmurens rolle (1961)</p>
            <p>✅ Avslørt planlegging og installasjon av raketter på Cuba (1962)</p>
            <p>✅ Samlet og sendt bevis</p>
        </div>
        
        <p><strong>Refleksjon:</strong> Diskuter med gruppen eller klassen:</p>
        <ul>
            <li>Hvorfor kalles det "den kalde krigen"?</li>
            <li>Hva var de viktigste konsekvensene av perioden?</li>
            <li>Hva kan vi lære om diplomati og konfliktløsning?</li>
        </ul>
        
        <button class="btn" onclick="restartGame()" style="background: linear-gradient(45deg, #4ecdc4, #44a08d);">🔄 Spill på nytt</button>
    `,
    function check() {
        // Ingen check for siste rom
        return true;
    }
);

export default room10;
