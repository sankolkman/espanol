import { items, words } from '../helpers'
import type { Unit } from '../types'
import { passage, verseSentences } from './helpers'

const padreNuestro = passage(
  'b1l1-p',
  'Padre nuestro',
  'Mateo 6:9-13',
  [
    ['MAT 6:9', 'Bid daarom zo tot God: Onze Vader in de hemel, uw Naam worde geheiligd.'],
    ['MAT 6:10', 'Uw koninkrijk kome. Laat uw wil gebeuren op de aarde, zoals in de hemel.'],
    ['MAT 6:11', 'Geef ons vandaag ons dagelijks brood.'],
    ['MAT 6:12', 'Vergeef ons onze schulden, zoals ook wij onze schuldenaars al vergeven hebben.'],
    ['MAT 6:13', 'Breng ons niet in beproeving, maar verlos ons van de boze.'],
  ],
  ['Padre', 'reino', 'tierra', 'cielo', 'pan', 'Perdónanos'],
)

const diosEsAmor = passage(
  'b1l2-p',
  'Dios es amor',
  'Juan 3:16-17; 1 Juan 4:7-8',
  [
    ['JOH 3:16', 'God had de wereld zo lief dat Hij zijn enige Zoon gaf, zodat ieder die in Hem gelooft niet verloren gaat, maar eeuwig leven heeft.'],
    ['JOH 3:17', 'Want God heeft zijn Zoon niet naar de wereld gestuurd om de wereld te veroordelen, maar opdat de wereld door Hem gered wordt.'],
    ['1JO 4:7', 'Geliefden, laten we elkaar liefhebben, want de liefde komt van God. Ieder die liefheeft, is uit God geboren en kent God.'],
    ['1JO 4:8', 'Wie niet liefheeft, kent God niet, want God is liefde.'],
  ],
  ['amó', 'mundo', 'dio', 'Hijo', 'cree', 'vida', 'amor', 'conoce'],
)

const bienaventuranzas = passage(
  'b1l3-p',
  'Las bienaventuranzas',
  'Mateo 5:3-9',
  [
    ['MAT 5:3', 'Heel gelukkig zijn de armen van geest, want van hen is het koninkrijk van de hemel.'],
    ['MAT 5:4', 'Heel gelukkig zijn wie treuren, want zij zullen getroost worden.'],
    ['MAT 5:5', 'Heel gelukkig zijn de zachtmoedigen, want zij zullen de aarde erven.'],
    ['MAT 5:6', 'Heel gelukkig zijn wie honger en dorst hebben naar gerechtigheid, want zij zullen verzadigd worden.'],
    ['MAT 5:7', 'Heel gelukkig zijn de barmhartigen, want zij zullen barmhartigheid ontvangen.'],
    ['MAT 5:8', 'Heel gelukkig zijn wie zuiver van hart zijn, want zij zullen God zien.'],
    ['MAT 5:9', 'Heel gelukkig zijn wie vrede zoeken, want zij zullen kinderen van God genoemd worden.'],
  ],
  ['felices', 'pobres', 'hambre', 'sed', 'justicia', 'corazón', 'verán', 'paz'],
)

const elAmor = passage(
  'b1l4-p',
  'El amor',
  '1 Corintios 13:4-8',
  [
    ['1CO 13:4', 'De liefde is geduldig. Ze is vriendelijk. Ze is niet vol jaloezie. Ze schept niet op, is niet arrogant,'],
    ['1CO 13:5', 'ze is niet onfatsoenlijk, niet egoïstisch, raakt niet geïrriteerd, koestert geen wrok.'],
    ['1CO 13:6', 'Ze verheugt zich niet over onrecht, maar is blij met de waarheid.'],
    ['1CO 13:7', 'Alles verdraagt ze, alles gelooft ze, alles hoopt ze, alles houdt ze vol.'],
    ['1CO 13:8', 'De liefde vergaat nooit. Maar als er profetieën zijn, zullen ze ophouden; als er talen zijn, zullen ze stoppen; als er kennis is, zal die verdwijnen.'],
  ],
  ['paciente', 'pero', 'verdad', 'sufre', 'espera', 'nunca', 'si'],
)

