import { stripAccents } from './normalize'

export type Tense = 'presente' | 'preterito' | 'imperfecto' | 'futuro'
export type Conjugation = Record<Tense, string[]>

export const TENSES: Tense[] = ['presente', 'preterito', 'imperfecto', 'futuro']
export const TENSE_LABELS: Record<Tense, string> = {
  presente: 'tegenwoordige tijd',
  preterito: 'verleden tijd (gebeurtenis)',
  imperfecto: 'verleden tijd (was / deed)',
  futuro: 'toekomende tijd',
}
export const PERSONS = ['yo', 'tú', 'él / ella / usted', 'nosotros', 'vosotros', 'ellos / ustedes']
export const PERSON_LABELS = ['ik', 'jij', 'hij / zij / u', 'wij', 'jullie (Spanje)', 'zij / jullie']

type Partial4 = Partial<Conjugation>

const t = (s: string) => s.split(' ')

/** irregular tenses; tenses not listed are formed regularly */
const IRREGULAR: Record<string, Partial4> = {
  ser: {
    presente: t('soy eres es somos sois son'),
    preterito: t('fui fuiste fue fuimos fuisteis fueron'),
    imperfecto: t('era eras era éramos erais eran'),
  },
  estar: {
    presente: t('estoy estás está estamos estáis están'),
    preterito: t('estuve estuviste estuvo estuvimos estuvisteis estuvieron'),
  },
  ir: {
    presente: t('voy vas va vamos vais van'),
    preterito: t('fui fuiste fue fuimos fuisteis fueron'),
    imperfecto: t('iba ibas iba íbamos ibais iban'),
  },
  tener: {
    presente: t('tengo tienes tiene tenemos tenéis tienen'),
    preterito: t('tuve tuviste tuvo tuvimos tuvisteis tuvieron'),
    futuro: t('tendré tendrás tendrá tendremos tendréis tendrán'),
  },
  querer: {
    presente: t('quiero quieres quiere queremos queréis quieren'),
    preterito: t('quise quisiste quiso quisimos quisisteis quisieron'),
    futuro: t('querré querrás querrá querremos querréis querrán'),
  },
  poder: {
    presente: t('puedo puedes puede podemos podéis pueden'),
    preterito: t('pude pudiste pudo pudimos pudisteis pudieron'),
    futuro: t('podré podrás podrá podremos podréis podrán'),
  },
  hacer: {
    presente: t('hago haces hace hacemos hacéis hacen'),
    preterito: t('hice hiciste hizo hicimos hicisteis hicieron'),
    futuro: t('haré harás hará haremos haréis harán'),
  },
  decir: {
    presente: t('digo dices dice decimos decís dicen'),
    preterito: t('dije dijiste dijo dijimos dijisteis dijeron'),
    futuro: t('diré dirás dirá diremos diréis dirán'),
  },
  venir: {
    presente: t('vengo vienes viene venimos venís vienen'),
    preterito: t('vine viniste vino vinimos vinisteis vinieron'),
    futuro: t('vendré vendrás vendrá vendremos vendréis vendrán'),
  },
  ver: {
    presente: t('veo ves ve vemos veis ven'),
    preterito: t('vi viste vio vimos visteis vieron'),
    imperfecto: t('veía veías veía veíamos veíais veían'),
  },
  dar: {
    presente: t('doy das da damos dais dan'),
    preterito: t('di diste dio dimos disteis dieron'),
  },
  saber: {
    presente: t('sé sabes sabe sabemos sabéis saben'),
    preterito: t('supe supiste supo supimos supisteis supieron'),
    futuro: t('sabré sabrás sabrá sabremos sabréis sabrán'),
  },
  haber: {
    presente: t('he has ha hemos habéis han'),
    preterito: t('hube hubiste hubo hubimos hubisteis hubieron'),
    futuro: t('habré habrás habrá habremos habréis habrán'),
  },
  oír: {
    presente: t('oigo oyes oye oímos oís oyen'),
    preterito: t('oí oíste oyó oímos oísteis oyeron'),
  },
  salir: {
    presente: t('salgo sales sale salimos salís salen'),
    futuro: t('saldré saldrás saldrá saldremos saldréis saldrán'),
  },
  poner: {
    presente: t('pongo pones pone ponemos ponéis ponen'),
    preterito: t('puse pusiste puso pusimos pusisteis pusieron'),
    futuro: t('pondré pondrás pondrá pondremos pondréis pondrán'),
  },
  traer: {
    presente: t('traigo traes trae traemos traéis traen'),
    preterito: t('traje trajiste trajo trajimos trajisteis trajeron'),
  },
  caer: {
    presente: t('caigo caes cae caemos caéis caen'),
    preterito: t('caí caíste cayó caímos caísteis cayeron'),
  },
  andar: { preterito: t('anduve anduviste anduvo anduvimos anduvisteis anduvieron') },
  morir: {
    presente: t('muero mueres muere morimos morís mueren'),
    preterito: t('morí moriste murió morimos moristeis murieron'),
  },
  dormir: {
    presente: t('duermo duermes duerme dormimos dormís duermen'),
    preterito: t('dormí dormiste durmió dormimos dormisteis durmieron'),
  },
  seguir: {
    presente: t('sigo sigues sigue seguimos seguís siguen'),
    preterito: t('seguí seguiste siguió seguimos seguisteis siguieron'),
  },
  pedir: {
    presente: t('pido pides pide pedimos pedís piden'),
    preterito: t('pedí pediste pidió pedimos pedisteis pidieron'),
  },
  servir: {
    presente: t('sirvo sirves sirve servimos servís sirven'),
    preterito: t('serví serviste sirvió servimos servisteis sirvieron'),
  },
  impedir: {
    presente: t('impido impides impide impedimos impedís impiden'),
    preterito: t('impedí impediste impidió impedimos impedisteis impidieron'),
  },
  huir: {
    presente: t('huyo huyes huye huimos huís huyen'),
    preterito: t('huí huiste huyó huimos huisteis huyeron'),
  },
  bendecir: {
    presente: t('bendigo bendices bendice bendecimos bendecís bendicen'),
    preterito: t('bendije bendijiste bendijo bendijimos bendijisteis bendijeron'),
  },
  nacer: { presente: t('nazco naces nace nacemos nacéis nacen') },
  aparecer: { presente: t('aparezco apareces aparece aparecemos aparecéis aparecen') },
  conocer: { presente: t('conozco conoces conoce conocemos conocéis conocen') },
  crecer: { presente: t('crezco creces crece crecemos crecéis crecen') },
  recoger: { presente: t('recojo recoges recoge recogemos recogéis recogen') },
}

