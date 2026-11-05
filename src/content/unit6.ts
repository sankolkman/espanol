import { items, sentences, words } from './helpers'
import type { Unit } from './types'

export const unit6: Unit = {
  id: 'u6',
  title: 'Winkelen en kleine problemen',
  lessons: [
    {
      id: 'u6l1',
      title: 'De compras',
      intro: 'Kleding kopen: kleuren en maten.',
      words: words('u6l1', [
        ['la camiseta', 'het T-shirt', { gender: 'f', altNl: ['het shirt', 'het t-shirt'] }],
        ['los pantalones', 'de broek', { gender: 'm' }],
        ['los zapatos', 'de schoenen', { gender: 'm' }],
        ['la talla', 'de maat', { gender: 'f' }],
        ['rojo', 'rood', { altEs: ['roja'] }],
        ['azul', 'blauw'],
        ['blanco', 'wit', { altEs: ['blanca'] }],
        ['negro', 'zwart', { altEs: ['negra'] }],
        ['grande', 'groot'],
        ['pequeño', 'klein', { altEs: ['pequeña'] }],
      ]),
      sentences: sentences('u6l1', [
        ['Busco una camiseta azul.', 'Ik zoek een blauw T-shirt.'],
        ['¿Tiene una talla más grande?', 'Heeft u een grotere maat?'],
        ['Quiero los zapatos negros.', 'Ik wil de zwarte schoenen.'],
        ['La camiseta roja es pequeña.', 'Het rode T-shirt is klein.'],
      ]),
      grammar: {
        id: 'u6l1-g',
        title: 'Bijvoeglijke naamwoorden',
        explanation: `In het Spaans staat de kleur of eigenschap meestal **achter** het zelfstandig naamwoord: una camiseta **azul** (een blauw T-shirt).

Het bijvoeglijk naamwoord past zich aan: mannelijk of vrouwelijk, enkelvoud of meervoud.

| | mannelijk | vrouwelijk |
|---|---|---|
| enkelvoud | el zapato roj**o** | la camiseta roj**a** |
| meervoud | los zapatos roj**os** | las camisetas roj**as** |

Woorden die op **-e** of een medeklinker eindigen, zijn voor mannelijk en vrouwelijk hetzelfde. Ze krijgen alleen een meervoud:

- *grande → grandes*
- *azul → azules*

"Groter" of "kleiner" zeg je met **más**: *una talla **más** grande* (een grotere maat), *más pequeña* (kleiner).`,
        items: items('u6l1', [
          ['una camiseta ___', 'roja', 'een rood T-shirt (rojo)'],
          ['los zapatos ___', 'negros', 'de zwarte schoenen (negro)'],
          ['unos pantalones ___', 'azules', 'een blauwe broek (azul)'],
          ['una talla más ___', 'grande', 'een grotere maat (grande)'],
          ['las camisetas ___', 'blancas', 'de witte T-shirts (blanco)'],
        ]),
      },
      dialogue: {
        id: 'u6l1-d',
        title: 'In de winkel',
        turns: [
          { speaker: 'Dependienta', es: 'Hola, ¿te puedo ayudar?', nl: 'Hoi, kan ik je helpen?' },
          { speaker: 'Tú', es: 'Sí, busco una camiseta ___.', nl: 'Ja, ik zoek een blauw T-shirt.', gap: { answer: 'azul' } },
          { speaker: 'Dependienta', es: 'Aquí tienes. ¿Qué talla usas?', nl: 'Alsjeblieft. Welke maat heb je?' },
          { speaker: 'Tú', es: 'La M. Pero es un poco pequeña. ¿Tiene una ___ más grande?', nl: 'M. Maar hij is een beetje klein. Heeft u een grotere maat?', gap: { answer: 'talla' } },
          { speaker: 'Dependienta', es: 'Sí, aquí tienes la L.', nl: 'Ja, hier heb je L.' },
          { speaker: 'Tú', es: 'Perfecto. ¿___ cuesta?', nl: 'Perfect. Hoeveel kost hij?', gap: { answer: 'Cuánto' } },
          { speaker: 'Dependienta', es: 'Quince euros.', nl: 'Vijftien euro.' },
        ],
      },
    },
    {
      id: 'u6l2',
      title: 'En la farmacia',
      intro: 'Zeggen dat je ergens pijn hebt en iets halen bij de apotheek.',
      words: words('u6l2', [
        ['la farmacia', 'de apotheek', { gender: 'f' }],
        ['me duele', 'ik heb pijn aan', { altNl: ['… doet pijn', 'het doet pijn'] }],
        ['la cabeza', 'het hoofd', { gender: 'f' }],
        ['el estómago', 'de maag', { gender: 'm', altNl: ['de buik'] }],
        ['la garganta', 'de keel', { gender: 'f' }],
        ['enfermo', 'ziek', { altEs: ['enferma'] }],
        ['el médico', 'de dokter', { gender: 'm', altNl: ['de arts'] }],
        ['la pastilla', 'de tablet', { gender: 'f', altNl: ['de pil'] }],
        ['la crema solar', 'de zonnebrandcrème', { gender: 'f', altNl: ['de zonnebrand'] }],
        ['la tirita', 'de pleister', { gender: 'f' }],
      ]),
      sentences: sentences('u6l2', [
        ['Me duele la cabeza.', 'Ik heb hoofdpijn.'],
        ['Estoy enfermo.', 'Ik ben ziek.', ['Estoy enferma.']],
        ['Necesito crema solar.', 'Ik heb zonnebrandcrème nodig.'],
        ['¿Tiene algo para la garganta?', 'Heeft u iets voor de keel?'],
      ]),
      grammar: {
        id: 'u6l2-g',
        title: 'Werkwoorden op -er en -ir',
        explanation: `Naast werkwoorden op **-ar** zijn er werkwoorden op **-er** (zoals **comer**, eten, en **beber**, drinken) en op **-ir** (zoals **vivir**, wonen). Ze werken bijna hetzelfde:

| | comer | vivir |
|---|---|---|
| yo | com**o** | viv**o** |
| tú | com**es** | viv**es** |
| él / ella / usted | com**e** | viv**e** |
| nosotros | com**emos** | viv**imos** |
| vosotros | com**éis** | viv**ís** |
| ellos / ustedes | com**en** | viv**en** |

Alleen bij *nosotros* en *vosotros* zie je het verschil tussen -er en -ir.

Pijn heb je met **me duele** (één ding) of **me duelen** (meer dingen), net als *me gusta*: *Me duele **la** cabeza*, *Me duelen **los** pies*. Let op: je zegt "**het** hoofd doet me pijn", dus niet "mijn hoofd".`,
        items: items('u6l2', [
          ['Yo ___ en Holanda.', 'vivo', 'Ik woon in Nederland. (vivir)'],
          ['¿Dónde ___ tú?', 'vives', 'Waar woon jij? (vivir)'],
          ['Nosotros ___ a las dos.', 'comemos', 'Wij eten om twee uur. (comer)'],
          ['Ella no ___ carne.', 'come', 'Zij eet geen vlees. (comer)'],
          ['¿Vosotros ___ en Madrid?', 'vivís', 'Wonen jullie in Madrid? (vivir)'],
          ['Me ___ la garganta.', 'duele', 'Ik heb keelpijn.'],
        ]),
      },
      dialogue: {
        id: 'u6l2-d',
        title: 'Bij de apotheek',
        turns: [
          { speaker: 'Farmacéutica', es: 'Hola, buenas. ¿Qué le pasa?', nl: 'Hallo. Wat is er aan de hand?' },
          { speaker: 'Tú', es: 'Me ___ la cabeza.', nl: 'Ik heb hoofdpijn.', gap: { answer: 'duele' } },
          { speaker: 'Farmacéutica', es: '¿Tiene fiebre?', nl: 'Heeft u koorts?' },
          { speaker: 'Tú', es: 'No, no tengo fiebre. Pero estoy ___.', nl: 'Nee, ik heb geen koorts. Maar ik ben ziek.', gap: { answer: 'enfermo', alt: ['enferma'] } },
          { speaker: 'Farmacéutica', es: 'Tome una pastilla cada ocho horas y beba mucha agua.', nl: 'Neem elke acht uur een tablet en drink veel water.' },
          { speaker: 'Tú', es: 'Vale. Y también necesito crema ___.', nl: 'Oké. En ik heb ook zonnebrandcrème nodig.', gap: { answer: 'solar' } },
          { speaker: 'Farmacéutica', es: 'Aquí tiene. Son doce euros.', nl: 'Alstublieft. Dat is twaalf euro.' },
        ],
      },
      reading: {
        id: 'u6l2-r',
        title: 'De bijsluiter',
        text: `IBUPROFENO 400 mg

Para el dolor de cabeza y la fiebre.
Adultos: una pastilla cada 8 horas.
Máximo: 3 pastillas al día.
Tomar con comida.
No dar a niños menores de 12 años.`,
        questions: [
          { q: 'Waarvoor is dit medicijn?', options: ['Hoofdpijn en koorts', 'Zonnebrand', 'Een verstopte neus'], correct: 0 },
          { q: 'Hoeveel tabletten mag je maximaal per dag?', options: ['1', '3', '8'], correct: 1 },
          { q: 'Hoe neem je het in?', options: ['Met eten', 'Op een lege maag', 'Met koffie'], correct: 0 },
        ],
      },
    },
    {
      id: 'u6l3',
      title: 'Planes y problemas',
      intro: 'Vertellen wat je gaat doen, en hulp vragen als er iets mis is.',
      words: words('u6l3', [
        ['he perdido', 'ik ben … kwijt', { altNl: ['ik heb verloren', 'ik ben kwijt', 'ik ben verloren'] }],
        ['el móvil', 'de mobiel', { gender: 'm', altNl: ['de telefoon', 'de gsm', 'mijn mobiel'] }],
        ['la cartera', 'de portemonnee', { gender: 'f', altNl: ['de portefeuille'] }],
        ['el bolso', 'de tas', { gender: 'm', altNl: ['de handtas'] }],
        ['la policía', 'de politie', { gender: 'f' }],
        ['la ayuda', 'de hulp', { gender: 'f' }],
        ['esta noche', 'vanavond'],
        ['el fin de semana', 'het weekend', { gender: 'm' }],
        ['la excursión', 'de excursie', { gender: 'f', altNl: ['het uitstapje'] }],
        ['visitar', 'bezoeken', { altNl: ['bezichtigen'] }],
      ]),
      sentences: sentences('u6l3', [
        ['He perdido mi móvil.', 'Ik ben mijn mobiel kwijt.'],
        ['Necesito ayuda, por favor.', 'Ik heb hulp nodig, alstublieft.'],
        ['Esta noche vamos a cenar en la playa.', 'Vanavond gaan we op het strand eten.'],
        ['El fin de semana voy a visitar Granada.', 'Dit weekend ga ik Granada bezoeken.'],
      ]),
      grammar: {
        id: 'u6l3-g',
        title: 'Ir a: gaan doen',
        explanation: `Wat je **gaat doen** zeg je in het Spaans net als in het Nederlands: met **ir** (gaan) + **a** + een heel werkwoord.

| | |
|---|---|
| **Voy a** visitar el museo. | Ik ga het museum bezoeken. |
| ¿**Vas a** comer aquí? | Ga jij hier eten? |
| Ella **va a** tomar el tren. | Zij gaat de trein nemen. |
| **Vamos a** cenar fuera. | We gaan uit eten. |
| **¿Vais a** ir a la playa? | Gaan jullie naar het strand? |
| **Van a** hacer una excursión. | Zij gaan een excursie maken. |

Vergeet het woordje **a** niet!

Handig bij problemen:

- *He perdido mi cartera.* (Ik ben mijn portemonnee kwijt.)
- *Me han robado el móvil.* (Mijn mobiel is gestolen.)
- *¡Ayuda!* of *¡Socorro!* (Help!)
- Het alarmnummer in Spanje en heel Europa is **112**.`,
        items: items('u6l3', [
          ['Mañana ___ a visitar el museo.', 'voy', 'Morgen ga ik het museum bezoeken.'],
          ['Esta noche ___ a cenar fuera.', 'vamos', 'Vanavond gaan wij uit eten.'],
          ['¿Qué ___ a hacer tú?', 'vas', 'Wat ga jij doen?'],
          ['Ella va a ___ el tren.', 'tomar', 'Zij gaat de trein nemen.'],
          ['¿___ a ir a la playa vosotros?', 'Vais', 'Gaan jullie naar het strand?'],
          ['Ellos van ___ hacer una excursión.', 'a', 'Zij gaan een excursie maken.'],
        ]),
      },
      dialogue: {
        id: 'u6l3-d',
        title: 'Bij de politie',
        turns: [
          { speaker: 'Tú', es: 'Perdone, necesito ___. He perdido mi cartera.', nl: 'Pardon, ik heb hulp nodig. Ik ben mijn portemonnee kwijt.', gap: { answer: 'ayuda' } },
          { speaker: 'Policía', es: '¿Dónde la ha perdido?', nl: 'Waar bent u hem kwijtgeraakt?' },
          { speaker: 'Tú', es: 'En el ___, creo.', nl: 'In de bus, denk ik.', gap: { answer: 'autobús' } },
          { speaker: 'Policía', es: '¿Qué hay en la cartera?', nl: 'Wat zit er in de portemonnee?' },
          { speaker: 'Tú', es: 'Dinero y mi ___.', nl: 'Geld en mijn pinpas.', gap: { answer: 'tarjeta' } },
          { speaker: 'Policía', es: 'Vale. Vamos a hacer una denuncia.', nl: 'Oké. We gaan aangifte doen.' },
          { speaker: 'Tú', es: 'Gracias. Esta noche ___ a llamar al banco.', nl: 'Dank u. Vanavond ga ik de bank bellen.', gap: { answer: 'voy' } },
        ],
      },
      reading: {
        id: 'u6l3-r',
        title: 'Een kaartje naar huis',
        text: `¡Hola, mamá!

Estoy en Málaga con Pieter. El hotel es muy bonito y está cerca de la playa. Hace mucho calor. Por la mañana vamos a la playa y por la tarde visitamos la ciudad. Mañana vamos a hacer una excursión a Ronda. ¡La comida es muy rica!

Un beso,
Lotte`,
        questions: [
          { q: 'Waar is Lotte?', options: ['In Madrid', 'In Málaga', 'In Ronda'], correct: 1 },
          { q: 'Wat doen ze ’s ochtends?', options: ['Naar het strand', 'Naar het museum', 'Uitslapen'], correct: 0 },
          { q: 'Wat gaan ze morgen doen?', options: ['Naar huis', 'Een uitstapje naar Ronda', 'Winkelen'], correct: 1 },
        ],
      },
    },
  ],
}
