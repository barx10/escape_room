import Room from './Room.js';

const room11 = new Room(
    11,
    '🚁 FLUKTROMMET - OPPDRAG FULLFØRT',
    `
        <h3>🎉 Gratulerer, Agent!</h3>
        <p>Du har fullført Operasjon Tøvær og forhindret en atomkatastrofe!</p>
        
        <div class="success-message">
            <h3>Oppdragsrapport:</h3>
            <p>✅ Lært om den kalde krigens start (1946-1947)</p>
            <p>✅ Identifisert NATO vs Warszawapakten</p>
            <p>✅ Forstått Berlinmurens betydning (1961)</p>
            <p>✅ Avslørt Cubakrisen-planer (1962)</p>
            <p>✅ Samlet alle bevis og sendt dem</p>
        </div>
        
        <p><strong>Refleksjon:</strong> Diskuter med gruppen:</p>
        <ul>
            <li>Hvorfor kalles det "den kalde krigen"?</li>
            <li>Hvilke konsekvenser hadde denne perioden for verden?</li>
            <li>Hva lærte dere om spenningen mellom øst og vest?</li>
        </ul>
        
        <button class="btn" onclick="restartGame()" style="background: linear-gradient(45deg, #4ecdc4, #44a08d);">🔄 Spill på nytt</button>
    `,
    function check() {
        // Ingen check for siste rom
        return true;
    }
);

export default room11;