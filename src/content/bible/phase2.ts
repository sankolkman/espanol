import { items, words } from '../helpers'
import type { Unit } from '../types'
import { passage, saying, verseSentences } from './helpers'

const nacimiento = passage(
  'b2l1-p',
  'El nacimiento de Jesús',
  'Lucas 2:8-14',
  [
    ['LUK 2:8', 'Er waren herders in diezelfde streek die in het open veld verbleven en ’s nachts de wacht hielden bij hun kudden.'],
    ['LUK 2:9', 'Een engel van de Heer verscheen aan hen en de heerlijkheid van de Heer omstraalde hen. Ze werden heel erg bang.'],
    ['LUK 2:10', 'Maar de engel zei tegen hen: Wees niet bang! Want kijk, ik breng jullie goed nieuws van grote vreugde, dat voor het hele volk zal zijn.'],
    ['LUK 2:11', 'Vandaag is voor jullie in de stad van David een Redder geboren, die Christus de Heer is!'],
    ['LUK 2:12', 'Dit zal voor jullie het teken zijn: jullie zullen een Kind vinden, in doeken gewikkeld en liggend in een voerbak.'],
    ['LUK 2:13', 'Plotseling verscheen bij de engel een menigte van het hemelse leger, dat God prees en zei:'],
    ['LUK 2:14', 'Eer aan God in de hoogste hemel, en vrede op aarde onder de mensen op wie Gods welgevallen rust!'],
  ],
  ['pastores', 'noche', 'ángel', 'dijo', 'teman', 'nació', 'ciudad', 'Niño', 'Gloria'],
)

const hijoPerdido = passage(
  'b2l2-p',
  'El hijo perdido',
  'Lucas 15:11-20',
  [
    ['LUK 15:11', 'Ook zei Hij: Een man had twee zonen.'],
    ['LUK 15:12', 'De jongste zei tegen zijn vader: Vader, geef mij het deel van het bezit dat mij toekomt. En hij verdeelde het bezit onder hen.'],
    ['LUK 15:13', 'Een paar dagen later pakte de jongste zoon zijn spullen, vertrok naar een ver land en verkwistte daar zijn bezit met een losbandig leven.'],
    ['LUK 15:18', 'Ik zal opstaan, naar mijn vader gaan en tegen hem zeggen: Vader, ik heb gezondigd tegen de hemel en tegen u.'],
    ['LUK 15:20', 'Hij stond op en ging terug naar zijn vader. Toen hij nog ver weg was, zag zijn vader hem en kreeg medelijden met hem. Hij rende naar hem toe, omarmde hem en kuste hem.'],
  ],
  ['tenía', 'menor', 'parte', 'días', 'lejana', 'levantaré', 'pequé', 'regresó', 'compasión', 'Corrió'],
)

const samaritano = passage(
  'b2l3-p',
  'El buen samaritano',
  'Lucas 10:30-35',
  [
    ['LUK 10:30', 'Jezus antwoordde hem: Een man ging van Jeruzalem naar Jericho en viel in handen van rovers. Ze kleedden hem uit, sloegen hem, lieten hem halfdood achter en vluchtten.'],
    ['LUK 10:31', 'Een priester ging langs die weg naar beneden en toen hij hem zag, liep hij aan de overkant voorbij.'],
    ['LUK 10:32', 'Een Leviet kwam bij die plek en toen hij hem zag, liep ook hij aan de andere kant voorbij.'],
    ['LUK 10:33', 'Maar een Samaritaan die op reis was, kwam dicht bij hem. Hij zag hem en kreeg medelijden.'],
    ['LUK 10:34', 'Hij ging naar hem toe, verbond zijn wonden, goot er olie en wijn op en zette hem op zijn eigen rijdier. Hij bracht hem naar een herberg en zorgde voor hem.'],
    ['LUK 10:35', 'Toen hij de volgende dag vertrok, gaf hij twee denaren aan de herbergier en zei: Zorg voor hem, en wat u meer uitgeeft, zal ik u betalen als ik terugkom.'],
  ],
  ['bajaba', 'medio', 'sacerdote', 'pasó', 'lado', 'viajaba', 'acercó', 'heridas', 'aceite', 'Cuídalo'],
)

