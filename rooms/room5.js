// room5.js
// Deprecated: innholdet er flettet inn i room11 (AVSLUTNING). Denne filen er bevart for historikk.
import Room from './Room.js';

const room5 = new Room(
    5,
    'DEPRECATED - Se room11',
    `<p>Dette rommet er fjernet fra den aktive rekkefølgen. Se avslutningsrommet for oppsummering.</p>`,
    function check() { return true; }
);

export default room5;