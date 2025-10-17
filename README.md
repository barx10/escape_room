# Escape Room - Den Kalde Krigen

Et interaktivt escape room-spill om den kalde krigen, bygget med HTML, CSS og JavaScript.

## Struktur

- `index.html` - Hoved HTML-fil
- `styles.css` - CSS-stiler
- `game.js` - Spillmotor som håndterer logikk og laster rom
- `rooms/` - Mappe for rom-moduler
  - `Room.js` - Base Room-klasse
  - `room1.js` - Første rom
  - `room2.js` - Andre rom
  - ...
  - `index.js` - Eksporterer alle rom

## Hvordan kjøre

1. Start en lokal HTTP-server:
   ```bash
   python -m http.server 8000
   ```
2. Åpne http://localhost:8000 i nettleseren.

## Legge til nye rom

1. Opprett en ny fil i `rooms/` mappen, f.eks. `room6.js`
2. Bruk Room-klassen til å lage rommet:
   ```javascript
   import Room from './Room.js';

   const room6 = new Room(
       6,
       '🏢 NYTT ROM - TITTEL',
       `
       <h3>Gåte tittel</h3>
       <p>Beskrivelse av gåten.</p>
       <div class="code-input">
           <input type="text" id="input6" placeholder="Svar">
           <button class="btn" onclick="checkRoom6()">Sjekk</button>
       </div>
       `,
       function check() {
           const answer = document.getElementById('input6').value;
           if (answer === 'riktig svar') {
               showMessage(6, '🎉 Korrekt!');
               setTimeout(nextRoom, 2000);
               return true;
           } else {
               showMessage(6, '❌ Feil.', 'error');
               return false;
           }
       },
       'Hint tekst'
   );

   export default room6;
   ```
3. Legg til import og eksport i `rooms/index.js`:
   ```javascript
   import room6 from './room6.js';

   const rooms = [room1, room2, room3, room4, room5, room6];
   ```
4. Legg til globale funksjoner i `game.js` hvis nødvendig, f.eks. `window.checkRoom6 = ...`

## Spillfunksjoner

- Timer på 60 minutter
- Fremgangsbar
- Hint-system
- Responsivt design

## Teknologier

- HTML5
- CSS3
- JavaScript (ES6 Moduler)