/** present-tense stem change in the stressed syllable (yo, tú, él, ellos) */
const STEM_CHANGE: Record<string, [string, string]> = {
  consolar: ['o', 'ue'],
  encontrar: ['o', 'ue'],
  recordar: ['o', 'ue'],
  contar: ['o', 'ue'],
  volver: ['o', 'ue'],
  doler: ['o', 'ue'],
  sembrar: ['e', 'ie'],
  negar: ['e', 'ie'],
  pensar: ['e', 'ie'],
  cerrar: ['e', 'ie'],
  despertar: ['e', 'ie'],
  entender: ['e', 'ie'],
  empezar: ['e', 'ie'],
}

/** regular (or stem-changing) verbs that appear in the lessons */
const REGULAR = (
  'hablar tomar pagar cenar visitar necesitar llamar llamarse amar perdonar bajar llegar llevar mandar hallar ' +
  'heredar pasar viajar cuidar levantarse acercarse llenarse buscar resucitar crucificar regresar pecar entrar ' +
  'preguntar llorar gritar caminar tocar suspirar mirar echar dejar proclamar bautizar salvar observar ganar ' +
  'cortar exclamar desamparar expirar alarmarse informar predicar orar trabajar esperar cumplirse significar ' +
  'gustar indignarse aparecer cantar comprar estudiar escuchar reservar usar enseñar lavar mostrar ' +
  'comer beber aprender temer creer vender responder correr leer comprender ' +
  'vivir abrir partir recibir discutir subir repartir sufrir escribir decidir ' +
  Object.keys(STEM_CHANGE).join(' ')
).split(' ')

