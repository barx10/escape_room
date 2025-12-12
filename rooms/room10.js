import Room from './Room.js';

const room10 = new Room(
    9,
    'SISTE BEVIS — SIKKER OVERFØRING',
    `
    <h3>Kryptert overføring</h3>
    <p>Du har samlet alle bevisene og må sende dem til Washington via sikker kanal. Men først må du autentisere deg med det hemmelige kodeordet.</p>

    <div style="background:rgba(0,0,0,0.3); padding:15px; margin:10px 0; border:1px solid #e94560;">
        <p style="color:#00ff41; font-family:monospace;">📋 KLASSIFISERT BRIEFING</p>
        <p style="color:#fff; margin-top:10px;">Du husker fra briefingen at denne etterretningsoperasjonen har et kodenavn. Det norske ordet for når værsituasjonen blir bedre etter en storm...</p>
        <p style="color:#e94560; font-style:italic; margin-top:8px;">En passende metafor for løsningen av Cubakrisen - da spenningen lettet og krigen ble avverget.</p>
    </div>

    <p><strong>Hint:</strong> Søk tilbake i minnet - dette kodeordet burde du ha lært i briefingen før oppdraget startet.</p>

    <div class="code-input">
        <label for="codeword">Operasjonens kodenavn:</label>
        <input type="text" id="codeword" placeholder="Skriv kodeordet">
        <button class="btn" onclick="checkRoom9()">Autentiser & Send</button>
    </div>
    `,
    function check() {
        const word = document.getElementById('codeword').value.toLowerCase().replace(/\s/g, '');
        if (word === 'tøvær' || word === 'tovaer') {
            showMessage(9, '🎉 Autentisert! Operasjon TØVÆR - bevisene er sendt til Washington.');
            setTimeout(nextRoom, 2000);
            return true;
        } else {
            showMessage(9, '❌ Feil kodeord. Sjekk briefingen eller tenk på værsituasjoner.', 'error');
            return false;
        }
    },
    'Ordet beskriver når det klarer opp etter dårlig vær - "tøvær". Dette burde være nevnt i briefingen.'
);

export default room10;