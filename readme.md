# Español – vakantie-Spaans leren

Een persoonlijke webapp om als beginner Spaans te leren voor een vakantie in Spanje. Je volgt een lessenpad met woordjes (Spaans ↔ Nederlands), zinnen, luisteren, hardop spreken, grammatica-uitleg, gesprekjes aanvullen en korte leesteksten.

- 19 lessen in 6 thema's: begroeten, getallen en tijd, eten en drinken, de weg vragen, hotel, winkelen en kleine problemen
- Spaans uit Spanje (es-ES), inclusief *vosotros*
- Geen account en geen server: je voortgang staat in je browser

## Starten

Je hebt [Node.js](https://nodejs.org) nodig (versie 20 of nieuwer).

```bash
npm install
npm run dev
```

Open daarna de link die verschijnt (meestal http://localhost:5173) in **Chrome** of **Edge**.

## Spraak

- **Uitspreken** gebruikt de Spaanse stemmen van je systeem of browser. Edge heeft heel natuurlijke stemmen ("Microsoft … Online (Natural) – Spanish (Spain)"). Kies je stem bij *Instellingen*.
- **Spreken** (spraakherkenning) werkt in Chrome en Edge. De eerste keer vraagt de browser of de microfoon mag. In Firefox werkt dit niet; daar worden spreekoefeningen vervangen door typen.
- Wil je even stil oefenen? Zet bij *Instellingen* de luister- en spreekoefeningen uit, of tik in een oefening op "Ik kan nu niet praten".

## Overige commando's

| Commando | Wat het doet |
|---|---|
| `npm test` | alle tests draaien |
| `npm run build` | statische site maken in `dist/` |
| `npm run preview` | de gebouwde site lokaal bekijken |

## Online zetten (optioneel)

`npm run build` maakt een map `dist/` die je op elke statische hosting kunt zetten, ook in een submap. Bijvoorbeeld:

- **Netlify**: sleep de map `dist` naar https://app.netlify.com/drop
- **GitHub Pages**: zet de inhoud van `dist` in een `gh-pages`-branch

Op je Android-telefoon open je de site in Chrome. Via het menu kies je "Toevoegen aan startscherm", dan staat hij als app-icoon op je telefoon. Elk apparaat houdt zijn eigen voortgang bij. Met *Instellingen → Exporteren/Importeren* zet je je voortgang over.

## Lessen toevoegen of aanpassen

De lesinhoud staat in [src/content/](src/content/), één bestand per thema (`unit1.ts` … `unit6.ts`). Een les heeft woorden, zinnen, optioneel grammatica (uitleg + invuloefeningen met `___`), een gesprekje en een leestekst. `npm test` controleert of alles goed in elkaar zit.
