import Room from './Room.js';

const room8 = new Room(
    8,
    'FORHANDLINGENE',
    `
    <h3>Forhandlingene</h3>
    <p>Hvem forhandlet direkte om en løsning under Cubakrisen? Velg de to riktige lederne.</p>

    <div class="map-grid">
        <div class="map-item" onclick="selectLeader8('Kennedy')">John F. Kennedy</div>
        <div class="map-item" onclick="selectLeader8('Khrushchev')">Nikita Khrushchev</div>
        <div class="map-item" onclick="selectLeader8('Castro')">Fidel Castro</div>
    </div>

    <button class="btn" onclick="checkRoom8()">Bekreft</button>
    `,
    function check() {
        const selected = window.selectedLeaders8 || [];
        if (selected.includes('Kennedy') && selected.includes('Khrushchev') && !selected.includes('Castro')) {
            showMessage(8, '🎉 Riktig! Kennedy og Khrushchev forhandlet.');
            setTimeout(nextRoom, 2000);
            return true;
        } else {
            showMessage(8, '❌ Feil valg. Castro var ikke hovedforhandler.', 'error');
            return false;
        }
    },
    'Kennedy og Khrushchev var hovedforhandlerne mellom supermaktene.'
);

export default room8;
