import { items, sentences, words } from './helpers'
import type { Unit } from './types'

export const unit1: Unit = {
  id: 'u1',
  title: 'Begroeten en voorstellen',
  lessons: [
    {
      id: 'u1l1',
      title: '¡Hola!',
      intro: 'Je eerste Spaanse woorden: groeten, bedanken, ja en nee.',
      words: words('u1l1', [
        ['hola', 'hallo', { altNl: ['hoi', 'dag'] }],
        ['adiós', 'dag', { altNl: ['tot ziens', 'doei', 'doeg'] }],
        ['buenos días', 'goedemorgen', { altNl: ['goedendag', 'goede morgen'] }],
        ['gracias', 'dank je', { altNl: ['bedankt', 'dank u', 'dankjewel', 'dank je wel'] }],
        ['sí', 'ja'],
        ['no', 'nee', { altNl: ['niet', 'geen'] }],
      ]),
      sentences: sentences('u1l1', [
        ['Hola, buenos días.', 'Hallo, goedemorgen.'],
        ['Sí, gracias.', 'Ja, dank je.'],
        ['No, gracias.', 'Nee, dank je.'],
        ['Adiós, gracias.', 'Dag, bedankt.'],
      ]),
      grammar: {
        id: 'u1l1-g',
        title: 'Uitspraak en leestekens',
        explanation: `Spaans spreek je bijna altijd uit zoals je het schrijft. Een paar dingen zijn anders dan in het Nederlands:

| Letter | Klinkt als | Voorbeeld |
|---|---|---|
| **h** | stil, spreek je niet uit | *hola* = "ola" |
| **j** | een harde g/ch, zoals in "lachen" | *jamón* |
| **ll** | een j-klank | *me llamo* = "me jamo" |
| **ñ** | nj, zoals in "oranje" | *España* |
| **v** | bijna een b | *vino* = "bino" |
| **z**, **ce**, **ci** | in Spanje: Engelse "th" | *gracias* = "grathias" |
| **qu** | k (de u hoor je niet) | *queso* = "keso" |

Een **accent** (á, é, í, ó, ú) laat zien welke lettergreep de klemtoon krijgt: *adiós* = a-DIOS.

Een vraag of uitroep begint in het Spaans met een **omgekeerd** teken: **¿**Qué tal**?** en **¡**Hola**!** Je hoeft die tekens in deze app niet zelf te typen.`,
        items: [],
      },
    },
    {
      id: 'u1l2',
      title: '¿Cómo te llamas?',
      intro: 'Jezelf voorstellen en vragen hoe iemand heet.',
      words: words('u1l2', [
        ['por favor', 'alsjeblieft', { altNl: ['alstublieft', 'graag'] }],
        ['buenas tardes', 'goedemiddag', { altNl: ['goedenavond'] }],
        ['buenas noches', 'goedenavond', { altNl: ['goedenacht', 'welterusten'] }],
        ['me llamo', 'ik heet'],
        ['¿cómo te llamas?', 'hoe heet je?', { altNl: ['hoe heet jij'] }],
        ['mucho gusto', 'aangenaam', { altNl: ['aangenaam kennis te maken'] }],
      ]),
      sentences: sentences('u1l2', [
        ['Hola, ¿cómo te llamas?', 'Hallo, hoe heet je?'],
        ['Me llamo Ana.', 'Ik heet Ana.'],
        ['Buenas tardes, me llamo Pablo.', 'Goedemiddag, ik heet Pablo.'],
        ['Mucho gusto, Pablo.', 'Aangenaam, Pablo.'],
      ]),
      grammar: {
        id: 'u1l2-g',
        title: 'Tú en usted: je en u',
        explanation: `Net als in het Nederlands heb je in het Spaans een gewone en een beleefde vorm:

| Nederlands | Spaans | Wanneer |
|---|---|---|
| jij / je | **tú** | vrienden, leeftijdsgenoten, in Spanje heel vaak |
| u | **usted** | ouderen, formele situaties |

In Spanje zeggen mensen al snel **tú**, ook in winkels en bars.

"Ik heet" is in het Spaans letterlijk "ik noem mezelf": **me llamo**. Het kleine woordje ervoor verandert mee:

| | |
|---|---|
| (yo) **me** llamo | ik heet |
| (tú) **te** llamas | jij heet |
| (usted) **se** llama | u heet |

Dus: *¿Cómo **te** llamas?* (hoe heet je?) en *¿Cómo **se** llama usted?* (hoe heet u?).`,
        items: items('u1l2', [
          ['¿Cómo ___ llamas?', 'te', 'Hoe heet je?'],
          ['Yo ___ llamo Ana.', 'me', 'Ik heet Ana.'],
          ['¿Cómo se ___ usted?', 'llama', 'Hoe heet u?'],
          ['Me ___ Pablo.', 'llamo', 'Ik heet Pablo.'],
        ]),
      },
      dialogue: {
        id: 'u1l2-d',
        title: 'Kennismaken',
        turns: [
          { speaker: 'Ana', es: '¡Hola! Buenas tardes.', nl: 'Hallo! Goedemiddag.' },
          { speaker: 'Tú', es: '¡Hola! ¿Cómo te ___?', nl: 'Hallo! Hoe heet je?', gap: { answer: 'llamas' } },
          { speaker: 'Ana', es: 'Me llamo Ana. ¿Y tú?', nl: 'Ik heet Ana. En jij?' },
          { speaker: 'Tú', es: 'Me ___ Pieter.', nl: 'Ik heet Pieter.', gap: { answer: 'llamo' } },
          { speaker: 'Ana', es: 'Mucho gusto, Pieter.', nl: 'Aangenaam, Pieter.' },
          { speaker: 'Tú', es: 'Mucho ___.', nl: 'Aangenaam.', gap: { answer: 'gusto' } },
        ],
      },
    },
    {
      id: 'u1l3',
      title: '¿De dónde eres?',
      intro: 'Vertellen waar je vandaan komt.',
      words: words('u1l3', [
        ['soy', 'ik ben'],
        ['eres', 'jij bent', { altNl: ['je bent', 'ben jij', 'ben je'] }],
        ['es', 'hij is', { altNl: ['zij is', 'u bent', 'het is'] }],
        ['España', 'Spanje'],
        ['Holanda', 'Nederland', { altEs: ['los Países Bajos'] }],
        ['¿de dónde?', 'waar vandaan?', { altNl: ['waarvandaan', 'vanwaar'] }],
        ['holandés', 'Nederlands', { altEs: ['holandesa'], altNl: ['Nederlander'] }],
      ]),
      sentences: sentences('u1l3', [
        ['Soy de Holanda.', 'Ik kom uit Nederland.'],
        ['¿De dónde eres?', 'Waar kom je vandaan?'],
        ['Soy holandés.', 'Ik ben Nederlander.', ['Soy holandesa.']],
        ['Ana es de España.', 'Ana komt uit Spanje.'],
      ]),
      grammar: {
        id: 'u1l3-g',
        title: 'Ser: zijn',
        explanation: `**Ser** betekent "zijn". Je gebruikt het om te zeggen wie je bent en waar je vandaan komt. Het is een onregelmatig werkwoord, dus je leert de vormen gewoon uit je hoofd:

| | ser |
|---|---|
| yo (ik) | **soy** |
| tú (jij) | **eres** |
| él / ella / usted (hij / zij / u) | **es** |
| nosotros (wij) | **somos** |
| vosotros (jullie) | **sois** |
| ellos / ellas / ustedes (zij / u, meervoud) | **son** |

Het woordje voor "ik", "jij" enzovoort laat je meestal weg, want de vorm van het werkwoord zegt het al: *Soy de Holanda* = Ik kom uit Nederland.

**Vosotros** (jullie) hoor je vooral in Spanje. In Latijns-Amerika zeggen ze *ustedes*.

"Uit" of "van" is **de**: *Soy **de** Holanda.*`,
        items: items('u1l3', [
          ['Yo ___ de Holanda.', 'soy', 'Ik kom uit Nederland.'],
          ['¿De dónde ___ tú?', 'eres', 'Waar kom jij vandaan?'],
          ['Ana ___ de España.', 'es', 'Ana komt uit Spanje.'],
          ['Nosotros ___ holandeses.', 'somos', 'Wij zijn Nederlanders.'],
          ['Vosotros ___ de Madrid.', 'sois', 'Jullie komen uit Madrid.'],
        ]),
      },
      dialogue: {
        id: 'u1l3-d',
        title: 'Aan de bar van het hotel',
        turns: [
          { speaker: 'Carlos', es: 'Hola, ¿de dónde eres?', nl: 'Hoi, waar kom je vandaan?' },
          { speaker: 'Tú', es: 'Soy ___ Holanda.', nl: 'Ik kom uit Nederland.', gap: { answer: 'de' } },
          { speaker: 'Carlos', es: '¡Ah, Holanda! Yo soy de Madrid.', nl: 'Ah, Nederland! Ik kom uit Madrid.' },
          { speaker: 'Tú', es: '¿Y Ana? ¿De dónde ___?', nl: 'En Ana? Waar komt zij vandaan?', gap: { answer: 'es' } },
          { speaker: 'Carlos', es: 'Ana es de Sevilla.', nl: 'Ana komt uit Sevilla.' },
        ],
      },
    },
  ],
}