const yoSoy = passage(
  'b1l5-p',
  'Yo soy',
  'Juan 14:6; 8:12; 10:11; 11:25',
  [
    ['JOH 14:6', 'Jezus antwoordde hem: Ik ben de Weg, de Waarheid en het Leven. Niemand komt bij de Vader dan door Mij.'],
    ['JOH 8:12', 'Jezus sprak hen opnieuw toe: Ik ben het Licht van de wereld. Wie Mij volgt, zal zeker niet in het donker lopen, maar zal het Licht van het Leven hebben.'],
    ['JOH 10:11', 'Ik ben de goede Herder. De goede Herder geeft zijn leven voor de schapen.'],
    ['JOH 11:25', 'Jezus zei tegen haar: Ik ben de Opstanding en het Leven. Wie in Mij gelooft, zal leven, ook al sterft hij.'],
  ],
  ['Camino', 'Nadie', 'Luz', 'sigue', 'oscuridad', 'Pastor', 'ovejas', 'vivirá'],
)

const mandamiento = passage(
  'b1l6-p',
  'El gran mandamiento',
  'Mateo 22:37-39; 11:28-30',
  [
    ['MAT 22:37', 'Hij antwoordde hem: Je zult de Heer je God liefhebben met heel je hart, met heel je ziel en met heel je verstand.'],
    ['MAT 22:38', 'Dit is het grote en eerste gebod,'],
    ['MAT 22:39', 'en het tweede is daaraan gelijk: Je zult je naaste liefhebben als jezelf.'],
    ['MAT 11:28', 'Kom naar Mij, allen die uitgeput zijn en zwaar beladen, en Ik zal jullie rust geven.'],
    ['MAT 11:29', 'Neem mijn juk op je en leer van Mij, want Ik ben zachtmoedig en nederig van hart. Jullie zullen rust vinden voor je ziel,'],
    ['MAT 11:30', 'want mijn juk is zacht en mijn last is licht.'],
  ],
  ['Señor', 'alma', 'Mandamiento', 'prójimo', 'mismo', 'Vengan', 'aprendan', 'descanso', 'fácil'],
)

