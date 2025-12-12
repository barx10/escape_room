import Room from './Room.js';

const room9 = new Room(
    8,
    'FORHANDLINGENE - KONTROLLROMMET',
    `
    <h3>Identifiser forhandlerne</h3>
    <p>Under Cubakrisen utvekslet flere verdensled ere meldinger og truede med krig. Men hvem forhandlet <strong>direkte</strong> med hverandre for å unngå atomkrig?</p>

    <div style="background:rgba(0,0,0,0.3); padding:12px; margin:10px 0; border-left:3px solid #00ff41;">
        <p style="color:#00ff41;">💡 Ledetråd:</p>
        <p style="color:#fff;">De to supermaktslederne utvekslet hemmelige brev og kommuniserte via "backchannel" diplomati. De møttes aldri fysisk, men deres forhandlinger reddet verden.</p>
    </div>

    <p><strong>Velg nøyaktig de to lederne</strong> som forhandlet direkte mellom USA og Sovjetunionen:</p>

    <div class="map-grid">
        <div class="map-item" onclick="selectLeader8('Kennedy')">John F. Kennedy (USA)</div>
        <div class="map-item" onclick="selectLeader8('Khrushchev')">Nikita Khrushchev (USSR)</div>
        <div class="map-item" onclick="selectLeader8('Castro')">Fidel Castro (Cuba)</div>
        <div class="map-item" onclick="selectLeader8('Eisenhower')">Dwight Eisenhower (USA)</div>
        <div class="map-item" onclick="selectLeader8('DeGaulle')">Charles de Gaulle (Frankrike)</div>
        <div class="map-item" onclick="selectLeader8('Macmillan')">Harold Macmillan (UK)</div>
    </div>

    <button class="btn" onclick="checkRoom8()">Bekreft</button>
    `,
    function check() {
        const selected = window.selectedLeaders8 || [];
        if (selected.length === 2 && selected.includes('Kennedy') && selected.includes('Khrushchev')) {
            showMessage(8, '🎉 Riktig! Kennedy og Khrushchev forhandlet direkte og reddet verden.');
            setTimeout(nextRoom, 2000);
            return true;
        } else if (selected.length !== 2) {
            showMessage(8, '❌ Du må velge nøyaktig to ledere.', 'error');
            return false;
        } else {
            showMessage(8, '❌ Feil valg. Tenk på hvem som ledet USA og USSR i 1962.', 'error');
            return false;
        }
    },
    'Kennedy og Khrushchev var hovedforhandlerne mellom supermaktene.'
);

export default room9;