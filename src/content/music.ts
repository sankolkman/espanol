import { items, sentences, words } from './helpers'
import type { Unit } from './types'

/*
 * Music path: vocabulary and themes of Christian songs.
 * The songs' lyrics are copyrighted and are NOT included. Each lesson teaches
 * words you will hear in the song, with example sentences written for this app.
 * Learners can add lyrics they own themselves (kept only in their browser).
 */
export const musicUnit: Unit = {
  id: 'm1',
  title: 'Liederen',
  lessons: [
    {
      id: 'm1l1',
      title: 'Océanos',
      intro: 'Een lied over vertrouwen, ook als het water diep is. Woorden over zee, geloof en vertrouwen.',
      song: { title: 'Océanos', query: 'Océanos Hillsong en español' },
      words: words('m1l1', [
        ['el océano', 'de oceaan', { gender: 'm', forms: ['océanos'] }],
        ['el agua', 'het water', { gender: 'f', forms: ['aguas'] }],
        ['profundo', 'diep', { forms: ['profunda', 'profundas', 'profundos'] }],
        ['el pie', 'de voet', { gender: 'm', forms: ['pies'] }],
        ['confiar', 'vertrouwen', { forms: ['confío', 'confía', 'confiaré'] }],
        ['la fe', 'het geloof', { gender: 'f' }],
        ['la voz', 'de stem', { gender: 'f', forms: ['voces'] }],
        ['fallar', 'falen, wankelen', { forms: ['falla', 'fallar'], altNl: ['falen', 'wankelen', 'tekortschieten'] }],
      ]),
      sentences: sentences('m1l1', [
        ['Confío en Dios.', 'Ik vertrouw op God.'],
        ['El océano es muy profundo.', 'De oceaan is heel diep.'],
        ['Tengo fe en Jesús.', 'Ik geloof in Jezus.'],
        ['Oigo una voz.', 'Ik hoor een stem.'],
      ]),
      grammar: {
        id: 'm1l1-g',
        title: 'Vertrouwen óp, geloven ín: werkwoorden met en',
        explanation: `Sommige werkwoorden hebben een vast voorzetsel. In het Spaans is dat vaak **en**, waar je in het Nederlands "op" of "in" zegt:

| Spaans | Nederlands |
|---|---|
| confiar **en** | vertrouwen **op** |
| creer **en** | geloven **in** |
| pensar **en** | denken **aan** |
| esperar **en** | hopen **op** |

Voorbeelden: *Confío **en** Dios.* (Ik vertrouw op God.) *Pienso **en** ti.* (Ik denk aan jou.)

Let op: na *en* gebruik je *mí* en *ti*: *Confía **en mí**.* (Vertrouw op mij.)`,
        items: items('m1l1', [
          ['Confío ___ Dios.', 'en', 'Ik vertrouw op God.'],
          ['Creo ___ Jesús.', 'en', 'Ik geloof in Jezus.'],
          ['Pienso ___ ti.', 'en', 'Ik denk aan jou.'],
          ['Confía en ___.', 'mí', 'Vertrouw op mij.'],
        ]),
      },
    },
    {
      id: 'm1l2',
      title: 'Holy Forever',
      intro: 'Een lied over Gods heiligheid, gezongen door de hemel en alle generaties. In het Spaans: santo, para siempre.',
      song: { title: 'Holy Forever', query: 'Holy Forever en español Santo por siempre' },
      words: words('m1l2', [
        ['santo', 'heilig', { forms: ['santa', 'santos'] }],
        ['para siempre', 'voor altijd', { altNl: ['eeuwig', 'voor eeuwig'] }],
        ['el trono', 'de troon', { gender: 'm' }],
        ['cantar', 'zingen', { forms: ['cantan', 'canto', 'cantamos', 'canta'] }],
        ['el ángel', 'de engel', { gender: 'm', forms: ['ángeles'] }],
        ['la generación', 'de generatie', { gender: 'f', forms: ['generaciones'] }],
        ['el cielo', 'de hemel', { gender: 'm', forms: ['cielos'] }],
        ['la tierra', 'de aarde', { gender: 'f' }],
      ]),
      sentences: sentences('m1l2', [
        ['Dios es santo.', 'God is heilig.'],
        ['Los ángeles cantan en el cielo.', 'De engelen zingen in de hemel.'],
        ['Cantamos juntos.', 'We zingen samen.'],
        ['Dios reina para siempre.', 'God regeert voor altijd.'],
      ]),
    },
    {
      id: 'm1l3',
      title: 'La bondad de Dios',
      intro: 'Een lied over Gods goedheid en trouw, je hele leven lang. Woorden over goedheid, trouw en tijd.',
      song: { title: 'La bondad de Dios', query: 'La bondad de Dios canción' },
      words: words('m1l3', [
        ['la bondad', 'de goedheid', { gender: 'f' }],
        ['bueno', 'goed', { forms: ['buena', 'buenos'] }],
        ['fiel', 'trouw', { forms: ['fieles'] }],
        ['la fidelidad', 'de trouw', { gender: 'f', altNl: ['de getrouwheid'] }],
        ['la mañana', 'de ochtend', { gender: 'f' }],
        ['la noche', 'de nacht', { gender: 'f', forms: ['noches'] }],
        ['siempre', 'altijd'],
        ['la mano', 'de hand', { gender: 'f', forms: ['manos'] }],
      ]),
      sentences: sentences('m1l3', [
        ['Dios es bueno conmigo.', 'God is goed voor mij.'],
        ['Él siempre es fiel.', 'Hij is altijd trouw.'],
        ['Cada mañana te canto.', 'Elke ochtend zing ik voor U.'],
        ['Tu mano me guía.', 'Uw hand leidt mij.'],
      ]),
      grammar: {
        id: 'm1l3-g',
        title: 'Altijd, nooit, elke dag',
        explanation: `Woorden die zeggen **hoe vaak** iets gebeurt:

| Spaans | Nederlands |
|---|---|
| **siempre** | altijd |
| **nunca** | nooit |
| **cada día** | elke dag |
| **cada mañana** | elke ochtend |
| **todavía** | nog steeds |

*Siempre* en *nunca* staan meestal vóór het werkwoord: *Él **siempre** es fiel.* *Dios **nunca** cambia.* (God verandert nooit.)

*Cada* verandert niet: *cada día, cada noche, cada momento*.`,
        items: items('m1l3', [
          ['Él ___ es fiel.', 'siempre', 'Hij is altijd trouw.'],
          ['Dios ___ cambia.', 'nunca', 'God verandert nooit.'],
          ['___ mañana canto.', 'Cada', 'Elke ochtend zing ik.'],
          ['___ confío en Ti.', 'Todavía', 'Ik vertrouw nog steeds op U.'],
        ]),
      },
    },
    {
      id: 'm1l4',
      title: 'Hermoso Nombre',
      intro: 'Een lied over de naam van Jezus: mooi, wonderlijk en machtig. Woorden over schoonheid, kracht en koningschap.',
      song: { title: 'Hermoso Nombre', query: 'Hermoso Nombre Hillsong en español' },
      words: words('m1l4', [
        ['hermoso', 'mooi', { forms: ['hermosa', 'hermosos'], altNl: ['prachtig'] }],
        ['el nombre', 'de naam', { gender: 'm', forms: ['nombres'] }],
        ['maravilloso', 'wonderlijk', { forms: ['maravillosa'], altNl: ['geweldig', 'prachtig'] }],
        ['el poder', 'de kracht', { gender: 'm', altNl: ['de macht'] }],
        ['poderoso', 'machtig', { forms: ['poderosa'] }],
        ['el rey', 'de koning', { gender: 'm', forms: ['reyes', 'Rey'] }],
        ['la victoria', 'de overwinning', { gender: 'f' }],
        ['igual', 'gelijk', { altNl: ['hetzelfde'] }],
      ]),
      sentences: sentences('m1l4', [
        ['Jesús es el Rey.', 'Jezus is de Koning.'],
        ['Dios tiene todo el poder.', 'God heeft alle macht.'],
        ['Hoy celebramos la victoria.', 'Vandaag vieren we de overwinning.'],
        ['No hay nadie igual.', 'Er is niemand zoals Hij.'],
      ]),
    },
    {
      id: 'm1l5',
      title: 'Way Maker (Abres Camino)',
      intro: 'Een lied over God die een weg maakt waar geen weg is, wonderen doet en zijn beloften houdt.',
      song: { title: 'Way Maker (Abres Camino)', query: 'Abres Camino Way Maker en español' },
      words: words('m1l5', [
        ['el camino', 'de weg', { gender: 'm', forms: ['caminos'] }],
        ['abrir', 'openen', { forms: ['abres', 'abre', 'abrió'] }],
        ['el milagro', 'het wonder', { gender: 'm', forms: ['milagros'] }],
        ['la promesa', 'de belofte', { gender: 'f', forms: ['promesas'] }],
        ['cumplir', 'nakomen', { forms: ['cumples', 'cumple'], altNl: ['houden', 'vervullen'] }],
        ['la luz', 'het licht', { gender: 'f' }],
        ['la oscuridad', 'de duisternis', { gender: 'f', altNl: ['het donker'] }],
        ['obrar', 'werken', { forms: ['obras', 'obra'], altNl: ['werkzaam zijn'] }],
      ]),
      sentences: sentences('m1l5', [
        ['Dios hace milagros.', 'God doet wonderen.'],
        ['Él cumple su promesa.', 'Hij houdt zijn belofte.'],
        ['La luz vence la noche.', 'Het licht overwint de nacht.'],
        ['Tú estás aquí conmigo.', 'U bent hier bij mij.'],
      ]),
      grammar: {
        id: 'm1l5-g',
        title: 'Tú tegen God: de jij-vorm in liederen',
        explanation: `In Spaanse liederen en gebeden spreken mensen God bijna altijd aan met **tú** (jij), niet met *usted*. Dat klinkt niet oneerbiedig, maar persoonlijk en dichtbij. Met een hoofdletter: **Tú**.

Het werkwoord staat dan in de jij-vorm, meestal op **-as** of **-es**:

| werkwoord | jij-vorm |
|---|---|
| abrir (openen) | Tú **abres** |
| hacer (doen) | Tú **haces** |
| estar (zijn) | Tú **estás** |
| ser (zijn) | Tú **eres** |
| cumplir (nakomen) | Tú **cumples** |

Bezittelijk: **tu** (zonder accent) = jouw / uw: *tu luz, tu nombre*.`,
        items: items('m1l5', [
          ['Tú ___ aquí.', 'estás', 'U bent hier. (estar)'],
          ['Tú ___ fiel.', 'eres', 'U bent trouw. (ser)'],
          ['Tú ___ milagros.', 'haces', 'U doet wonderen. (hacer)'],
          ['Tú ___ tus promesas.', 'cumples', 'U houdt uw beloften. (cumplir)'],
          ['Tú ___ un camino.', 'abres', 'U opent een weg. (abrir)'],
        ]),
      },
    },
    {
      id: 'm1l6',
      title: 'Gracia Sublime Es',
      intro: 'Een lied over genade: onverdiend, groot en bevrijdend. Woorden over genade, vergeving en vrijheid.',
      song: { title: 'Gracia Sublime Es', query: 'Gracia Sublime Es canción' },
      words: words('m1l6', [
        ['la gracia', 'de genade', { gender: 'f' }],
        ['sublime', 'verheven', { altNl: ['prachtig', 'subliem'] }],
        ['el perdón', 'de vergeving', { gender: 'm' }],
        ['libre', 'vrij', { forms: ['libres'] }],
        ['la libertad', 'de vrijheid', { gender: 'f' }],
        ['la cruz', 'het kruis', { gender: 'f' }],
        ['el amor', 'de liefde', { gender: 'm' }],
        ['inmenso', 'oneindig groot', { forms: ['inmensa'], altNl: ['immens', 'enorm'] }],
      ]),
      sentences: sentences('m1l6', [
        ['Dios me da su perdón.', 'God geeft mij zijn vergeving.'],
        ['Ahora vivo en libertad.', 'Nu leef ik in vrijheid.'],
        ['Su amor es inmenso.', 'Zijn liefde is oneindig groot.'],
        ['Jesús murió en la cruz.', 'Jezus stierf aan het kruis.'],
      ]),
    },
    {
      id: 'm1l7',
      title: 'Cuán Grande Es Él',
      intro: 'Een oude lofzang over de schepping: sterren, donder, bossen en bergen. Woorden over de natuur en verwondering.',
      song: { title: 'Cuán Grande Es Él', query: 'Cuán Grande Es Él himno' },
      words: words('m1l7', [
        ['cuán', 'hoe (in een uitroep)', { altNl: ['hoe', 'hoe zeer'] }],
        ['la estrella', 'de ster', { gender: 'f', forms: ['estrellas'] }],
        ['el trueno', 'de donder', { gender: 'm', forms: ['truenos'] }],
        ['la creación', 'de schepping', { gender: 'f' }],
        ['el bosque', 'het bos', { gender: 'm', forms: ['bosques'] }],
        ['la montaña', 'de berg', { gender: 'f', forms: ['montañas', 'monte', 'montes'] }],
        ['el alma', 'de ziel', { gender: 'f' }],
        ['crear', 'scheppen', { forms: ['creó', 'creaste', 'crea'], altNl: ['maken', 'creëren'] }],
      ]),
      sentences: sentences('m1l7', [
        ['Miro las estrellas.', 'Ik kijk naar de sterren.'],
        ['Dios creó el mundo.', 'God schiep de wereld.'],
        ['Oigo el trueno.', 'Ik hoor de donder.'],
        ['¡Qué grande es Dios!', 'Wat is God groot!'],
      ]),
      grammar: {
        id: 'm1l7-g',
        title: 'Uitroepen: qué en cuán',
        explanation: `Een uitroep van verwondering ("Wat is dat mooi!") maak je met **qué** + bijvoeglijk naamwoord + werkwoord:

- **¡Qué** grande es Dios! (Wat is God groot!)
- **¡Qué** hermoso es el mar! (Wat is de zee mooi!)

In liederen en gedichten hoor je ook **cuán**. Dat betekent hetzelfde ("hoe…!"), maar klinkt ouderwets en plechtig. In gewone spreektaal zeg je *qué*.

Let op de accenten: *qué* en *cuán* hebben in een uitroep altijd een accent, en de zin staat tussen **¡ !**.`,
        items: items('m1l7', [
          ['¡___ grande es Dios!', 'Qué', 'Wat is God groot!'],
          ['¡Qué ___ es el mar!', 'hermoso', 'Wat is de zee mooi! (hermoso)'],
          ['¡___ bella es la creación!', 'Cuán', 'Hoe mooi is de schepping! (plechtig)'],
          ['¡Qué grande ___ el cielo!', 'es', 'Wat is de hemel groot!'],
        ]),
      },
    },
    {
      id: 'm1l8',
      title: 'Grande es el Señor',
      intro: 'Een lofzang over Gods grootheid: Hij is het waard om geprezen te worden. Woorden over lof en eer.',
      song: { title: 'Grande es el Señor', query: 'Grande es el Señor canción' },
      words: words('m1l8', [
        ['grande', 'groot', { forms: ['grandes'] }],
        ['digno', 'waardig', { forms: ['digna'], altNl: ['het waard'] }],
        ['alabar', 'prijzen', { forms: ['alabamos', 'alabo', 'alaben'], altNl: ['loven'] }],
        ['la alabanza', 'de lofprijzing', { gender: 'f', altNl: ['de lof'] }],
        ['exaltar', 'verheerlijken', { forms: ['exaltamos'], altNl: ['verhogen'] }],
        ['el honor', 'de eer', { gender: 'm' }],
        ['el pueblo', 'het volk', { gender: 'm' }],
        ['la verdad', 'de waarheid', { gender: 'f' }],
      ]),
      sentences: sentences('m1l8', [
        ['Alabamos a Dios.', 'Wij prijzen God.'],
        ['Él es digno de honor.', 'Hij is eer waardig.'],
        ['Todo el pueblo canta.', 'Het hele volk zingt.'],
        ['Su palabra es verdad.', 'Zijn woord is waarheid.'],
      ]),
      grammar: {
        id: 'm1l8-g',
        title: 'Alabar a Dios: de persoonlijke a',
        explanation: `Als het lijdend voorwerp een **persoon** is, zet je er in het Spaans **a** voor. Dat woordje vertaal je niet:

- *Alabamos **a** Dios.* (Wij prijzen God.)
- *Amo **a** mi madre.* (Ik hou van mijn moeder.)
- *Veo **a** Pedro.* (Ik zie Pedro.)

Bij dingen gebruik je geen *a*: *Veo **el** mar.* (Ik zie de zee.)

*a* + *el* wordt **al**: *Alabamos **al** Señor.*`,
        items: items('m1l8', [
          ['Alabamos ___ Dios.', 'a', 'Wij prijzen God.'],
          ['Alabamos ___ Señor.', 'al', 'Wij prijzen de Heer. (a + el)'],
          ['Amo ___ mi madre.', 'a', 'Ik hou van mijn moeder.'],
          ['Veo ___ mar.', 'el', 'Ik zie de zee. (een ding: geen a)'],
        ]),
      },
    },
  ],
}