export const phase1: Unit = {
  id: 'b1',
  title: 'Fase 1 · Bekende stukken',
  lessons: [
    {
      id: 'b1l1',
      title: 'Padre nuestro',
      intro: 'Het Onze Vader (Mateo 6:9-13): je eerste bijbeltekst in het Spaans.',
      words: words('b1l1', [
        ['Dios', 'God'],
        ['el padre', 'de vader', { gender: 'm', altNl: ['vader'] }],
        ['nuestro', 'onze', { forms: ['nuestra', 'nuestros', 'nuestras'], altNl: ['ons'] }],
        ['el cielo', 'de hemel', { gender: 'm', forms: ['cielos', 'celestial'] }],
        ['la tierra', 'de aarde', { gender: 'f', altNl: ['het land'] }],
        ['el reino', 'het koninkrijk', { gender: 'm', altNl: ['het rijk'] }],
        ['el pan', 'het brood', { gender: 'm' }],
        ['perdonar', 'vergeven', { forms: ['perdónanos', 'perdonamos', 'perdonados', 'perdona'] }],
      ]),
      sentences: verseSentences('b1l1', padreNuestro, [1, 2, 4]),
      grammar: {
        id: 'b1l1-g',
        title: 'Mijn, jouw, onze: bezittelijke voornaamwoorden',
        explanation: `In het Onze Vader zie je veel woordjes die zeggen **van wie** iets is:

| | enkelvoud | meervoud |
|---|---|---|
| mijn | **mi** padre | **mis** hermanos |
| jouw / uw | **tu** reino | **tus** pecados |
| zijn / haar / hun | **su** Hijo | **sus** discípulos |
| onze | **nuestro** pan, **nuestra** casa | **nuestros** padres, **nuestras** deudas |

*Nuestro* past zich aan, net als een bijvoeglijk naamwoord: nuestr**o** pan (m), nuestr**as** deudas (v, mv).

In de bijbel staat het soms **achter** het woord, dat klinkt plechtig: Padre **nuestro**, el pan **nuestro**.

Let op het verschil: **tu** (jouw) heeft geen accent, **tú** (jij) wel.`,
        items: items('b1l1', [
          ['Venga ___ reino.', 'tu', 'Uw koninkrijk kome.'],
          ['Padre ___', 'nuestro', 'Onze Vader'],
          ['Perdónanos ___ deudas.', 'nuestras', 'Vergeef ons onze schulden.'],
          ['Dios dio a ___ Hijo.', 'su', 'God gaf zijn Zoon.'],
          ['Que se haga ___ voluntad.', 'tu', 'Laat uw wil gebeuren.'],
        ]),
      },
      passage: padreNuestro,
    },
    {
      id: 'b1l2',
      title: 'Dios es amor',
      intro: 'Johannes 3:16 en 1 Johannes 4: over Gods liefde.',
      words: words('b1l2', [
        ['el amor', 'de liefde', { gender: 'm' }],
        ['amar', 'liefhebben', { forms: ['amó', 'ama', 'amémonos', 'amarás', 'aman'], altNl: ['houden van'] }],
        ['el mundo', 'de wereld', { gender: 'm' }],
        ['el Hijo', 'de Zoon', { gender: 'm', altNl: ['de zoon', 'zoon'] }],
        ['la vida', 'het leven', { gender: 'f' }],
        ['creer', 'geloven', { forms: ['cree', 'crean', 'creyó', 'creen'] }],
        ['dar', 'geven', { forms: ['dio', 'da', 'dame', 'dieron'] }],
        ['eterno', 'eeuwig', { forms: ['eterna'] }],
        ['conocer', 'kennen', { forms: ['conoce', 'conocen', 'conozco'] }],
      ]),
      sentences: verseSentences('b1l2', diosEsAmor, [0, 3], [['Dios es amor.', 'God is liefde.']]),
      grammar: {
        id: 'b1l2-g',
        title: 'El que…: wie…',
        explanation: `In de bijbel lees je vaak **el que** of **todo el que**. Dat betekent "wie" of "ieder die":

| Spaans | Nederlands |
|---|---|
| **El que** cree en Él… | **Wie** in Hem gelooft… |
| **Todo el que** ama… | **Ieder die** liefheeft… |
| **El que** no ama… | **Wie** niet liefheeft… |

Het werkwoord staat dan in de hij-vorm: cre**e**, am**a**, conoc**e**.

Een paar vormen die je al kunt herkennen:

- Dios **es** amor. (God **is** liefde.)
- Dios **amó** al mundo. (God **had** de wereld lief.) Dit is de verleden tijd; die komt in fase 2 uitgebreid.`,
        items: items('b1l2', [
          ['___ que cree en Él no perece.', 'El', 'Wie in Hem gelooft, gaat niet verloren.'],
          ['Todo el ___ ama, conoce a Dios.', 'que', 'Ieder die liefheeft, kent God.'],
          ['Dios ___ amor.', 'es', 'God is liefde.'],
          ['El que no ama, no ___ a Dios.', 'conoce', 'Wie niet liefheeft, kent God niet.'],
        ]),
      },
      passage: diosEsAmor,
    },
    {
      id: 'b1l3',
      title: 'Inmensamente felices',
      intro: 'De zaligsprekingen uit de Bergrede (Mateo 5:3-9).',
      words: words('b1l3', [
        ['feliz', 'gelukkig', { forms: ['felices'], altNl: ['zalig', 'blij'] }],
        ['pobre', 'arm', { forms: ['pobres'] }],
        ['el corazón', 'het hart', { gender: 'm' }],
        ['la paz', 'de vrede', { gender: 'f' }],
        ['la justicia', 'de gerechtigheid', { gender: 'f', altNl: ['het recht'] }],
        ['ver', 'zien', { forms: ['verán', 'vio', 'vieron', 'ven'] }],
        ['el hambre', 'de honger', { gender: 'f' }],
        ['la sed', 'de dorst', { gender: 'f' }],
        ['llamar', 'noemen, roepen', { forms: ['llamados', 'llamó', 'llames'], altNl: ['noemen', 'roepen'] }],
      ]),
      sentences: verseSentences('b1l3', bienaventuranzas, [1, 5], [['Ellos verán a Dios.', 'Zij zullen God zien.']]),
      grammar: {
        id: 'b1l3-g',
        title: 'De toekomende tijd: zullen',
        explanation: `In de zaligsprekingen staat steeds wat er **zal** gebeuren: *serán consolados* (zij zullen getroost worden), *verán a Dios* (zij zullen God zien).

De toekomende tijd is makkelijk: je neemt het **hele werkwoord** en plakt er een uitgang achter. Die uitgang is voor alle werkwoorden hetzelfde:

| | ver (zien) |
|---|---|
| yo | ver**é** |
| tú | ver**ás** |
| él / ella / usted | ver**á** |
| nosotros | ver**emos** |
| ustedes / ellos | ver**án** |

Meer voorbeelden: heredar → heredar**án** (zij zullen erven), ser → ser**án** (zij zullen zijn), pagar → pagar**é** (ik zal betalen).`,
        items: items('b1l3', [
          ['Ellos ___ a Dios.', 'verán', 'Zij zullen God zien. (ver)'],
          ['Ellos ___ consolados.', 'serán', 'Zij zullen getroost worden. (ser)'],
          ['Ellos ___ la tierra.', 'heredarán', 'Zij zullen de aarde erven. (heredar)'],
          ['Yo te lo ___.', 'pagaré', 'Ik zal het je betalen. (pagar)'],
          ['Tú ___ la Luz.', 'verás', 'Jij zult het Licht zien. (ver)'],
        ]),
      },
      passage: bienaventuranzas,
    },
    {
      id: 'b1l4',
      title: 'El amor es paciente',
      intro: 'Het lied van de liefde (1 Corintios 13:4-8).',
      words: words('b1l4', [
        ['paciente', 'geduldig'],
        ['nunca', 'nooit'],
        ['todo', 'alles', { forms: ['toda', 'todos', 'todas'], altNl: ['al', 'heel'] }],
        ['la verdad', 'de waarheid', { gender: 'f' }],
        ['esperar', 'hopen', { forms: ['espera', 'esperan'], altNl: ['wachten', 'verwachten'] }],
        ['sufrir', 'verdragen', { forms: ['sufre', 'sufrir'], altNl: ['lijden', 'dulden'] }],
        ['si', 'als', { altNl: ['indien', 'of'] }],
        ['pero', 'maar'],
      ]),
      sentences: verseSentences('b1l4', elAmor, [3], [
        ['El amor es paciente.', 'De liefde is geduldig.'],
        ['El amor nunca caduca.', 'De liefde vergaat nooit.'],
      ]),
      grammar: {
        id: 'b1l4-g',
        title: 'Niet en nooit',
        explanation: `Ontkennen is in het Spaans heel eenvoudig: zet **no** vóór het werkwoord.

- El amor **no** es arrogante. (De liefde is **niet** arrogant.)
- **No** se irrita. (Ze raakt **niet** geïrriteerd.)

**Nunca** betekent "nooit". Het kan vóór het werkwoord staan:

- El amor **nunca** caduca. (De liefde vergaat **nooit**.)

Of achter het werkwoord, en dan staat er óók **no** voor. In het Spaans mag dat, twee keer ontkennen:

- **No** caduca **nunca**. (Ze vergaat nooit.)
- **No** viene **nadie**. (Er komt niemand.)`,
        items: items('b1l4', [
          ['El amor ___ es arrogante.', 'no', 'De liefde is niet arrogant.'],
          ['El amor ___ caduca.', 'nunca', 'De liefde vergaat nooit.'],
          ['No se irrita, ___ guarda rencor.', 'no', 'Ze raakt niet geïrriteerd, koestert geen wrok.'],
          ['Todo lo cree, todo lo ___.', 'espera', 'Alles gelooft ze, alles hoopt ze.'],
        ]),
      },
      passage: elAmor,
    },
    {
      id: 'b1l5',
      title: 'Yo soy',
      intro: 'Ik ben de Weg, het Licht, de goede Herder: uitspraken van Jezus in Johannes.',
      words: words('b1l5', [
        ['el camino', 'de weg', { gender: 'm' }],
        ['la luz', 'het licht', { gender: 'f', forms: ['luces'] }],
        ['el pastor', 'de herder', { gender: 'm', forms: ['pastores'] }],
        ['la oveja', 'het schaap', { gender: 'f', forms: ['ovejas'] }],
        ['nadie', 'niemand'],
        ['seguir', 'volgen', { forms: ['sigue', 'siguieron', 'siguió', 'síganme', 'seguían'] }],
        ['la oscuridad', 'de duisternis', { gender: 'f', altNl: ['het donker'] }],
        ['vivir', 'leven', { forms: ['vivirá', 'vive', 'viven'], altNl: ['wonen'] }],
      ]),
      sentences: verseSentences('b1l5', yoSoy, [2], [
        ['Yo soy el Camino, la Verdad y la Vida.', 'Ik ben de Weg, de Waarheid en het Leven.'],
        ['Yo soy la Luz del mundo.', 'Ik ben het Licht van de wereld.'],
      ]),
      grammar: {
        id: 'b1l5-g',
        title: 'In Mij, door Mij: voornaamwoorden na een voorzetsel',
        explanation: `Na een voorzetsel (*en, por, de, a, para*) gebruik je speciale vormen:

| | na voorzetsel | voorbeeld |
|---|---|---|
| ik | **mí** | el que cree en **Mí** (wie in Mij gelooft) |
| jij | **ti** | pequé contra **ti** (ik heb tegen u gezondigd) |
| hij | **él** | por medio de **Él** (door Hem) |
| wij | **nosotros** | Dios con **nosotros** |
| jullie | **ustedes** | delante de **ustedes** |

In deze bijbelvertaling worden woorden die over God of Jezus gaan met een **hoofdletter** geschreven: *Mí, Él, Quien*.

Met *con* zijn er twee aparte vormen: **conmigo** (met mij) en **contigo** (met jou).`,
        items: items('b1l5', [
          ['El que cree en ___, vivirá.', 'Mí', 'Wie in Mij gelooft, zal leven.'],
          ['Nadie viene al Padre sino por medio de ___.', 'Mí', 'Niemand komt bij de Vader dan door Mij.'],
          ['Yo creo en ___.', 'Él', 'Ik geloof in Hem.'],
          ['___ soy la Luz del mundo.', 'Yo', 'Ik ben het Licht van de wereld.'],
          ['Dios está ___.', 'contigo', 'God is met jou.'],
        ]),
      },
      passage: yoSoy,
    },
    {
      id: 'b1l6',
      title: 'Ama a tu prójimo',
      intro: 'Het grote gebod en "Kom naar Mij" (Mateo 22 en 11).',
      words: words('b1l6', [
        ['el Señor', 'de Heer', { gender: 'm', altNl: ['de heer', 'heer'] }],
        ['el alma', 'de ziel', { gender: 'f', forms: ['almas'] }],
        ['el mandamiento', 'het gebod', { gender: 'm', forms: ['Mandamiento', 'mandamientos'] }],
        ['el prójimo', 'de naaste', { gender: 'm' }],
        ['mismo', 'zelf', { forms: ['misma'], altNl: ['hetzelfde'] }],
        ['venir', 'komen', { forms: ['vengan', 'viene', 'vino', 'venga'] }],
        ['aprender', 'leren', { forms: ['aprendan', 'aprende'] }],
        ['el descanso', 'de rust', { gender: 'm' }],
        ['fácil', 'licht, makkelijk', { altNl: ['makkelijk', 'zacht', 'gemakkelijk'] }],
      ]),
      sentences: verseSentences('b1l6', mandamiento, [3], [
        ['Amarás a tu prójimo como a ti mismo.', 'Je zult je naaste liefhebben als jezelf.'],
      ]),
      grammar: {
        id: 'b1l6-g',
        title: 'Ustedes en de gebiedende wijs',
        explanation: `Deze bijbelvertaling komt uit Latijns-Amerika. Daar zeggen ze voor "jullie" altijd **ustedes**, nooit *vosotros*. Het werkwoord staat dan in dezelfde vorm als bij *ellos*:

| | Spanje | Latijns-Amerika en deze bijbel |
|---|---|---|
| jullie zijn | vosotros sois | ustedes **son** |
| jullie zullen vinden | vosotros hallaréis | ustedes **hallarán** |

Een opdracht aan meerdere mensen (de **gebiedende wijs**) maak je met een "omgekeerde" klinker:

- -ar wordt **-en**: llevar → **lleven** (neem!), mandar → **manden** (beveel!)
- -er/-ir wordt **-an**: aprender → **aprendan** (leer!), venir → **vengan** (kom!)

Met *no* ervoor wordt het een verbod: **No teman.** (Wees niet bang.)`,
        items: items('b1l6', [
          ['___ a Mí todos.', 'Vengan', 'Kom naar Mij, allemaal. (venir)'],
          ['Lleven mi yugo y ___ de Mí.', 'aprendan', 'Neem mijn juk en leer van Mij. (aprender)'],
          ['¡No ___!', 'teman', 'Wees niet bang! (temer)'],
          ['___ mi yugo sobre ustedes.', 'Lleven', 'Neem mijn juk op je. (llevar)'],
          ['Ustedes ___ descanso.', 'hallarán', 'Jullie zullen rust vinden. (hallar)'],
        ]),
      },
      passage: mandamiento,
    },
  ],
}

