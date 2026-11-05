import { items, sentences, words } from './helpers'
import type { Unit } from './types'

export const unit5: Unit = {
  id: 'u5',
  title: 'Hotel en accommodatie',
  lessons: [
    {
      id: 'u5l1',
      title: 'Tengo una reserva',
      intro: 'Inchecken in je hotel.',
      words: words('u5l1', [
        ['la habitación', 'de kamer', { gender: 'f', altNl: ['de hotelkamer'] }],
        ['la reserva', 'de reservering', { gender: 'f', altNl: ['de boeking'] }],
        ['la noche', 'de nacht', { gender: 'f', altNl: ['de avond'] }],
        ['doble', 'tweepersoons'],
        ['individual', 'eenpersoons'],
        ['la llave', 'de sleutel', { gender: 'f' }],
        ['el pasaporte', 'het paspoort', { gender: 'm' }],
        ['el ascensor', 'de lift', { gender: 'm' }],
        ['la planta', 'de verdieping', { gender: 'f', altNl: ['de etage'] }],
      ]),
      sentences: sentences('u5l1', [
        ['Tengo una reserva.', 'Ik heb een reservering.'],
        ['Una habitación doble, por favor.', 'Een tweepersoonskamer, alsjeblieft.'],
        ['Para tres noches.', 'Voor drie nachten.'],
        ['¿Dónde está el ascensor?', 'Waar is de lift?'],
      ]),
      grammar: {
        id: 'u5l1-g',
        title: 'Tener: hebben',
        explanation: `**Tener** (hebben) gebruik je heel vaak. Net als *querer* krijgt het een **ie** in een paar vormen, en de ik-vorm is apart:

| | tener |
|---|---|
| yo | **tengo** |
| tú | t**ie**nes |
| él / ella / usted | t**ie**ne |
| nosotros | tenemos |
| vosotros | tenéis |
| ellos / ustedes | t**ie**nen |

Handige zinnen:

- *Tengo una reserva.* (Ik heb een reservering.)
- *¿Tiene habitaciones libres?* (Heeft u kamers vrij?)

Spanjaarden gebruiken *tener* ook waar wij "zijn" zeggen: *tengo hambre* (ik heb honger), *tengo calor* (ik heb het warm), *tengo 30 años* (ik ben 30 jaar).

Verdiepingen: **la planta baja** is de begane grond, **la primera planta** de eerste verdieping.`,
        items: items('u5l1', [
          ['Yo ___ una reserva.', 'tengo', 'Ik heb een reservering.'],
          ['¿___ usted habitaciones libres?', 'Tiene', 'Heeft u kamers vrij?'],
          ['Nosotros ___ dos maletas.', 'tenemos', 'Wij hebben twee koffers.'],
          ['¿Tú ___ el pasaporte?', 'tienes', 'Heb jij het paspoort?'],
          ['¿___ vosotros la llave?', 'Tenéis', 'Hebben jullie de sleutel?'],
          ['Yo ___ hambre.', 'tengo', 'Ik heb honger.'],
        ]),
      },
      dialogue: {
        id: 'u5l1-d',
        title: 'Bij de receptie',
        turns: [
          { speaker: 'Recepcionista', es: 'Buenas tardes. ¿En qué puedo ayudarle?', nl: 'Goedemiddag. Waarmee kan ik u helpen?' },
          { speaker: 'Tú', es: 'Hola. ___ una reserva.', nl: 'Hallo. Ik heb een reservering.', gap: { answer: 'Tengo' } },
          { speaker: 'Recepcionista', es: '¿A nombre de quién?', nl: 'Op welke naam?' },
          { speaker: 'Tú', es: 'A nombre de De Vries.', nl: 'Op naam van De Vries.' },
          { speaker: 'Recepcionista', es: 'Sí, una habitación doble para tres noches. ¿Me da su pasaporte?', nl: 'Ja, een tweepersoonskamer voor drie nachten. Mag ik uw paspoort?' },
          { speaker: 'Tú', es: 'Sí, aquí tiene mi ___.', nl: 'Ja, hier is mijn paspoort.', gap: { answer: 'pasaporte' } },
          { speaker: 'Recepcionista', es: 'Gracias. Es la habitación 204, en la segunda planta. Aquí tiene la llave.', nl: 'Dank u. Het is kamer 204, op de tweede verdieping. Hier is de sleutel.' },
          { speaker: 'Tú', es: '¿Dónde está el ___?', nl: 'Waar is de lift?', gap: { answer: 'ascensor' } },
        ],
      },
    },
    {
      id: 'u5l2',
      title: 'No funciona',
      intro: 'Om iets vragen en een probleem melden.',
      words: words('u5l2', [
        ['necesito', 'ik heb nodig', { altNl: ['ik heb … nodig'] }],
        ['la toalla', 'de handdoek', { gender: 'f' }],
        ['la almohada', 'het kussen', { gender: 'f', altNl: ['het hoofdkussen'] }],
        ['el aire acondicionado', 'de airco', { gender: 'm', altNl: ['de airconditioning'] }],
        ['el wifi', 'de wifi', { gender: 'm', altEs: ['la wifi'] }],
        ['la contraseña', 'het wachtwoord', { gender: 'f' }],
        ['no funciona', 'het doet het niet', { altNl: ['het werkt niet', 'doet het niet', 'werkt niet'] }],
        ['el ruido', 'het lawaai', { gender: 'm', altNl: ['de herrie', 'het geluid'] }],
        ['otra', 'nog een', { altEs: ['otro'], altNl: ['een andere', 'nog één'] }],
      ]),
      sentences: sentences('u5l2', [
        ['Necesito otra toalla.', 'Ik heb nog een handdoek nodig.'],
        ['El aire acondicionado no funciona.', 'De airco doet het niet.'],
        ['¿Cuál es la contraseña del wifi?', 'Wat is het wachtwoord van de wifi?'],
        ['Hay mucho ruido.', 'Er is veel lawaai.'],
      ]),
      grammar: {
        id: 'u5l2-g',
        title: 'Vraagwoorden',
        explanation: `Met deze woorden kun je bijna alles vragen. Ze hebben **altijd een accent**:

| | | |
|---|---|---|
| **¿qué?** | wat? welk? | *¿Qué es esto?* |
| **¿dónde?** | waar? | *¿Dónde está el baño?* |
| **¿cuándo?** | wanneer? | *¿Cuándo sale el tren?* |
| **¿cuánto?** | hoeveel? | *¿Cuánto cuesta?* |
| **¿cómo?** | hoe? | *¿Cómo se dice…?* |
| **¿cuál?** | welke? wat? | *¿Cuál es la contraseña?* |
| **¿quién?** | wie? | *¿Quién es?* |
| **¿por qué?** | waarom? | *¿Por qué no funciona?* |

"Wat is…" met een naam of nummer is vaak **¿cuál es…?** en niet *qué*: *¿Cuál es la contraseña?*, *¿Cuál es tu número?*

Supertip als je een woord niet weet: **¿Cómo se dice … en español?** (Hoe zeg je … in het Spaans?)`,
        items: items('u5l2', [
          ['¿___ cuesta la habitación?', 'Cuánto', 'Hoeveel kost de kamer?'],
          ['¿___ es la contraseña?', 'Cuál', 'Wat is het wachtwoord?'],
          ['¿A ___ hora es el desayuno?', 'qué', 'Hoe laat is het ontbijt?'],
          ['¿___ está el ascensor?', 'Dónde', 'Waar is de lift?'],
          ['¿___ se dice "handdoek" en español?', 'Cómo', 'Hoe zeg je "handdoek" in het Spaans?'],
          ['¿___ llega el autobús?', 'Cuándo', 'Wanneer komt de bus?'],
        ]),
      },
      dialogue: {
        id: 'u5l2-d',
        title: 'De receptie bellen',
        turns: [
          { speaker: 'Recepcionista', es: 'Recepción, ¿dígame?', nl: 'Receptie, zegt u het maar?' },
          { speaker: 'Tú', es: 'Hola, es la habitación 204. El aire acondicionado no ___.', nl: 'Hallo, met kamer 204. De airco doet het niet.', gap: { answer: 'funciona' } },
          { speaker: 'Recepcionista', es: 'Lo siento. Ahora mismo sube un técnico.', nl: 'Het spijt me. Er komt zo een monteur naar boven.' },
          { speaker: 'Tú', es: 'Gracias. Y ___ otra toalla, por favor.', nl: 'Dank u. En ik heb nog een handdoek nodig, alstublieft.', gap: { answer: 'necesito' } },
          { speaker: 'Recepcionista', es: 'Claro, ahora se la llevamos.', nl: 'Natuurlijk, we brengen hem zo.' },
          { speaker: 'Tú', es: '¿Y cuál es la ___ del wifi?', nl: 'En wat is het wachtwoord van de wifi?', gap: { answer: 'contraseña' } },
          { speaker: 'Recepcionista', es: 'Es «playa123», todo junto.', nl: 'Het is "playa123", aan elkaar.' },
        ],
      },
    },
    {
      id: 'u5l3',
      title: 'Desayuno y salida',
      intro: 'Ontbijt, uitchecken en een taxi regelen.',
      words: words('u5l3', [
        ['el desayuno', 'het ontbijt', { gender: 'm' }],
        ['incluido', 'inbegrepen', { altNl: ['inclusief'] }],
        ['la salida', 'het vertrek', { gender: 'f', altNl: ['de uitgang', 'het uitchecken'] }],
        ['dejar', 'achterlaten', { altNl: ['laten', 'neerzetten'] }],
        ['la maleta', 'de koffer', { gender: 'f' }],
        ['la recepción', 'de receptie', { gender: 'f' }],
        ['temprano', 'vroeg'],
        ['tarde', 'laat'],
        ['el taxi', 'de taxi', { gender: 'm' }],
        ['el aeropuerto', 'het vliegveld', { gender: 'm', altNl: ['de luchthaven'] }],
      ]),
      sentences: sentences('u5l3', [
        ['¿El desayuno está incluido?', 'Is het ontbijt inbegrepen?'],
        ['¿A qué hora es la salida?', 'Hoe laat moeten we uitchecken?'],
        ['¿Puedo dejar la maleta aquí?', 'Mag ik de koffer hier laten staan?'],
        ['¿Me puede pedir un taxi?', 'Kunt u een taxi voor me bellen?'],
      ]),
      grammar: {
        id: 'u5l3-g',
        title: 'Poder: kunnen, mogen',
        explanation: `**Poder** betekent "kunnen" of "mogen". Er komt altijd een heel werkwoord achter, net als in het Nederlands. Ook hier wordt de klinker anders: **o → ue**.

| | poder |
|---|---|
| yo | p**ue**do |
| tú | p**ue**des |
| él / ella / usted | p**ue**de |
| nosotros | podemos |
| vosotros | podéis |
| ellos / ustedes | p**ue**den |

Zo vraag je beleefd om iets:

- ¿**Puedo** pagar con tarjeta? (Kan ik met de kaart betalen?)
- ¿Me **puede** ayudar? (Kunt u me helpen?)
- ¿**Podemos** dejar las maletas aquí? (Mogen we de koffers hier laten?)`,
        items: items('u5l3', [
          ['¿___ pagar con tarjeta?', 'Puedo', 'Kan ik met de kaart betalen?'],
          ['¿Me ___ ayudar?', 'puede', 'Kunt u me helpen?'],
          ['¿___ dejar las maletas aquí?', 'Podemos', 'Mogen wij de koffers hier laten?'],
          ['Tú ___ ir en metro.', 'puedes', 'Jij kunt met de metro gaan.'],
          ['Ellos no ___ venir.', 'pueden', 'Zij kunnen niet komen.'],
        ]),
      },
      dialogue: {
        id: 'u5l3-d',
        title: 'Uitchecken',
        turns: [
          { speaker: 'Tú', es: 'Buenos días. Aquí tiene la llave de la 204.', nl: 'Goedemorgen. Hier is de sleutel van 204.' },
          { speaker: 'Recepcionista', es: 'Gracias. ¿Todo bien?', nl: 'Dank u. Was alles goed?' },
          { speaker: 'Tú', es: 'Sí, muy bien. ¿___ dejar la maleta aquí hasta las cuatro?', nl: 'Ja, heel goed. Mag ik de koffer hier laten tot vier uur?', gap: { answer: 'Puedo' } },
          { speaker: 'Recepcionista', es: 'Sí, claro. No hay problema.', nl: 'Ja, natuurlijk. Geen probleem.' },
          { speaker: 'Tú', es: '¿Y me puede pedir un ___ para el aeropuerto?', nl: 'En kunt u een taxi naar het vliegveld voor me bellen?', gap: { answer: 'taxi' } },
          { speaker: 'Recepcionista', es: 'Por supuesto. ¿A qué hora?', nl: 'Natuurlijk. Hoe laat?' },
          { speaker: 'Tú', es: 'A las cuatro y ___.', nl: 'Om half vijf.', gap: { answer: 'media' } },
        ],
      },
      reading: {
        id: 'u5l3-r',
        title: 'Informatie op je kamer',
        text: `Bienvenidos al Hotel Mar Azul

Desayuno: de 7:30 a 10:30, en la planta baja.
Salida: antes de las 12:00.
Wifi: MarAzul – contraseña: verano
Piscina: abierta de 10:00 a 20:00.
Recepción abierta 24 horas.`,
        questions: [
          { q: 'Tot hoe laat is er ontbijt?', options: ['7:30', '10:30', '12:00'], correct: 1 },
          { q: 'Wanneer moet je uitchecken?', options: ['Voor 12 uur', 'Na 12 uur', 'Om 20 uur'], correct: 0 },
          { q: 'Wat is het wifi-wachtwoord?', options: ['MarAzul', 'verano', '24 horas'], correct: 1 },
        ],
      },
    },
  ],
}
