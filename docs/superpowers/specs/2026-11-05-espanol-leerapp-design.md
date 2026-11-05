# Español – leerapp voor vakantie-Spaans (ontwerp)

Datum: 2026-11-05

## 1. Doel en waarom

Sander is beginner in het Spaans en wil zich voorbereiden op **vakantie in Spanje**. Daarvoor wil hij:

- eenvoudige teksten kunnen **lezen** (menukaart, borden, korte berichten);
- eenvoudige **gesprekken** kunnen voeren (begroeten, bestellen, de weg vragen, inchecken, winkelen, jezelf voorstellen).

Hij oefent **dagelijks minstens één keer, ongeveer 15 minuten**, eerst op zijn **laptop**. Later wil hij de app misschien online zetten en ook op zijn **Android-telefoon** gebruiken.

De app is geïnspireerd op Duolingo, maar neemt daar **alleen het lessenpad** van over.

Taal van de interface en de uitleg: **Nederlands**. Te leren taal: **Spaans uit Spanje (es-ES)**, dus inclusief *vosotros* en Spaanse woordkeuze (bijv. *zumo*, *móvil*, *coche*).

## 2. Doelen

1. **Lessenpad**: één lineair pad met lessen die je op volgorde vrijspeelt. Lessen worden steeds moeilijker: meer woorden per les, langere zinnen en zwaardere grammatica.
2. **Woordjes oefenen in beide richtingen**: Spaans → Nederlands en Nederlands → Spaans.
3. **Herhaling**: in elke les komen woorden uit eerdere lessen terug, met voorrang voor woorden die je vaker fout had of lang niet hebt gezien.
4. **Zinnen** oefenen, niet alleen losse woorden.
5. **Luisteren**: de app spreekt Spaans uit (tekst-naar-spraak) en jij geeft aan of typt wat je hoorde.
6. **Spreken**: jij zegt iets hardop, de app herkent het via de microfoon en controleert of het klopt.
7. **Grammatica**: korte, begrijpelijke uitleg in het Nederlands per onderwerp, gevolgd door oefeningen daarop.
8. **Gesprekjes aanvullen**: korte vakantiedialogen (bijv. ober en gast) waarin jij de ontbrekende woorden of het antwoord invult.
9. **Leesteksten**: vanaf het middendeel van het pad korte teksten (menukaart, bordje, berichtje) met een paar begripsvragen.
10. Een les past in ongeveer **15 minuten** of minder, zodat één sessie per dag haalbaar is.

## 3. Niet-doelen

- Geen streaks, punten/XP, hartjes, levels, ranglijsten of andere spelelementen.
- Geen accounts, login of synchronisatie tussen apparaten. Elk apparaat houdt **zijn eigen voortgang** bij.
- Geen backend-server of database.
- Geen native app (Flutter of App Store) in deze fase.
- Geen Latijns-Amerikaans Spaans.
- Geen AI-chatbot of vrije conversatie. De gesprekjes liggen vast in de lesinhoud.
- Niet meer dan beginnersniveau (ongeveer A1, eventueel tegen A2 aan).

## 4. Anti-doelen (dan is het mislukt, ook al werkt het)

- Een sessie duurt standaard veel langer dan 15 minuten, of is zo kort dat je niets leert.
- Er komen te veel nieuwe woorden tegelijk, zodat het als stampen voelt.
- Grammatica-uitleg in vaktaal waar een beginner niets mee kan.
- Antwoorden worden fout gerekend om onbelangrijke dingen (hoofdletters, leestekens, een ontbrekend accent), waardoor het frustrerend wordt.
- Spraakcontrole die een redelijk uitgesproken zin structureel afkeurt zonder dat je verder kunt.
- Spaans dat niet klopt of niet in Spanje gebruikt wordt.

## 5. Randvoorwaarden

- Draait **lokaal op de laptop** via Node.js (`npm install`, `npm run dev`).
- Moet later te hosten zijn als **statische site** (bijv. Netlify of GitHub Pages) zonder aanpassingen aan de architectuur.
- Moet bruikbaar zijn op **telefoonformaat** (Chrome op Android) en op de laptop (Chrome of Edge).
- Spraak via de ingebouwde **Web Speech API** van de browser:
  - uitspraak: `speechSynthesis` met een `es-ES`-stem (voorkeur voor een natuurlijke stem als die er is, bijv. de "Online (Natural)"-stemmen van Edge);
  - herkenning: `SpeechRecognition`/`webkitSpeechRecognition` met `lang = 'es-ES'`.
