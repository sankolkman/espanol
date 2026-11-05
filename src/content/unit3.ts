import { items, sentences, words } from './helpers'
import type { Unit } from './types'

export const unit3: Unit = {
  id: 'u3',
  title: 'Eten en drinken',
  lessons: [
    {
      id: 'u3l1',
      title: 'En el bar',
      intro: 'Drankjes bestellen in een Spaanse bar.',
      words: words('u3l1', [
        ['el café', 'de koffie', { gender: 'm' }],
        ['el café con leche', 'de koffie met melk', { gender: 'm', altNl: ['koffie verkeerd', 'de koffie verkeerd'] }],
        ['el té', 'de thee', { gender: 'm' }],
        ['el agua', 'het water', { gender: 'f' }],
        ['la cerveza', 'het bier', { gender: 'f', altNl: ['het biertje'] }],
        ['la caña', 'het tapbiertje', { gender: 'f', altNl: ['het kleine biertje', 'het glas bier'] }],
        ['el vino tinto', 'de rode wijn', { gender: 'm' }],
        ['el zumo de naranja', 'het sinaasappelsap', { gender: 'm', altNl: ['de jus d’orange', 'jus d’orange'] }],
      ]),
      sentences: sentences('u3l1', [
        ['Un café con leche, por favor.', 'Een koffie met melk, alsjeblieft.'],
        ['Una caña, por favor.', 'Een biertje van de tap, alsjeblieft.'],
        ['Para mí, un zumo de naranja.', 'Voor mij een sinaasappelsap.'],
        ['Dos aguas, por favor.', 'Twee water, alsjeblieft.'],
      ]),
      grammar: {
        id: 'u3l1-g',
        title: 'Beleefd bestellen',
        explanation: `Er zijn een paar handige manieren om iets te bestellen:

| Spaans | Betekenis |
|---|---|
| **Quisiera** un café. | Ik zou graag een koffie willen. (heel beleefd) |
| **¿Me pone** un café? | Mag ik een koffie? (letterlijk: zet u een koffie voor me neer?) |
| **Para mí**, un café. | Voor mij een koffie. |
| Un café, **por favor**. | Een koffie, alsjeblieft. |

In Spanje is *¿Me pone…?* heel normaal aan de bar. Het klinkt niet onbeleefd.

**con** = met, **sin** = zonder: *un café **con** leche*, *agua **sin** gas*.

Een **caña** is een klein glas bier van de tap, de standaard in Spaanse bars.`,
        items: items('u3l1', [
          ['___ un café, por favor.', 'Quisiera', 'Ik zou graag een koffie willen.'],
          ['¿Me ___ una caña?', 'pone', 'Mag ik een biertje?'],
          ['Para ___, un té.', 'mí', 'Voor mij een thee.'],
          ['Un café ___ leche.', 'con', 'Een koffie met melk.'],
        ]),
      },
      dialogue: {
        id: 'u3l1-d',
        title: 'Aan de bar',
        turns: [
          { speaker: 'Camarero', es: 'Hola, buenos días. ¿Qué os pongo?', nl: 'Hallo, goedemorgen. Wat mag het voor jullie zijn?' },
          { speaker: 'Tú', es: 'Para mí, un café ___ leche.', nl: 'Voor mij een koffie met melk.', gap: { answer: 'con' } },
          { speaker: 'Camarero', es: '¿Y para ella?', nl: 'En voor haar?' },
          { speaker: 'Tú', es: 'Un ___ de naranja, por favor.', nl: 'Een sinaasappelsap, alsjeblieft.', gap: { answer: 'zumo' } },
          { speaker: 'Camarero', es: 'Muy bien. ¿Algo más?', nl: 'Prima. Nog iets?' },
          { speaker: 'Tú', es: 'No, ___.', nl: 'Nee, dank je.', gap: { answer: 'gracias' } },
        ],
      },
    },
    {
      id: 'u3l2',
      title: 'Tapas',
      intro: 'Tapas bestellen en zeggen wat je lekker vindt.',
      words: words('u3l2', [
        ['la tapa', 'het hapje', { gender: 'f', altNl: ['de tapa'] }],
        ['el pan', 'het brood', { gender: 'm' }],
        ['el queso', 'de kaas', { gender: 'm' }],
        ['el jamón', 'de ham', { gender: 'm' }],
        ['las aceitunas', 'de olijven', { gender: 'f' }],
        ['la tortilla', 'de Spaanse omelet', { gender: 'f', altNl: ['de tortilla', 'de omelet'] }],
        ['las patatas bravas', 'gebakken aardappels met pikante saus', { gender: 'f', altNl: ['patatas bravas'] }],
        ['las gambas', 'de garnalen', { gender: 'f' }],
        ['la ración', 'de portie', { gender: 'f' }],
      ]),
      sentences: sentences('u3l2', [
        ['Una ración de jamón, por favor.', 'Een portie ham, alsjeblieft.'],
        ['¿Tienen aceitunas?', 'Hebben jullie olijven?'],
        ['Me gusta el queso.', 'Ik vind kaas lekker.'],
        ['No me gustan las gambas.', 'Ik houd niet van garnalen.'],
      ]),
      grammar: {
        id: 'u3l2-g',
        title: 'Me gusta: iets lekker vinden',
        explanation: `"Ik vind kaas lekker" zeg je in het Spaans als "kaas bevalt mij": **me gusta el queso**.

Omdat het ding zelf het onderwerp is, verandert *gusta* mee met het ding:

| | |
|---|---|
| Me **gusta** el queso. | Ik vind kaas lekker. (één ding) |
| Me **gustan** las gambas. | Ik vind garnalen lekker. (meer dingen) |
| **No** me gusta el vino. | Ik houd niet van wijn. |

Voor andere personen verandert het woordje vooraan:

| | |
|---|---|
| **me** gusta | ik vind lekker |
| **te** gusta | jij vindt lekker |
| **le** gusta | hij / zij / u vindt lekker |
| **nos** gusta | wij vinden lekker |
| **os** gusta | jullie vinden lekker |

Een **ración** is een grote portie om te delen, een **tapa** is een klein hapje.`,
        items: items('u3l2', [
          ['Me ___ el queso.', 'gusta', 'Ik vind kaas lekker.'],
          ['Me ___ las aceitunas.', 'gustan', 'Ik vind olijven lekker.'],
          ['No me ___ las gambas.', 'gustan', 'Ik houd niet van garnalen.'],
          ['¿Te ___ el jamón?', 'gusta', 'Vind jij ham lekker?'],
          ['___ gusta la tortilla.', 'Me', 'Ik vind tortilla lekker.'],
        ]),
      },
      dialogue: {
        id: 'u3l2-d',
        title: 'Tapas met vrienden',
        turns: [
          { speaker: 'Camarero', es: '¿Qué vais a tomar?', nl: 'Wat nemen jullie?' },
          { speaker: 'Tú', es: 'Una ración de ___, por favor.', nl: 'Een portie ham, alsjeblieft.', gap: { answer: 'jamón' } },
          { speaker: 'Camarero', es: '¿Algo más?', nl: 'Nog iets?' },
          { speaker: 'Tú', es: 'Sí, unas patatas ___.', nl: 'Ja, een portie patatas bravas.', gap: { answer: 'bravas' } },
          { speaker: 'Camarero', es: '¿Os gustan las aceitunas? Son de la casa.', nl: 'Houden jullie van olijven? Die zijn van het huis.' },
          { speaker: 'Tú', es: 'Sí, nos ___ mucho.', nl: 'Ja, die vinden we heel lekker.', gap: { answer: 'gustan' } },
        ],
      },
    },
    {
      id: 'u3l3',
      title: 'En el restaurante',
      intro: 'Een tafel vragen en het dagmenu bestellen.',
      words: words('u3l3', [
        ['la mesa', 'de tafel', { gender: 'f' }],
        ['la carta', 'de menukaart', { gender: 'f', altNl: ['de kaart', 'het menu'] }],
        ['el menú del día', 'het dagmenu', { gender: 'm' }],
        ['de primero', 'als voorgerecht', { altNl: ['als eerste gang', 'voorgerecht'] }],
        ['de segundo', 'als hoofdgerecht', { altNl: ['als tweede gang', 'hoofdgerecht'] }],
        ['el postre', 'het toetje', { gender: 'm', altNl: ['het dessert', 'het nagerecht'] }],
        ['la carne', 'het vlees', { gender: 'f' }],
        ['el pescado', 'de vis', { gender: 'm' }],
        ['la ensalada', 'de salade', { gender: 'f' }],
      ]),
      sentences: sentences('u3l3', [
        ['Una mesa para dos, por favor.', 'Een tafel voor twee, alsjeblieft.'],
        ['¿Nos trae la carta, por favor?', 'Kunt u ons de menukaart brengen?'],
        ['De primero, una ensalada.', 'Als voorgerecht een salade.'],
        ['De segundo, pescado.', 'Als hoofdgerecht vis.'],
      ]),
      grammar: {
        id: 'u3l3-g',
        title: 'Werkwoorden op -ar',
        explanation: `De meeste Spaanse werkwoorden eindigen op **-ar**, zoals **tomar** (nemen, drinken, eten) en **hablar** (spreken). Je haalt *-ar* eraf en plakt er een uitgang aan:

| | tomar | hablar |
|---|---|---|
| yo | tom**o** | habl**o** |
| tú | tom**as** | habl**as** |
| él / ella / usted | tom**a** | habl**a** |
| nosotros | tom**amos** | habl**amos** |
| vosotros | tom**áis** | habl**áis** |
| ellos / ustedes | tom**an** | habl**an** |

Andere -ar-werkwoorden die je kunt gebruiken: **pagar** (betalen), **cenar** (avondeten), **visitar** (bezoeken), **necesitar** (nodig hebben).

Handige zin: *Hablo un poco de español.* (Ik spreek een beetje Spaans.)`,
        items: items('u3l3', [
          ['Yo ___ un café.', 'tomo', 'Ik neem een koffie. (tomar)'],
          ['¿Qué ___ tú?', 'tomas', 'Wat neem jij? (tomar)'],
          ['Nosotros ___ pescado.', 'tomamos', 'Wij nemen vis. (tomar)'],
          ['Yo ___ un poco de español.', 'hablo', 'Ik spreek een beetje Spaans. (hablar)'],
          ['¿Vosotros ___ inglés?', 'habláis', 'Spreken jullie Engels? (hablar)'],
          ['Ellos ___ vino tinto.', 'toman', 'Zij drinken rode wijn. (tomar)'],
        ]),
      },
      dialogue: {
        id: 'u3l3-d',
        title: 'Uit eten',
        turns: [
          { speaker: 'Camarero', es: 'Buenas noches. ¿Cuántos sois?', nl: 'Goedenavond. Met hoeveel zijn jullie?' },
          { speaker: 'Tú', es: 'Somos dos. Una ___ para dos, por favor.', nl: 'We zijn met z’n tweeën. Een tafel voor twee, alsjeblieft.', gap: { answer: 'mesa' } },
          { speaker: 'Camarero', es: 'Aquí tenéis la carta. Hoy hay menú del día.', nl: 'Hier is de menukaart. Vandaag is er een dagmenu.' },
          { speaker: 'Tú', es: 'Vale. De primero, una ___.', nl: 'Oké. Als voorgerecht een salade.', gap: { answer: 'ensalada' } },
          { speaker: 'Camarero', es: '¿Y de segundo? ¿Carne o pescado?', nl: 'En als hoofdgerecht? Vlees of vis?' },
          { speaker: 'Tú', es: '___, por favor.', nl: 'Vis, alsjeblieft.', gap: { answer: 'Pescado', alt: ['Carne'] } },
          { speaker: 'Camarero', es: '¿Y de postre?', nl: 'En als toetje?' },
          { speaker: 'Tú', es: 'Un flan, por favor.', nl: 'Een flan (karamelpudding), alsjeblieft.' },
        ],
      },
      reading: {
        id: 'u3l3-r',
        title: 'Menú del día',
        text: `MENÚ DEL DÍA – 14 €

Primer plato:
- Ensalada mixta
- Sopa de pescado

Segundo plato:
- Pollo asado con patatas
- Merluza a la plancha

Postre:
- Flan o fruta

Pan, bebida y postre incluidos.`,
        questions: [
          { q: 'Hoeveel kost het dagmenu?', options: ['4 euro', '14 euro', '40 euro'], correct: 1 },
          { q: 'Wat zit er bij de prijs inbegrepen?', options: ['Alleen het hoofdgerecht', 'Brood, drinken en toetje', 'Koffie'], correct: 1 },
          { q: 'Welk hoofdgerecht is vis?', options: ['Pollo asado', 'Merluza a la plancha', 'Flan'], correct: 1 },
        ],
      },
    },
    {
      id: 'u3l4',
      title: '¡Qué rico!',
      intro: 'Maaltijden, warm en koud, en het toilet vinden.',
      words: words('u3l4', [
        ['la comida', 'de lunch', { gender: 'f', altNl: ['het middageten', 'het eten'] }],
        ['la cena', 'het avondeten', { gender: 'f', altNl: ['het diner'] }],
        ['el vaso', 'het glas', { gender: 'm' }],
        ['rico', 'lekker', { altEs: ['rica'] }],
        ['caliente', 'warm', { altNl: ['heet'] }],
        ['frío', 'koud', { altEs: ['fría'] }],
        ['sin gas', 'zonder prik', { altNl: ['zonder koolzuur', 'plat'] }],
        ['con hielo', 'met ijs', { altNl: ['met ijsblokjes'] }],
        ['el baño', 'het toilet', { gender: 'm', altNl: ['de wc', 'het toilet'] }],
        ['la propina', 'de fooi', { gender: 'f' }],
      ]),
      sentences: sentences('u3l4', [
        ['¿Dónde está el baño?', 'Waar is het toilet?'],
        ['Un agua sin gas, por favor.', 'Een water zonder prik, alsjeblieft.'],
        ['¡Está muy rico!', 'Het is erg lekker!'],
        ['La cena es a las nueve.', 'Het avondeten is om negen uur.'],
      ]),
      grammar: {
        id: 'u3l4-g',
        title: 'Querer: willen',
        explanation: `**Querer** (willen) is een veelgebruikt werkwoord. Het is een beetje onregelmatig: in vier vormen wordt de **e** een **ie**.

| | querer |
|---|---|
| yo | qu**ie**ro |
| tú | qu**ie**res |
| él / ella / usted | qu**ie**re |
| nosotros | queremos |
| vosotros | queréis |
| ellos / ustedes | qu**ie**ren |

*Quiero un café* (ik wil een koffie) is prima in een bar. Wil je extra beleefd zijn, zeg dan *quisiera* (ik zou graag willen).

Na *querer* kan ook een heel werkwoord komen: *Queremos cenar a las nueve.* (We willen om negen uur eten.)`,
        items: items('u3l4', [
          ['Yo ___ un café.', 'quiero', 'Ik wil een koffie.'],
          ['¿Qué ___ tú?', 'quieres', 'Wat wil jij?'],
          ['Ella ___ agua sin gas.', 'quiere', 'Zij wil water zonder prik.'],
          ['Nosotros ___ la cuenta.', 'queremos', 'Wij willen de rekening.'],
          ['¿___ postre vosotros?', 'Queréis', 'Willen jullie een toetje?'],
          ['Ellos ___ cenar a las nueve.', 'quieren', 'Zij willen om negen uur eten.'],
        ]),
      },
      dialogue: {
        id: 'u3l4-d',
        title: 'Aan het eind van de maaltijd',
        turns: [
          { speaker: 'Tú', es: 'Perdón, ¿dónde está el ___?', nl: 'Pardon, waar is het toilet?', gap: { answer: 'baño' } },
          { speaker: 'Camarero', es: 'Al fondo, a la derecha.', nl: 'Achterin, rechts.' },
          { speaker: 'Tú', es: 'Gracias. Y la ___, por favor.', nl: 'Dank je. En de rekening, alsjeblieft.', gap: { answer: 'cuenta' } },
          { speaker: 'Camarero', es: 'Ahora mismo. ¿Todo bien?', nl: 'Komt eraan. Was alles goed?' },
          { speaker: 'Tú', es: 'Sí, ¡muy ___!', nl: 'Ja, heel lekker!', gap: { answer: 'rico', alt: ['rica', 'bien'] } },
        ],
      },
      reading: {
        id: 'u3l4-r',
        title: 'Het krijtbord van de bar',
        text: `BAR LA ESQUINA

Desayunos de 8:00 a 12:00
Café con leche + tostada: 2,50 €
Zumo de naranja natural: 3 €

¡Hoy: tortilla de patatas!
Terraza abierta hasta las 23:00`,
        questions: [
          { q: 'Tot hoe laat kun je hier ontbijten?', options: ['Tot 8 uur', 'Tot 12 uur', 'Tot 23 uur'], correct: 1 },
          { q: 'Wat kost koffie met melk en een geroosterde boterham?', options: ['2,50 euro', '3 euro', '12 euro'], correct: 0 },
          { q: 'Wat is er vandaag speciaal?', options: ['Sinaasappelsap', 'Tortilla de patatas', 'Vis'], correct: 1 },
        ],
      },
    },
  ],
}