const ENDINGS = {
  ar: {
    presente: ['o', 'as', 'a', 'amos', 'áis', 'an'],
    preterito: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'],
    imperfecto: ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban'],
  },
  er: {
    presente: ['o', 'es', 'e', 'emos', 'éis', 'en'],
    preterito: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
    imperfecto: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
  },
  ir: {
    presente: ['o', 'es', 'e', 'imos', 'ís', 'en'],
    preterito: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
    imperfecto: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
  },
}
const FUTURE = ['é', 'ás', 'á', 'emos', 'éis', 'án']
const REFLEXIVE = ['me', 'te', 'se', 'nos', 'os', 'se']

function changeStem(stem: string, [from, to]: [string, string]): string {
  const i = stem.lastIndexOf(from)
  return i < 0 ? stem : stem.slice(0, i) + to + stem.slice(i + from.length)
}

function regular(infinitive: string): Conjugation {
  // oír -> oir for the endings and the future (oiré)
  const inf = stripAccents(infinitive)
  const type = inf.slice(-2) as 'ar' | 'er' | 'ir'
  const stem = inf.slice(0, -2)
  const e = ENDINGS[type]
  const presente = e.presente.map((x, p) => {
    const change = STEM_CHANGE[infinitive]
    return (change && [0, 1, 2, 5].includes(p) ? changeStem(stem, change) : stem) + x
  })
  let preterito = e.preterito.map((x) => stem + x)
  // spelling changes in the yo-form: -car → -qué, -gar → -gué, -zar → -cé
  if (type === 'ar') {
    if (stem.endsWith('c')) preterito[0] = stem.slice(0, -1) + 'qué'
    if (stem.endsWith('g')) preterito[0] = stem + 'ué'
    if (stem.endsWith('z')) preterito[0] = stem.slice(0, -1) + 'cé'
  }
  // creer, leer: creyó, creyeron and accented í
  if (type === 'er' && /[aeo]$/.test(stem)) {
    preterito = ['í', 'íste', 'yó', 'ímos', 'ísteis', 'yeron'].map((x) => stem + x)
  }
  return {
    presente,
    preterito,
    imperfecto: e.imperfecto.map((x) => stem + x),
    futuro: FUTURE.map((x) => inf + x),
  }
}

const KNOWN = new Set([...Object.keys(IRREGULAR), ...REGULAR])

/** full conjugation of a known verb (incl. reflexive -se verbs), or null */
export function conjugate(infinitive: string): Conjugation | null {
  const inf = infinitive.toLowerCase().trim()
  if (!KNOWN.has(inf)) return null
  const reflexive = inf.endsWith('se')
  const base = reflexive ? inf.slice(0, -2) : inf
  const reg = regular(base)
  const irr = IRREGULAR[base] ?? {}
  const out = Object.fromEntries(TENSES.map((tn) => [tn, irr[tn] ?? reg[tn]])) as Conjugation
  if (!reflexive) return out
  return Object.fromEntries(TENSES.map((tn) => [tn, out[tn].map((f, p) => `${REFLEXIVE[p]} ${f}`)])) as Conjugation
}

export interface VerbForm {
  infinitive: string
  tense: Tense
  person: number
}

let index: Map<string, VerbForm[]> | null = null
const bare = (s: string) => stripAccents(s.toLowerCase())

function buildIndex() {
  const m = new Map<string, VerbForm[]>()
  const add = (key: string, f: VerbForm) => {
    const list = m.get(key) ?? []
    if (!list.some((x) => x.infinitive === f.infinitive && x.tense === f.tense && x.person === f.person)) list.push(f)
    m.set(key, list)
  }
  for (const inf of KNOWN) {
    const c = conjugate(inf)!
    for (const tense of TENSES) {
      c[tense].forEach((form, person) => {
        const word = form.split(' ').at(-1)!
        add(word, { infinitive: inf, tense, person })
        add('~' + bare(word), { infinitive: inf, tense, person })
      })
    }
  }
  return m
}

/** all (infinitive, tense, person) readings of a word; accent-insensitive as a fallback */
export function findVerbForms(word: string): VerbForm[] {
  index ??= buildIndex()
  const w = word.toLowerCase().trim()
  return index.get(w) ?? index.get('~' + bare(w)) ?? []
}

