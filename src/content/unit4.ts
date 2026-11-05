import { items, sentences, words } from './helpers'
import type { Unit } from './types'

export const unit4: Unit = {
  id: 'u4',
  title: 'De weg vragen en vervoer',
  lessons: [
    {
      id: 'u4l1',
      title: '¿Dónde está…?',
      intro: 'Vragen waar iets is.',
      words: words('u4l1', [
        ['¿dónde está?', 'waar is?', { altNl: ['waar is het', 'waar ligt'] }],
        ['la calle', 'de straat', { gender: 'f' }],
        ['la plaza', 'het plein', { gender: 'f' }],
        ['la estación', 'het station', { gender: 'f' }],
        ['la playa', 'het strand', { gender: 'f' }],
        ['el museo', 'het museum', { gender: 'm' }],
        ['cerca', 'dichtbij', { altNl: ['vlakbij', 'dicht bij'] }],
        ['lejos', 'ver', { altNl: ['ver weg'] }],
        ['aquí', 'hier'],
      ]),
      sentences: sentences('u4l1', [
        ['¿Dónde está la estación?', 'Waar is het station?'],
        ['La playa está cerca.', 'Het strand is dichtbij.'],
        ['¿Está lejos el museo?', 'Is het museum ver?'],
        ['El hotel está en la plaza.', 'Het hotel is aan het plein.'],
      ]),
      grammar: {
        id: 'u4l1-g',
        title: 'Estar: zijn (waar en hoe)',
        explanation: `Spaans heeft **twee** werkwoorden voor "zijn": **ser** (die ken je al) en **estar**.

| | estar |
|---|---|
| yo | estoy |
| tú | estás |
| él / ella / usted | está |
| nosotros | estamos |
| vosotros | estáis |
| ellos / ustedes | están |

**Wanneer welke?**

| ser | estar |
|---|---|
| wie of wat iets is | **waar** iets is |
| waar je vandaan komt | **hoe** het met iets gaat (tijdelijk) |
| *Soy de Holanda.* | *Estoy en Madrid.* |
| *Es un museo.* | *El museo está cerca.* |

Vuistregel: gaat het over een **plek**, gebruik dan **estar**.`,
        items: items('u4l1', [
          ['¿Dónde ___ la playa?', 'está', 'Waar is het strand?'],
          ['Yo ___ en el hotel.', 'estoy', 'Ik ben in het hotel.'],
          ['Nosotros ___ en Madrid.', 'estamos', 'Wij zijn in Madrid.'],
          ['Yo ___ de Holanda.', 'soy', 'Ik kom uit Nederland. (ser of estar?)'],
          ['La estación ___ cerca.', 'está', 'Het station is dichtbij.'],
          ['¿Dónde ___ vosotros?', 'estáis', 'Waar zijn jullie?'],
        ]),
      },
      dialogue: {
        id: 'u4l1-d',
        title: 'Op straat',
        turns: [
          { speaker: 'Tú', es: 'Perdone, ¿dónde ___ la playa?', nl: 'Pardon, waar is het strand?', gap: { answer: 'está' } },
          { speaker: 'Señor', es: 'La playa está cerca. A cinco minutos.', nl: 'Het strand is dichtbij. Op vijf minuten.' },
          { speaker: 'Tú', es: '¿Y el museo? ¿Está ___?', nl: 'En het museum? Is het ver?', gap: { answer: 'lejos' } },
          { speaker: 'Señor', es: 'No, el museo está en la plaza Mayor.', nl: 'Nee, het museum is aan de Plaza Mayor.' },
          { speaker: 'Tú', es: 'Muchas ___.', nl: 'Hartelijk dank.', gap: { answer: 'gracias' } },
          { speaker: 'Señor', es: 'De nada.', nl: 'Graag gedaan.' },
        ],
      },
    },
    {
      id: 'u4l2',
      title: 'Links, rechts, rechtdoor',
      intro: 'Een routebeschrijving begrijpen.',
      words: words('u4l2', [
        ['a la derecha', 'rechts', { altNl: ['naar rechts', 'aan de rechterkant'] }],
        ['a la izquierda', 'links', { altNl: ['naar links', 'aan de linkerkant'] }],
        ['todo recto', 'rechtdoor'],
        ['la esquina', 'de hoek', { gender: 'f' }],
        ['el semáforo', 'het stoplicht', { gender: 'm', altNl: ['het verkeerslicht'] }],
        ['al lado de', 'naast'],
        ['enfrente de', 'tegenover'],
        ['la iglesia', 'de kerk', { gender: 'f' }],
        ['el supermercado', 'de supermarkt', { gender: 'm' }],
      ]),
      sentences: sentences('u4l2', [
        ['Siga todo recto.', 'Ga rechtdoor.'],
        ['Gire a la izquierda.', 'Sla linksaf.', ['Gira a la izquierda.']],
        ['El supermercado está al lado del hotel.', 'De supermarkt is naast het hotel.'],
        ['La iglesia está enfrente de la plaza.', 'De kerk is tegenover het plein.'],
      ]),
      grammar: {
        id: 'u4l2-g',
        title: 'Hay, del en al',
        explanation: `**Hay** betekent "er is" of "er zijn". Het verandert nooit:

- ¿**Hay** un supermercado por aquí? (Is er hier een supermarkt?)
- **Hay** dos hoteles en la plaza. (Er zijn twee hotels aan het plein.)

Twee samentrekkingen die verplicht zijn:

| | | |
|---|---|---|
| **de + el** | = **del** | al lado **del** hotel (naast het hotel) |
| **a + el** | = **al** | Vamos **al** museo. (We gaan naar het museum.) |

Met *la* trek je niets samen: al lado **de la** iglesia, vamos **a la** playa.

Routebeschrijvingen hoor je vaak in de beleefde vorm: **siga** (ga door), **gire** (sla af), **cruce** (steek over).`,
        items: items('u4l2', [
          ['¿___ un supermercado por aquí?', 'Hay', 'Is er hier een supermarkt?'],
          ['___ dos hoteles en la plaza.', 'Hay', 'Er zijn twee hotels aan het plein.'],
          ['Está al lado ___ museo.', 'del', 'Het is naast het museum. (de + el)'],
          ['Gire ___ la derecha.', 'a', 'Sla rechtsaf.'],
          ['Vamos ___ museo.', 'al', 'We gaan naar het museum. (a + el)'],
        ]),
      },
      dialogue: {
        id: 'u4l2-d',
        title: 'Op zoek naar de supermarkt',
        turns: [
          { speaker: 'Tú', es: 'Perdone, ¿___ un supermercado por aquí?', nl: 'Pardon, is er hier een supermarkt?', gap: { answer: 'hay' } },
          { speaker: 'Señora', es: 'Sí, siga todo recto y gire a la derecha en el semáforo.', nl: 'Ja, ga rechtdoor en sla bij het stoplicht rechtsaf.' },
          { speaker: 'Tú', es: '¿Todo ___ y a la derecha?', nl: 'Rechtdoor en dan rechts?', gap: { answer: 'recto' } },
          { speaker: 'Señora', es: 'Eso es. El supermercado está enfrente de la iglesia.', nl: 'Precies. De supermarkt is tegenover de kerk.' },
          { speaker: 'Tú', es: 'Vale, muchas ___.', nl: 'Oké, hartelijk dank.', gap: { answer: 'gracias' } },
        ],
      },
      reading: {
        id: 'u4l2-r',
        title: 'Een berichtje van Marta',
        text: `¡Hola! Para llegar a mi casa: sal de la estación y gira a la izquierda. Sigue todo recto hasta la plaza. Mi casa está al lado de la farmacia, enfrente del bar Sol.

¡Hasta luego!
Marta`,
        questions: [
          { q: 'Welke kant ga je op als je uit het station komt?', options: ['Links', 'Rechts', 'Terug'], correct: 0 },
          { q: 'Waar staat het huis van Marta?', options: ['Naast de apotheek', 'Naast het station', 'In de bar'], correct: 0 },
          { q: 'Wat ligt er tegenover het huis?', options: ['Het station', 'Bar Sol', 'De kerk'], correct: 1 },
        ],
      },
    },
    {
      id: 'u4l3',
      title: 'Tren y autobús',
      intro: 'Kaartjes kopen en de trein of bus nemen.',
      words: words('u4l3', [
        ['el tren', 'de trein', { gender: 'm' }],
        ['el autobús', 'de bus', { gender: 'm' }],
        ['el metro', 'de metro', { gender: 'm' }],
        ['el billete', 'het kaartje', { gender: 'm', altNl: ['het ticket', 'het kaartje'] }],
        ['de ida y vuelta', 'retour', { altNl: ['heen en terug'] }],
        ['de ida', 'enkele reis', { altNl: ['enkel', 'alleen heen'] }],
        ['el andén', 'het perron', { gender: 'm' }],
        ['la parada', 'de halte', { gender: 'f' }],
        ['salir', 'vertrekken', { altNl: ['weggaan', 'uitgaan'] }],
        ['llegar', 'aankomen'],
      ]),
      sentences: sentences('u4l3', [
        ['Un billete de ida y vuelta a Toledo, por favor.', 'Een retourtje Toledo, alsjeblieft.'],
        ['¿A qué hora sale el tren?', 'Hoe laat vertrekt de trein?'],
        ['¿Dónde está la parada del autobús?', 'Waar is de bushalte?'],
        ['El tren llega a las tres.', 'De trein komt om drie uur aan.'],
      ]),
      grammar: {
        id: 'u4l3-g',
        title: 'Ir: gaan',
        explanation: `**Ir** (gaan) is heel onregelmatig, maar je hebt het steeds nodig:

| | ir |
|---|---|
| yo | voy |
| tú | vas |
| él / ella / usted | va |
| nosotros | vamos |
| vosotros | vais |
| ellos / ustedes | van |

Waar je naartoe gaat zeg je met **a** (naar): *Voy **a** Toledo.* Met *el* wordt dat **al**: *Vamos **al** museo.*

Hoe je reist zeg je met **en**: *Voy **en** tren*, *en autobús*, *en metro*. Maar lopend is **a pie**.

**¿Adónde vas?** = Waar ga je naartoe?`,
        items: items('u4l3', [
          ['Yo ___ a Toledo.', 'voy', 'Ik ga naar Toledo.'],
          ['¿Adónde ___ tú?', 'vas', 'Waar ga jij naartoe?'],
          ['El tren ___ a Madrid.', 'va', 'De trein gaat naar Madrid.'],
          ['Nosotros ___ a la playa.', 'vamos', 'Wij gaan naar het strand.'],
          ['¿___ vosotros en metro?', 'Vais', 'Gaan jullie met de metro?'],
          ['Ellos ___ en autobús.', 'van', 'Zij gaan met de bus.'],
        ]),
      },
      dialogue: {
        id: 'u4l3-d',
        title: 'Aan het loket',
        turns: [
          { speaker: 'Tú', es: 'Hola. Un ___ para Toledo, por favor.', nl: 'Hallo. Een kaartje naar Toledo, alsjeblieft.', gap: { answer: 'billete' } },
          { speaker: 'Taquillera', es: '¿De ida o de ida y vuelta?', nl: 'Enkele reis of retour?' },
          { speaker: 'Tú', es: 'De ida y ___.', nl: 'Retour.', gap: { answer: 'vuelta' } },
          { speaker: 'Taquillera', es: 'Son veinte euros.', nl: 'Dat is twintig euro.' },
          { speaker: 'Tú', es: '¿A qué hora ___ el tren?', nl: 'Hoe laat vertrekt de trein?', gap: { answer: 'sale' } },
          { speaker: 'Taquillera', es: 'Sale a las diez y cuarto, del andén tres.', nl: 'Hij vertrekt om kwart over tien, van perron drie.' },
        ],
      },
      reading: {
        id: 'u4l3-r',
        title: 'Het vertrekbord',
        text: `SALIDAS

10:15  Tren – Toledo – Andén 3
10:40  Tren – Segovia – Andén 5 – Retraso 15 min
11:00  Autobús – Aeropuerto – Parada B`,
        questions: [
          { q: 'Van welk perron vertrekt de trein naar Toledo?', options: ['3', '5', 'B'], correct: 0 },
          { q: 'Welke trein heeft vertraging?', options: ['Naar Toledo', 'Naar Segovia', 'Naar het vliegveld'], correct: 1 },
          { q: 'Hoe kom je naar het vliegveld?', options: ['Met de trein', 'Met de bus', 'Met de metro'], correct: 1 },
        ],
      },
    },
  ],
}