- Werkt de browser niet met spraakherkenning (bijv. Firefox), dan worden spreekoefeningen overgeslagen of vervangen door een typoefening, met een korte melding. De app mag daar niet op vastlopen.
- Voortgang wordt opgeslagen in `localStorage` van de browser.

## 6. Gemaakte keuzes

### Door Sander bepaald
- Webapp, geen Flutter. Eerst op de laptop, later misschien hosten.
- Spaans voor vakantie in Spanje.
- Alleen het lessenpad van Duolingo, geen andere spelelementen.
- Woordjes in beide richtingen, herhaling van eerdere woorden, gesprekjes met aanvullen, grammatica-uitleg, luisteren en spreken met controle.
- Voortgang per apparaat, geen synchronisatie.
- Dagelijks ongeveer 15 minuten.

### Door Claude bepaald (Sander kan dit nog aanpassen)
- **Stack**: Vite + React + TypeScript, zonder backend. Tests met Vitest.
- **Lesinhoud** schrijft Claude zelf, als gegevensbestanden (TypeScript of JSON) in de repository, gescheiden van de code, zodat je er later makkelijk lessen bij kunt zetten.
- **Omvang eerste versie**: ongeveer 20 lessen, verdeeld over ongeveer 6 thema-eenheden (zie §7).
- **Antwoordcontrole bij typen**: hoofdletters, leestekens (ook ¿ en ¡) en extra spaties tellen niet mee. Een ontbrekend accent (bijv. *cafe* in plaats van *café*) of *n* in plaats van *ñ* wordt goed gerekend met een opmerking die de juiste spelling toont. Een lijst van toegestane alternatieve antwoorden per item is mogelijk.
- **Typen naar het Nederlands (ES→NL) alleen bij losse woorden.** Zinnen worden naar het Nederlands geoefend met meerkeuze of zin bouwen, omdat een Nederlandse zin te veel goede varianten heeft. Bij elke typoefening staat na een fout-oordeel een knop "Ik had het goed", die het antwoord alsnog goed rekent.
- **Spraakcontrole**: vergelijk het herkende resultaat (alle alternatieven die de browser teruggeeft) genormaliseerd met de doelzin, met een kleine marge op woordniveau. Na twee mislukte pogingen kun je doorgaan ("ik kan nu niet praten" of "overslaan"), zonder dat dit als fout telt.
- **Een "Ik kan nu niet luisteren/praten"-schakelaar** per sessie, zodat je ook stil kunt oefenen (bijv. in de trein).
- **Herhaling**: per woord of zin wordt bijgehouden hoe vaak het goed en fout ging en wanneer het voor het laatst geoefend is. Een eenvoudig Leitner-achtig systeem (vakjes 1–5) bepaalt welke oude items in een les terugkomen.
- **Vrijspelen**: een les is af als je alle oefeningen hebt doorlopen. Fout beantwoorde vragen komen aan het eind van de les nog een keer terug, tot ze goed zijn. Daarna gaat de volgende les open. Afgeronde lessen kun je altijd opnieuw doen.
- **Dagelijkse herhaling**: naast de volgende les staat een knop "Herhalen" die een korte sessie maakt uit de items die het meest aan herhaling toe zijn.

## 7. Lesinhoud