/** Dutch meaning of every verb the app can conjugate */
const MEANINGS: Record<string, string> = {
  ser: 'zijn', estar: 'zijn (plaats, toestand)', ir: 'gaan', tener: 'hebben', querer: 'willen', poder: 'kunnen, mogen',
  hacer: 'doen, maken', decir: 'zeggen', venir: 'komen', ver: 'zien', dar: 'geven', saber: 'weten',
  haber: 'hebben (hulpwerkwoord); er is', oír: 'horen', salir: 'weggaan, vertrekken', poner: 'zetten, leggen',
  traer: 'brengen', caer: 'vallen', andar: 'lopen', morir: 'sterven', dormir: 'slapen', seguir: 'volgen',
  pedir: 'vragen, bestellen', servir: 'dienen', impedir: 'tegenhouden', huir: 'vluchten', bendecir: 'zegenen',
  nacer: 'geboren worden', aparecer: 'verschijnen', conocer: 'kennen', crecer: 'groeien', recoger: 'verzamelen',
  consolar: 'troosten', encontrar: 'vinden', recordar: 'herinneren', contar: 'tellen, vertellen', volver: 'terugkomen',
  doler: 'pijn doen', sembrar: 'zaaien', negar: 'ontkennen', pensar: 'denken', cerrar: 'sluiten',
  despertar: 'wakker maken', entender: 'begrijpen', empezar: 'beginnen',
  hablar: 'spreken, praten', tomar: 'nemen, drinken', pagar: 'betalen', cenar: 'avondeten', visitar: 'bezoeken',
  necesitar: 'nodig hebben', llamar: 'roepen, bellen, noemen', llamarse: 'heten', amar: 'liefhebben',
  perdonar: 'vergeven', bajar: 'naar beneden gaan', llegar: 'aankomen', llevar: 'brengen, dragen', mandar: 'sturen, bevelen',
  hallar: 'vinden', heredar: 'erven', pasar: 'voorbijgaan, gebeuren', viajar: 'reizen', cuidar: 'zorgen voor',
  levantarse: 'opstaan', acercarse: 'naderbij komen', llenarse: 'vol raken', buscar: 'zoeken',
  resucitar: 'opstaan uit de dood', crucificar: 'kruisigen', regresar: 'teruggaan', pecar: 'zondigen',
  entrar: 'binnengaan', preguntar: 'vragen', llorar: 'huilen', gritar: 'schreeuwen', caminar: 'lopen, wandelen',
  tocar: 'aanraken, spelen', suspirar: 'zuchten', mirar: 'kijken', echar: 'werpen, gooien', dejar: 'laten, achterlaten',
  proclamar: 'verkondigen', bautizar: 'dopen', salvar: 'redden', observar: 'kijken naar', ganar: 'winnen, verdienen',
  cortar: 'snijden', exclamar: 'uitroepen', desamparar: 'verlaten', expirar: 'sterven', alarmarse: 'schrikken',
  informar: 'vertellen, melden', predicar: 'prediken', orar: 'bidden', trabajar: 'werken', esperar: 'wachten, hopen',
  cumplirse: 'vervuld worden', significar: 'betekenen', gustar: 'bevallen, lekker vinden', indignarse: 'boos worden',
  cantar: 'zingen', comprar: 'kopen', estudiar: 'studeren', escuchar: 'luisteren', reservar: 'reserveren',
  usar: 'gebruiken', enseñar: 'onderwijzen, laten zien', lavar: 'wassen', mostrar: 'tonen',
  comer: 'eten', beber: 'drinken', aprender: 'leren', temer: 'vrezen, bang zijn', creer: 'geloven', vender: 'verkopen',
  responder: 'antwoorden', correr: 'rennen', leer: 'lezen', comprender: 'begrijpen', vivir: 'leven, wonen',
  abrir: 'openen', partir: 'breken, vertrekken', recibir: 'ontvangen', discutir: 'bespreken, ruziën', subir: 'omhooggaan',
  repartir: 'uitdelen', sufrir: 'lijden, verdragen', escribir: 'schrijven', decidir: 'beslissen',
}

export function verbMeaning(infinitive: string): string | undefined {
  return MEANINGS[infinitive.toLowerCase()]
}

export function knownVerbs(): string[] {
  return [...KNOWN]
}
