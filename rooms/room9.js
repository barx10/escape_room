import Room from './Room.js';

const room9 = new Room(
    9,
    '🚨 KONTROLLROMMET - ATOMTRUSLER',
    `
    <h3>Forhindre Atomkrig</h3>
    <p>Velg de to lederne som forhandlet under Cubakrisen.</p>

    <div class="map-grid">
        <div class="map-item" onclick="selectLeader9('Kennedy')">John F. Kennedy</div>
        <div class="map-item" onclick="selectLeader9('Khrushchev')">Nikita Khrushchev</div>
        <div class="map-item" onclick="selectLeader9('Castro')">Fidel Castro</div>
    </div>

    <button class="btn" onclick="checkRoom9()">Deaktiver trussel</button>
    `,
    function check() {
        const selected = window.selectedLeaders9 || [];
        if (selected.includes('Kennedy') && selected.includes('Khrushchev') && !selected.includes('Castro')) {
            showMessage(9, '🎉 Riktig! Kennedy og Khrushchev forhandlet.');
            setTimeout(nextRoom, 2000);
            return true;
        } else {
            showMessage(9, '❌ Feil valg. Castro var ikke hovedforhandler.', 'error');
            return false;
        }
    },
    'De to supermakt-lederne: USA og Sovjetunionen.'
);

export default room9;