### Opbouw van één les
Elke les heeft:
- een titel en thema;
- **nieuwe woorden** (Spaans, Nederlands, eventueel lidwoord en geslacht, eventueel een voorbeeldzin);
- **zinnen** die die woorden gebruiken;
- optioneel **één grammaticaonderdeel**: uitleg in het Nederlands (een paar alinea's, met een tabelletje of voorbeelden) plus oefeningen;
- optioneel **een gesprekje** (4–8 beurten) met gaten om in te vullen;
- vanaf eenheid 3 optioneel **een korte leestekst** met 2–3 begripsvragen.

Een les wordt een **reeks oefeningen** van ongeveer 15–25 stuks, gemengd uit de oefenvormen hieronder, met ongeveer 30% herhaling van items uit eerdere lessen.

### Oefenvormen
| Vorm | Wat je doet |
|------|-------------|
| Kennismaken | Nieuw woord met vertaling, de app spreekt het uit |
| Meerkeuze ES→NL | Kies de juiste Nederlandse vertaling |
| Meerkeuze NL→ES | Kies het juiste Spaanse woord of de juiste Spaanse zin |
| Typen NL→ES | Typ de Spaanse vertaling |
| Typen ES→NL | Typ de Nederlandse vertaling |
| Zin bouwen | Zet losse Spaanse woordblokjes in de goede volgorde |
| Luisteren | Hoor een woord of zin en typ wat je hoort (of kies uit opties) |
| Nazeggen | Zeg een woord of zin hardop, de app controleert |
| Grammatica-invul | Vul de juiste vorm in (bijv. werkwoordsvervoeging, lidwoord) |
| Gesprek aanvullen | Dialoog met gaten, invullen door te typen of te kiezen. Spaanse beurten kun je laten voorlezen |
| Lezen | Korte tekst met begripsvragen |

### Moeilijkheidsopbouw (voorstel)
Lessen beginnen met ongeveer 5 nieuwe woorden en lopen op naar ongeveer 10. Zinnen worden langer en oefeningen verschuiven van herkennen (meerkeuze) naar zelf maken (typen, zeggen).

| Eenheid | Thema | Grammatica |
|---|---|---|
| 1 | Begroeten en voorstellen | uitspraak, *ser* (yo/tú/él), *me llamo* |
| 2 | Getallen, tijd en betalen | lidwoorden (el/la/un/una), meervoud, getallen 0–100 |
| 3 | Eten en drinken (café, restaurant) | *querer*, *quisiera*, *¿me pone…?*, regelmatige -ar-werkwoorden |
| 4 | De weg vragen en vervoer | *estar* vs. *ser*, *hay*, plaatsaanduidingen |
| 5 | Hotel en accommodatie | *tener*, *necesitar*, vraagwoorden |
| 6 | Winkelen en kleine problemen | bijvoeglijke naamwoorden (overeenkomst), -er/-ir-werkwoorden, *ir a* + infinitief |

## 8. Schermen

1. **Pad (start)**: verticale lijst of pad van lessen, gegroepeerd per eenheid. Per les zie je de status: op slot, open of afgerond. Bovenaan staan de knoppen "Volgende les" en "Herhalen".
2. **Les-intro**: titel, wat je gaat leren, eventueel grammatica-uitleg om eerst te lezen.
3. **Oefening**: één oefening per scherm, voortgangsbalk bovenin, knop "Controleer" en daarna feedback (goed of fout, met het juiste antwoord en de uitspraak). Er is een luidsprekerknop bij Spaanse tekst.
4. **Les afgerond**: korte samenvatting (aantal goed, woorden om op te letten) en terug naar het pad.
5. **Grammatica-overzicht**: alle uitlegpagina's van vrijgespeelde lessen, om na te lezen.
6. **Woordenlijst**: alle geleerde woorden, met zoekfunctie en uitspraakknop.
7. **Instellingen**: stem kiezen (uit de beschikbare es-ES-stemmen), spreeksnelheid (normaal/langzaam), spraakoefeningen aan/uit, voortgang wissen of exporteren/importeren als bestand (handig bij een ander apparaat of browser).

Opmaak: rustig en overzichtelijk, ontworpen vanuit telefoonformaat (één kolom) en ook prettig op de laptop. Grote knoppen. Licht en donker thema volgen de systeeminstelling.

## 9. Overgelaten aan de bouwer

- Mappenstructuur, componentindeling en state management (bij voorkeur eenvoudig: React state/context, geen zware libraries).
- Precieze algoritmes voor het samenstellen van een les en het kiezen van herhaalitems, binnen de regels uit §6 en §7.
- Precieze tolerantie van de spraakcontrole, zolang die aan de anti-doelen voldoet.
- Visuele stijl, binnen §8.
- Het exacte aantal lessen per eenheid.
- Optioneel: PWA-manifest en service worker, zodat de app later als icoon op de telefoon kan en offline werkt. Dit is mooi meegenomen maar niet verplicht in de eerste versie.

## 10. Klaar als

- `npm install && npm run dev` start de app op de laptop in Chrome of Edge.
- Het volledige lessenpad (ongeveer 20 lessen) is doorloopbaar, met alle oefenvormen uit §7.
- Uitspraak werkt met een es-ES-stem, spraakherkenning werkt in Chrome/Edge en faalt netjes in andere browsers.
- Voortgang blijft bewaard na het herladen van de pagina.
- `npm run build` levert een statische map op die zonder server te hosten is.
- Logica (antwoordcontrole, herhaling, lessamenstelling) heeft unittests.
- De Spaanse lesinhoud is door Claude zelf zorgvuldig gecontroleerd op correctheid (es-ES). Sander heeft aangegeven dat er geen externe controle (docent of moedertaalspreker) nodig is.