const tormenta = passage(
  'b2l4-p',
  'La tormenta',
  'Mateo 8:23-27',
  [
    ['MAT 8:23', 'Toen Hij in de boot stapte, volgden zijn leerlingen Hem.'],
    ['MAT 8:24', 'Er stak een zware storm op op het meer, zo sterk dat de golven de boot bedekten. Hij sliep.'],
    ['MAT 8:25', 'Ze maakten Hem wakker en riepen: Heer, red ons, want we vergaan!'],
    ['MAT 8:26', 'Hij antwoordde hun: Mensen van weinig geloof! Waarom zijn jullie bang? Hij stond op, bestrafte de winden en het meer, en het werd helemaal stil.'],
    ['MAT 8:27', 'De mannen zeiden verbaasd: Wie is Hij, dat zelfs de winden en het meer Hem gehoorzamen?'],
  ],
  ['barca', 'discípulos', 'tormenta', 'mar', 'olas', 'dormía', 'sálvanos', 'fe', 'vientos'],
)

const panes = passage(
  'b2l5-p',
  'Cinco panes y dos peces',
  'Juan 6:8-13',
  [
    ['JOH 6:8', 'Andreas, een van zijn leerlingen, de broer van Simon Petrus, zei tegen Hem:'],
    ['JOH 6:9', 'Hier is een jongen die vijf gerstebroden en twee vissen heeft. Maar wat is dat voor zoveel mensen?'],
    ['JOH 6:10', 'Jezus zei: Laat iedereen gaan liggen. Er was veel gras op die plek. Toen gingen er ongeveer 5.000 mannen liggen.'],
    ['JOH 6:11', 'Toen nam Jezus de broden en de vissen, dankte en deelde ze uit aan wie daar lagen. Hij gaf hun zoveel als ze wilden.'],
    ['JOH 6:12', 'Toen ze verzadigd waren, zei Hij tegen zijn leerlingen: Verzamel de stukken die over zijn, zodat er niets verloren gaat.'],
    ['JOH 6:13', 'Ze verzamelden ze en vulden twaalf manden met de stukken die over waren van de vijf gerstebroden.'],
  ],
  ['hermano', 'muchacho', 'peces', 'hierba', 'tomó', 'gracias', 'Recojan', 'pedazos', 'sobraron', 'nada'],
)

const resurreccion = passage(
  'b2l6-p',
  '¡Resucitó!',
  'Mateo 28:1-7',
  [
    ['MAT 28:1', 'Bij het aanbreken van de eerste dag van de week kwamen Maria Magdalena en de andere Maria het graf bekijken.'],
    ['MAT 28:2', 'En er was een grote aardbeving geweest, want een engel van de Heer was uit de hemel neergedaald, had de steen weggerold en was erop gaan zitten.'],
    ['MAT 28:3', 'Hij zag eruit als een bliksem en zijn kleding was wit als sneeuw.'],
    ['MAT 28:4', 'Toen de bewakers die het graf bewaakten hem zagen, werden ze doodsbang en werden ze als doden.'],
    ['MAT 28:5', 'Toen zei de engel tegen de vrouwen: Wees niet bang, want ik weet dat jullie Jezus zoeken, die gekruisigd is.'],
    ['MAT 28:6', 'Hij is niet hier, want Hij is opgewekt, zoals Hij gezegd had. Kom, kijk naar de plek waar Hij gelegd was.'],
    ['MAT 28:7', 'Ga snel en zeg tegen zijn leerlingen dat Hij uit de doden is opgewekt. Hij gaat jullie voor naar Galilea. Daar zullen jullie Hem zien. Ik heb het jullie gezegd!'],
  ],
  ['semana', 'sepulcro', 'piedra', 'mujeres', 'buscan', 'aquí', 'resucitado', 'lugar', 'prisa', 'muertos'],
)

