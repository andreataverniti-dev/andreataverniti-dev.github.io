# Edicola Oscar Nalesso — demo interattiva

Demo GitHub Pages autonoma in `/demo/edicola-oscar-nalesso/`.

- Home con ultimi articoli **in vendita**, ordinati per data di inserimento (non di modifica).
- Catalogo disponibile e preordini separati, ciascuno diviso in Pokémon / One Piece.
- `/gestione/`: pannello aperto per la dimostrazione, con creazione, modifica, foto, pubblicazione, eliminazione prodotti e richieste di prova.
- Quattro esempi iniziali. Gli articoli eliminati non riappaiono finché non si sceglie «Ripristina demo».
- Dati conservati solo nel localStorage del browser: nessun backend, pagamento, ordine o email reale. Non inserire dati personali. Tutti i prodotti restano dimostrativi.
- Il sito operativo privato e i suoi dati non sono inclusi. Per una gestione reale e condivisa serve un backend protetto.

## Build

Node.js 22+, `npm install` e `npm run build`. Pubblicare il contenuto della cartella nel percorso indicato. Le nove pagine hanno file HTML propri, per apertura diretta e ricaricamento su GitHub Pages. `assets/site.css` conserva il foglio di stile compilato del sito originale; `assets/demo.css` aggiunge la barra demo e i nuovi arrivi. Le immagini sono documentate in `IMAGE-SOURCES.md`.

Non cambiare il prefisso senza aggiornare `src/jsx-runtime.ts` e `build.mjs`. Non aggiungere chiavi private o credenziali al frontend pubblico.
