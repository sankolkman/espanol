# Español – Spaans leren

Een persoonlijke webapp om als beginner Spaans te leren. Je volgt een lessenpad met woordjes (Spaans ↔ Nederlands), zinnen, luisteren, hardop spreken, grammatica-uitleg, gesprekjes aanvullen en korte teksten.

Er zijn twee leerpaden, met tabbladen bovenaan om te wisselen:

- **Vakantie**: 19 lessen in 6 thema's (begroeten, getallen en tijd, eten en drinken, de weg vragen, hotel, winkelen en kleine problemen), Spaans uit Spanje (es-ES), inclusief *vosotros*
- **Bijbel**: het Nieuwe Testament leren lezen in drie fases
  1. *Bekende stukken*: Onze Vader, Johannes 3:16, de zaligsprekingen, 1 Korintiërs 13, "Ik ben"-uitspraken, het grote gebod
  2. *Verhalen*: geboorte van Jezus, verloren zoon, barmhartige Samaritaan, storm, broden en vissen, opstanding
  3. *Marcus*: alle 16 hoofdstukken, met een leesscherm waarin je op een woord tikt voor de vertaling

  Per les leer je eerst nieuwe woorden, daarna vertaal je verzen en vul je ontbrekende woorden in uit een rijtje.

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
- **GitHub Pages**: deze repository publiceert automatisch via GitHub Actions bij elke push naar `main` (zie [.github/workflows/deploy.yml](.github/workflows/deploy.yml)). Live: https://sankolkman.github.io/espanol/

Op je Android-telefoon open je de site in Chrome. Via het menu kies je "Toevoegen aan startscherm", dan staat hij als app-icoon op je telefoon. Elk apparaat houdt zijn eigen voortgang bij. Met *Instellingen → Exporteren/Importeren* zet je je voortgang over.

## Bijbeltekst en bronvermelding

De Spaanse bijbeltekst is **Palabra de Dios para ti** © 2020 Asociación Bíblica Latinoamericana, beschikbaar onder [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) via [eBible.org](https://ebible.org/Scriptures/details.php?id=spapddpt). Wijziging: de vierkante haken waarmee de vertaler toegevoegde woorden markeert zijn weggelaten. De Nederlandse vertalingen van de verzen zijn een eigen weergave.

Deze vertaling komt uit Latijns-Amerika (*ustedes* in plaats van *vosotros*) en volgt de oudste handschriften: Marcus eindigt bij 16:8 en een paar verzen (zoals Marcus 7:16) ontbreken.

De verzen die de app gebruikt staan in [src/content/bible/text.json](src/content/bible/text.json). Opnieuw aanmaken:

```bash
# download en pak uit: https://ebible.org/Scriptures/spapddpt_vpl.zip
node scripts/extract-bible.mjs pad/naar/spapddpt_vpl.txt
```

## Lessen toevoegen of aanpassen

De lesinhoud staat in [src/content/](src/content/): het vakantiepad in `unit1.ts` … `unit6.ts`, het bijbelpad in [src/content/bible/](src/content/bible/) (`phase1.ts` … `phase3.ts`). Een les heeft woorden, zinnen, optioneel grammatica (uitleg + invuloefeningen met `___`), een gesprekje en een leestekst. `npm test` controleert of alles goed in elkaar zit.