export const phase2: Unit = {
  id: 'b2',
  title: 'Fase 2 · Verhalen',
  lessons: [
    {
      id: 'b2l1',
      title: 'El nacimiento',
      intro: 'De herders en de engelen bij de geboorte van Jezus (Lucas 2:8-14).',
      words: words('b2l1', [
        ['el ángel', 'de engel', { gender: 'm', forms: ['ángeles'] }],
        ['la noche', 'de nacht', { gender: 'f' }],
        ['decir', 'zeggen', { forms: ['dijo', 'decía', 'dice', 'dijeron', 'digan', 'diré', 'digo'] }],
        ['temer', 'bang zijn', { forms: ['teman', 'temen', 'temor'], altNl: ['vrezen'] }],
        ['nacer', 'geboren worden', { forms: ['nació', 'nacido'] }],
        ['la ciudad', 'de stad', { gender: 'f' }],
        ['el niño', 'het kind', { gender: 'm', forms: ['Niño', 'niños', 'niña'], altNl: ['de jongen'] }],
        ['la gloria', 'de eer', { gender: 'f', forms: ['Gloria'], altNl: ['de heerlijkheid', 'de glorie'] }],
        ['el hombre', 'de man', { gender: 'm', forms: ['hombres', 'Hombre'], altNl: ['de mens'] }],
        ['las Buenas Noticias', 'het goede nieuws', { gender: 'f', altNl: ['het evangelie', 'goed nieuws'] }],
      ]),
      sentences: verseSentences('b2l1', nacimiento, [3], [
        ['¡Gloria a Dios en las alturas!', 'Eer aan God in de hoogste hemel!'],
        ['El ángel les dijo: ¡No teman!', 'De engel zei tegen hen: Wees niet bang!'],
        saying('LUK 1:37', 'Para Dios ninguna cosa es imposible.', 'Voor God is niets onmogelijk.'),
        saying('JOH 1:14', 'El Verbo se encarnó y vivió entre nosotros.', 'Het Woord is mens geworden en heeft onder ons gewoond.'),
        saying('LUK 2:10', 'Les traigo Buenas Noticias de gran gozo.', 'Ik breng jullie goed nieuws van grote vreugde.'),
      ]),
      grammar: {
        id: 'b2l1-g',
        title: 'De verleden tijd (1): wat er gebeurde',
        explanation: `Bijbelverhalen staan in de **verleden tijd**. Voor gebeurtenissen (eerst dit, toen dat) gebruikt het Spaans de *pretérito*. In verhalen zie je vooral de hij-vorm en de zij-meervoud-vorm:

| | -ar: hablar | -er / -ir: nacer |
|---|---|---|
| yo | habl**é** | nac**í** |
| tú | habl**aste** | nac**iste** |
| él / ella | habl**ó** | nac**ió** |
| nosotros | habl**amos** | nac**imos** |
| ustedes / ellos | habl**aron** | nac**ieron** |

Let op het accent: *hablo* = ik spreek, *habló* = hij sprak.

Veel gebruikte onregelmatige vormen, leer ze als woordjes:

| | |
|---|---|
| **dijo** | hij zei (decir) |
| **fue** | hij ging / hij was (ir / ser) |
| **hizo** | hij deed (hacer) |
| **vino** | hij kwam (venir) |
| **tuvo** | hij had / kreeg (tener) |
| **vio** | hij zag (ver) |`,
        items: items('b2l1', [
          ['Un ángel les ___.', 'apareció', 'Een engel verscheen aan hen. (aparecer)'],
          ['Hoy les ___ un Salvador.', 'nació', 'Vandaag is een Redder geboren. (nacer)'],
          ['El ángel les ___: ¡No teman!', 'dijo', 'De engel zei: Wees niet bang! (decir)'],
          ['Jesús ___ a Galilea.', 'fue', 'Jezus ging naar Galilea. (ir)'],
          ['Jesús les ___ otra vez.', 'habló', 'Jezus sprak hen opnieuw toe. (hablar)'],
        ]),
      },
      passage: nacimiento,
    },
    {
      id: 'b2l2',
      title: 'El hijo perdido',
      intro: 'De gelijkenis van de verloren zoon (Lucas 15).',
      words: words('b2l2', [
        ['menor', 'jongste', { altNl: ['jonger', 'kleinste'] }],
        ['la parte', 'het deel', { gender: 'f' }],
        ['el día', 'de dag', { gender: 'm', forms: ['días'] }],
        ['lejano', 'ver weg', { forms: ['lejana'], altNl: ['ver', 'verre'] }],
        ['levantarse', 'opstaan', { forms: ['levantaré', 'levantó', 'levántate', 'levantó'] }],
        ['pecar', 'zondigen', { forms: ['pequé', 'pecó'] }],
        ['regresar', 'teruggaan', { forms: ['regresó', 'regrese'], altNl: ['terugkeren', 'terugkomen'] }],
        ['la compasión', 'het medelijden', { gender: 'f', altNl: ['de ontferming'] }],
        ['correr', 'rennen', { forms: ['corrió'], altNl: ['hardlopen'] }],
        ['el cerdo', 'het varken', { gender: 'm', forms: ['cerdos'] }],
      ]),
      sentences: verseSentences('b2l2', hijoPerdido, [3], [
        ['Un hombre tenía dos hijos.', 'Een man had twee zonen.'],
        ['Su padre lo vio y tuvo compasión de él.', 'Zijn vader zag hem en kreeg medelijden met hem.'],
        saying('LUK 15:24', 'Estaba perdido y fue hallado.', 'Hij was verloren en is gevonden.'),
        saying('LUK 15:24', 'Este hijo mío estaba muerto y revivió.', 'Deze zoon van mij was dood en leeft weer.'),
        saying('LUK 15:18', 'Padre, pequé contra el cielo y contra ti.', 'Vader, ik heb gezondigd tegen de hemel en tegen u.'),
      ]),
      grammar: {
        id: 'b2l2-g',
        title: 'De verleden tijd (2): was, had, waren',
        explanation: `Het Spaans heeft **twee** verleden tijden:

- de **pretérito** voor wat er gebeurde: *Corrió, lo abrazó y lo besó.* (Hij rende, omarmde en kuste hem.)
- de **imperfecto** voor de achtergrond, wat bezig was of hoe het was: Un hombre **tenía** dos hijos. (Een man had twee zonen.)

De imperfecto is regelmatig en makkelijk te herkennen aan **-aba** en **-ía**:

| | -ar: bajar | -er / -ir: tener |
|---|---|---|
| yo | baj**aba** | ten**ía** |
| él / ella | baj**aba** | ten**ía** |
| ustedes / ellos | baj**aban** | ten**ían** |

Drie onregelmatige vormen die je steeds tegenkomt:

| | |
|---|---|
| **era** | hij / het was (ser) |
| **iba** | hij ging (ir) |
| **había** | er was / er waren (haber) |`,
        items: items('b2l2', [
          ['Un hombre ___ dos hijos.', 'tenía', 'Een man had twee zonen. (tener)'],
          ['Él ___ aún muy distante.', 'estaba', 'Hij was nog ver weg. (estar)'],
          ['___ pastores en aquella región.', 'Había', 'Er waren herders in die streek. (haber)'],
          ['Su padre lo ___.', 'vio', 'Zijn vader zag hem. (ver)'],
          ['Un hombre ___ de Jerusalén a Jericó.', 'bajaba', 'Een man ging van Jeruzalem naar Jericho. (bajar)'],
        ]),
      },
      passage: hijoPerdido,
    },
    {
      id: 'b2l3',
      title: 'El buen samaritano',
      intro: 'De barmhartige Samaritaan (Lucas 10:30-35).',
      words: words('b2l3', [
        ['bajar', 'naar beneden gaan', { forms: ['bajaba', 'bajaron', 'bajarlo'], altNl: ['afdalen'] }],
        ['medio muerto', 'halfdood'],
        ['el sacerdote', 'de priester', { gender: 'm', forms: ['sacerdotes'] }],
        ['pasar', 'voorbijgaan', { forms: ['pasó', 'pasarán', 'pasar'], altNl: ['langsgaan', 'gebeuren'] }],
        ['el lado', 'de kant', { gender: 'm' }],
        ['viajar', 'reizen', { forms: ['viajaba'] }],
        ['acercarse', 'naderbij komen', { forms: ['acercó', 'acercaron'], altNl: ['dichterbij komen'] }],
        ['la herida', 'de wond', { gender: 'f', forms: ['heridas'] }],
        ['el aceite', 'de olie', { gender: 'm' }],
        ['cuidar', 'zorgen voor', { forms: ['cuidó', 'cuídalo'] }],
      ]),
      sentences: verseSentences('b2l3', samaritano, [1], [
        ['Un hombre bajaba de Jerusalén a Jericó.', 'Een man ging van Jeruzalem naar Jericho.'],
        ['Lo vio y fue movido a compasión.', 'Hij zag hem en kreeg medelijden.'],
        saying('LUK 10:37', 'Vé y haz tú lo mismo.', 'Ga heen en doe jij hetzelfde.'),
        saying('MAT 9:12', 'Los sanos no necesitan médico, sino los enfermos.', 'Gezonden hebben geen dokter nodig, maar zieken.'),
        saying('JOH 11:35', 'Jesús lloró.', 'Jezus huilde.'),
      ]),
      grammar: {
        id: 'b2l3-g',
        title: 'Hem, haar, hen: lo, la, los, le, les',
        explanation: `Korte woordjes vóór het werkwoord zeggen **wie** iets overkomt:

| | lijdend voorwerp | meewerkend voorwerp (aan / tegen) |
|---|---|---|
| hem / het | **lo** | **le** |
| haar | **la** | **le** |
| hen | **los** / **las** | **les** |

- **Lo** vio. (Hij zag **hem**.)
- **Lo** llevó a un hospedaje. (Hij bracht **hem** naar een herberg.)
- El ángel **les** dijo… (De engel zei **tegen hen**…)
- Jesús **le** respondió. (Jezus antwoordde **hem**.)

Bij een opdracht plak je het achter het werkwoord: Cuída**lo** = zorg voor hem, sálva**nos** = red ons.`,
        items: items('b2l3', [
          ['Su padre ___ vio.', 'lo', 'Zijn vader zag hem.'],
          ['El ángel ___ dijo: ¡No teman!', 'les', 'De engel zei tegen hen: Wees niet bang!'],
          ['Jesús ___ respondió.', 'le', 'Jezus antwoordde hem.'],
          ['___ llevó a un hospedaje.', 'Lo', 'Hij bracht hem naar een herberg.'],
          ['¡Señor, sálva___!', 'nos', 'Heer, red ons!'],
        ]),
      },
      passage: samaritano,
    },
    {
      id: 'b2l4',
      title: 'La tormenta',
      intro: 'Jezus bedaart de storm (Mateo 8:23-27).',
      words: words('b2l4', [
        ['la barca', 'de boot', { gender: 'f' }],
        ['el discípulo', 'de leerling', { gender: 'm', forms: ['discípulos'], altNl: ['de discipel'] }],
        ['la tormenta', 'de storm', { gender: 'f' }],
        ['el mar', 'de zee', { gender: 'm', altNl: ['het meer'] }],
        ['la ola', 'de golf', { gender: 'f', forms: ['olas'] }],
        ['dormir', 'slapen', { forms: ['dormía', 'durmió', 'duerme'] }],
        ['salvar', 'redden', { forms: ['sálvanos', 'salvo', 'salva'] }],
        ['la fe', 'het geloof', { gender: 'f' }],
        ['el viento', 'de wind', { gender: 'm', forms: ['vientos'] }],
        ['¿por qué?', 'waarom?'],
      ]),
      sentences: verseSentences('b2l4', tormenta, [1], [
        ['¡Señor, sálvanos!', 'Heer, red ons!'],
        ['¡Hombres de poca fe! ¿Por qué temen?', 'Mensen van weinig geloof! Waarom zijn jullie bang?'],
        saying('MAT 14:27', '¡Tengan ánimo, Yo soy, no teman!', 'Houd moed, Ik ben het, wees niet bang!'),
        saying('MAR 4:39', '¡Calla! ¡Enmudece!', 'Zwijg! Wees stil!'),
        saying('MAR 10:27', 'Todas las cosas son posibles para Dios.', 'Alle dingen zijn mogelijk voor God.'),
      ]),
      grammar: {
        id: 'b2l4-g',
        title: 'Zich: wederkerende werkwoorden',
        explanation: `Sommige werkwoorden hebben een **se** (zich) bij zich. In het woordenboek staan ze met *-se* aan het eind:

| werkwoord | betekenis | in de tekst |
|---|---|---|
| levantar**se** | opstaan | *Se levantó.* (Hij stond op.) |
| acercar**se** | naderbij komen | *Se acercó.* (Hij kwam dichterbij.) |
| llenar**se** | vol raken | *Se llenaron de temor.* (Ze werden bang.) |
| producir**se** | ontstaan | *Se produjo una gran calma.* (Het werd stil.) |

Het woordje verandert mee met de persoon:

| | |
|---|---|
| yo **me** levanto | ik sta op |
| tú **te** levantas | jij staat op |
| él **se** levanta | hij staat op |
| ellos **se** levantan | zij staan op |`,
        items: items('b2l4', [
          ['___ levantó y reprendió a los vientos.', 'Se', 'Hij stond op en bestrafte de winden.'],
          ['Me ___ e iré a mi padre.', 'levantaré', 'Ik zal opstaan en naar mijn vader gaan. (levantarse)'],
          ['El samaritano se ___.', 'acercó', 'De Samaritaan kwam dichterbij. (acercarse)'],
          ['Ellos se ___ de temor.', 'llenaron', 'Ze werden heel bang. (llenarse)'],
        ]),
      },
      passage: tormenta,
    },
    {
      id: 'b2l5',
      title: 'Cinco panes y dos peces',
      intro: 'Jezus geeft vijfduizend mensen te eten (Juan 6:8-13).',
      words: words('b2l5', [
        ['el hermano', 'de broer', { gender: 'm', forms: ['hermanos'] }],
        ['el muchacho', 'de jongen', { gender: 'm' }],
        ['el pez', 'de vis', { gender: 'm', forms: ['peces'] }],
        ['la hierba', 'het gras', { gender: 'f' }],
        ['tomar', 'nemen', { forms: ['tomó', 'tomen', 'tomarlo'], altNl: ['pakken'] }],
        ['dar gracias', 'danken', { altNl: ['bedanken', 'dank zeggen'] }],
        ['recoger', 'verzamelen', { forms: ['recojan', 'recogieron', 'recogió'], altNl: ['oprapen'] }],
        ['el pedazo', 'het stuk', { gender: 'm', forms: ['pedazos'] }],
        ['sobrar', 'over zijn', { forms: ['sobraron'], altNl: ['overblijven'] }],
        ['nada', 'niets'],
      ]),
      sentences: verseSentences('b2l5', panes, [1], [
        ['Jesús tomó los panes y los peces.', 'Jezus nam de broden en de vissen.'],
        ['Que nada se pierda.', 'Dat er niets verloren gaat.'],
        saying('1TH 5:18', 'Den gracias en todo.', 'Dank God in alles.'),
        saying('MAT 6:34', 'No se afanen por el mañana.', 'Maak je geen zorgen over morgen.'),
        saying('MAT 6:33', 'Busquen primeramente el reino de Dios.', 'Zoek eerst het koninkrijk van God.'),
      ]),
      grammar: {
        id: 'b2l5-g',
        title: 'Meervoud op -ces en getallen',
        explanation: `Woorden die op **-z** eindigen, krijgen in het meervoud **-ces**:

| enkelvoud | meervoud |
|---|---|
| el pe**z** (de vis) | los pe**ces** |
| la lu**z** (het licht) | las lu**ces** |
| la vo**z** (de stem) | las vo**ces** |
| la cru**z** (het kruis) | las cru**ces** |

Getallen staan in deze bijbel vaak als cijfers (*12 cestos, 5.000 hombres*), maar in de tekst lees je ook woorden. Herhaal:

| | | |
|---|---|---|
| 2 dos | 5 cinco | 12 doce |
| 3 tres | 7 siete | 40 cuarenta |
| 4 cuatro | 10 diez | 1000 mil |

Let op: in het Spaans is de punt het scheidingsteken bij duizendtallen: *5.000* = vijfduizend.`,
        items: items('b2l5', [
          ['dos ___', 'peces', 'twee vissen (pez)'],
          ['cinco ___', 'panes', 'vijf broden (pan)'],
          ['las ___', 'luces', 'de lichten (luz)'],
          ['___ cestos', 'doce', 'twaalf manden'],
          ['___ panes', 'cinco', 'vijf broden'],
        ]),
      },
      passage: panes,
    },
    {
      id: 'b2l6',
      title: '¡Resucitó!',
      intro: 'Het lege graf op de eerste dag van de week (Mateo 28:1-7).',
      words: words('b2l6', [
        ['la semana', 'de week', { gender: 'f' }],
        ['el sepulcro', 'het graf', { gender: 'm' }],
        ['la piedra', 'de steen', { gender: 'f' }],
        ['la mujer', 'de vrouw', { gender: 'f', forms: ['mujeres'] }],
        ['buscar', 'zoeken', { forms: ['buscan', 'busquen', 'buscaba'] }],
        ['aquí', 'hier'],
        ['resucitar', 'opstaan uit de dood', { forms: ['resucitado', 'resucitó'], altNl: ['opwekken', 'opstaan'] }],
        ['el lugar', 'de plaats', { gender: 'm', altNl: ['de plek'] }],
        ['de prisa', 'snel', { altNl: ['haastig', 'vlug'] }],
        ['muerto', 'dood', { forms: ['muertos', 'muerta'] }],
      ]),
      sentences: verseSentences('b2l6', resurreccion, [5], [
        ['No está aquí.', 'Hij is niet hier.'],
        ['Él va delante de ustedes a Galilea.', 'Hij gaat jullie voor naar Galilea.'],
        saying('JOH 11:25', 'Yo soy la Resurrección y la Vida.', 'Ik ben de Opstanding en het Leven.'),
        saying('1CO 15:55', '¿Dónde está, oh muerte, tu aguijón?', 'Dood, waar is je angel?'),
        saying('REV 21:5', 'Hago nuevas todas las cosas.', 'Ik maak alle dingen nieuw.'),
      ]),
      grammar: {
        id: 'b2l6-g',
        title: 'Worden: de lijdende vorm',
        explanation: `"Hij **werd** gekruisigd" of "Hij **is** opgewekt" zeg je met **ser** + een voltooid deelwoord:

- Jesús, el que **fue crucificado**. (Jezus, die **gekruisigd is**.)
- **Fue resucitado**. (Hij **is opgewekt**.)
- Ellos **serán consolados**. (Zij **zullen getroost worden**.)

Het voltooid deelwoord maak je zo:

| | | |
|---|---|---|
| -ar | crucific**ar** → crucific**ado** | gekruisigd |
| -er | conoc**er** → conoc**ido** | gekend |
| -ir | serv**ir** → serv**ido** | gediend |

Het past zich aan aan het onderwerp: ellos serán llamad**os**, las cosas fueron hech**as**.

Een paar onregelmatige: **hecho** (gedaan / gemaakt, van *hacer*), **dicho** (gezegd), **puesto** (gelegd).`,
        items: items('b2l6', [
          ['Jesús ___ crucificado.', 'fue', 'Jezus werd gekruisigd. (ser)'],
          ['Fue ___ como lo dijo.', 'resucitado', 'Hij is opgewekt, zoals Hij gezegd had. (resucitar)'],
          ['Ellos serán ___.', 'consolados', 'Zij zullen getroost worden. (consolar)'],
          ['Todas las cosas fueron ___ por Él.', 'hechas', 'Alles is door Hem gemaakt. (hacer)'],
          ['Serán ___ hijos de Dios.', 'llamados', 'Ze zullen kinderen van God genoemd worden. (llamar)'],
        ]),
      },
      passage: resurreccion,
    },
  ],
}
