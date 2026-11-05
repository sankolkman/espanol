import { items, sentences, words } from './helpers'
import type { Unit } from './types'

export const unit2: Unit = {
  id: 'u2',
  title: 'Getallen, tijd en betalen',
  lessons: [
    {
      id: 'u2l1',
      title: 'Uno, dos, tres',
      intro: 'Tellen van 1 tot 10 en een tafel vragen.',
      words: words('u2l1', [
        ['uno', 'één', { altNl: ['een', '1'] }],
        ['dos', 'twee', { altNl: ['2'] }],
        ['tres', 'drie', { altNl: ['3'] }],
        ['cuatro', 'vier', { altNl: ['4'] }],
        ['cinco', 'vijf', { altNl: ['5'] }],
        ['seis', 'zes', { altNl: ['6'] }],
        ['siete', 'zeven', { altNl: ['7'] }],
        ['ocho', 'acht', { altNl: ['8'] }],
        ['nueve', 'negen', { altNl: ['9'] }],
        ['diez', 'tien', { altNl: ['10'] }],
      ]),
      sentences: sentences('u2l1', [
        ['Una mesa para cuatro, por favor.', 'Een tafel voor vier, alsjeblieft.'],
        ['Somos cinco.', 'We zijn met z’n vijven.'],
        ['Una cerveza y dos cafés.', 'Eén bier en twee koffie.'],
      ]),
      grammar: {
        id: 'u2l1-g',
        title: 'Lidwoorden: el, la, un, una',
        explanation: `Elk Spaans zelfstandig naamwoord is **mannelijk** of **vrouwelijk**. Dat zie je aan het lidwoord:

| | de / het | een |
|---|---|---|
| mannelijk | **el** café | **un** café |
| vrouwelijk | **la** mesa | **una** mesa |

Handige vuistregel: woorden op **-o** zijn meestal mannelijk (*el vino*), woorden op **-a** meestal vrouwelijk (*la cerveza*). Er zijn uitzonderingen, dus leer het lidwoord altijd mee.

Let op: **uno** wordt **un** vóór een mannelijk woord (*un café*) en **una** vóór een vrouwelijk woord (*una cerveza*).

Uitzondering die je vaak hoort: **el agua** (het water). Agua is vrouwelijk, maar krijgt *el* omdat het met een beklemtoonde a begint.`,
        items: items('u2l1', [
          ['___ café', 'el', 'de koffie'],
          ['___ mesa', 'la', 'de tafel'],
          ['___ cerveza, por favor.', 'una', 'Een biertje, alsjeblieft.'],
          ['___ vino, por favor.', 'un', 'Een wijn, alsjeblieft.'],
          ['___ agua', 'el', 'het water (let op!)'],
        ]),
      },
      dialogue: {
        id: 'u2l1-d',
        title: 'Een tafel op het terras',
        turns: [
          { speaker: 'Camarero', es: 'Hola, ¿cuántos sois?', nl: 'Hallo, met hoeveel zijn jullie?' },
          { speaker: 'Tú', es: 'Somos ___.', nl: 'We zijn met z’n tweeën.', gap: { answer: 'dos' } },
          { speaker: 'Camarero', es: 'Muy bien. Una mesa para dos. Por aquí.', nl: 'Prima. Een tafel voor twee. Deze kant op.' },
          { speaker: 'Tú', es: 'Vale, ___.', nl: 'Oké, dank je.', gap: { answer: 'gracias' } },
        ],
      },
    },
    {
      id: 'u2l2',
      title: '¿Cuánto cuesta?',
      intro: 'Prijzen vragen en betalen.',
      words: words('u2l2', [
        ['¿cuánto cuesta?', 'hoeveel kost het?', { altNl: ['wat kost het', 'hoeveel kost dit'] }],
        ['el euro', 'de euro'],
        ['la cuenta', 'de rekening'],
        ['pagar', 'betalen'],
        ['con tarjeta', 'met de kaart', { altNl: ['met pinpas', 'met de pinpas', 'met kaart', 'pinnen'] }],
        ['en efectivo', 'contant'],
        ['veinte', 'twintig', { altNl: ['20'] }],
        ['cincuenta', 'vijftig', { altNl: ['50'] }],
        ['cien', 'honderd', { altNl: ['100'] }],
      ]),
      sentences: sentences('u2l2', [
        ['Cuesta veinte euros.', 'Het kost twintig euro.'],
        ['La cuenta, por favor.', 'De rekening, alsjeblieft.'],
        ['¿Puedo pagar con tarjeta?', 'Kan ik met de kaart betalen?'],
        ['Son cincuenta euros.', 'Dat is vijftig euro.'],
      ]),
      grammar: {
        id: 'u2l2-g',
        title: 'Meervoud',
        explanation: `Het meervoud maken is in het Spaans makkelijk:

- eindigt het woord op een **klinker**: zet er **-s** achter. *café → cafés*, *cerveza → cervezas*
- eindigt het op een **medeklinker**: zet er **-es** achter. *hotel → hoteles*, *ración → raciones*

Het lidwoord gaat mee:

| | enkelvoud | meervoud |
|---|---|---|
| mannelijk | el euro | **los** euros |
| vrouwelijk | la cuenta | **las** cuentas |

Let op: in het Nederlands zeg je "twintig euro", maar in het Spaans "veinte **euros**".`,
        items: items('u2l2', [
          ['Cuesta veinte ___.', 'euros', 'Het kost twintig euro.'],
          ['dos ___', 'cafés', 'twee koffie (café)'],
          ['tres ___', 'cervezas', 'drie biertjes (cerveza)'],
          ['dos ___', 'hoteles', 'twee hotels (hotel)'],
          ['___ cuentas', 'las', 'de rekeningen'],
        ]),
      },
      dialogue: {
        id: 'u2l2-d',
        title: 'Afrekenen',
        turns: [
          { speaker: 'Tú', es: 'La ___, por favor.', nl: 'De rekening, alsjeblieft.', gap: { answer: 'cuenta' } },
          { speaker: 'Camarero', es: 'Son veinte euros.', nl: 'Dat is twintig euro.' },
          { speaker: 'Tú', es: '¿Puedo pagar con ___?', nl: 'Kan ik met de kaart betalen?', gap: { answer: 'tarjeta' } },
          { speaker: 'Camarero', es: 'Sí, claro.', nl: 'Ja, natuurlijk.' },
          { speaker: 'Tú', es: 'Gracias. ¡___!', nl: 'Dank je. Dag!', gap: { answer: 'Adiós' } },
        ],
      },
    },
    {
      id: 'u2l3',
      title: '¿Qué hora es?',
      intro: 'Klokkijken en openingstijden.',
      words: words('u2l3', [
        ['¿qué hora es?', 'hoe laat is het?'],
        ['es la una', 'het is één uur', { altNl: ['het is 1 uur'] }],
        ['son las dos', 'het is twee uur', { altNl: ['het is 2 uur'] }],
        ['y media', 'half (+ uur)', { altNl: ['en een half', 'half', 'dertig'] }],
        ['y cuarto', 'kwart over', { altNl: ['en een kwart'] }],
        ['menos cuarto', 'kwart voor'],
        ['hoy', 'vandaag'],
        ['mañana', 'morgen'],
        ['abierto', 'open', { altNl: ['geopend'] }],
        ['cerrado', 'gesloten', { altNl: ['dicht'] }],
      ]),
      sentences: sentences('u2l3', [
        ['Son las tres y media.', 'Het is half vier.'],
        ['Es la una y cuarto.', 'Het is kwart over één.'],
        ['Hoy está cerrado.', 'Vandaag is het gesloten.'],
        ['Mañana está abierto.', 'Morgen is het open.'],
      ]),
      grammar: {
        id: 'u2l3-g',
        title: 'Klokkijken',
        explanation: `Hoe laat het is zeg je met **es la** (alleen voor één uur) of **son las** (voor alle andere uren):

| | |
|---|---|
| Es **la una**. | Het is één uur. |
| Son **las dos**. | Het is twee uur. |
| Son las dos **y cuarto**. | Het is kwart over twee. |
| Son las dos **y media**. | Het is half **drie**! |
| Son las tres **menos cuarto**. | Het is kwart voor drie. |

Pas op: Nederlanders zeggen "half drie", Spanjaarden zeggen "twee **en een half**" (*las dos y media*).

"Om" een bepaalde tijd is **a las**: *El museo abre **a las** diez.* (Het museum gaat om tien uur open.)

In Spanje eet je laat: lunch rond 14:00, avondeten vaak pas om 21:00 of later.`,
        items: items('u2l3', [
          ['___ la una.', 'Es', 'Het is één uur.'],
          ['___ las cuatro.', 'Son', 'Het is vier uur.'],
          ['Son las dos y ___.', 'media', 'Het is half drie.'],
          ['Son las cinco menos ___.', 'cuarto', 'Het is kwart voor vijf.'],
          ['El museo abre ___ las diez.', 'a', 'Het museum gaat om tien uur open.'],
        ]),
      },
      dialogue: {
        id: 'u2l3-d',
        title: 'Bij het museum',
        turns: [
          { speaker: 'Tú', es: 'Perdón, ¿qué ___ es?', nl: 'Pardon, hoe laat is het?', gap: { answer: 'hora' } },
          { speaker: 'Señora', es: 'Son las diez y media.', nl: 'Het is half elf.' },
          { speaker: 'Tú', es: '¿El museo está ___ hoy?', nl: 'Is het museum vandaag open?', gap: { answer: 'abierto' } },
          { speaker: 'Señora', es: 'Sí, hoy está abierto hasta las ocho.', nl: 'Ja, vandaag is het open tot acht uur.' },
          { speaker: 'Tú', es: 'Vale, gracias.', nl: 'Oké, dank u.' },
        ],
      },
    },
  ],
}
