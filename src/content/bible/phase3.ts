import { words } from '../helpers'
import type { Lesson, Passage, Unit, Word } from '../types'
import { chapterQuestions, passage, verseSentences } from './helpers'

interface MarkChapter {
  chapter: number
  title: string
  summary: string
  words: [string, string, Partial<Word>?][]
  section: [string, string][]
  gaps: string[]
  /** indexes into section used as sentences, plus short excerpts */
  sentences: number[]
  excerpts?: [string, string][]
  questions: [string, string[], number][]
}

const CHAPTERS: MarkChapter[] = [
  {
    chapter: 1,
    title: 'Het begin',
    summary:
      'Johannes de Doper doopt mensen in de Jordaan. Jezus laat zich dopen, gaat de woestijn in en begint daarna in Galilea het goede nieuws te verkondigen. Hij roept de eerste leerlingen, vissers, en geneest veel zieken.',
    words: [
      ['el tiempo', 'de tijd', { gender: 'm' }],
      ['bautizar', 'dopen', { forms: ['bautizaba', 'bautizado', 'bautizados', 'bautizará', 'bautizo'] }],
      ['el desierto', 'de woestijn', { gender: 'm' }],
      ['proclamar', 'verkondigen', { forms: ['proclamaba', 'proclamó'], altNl: ['prediken', 'aankondigen'] }],
      ['el pescador', 'de visser', { gender: 'm', forms: ['pescadores'] }],
      ['la red', 'het net', { gender: 'f', forms: ['redes'] }],
      ['echar', 'werpen', { forms: ['echaban', 'echó', 'echaron'], altNl: ['gooien'] }],
      ['dejar', 'achterlaten', { forms: ['dejaron', 'dejen', 'dejó'], altNl: ['laten', 'verlaten'] }],
      ['de inmediato', 'meteen', { altNl: ['onmiddellijk', 'direct'] }],
    ],
    section: [
      ['MAR 1:14', 'Nadat Johannes gevangengenomen was, ging Jezus naar Galilea om het goede nieuws van God te verkondigen:'],
      ['MAR 1:15', 'De tijd is vervuld en het koninkrijk van God is dichtbij gekomen! Bekeer je en geloof in het goede nieuws!'],
      ['MAR 1:16', 'Toen Hij langs het meer van Galilea liep, zag Hij Simon en zijn broer Andreas, die een net uitwierpen in het meer, want ze waren vissers.'],
      ['MAR 1:17', 'Jezus zei tegen hen: Volg Mij en jullie zullen vissers van mensen worden.'],
      ['MAR 1:18', 'Ze lieten hun netten achter en volgden Hem meteen.'],
    ],
    gaps: ['proclamar', 'tiempo', 'echaban', 'red', 'pescadores', 'Dejaron', 'inmediato'],
    sentences: [3, 4],
    questions: [
      ['Wat waren Simon en Andreas van beroep?', ['Vissers', 'Herders', 'Tollenaars'], 0],
      ['Wat zei Jezus tegen hen?', ['Volg Mij', 'Ga naar huis', 'Blijf hier'], 0],
      ['Waar doopte Johannes?', ['In de Jordaan', 'In de zee', 'In Jeruzalem'], 0],
    ],
  },
  {
    chapter: 2,
    title: 'De verlamde man',
    summary:
      'In Kafarnaüm komen zoveel mensen naar Jezus dat vier mannen een verlamde vriend door het dak naar beneden laten zakken. Jezus vergeeft zijn zonden en geneest hem. Jezus eet met tollenaars en zondaars: Hij is gekomen voor zondaars, niet voor rechtvaardigen.',
    words: [
      ['la casa', 'het huis', { gender: 'f' }],
      ['la puerta', 'de deur', { gender: 'f' }],
      ['el paralítico', 'de verlamde', { gender: 'm' }],
      ['la multitud', 'de menigte', { gender: 'f' }],
      ['el techo', 'het dak', { gender: 'm' }],
      ['el pecado', 'de zonde', { gender: 'm', forms: ['pecados'] }],
      ['la palabra', 'het woord', { gender: 'f', forms: ['Palabra', 'palabras'] }],
      ['llevar', 'brengen', { forms: ['llevarlo', 'llevaron', 'llevaban', 'llevó'], altNl: ['dragen'] }],
      ['la camilla', 'de draagbaar', { gender: 'f', altNl: ['de brancard', 'de mat'] }],
    ],
    section: [
      ['MAR 2:1', 'Een paar dagen later ging Hij terug naar Kafarnaüm, en men hoorde: Jezus is thuis.'],
      ['MAR 2:2', 'Er kwamen zoveel mensen samen dat er geen plaats meer was, zelfs niet voor de deur. Jezus sprak tot hen het Woord.'],
      ['MAR 2:3', 'Toen kwamen er vier mannen met een verlamde.'],
      ['MAR 2:4', 'Omdat ze hem door de menigte niet bij Hem konden brengen, haalden ze het dak weg van de plek waar Jezus was en lieten de verlamde zakken op de draagbaar waarop hij lag.'],
      ['MAR 2:5', 'Toen Jezus hun geloof zag, zei Hij tegen de verlamde: Zoon, je zonden zijn je vergeven.'],
    ],
    gaps: ['casa', 'puerta', 'Palabra', 'paralítico', 'multitud', 'techo', 'camilla', 'pecados'],
    sentences: [2, 4],
    questions: [
      ['Hoe kwam de verlamde man bij Jezus?', ['Door het dak', 'Door de deur', 'Door een raam'], 0],
      ['Hoeveel mannen brachten hem?', ['Twee', 'Vier', 'Twaalf'], 1],
      ['Wat zei Jezus eerst tegen hem?', ['Je zonden zijn je vergeven', 'Ga naar huis', 'Wees niet bang'], 0],
    ],
  },
  {
    chapter: 3,
    title: 'Mijn moeder en mijn broers',
    summary:
      'Jezus geneest op de sabbat een man met een verschrompelde hand. Hij kiest twaalf apostelen. Als zijn familie Hem komt halen, zegt Hij dat iedereen die de wil van God doet zijn broer, zus en moeder is.',
    words: [
      ['la madre', 'de moeder', { gender: 'f' }],
      ['la hermana', 'de zus', { gender: 'f' }],
      ['afuera', 'buiten'],
      ['sentado', 'zittend', { forms: ['sentada', 'sentados'] }],
      ['mirar', 'kijken', { forms: ['miró', 'mira', 'miren'] }],
      ['alrededor', 'rondom', { altNl: ['eromheen', 'om … heen'] }],
      ['la voluntad', 'de wil', { gender: 'f' }],
      ['cualquiera', 'wie ook maar', { altNl: ['iedereen', 'ieder'] }],
      ['hacer', 'doen', { forms: ['haga', 'hizo', 'hace', 'hacer'], altNl: ['maken'] }],
    ],
    section: [
      ['MAR 3:31', 'Toen kwamen zijn moeder en zijn broers. Ze stonden buiten en lieten Hem roepen.'],
      ['MAR 3:32', 'Om Hem heen zat een menigte, en ze zeiden tegen Hem: Kijk, uw moeder en uw broers zoeken U.'],
      ['MAR 3:33', 'Hij antwoordde hun: Wie zijn mijn moeder en mijn broers?'],
      ['MAR 3:34', 'Toen keek Hij om zich heen en zei: Hier zijn mijn moeder en mijn broers!'],
      ['MAR 3:35', 'Wie de wil van God doet, is mijn broer, mijn zus en mijn moeder.'],
    ],
    gaps: ['madre', 'afuera', 'sentada', 'miró', 'alrededor', 'Cualquiera', 'haga', 'voluntad', 'hermana'],
    sentences: [2, 4],
    questions: [
      ['Wie kwamen Jezus halen?', ['Zijn moeder en broers', 'De leerlingen', 'De priesters'], 0],
      ['Wie is volgens Jezus zijn familie?', ['Wie de wil van God doet', 'Alleen zijn moeder', 'Iedereen uit Nazaret'], 0],
      ['Hoeveel apostelen kiest Jezus in dit hoofdstuk?', ['Zeven', 'Twaalf', 'Zeventig'], 1],
    ],
  },
  {
    chapter: 4,
    title: 'De zaaier',
    summary:
      'Jezus vertelt de gelijkenis van de zaaier: zaad valt langs de weg, op rotsgrond, tussen de doorns en in goede aarde. Hij vertelt ook over het mosterdzaadje dat uitgroeit tot een grote plant. ’s Avonds bedaart Hij een storm op het meer.',
    words: [
      ['el sembrador', 'de zaaier', { gender: 'm' }],
      ['sembrar', 'zaaien'],
      ['la semilla', 'het zaad', { gender: 'f', forms: ['semillas'] }],
      ['caer', 'vallen', { forms: ['cayó', 'cayeron'] }],
      ['el ave', 'de vogel', { gender: 'f', forms: ['aves'] }],
      ['el sol', 'de zon', { gender: 'm' }],
      ['la raíz', 'de wortel', { gender: 'f', forms: ['raíces'] }],
      ['crecer', 'groeien', { forms: ['crecieron', 'creció', 'crece'] }],
      ['el fruto', 'de vrucht', { gender: 'm', forms: ['frutos'] }],
      ['bueno', 'goed', { forms: ['buena', 'buenos', 'buenas'] }],
    ],
    section: [
      ['MAR 4:3', 'Luister. De zaaier ging uit om te zaaien.'],
      ['MAR 4:4', 'Een deel van het zaad viel langs de weg. De vogels kwamen en aten het op.'],
      ['MAR 4:5', 'Een ander deel viel op rotsgrond en kwam meteen op, omdat er niet veel aarde was.'],
      ['MAR 4:6', 'Maar toen de zon opkwam, verschroeide het, en omdat het geen wortel had, verdorde het.'],
      ['MAR 4:7', 'Een ander deel viel tussen de doorns. De doorns groeiden op en verstikten het, en het gaf geen vrucht.'],
      ['MAR 4:8', 'Maar een ander deel viel in goede aarde. Het groeide en ontwikkelde zich en gaf vrucht: het ene dertig, het andere zeventig en het andere honderd keer zoveel.'],
    ],
    gaps: ['sembrador', 'semilla', 'cayó', 'aves', 'sol', 'raíz', 'crecieron', 'fruto', 'buena'],
    sentences: [0, 1],
    questions: [
      ['Waar viel het eerste zaad?', ['Langs de weg', 'In goede aarde', 'In het water'], 0],
      ['Waarom verdorde het zaad op rotsgrond?', ['Het had geen wortel', 'Het regende te veel', 'De vogels aten het op'], 0],
      ['Wat doet Jezus aan het eind van het hoofdstuk?', ['Hij bedaart een storm', 'Hij gaat naar Jeruzalem', 'Hij kiest leerlingen'], 0],
    ],
  },
  {
    chapter: 5,
    title: 'Talita koem',
    summary:
      'Jezus bevrijdt een man van een legioen boze geesten. Een vrouw die al twaalf jaar ziek is, raakt zijn kleed aan en wordt genezen. Daarna wekt Jezus het dochtertje van Jaïrus op uit de dood.',
    words: [
      ['entrar', 'binnengaan', { forms: ['entró', 'entraron', 'entre'] }],
      ['preguntar', 'vragen', { forms: ['preguntó', 'preguntaba'] }],
      ['llorar', 'huilen', { forms: ['lloran', 'lloraba'] }],
      ['la niña', 'het meisje', { gender: 'f' }],
      ['morir', 'sterven', { forms: ['murió', 'muera', 'muere'], altNl: ['doodgaan'] }],
      ['la mano', 'de hand', { gender: 'f', forms: ['manos'] }],
      ['significar', 'betekenen', { forms: ['significa'] }],
      ['el año', 'het jaar', { gender: 'm', forms: ['años'] }],
      ['asombrado', 'verbaasd', { forms: ['asombrados', 'asombraron'], altNl: ['verwonderd'] }],
    ],
    section: [
      ['MAR 5:39', 'Toen Jezus binnenkwam, vroeg Hij hun: Waarom zijn jullie zo onrustig en huilen jullie? Het meisje is niet gestorven, maar slaapt.'],
      ['MAR 5:40', 'En ze lachten Hem uit. Toen stuurde Jezus iedereen het huis uit. Hij nam de ouders van het meisje en de leerlingen die bij Hem waren mee, en ging naar binnen waar het meisje lag.'],
      ['MAR 5:41', 'Jezus pakte de hand van het meisje en zei: Talita koem, dat betekent: Meisje, sta op.'],
      ['MAR 5:42', 'Meteen stond het meisje op en liep rond, want ze was twaalf jaar. En wie het zagen, stonden enorm versteld.'],
    ],
    gaps: ['entró', 'preguntó', 'lloran', 'murió', 'mano', 'significa', 'años', 'asombrados'],
    sentences: [2],
    excerpts: [['La niña no murió, sino duerme.', 'Het meisje is niet gestorven, maar slaapt.']],
    questions: [
      ['Hoe oud was het meisje?', ['Zeven jaar', 'Twaalf jaar', 'Twintig jaar'], 1],
      ['Wat betekent "Talita koem"?', ['Meisje, sta op', 'Vrede zij met je', 'Wees niet bang'], 0],
      ['Wat zei Jezus over het meisje toen Hij binnenkwam?', ['Ze slaapt', 'Ze is ziek', 'Ze is weggegaan'], 0],
    ],
  },
  {
    chapter: 6,
    title: 'Over het water',
    summary:
      'In Nazaret geloven de mensen niet in Jezus. Hij stuurt de twaalf op pad. Johannes de Doper wordt gedood. Jezus geeft vijfduizend mensen te eten met vijf broden en twee vissen. ’s Nachts loopt Hij over het water naar de boot van de leerlingen.',
    words: [
      ['solo', 'alleen'],
      ['la madrugada', 'de vroege ochtend', { gender: 'f', altNl: ['de dageraad', 'de ochtend'] }],
      ['andar', 'lopen', { forms: ['andando', 'andaba', 'andará'] }],
      ['caminar', 'lopen', { altNl: ['wandelen'] }],
      ['el fantasma', 'het spook', { gender: 'm' }],
      ['gritar', 'schreeuwen', { forms: ['gritaron'] }],
      ['¡Ánimo!', 'Houd moed!', { forms: ['ánimo'] }],
      ['el miedo', 'de angst', { gender: 'm', altNl: ['de vrees'] }],
      ['subir', 'instappen', { forms: ['subió'], altNl: ['omhooggaan', 'naar boven gaan'] }],
    ],
    section: [
      ['MAR 6:47', 'Toen het avond werd, was de boot midden op het meer, en Hij was alleen op het land.'],
      ['MAR 6:48', 'Rond vier uur ’s ochtends zag Hij dat ze uitgeput waren van het roeien, omdat de wind tegen was. Jezus kwam naar hen toe, lopend over het meer, en wilde hen voorbijgaan.'],
      ['MAR 6:49', 'Maar toen ze Hem over het meer zagen lopen, dachten ze: Het is een spook! En ze schreeuwden,'],
      ['MAR 6:50', 'want ze zagen Hem allemaal en schrokken hevig. Maar meteen sprak Hij tot hen: Houd moed. Ik ben het. Wees niet bang!'],
      ['MAR 6:51', 'Hij stapte in de boot en de wind ging liggen. Ze stonden heel erg versteld,'],
    ],
    gaps: ['solo', 'madrugada', 'andando', 'caminar', 'fantasma', 'gritaron', 'ánimo', 'miedo', 'Subió'],
    sentences: [2],
    excerpts: [['Tengan ánimo. Soy Yo. ¡No tengan miedo!', 'Houd moed. Ik ben het. Wees niet bang!']],
    questions: [
      ['Waar was Jezus toen het avond werd?', ['Alleen op het land', 'In de boot', 'In Jeruzalem'], 0],
      ['Wat dachten de leerlingen toen ze Hem zagen?', ['Dat het een spook was', 'Dat het Petrus was', 'Dat het een vis was'], 0],
      ['Hoeveel mensen kregen in dit hoofdstuk te eten?', ['Vijfhonderd', 'Vijfduizend', 'Vijftig'], 1],
    ],
  },
  {
    chapter: 7,
    title: 'Effata',
    summary:
      'Jezus zegt dat niet wat je eet je onrein maakt, maar wat uit je hart komt. Een vrouw uit Syro-Fenicië vraagt om hulp voor haar dochter. Jezus geneest een dove man en zegt: Effata, ga open.',
    words: [
      ['sordo', 'doof', { forms: ['sordos'] }],
      ['el dedo', 'de vinger', { gender: 'm', forms: ['dedos'] }],
      ['la oreja', 'het oor', { gender: 'f', forms: ['orejas'] }],
      ['tocar', 'aanraken', { forms: ['tocó', 'tocara'] }],
      ['la lengua', 'de tong', { gender: 'f', forms: ['lenguas'], altNl: ['de taal'] }],
      ['suspirar', 'zuchten', { forms: ['suspiró'] }],
      ['abrir', 'openen', { forms: ['abrieron', 'abierto', 'abiertos'], altNl: ['opendoen'] }],
      ['hablar', 'spreken', { forms: ['hablaba', 'habló', 'hablen'], altNl: ['praten'] }],
      ['bien', 'goed'],
    ],
    section: [
      ['MAR 7:32', 'Ze brachten een man bij Hem die doof was en stotterde, en ze smeekten Hem zijn hand op hem te leggen.'],
      ['MAR 7:33', 'Hij nam hem apart, weg van de menigte, stak zijn vingers in zijn oren, spuugde en raakte zijn tong aan.'],
      ['MAR 7:34', 'Hij keek op naar de hemel, zuchtte diep en zei tegen hem: Effata, dat betekent: ga open.'],
      ['MAR 7:35', 'Toen gingen de oren van de dove open, zijn tong kwam los en hij sprak goed.'],
    ],
    gaps: ['sordo', 'dedos', 'orejas', 'tocó', 'lengua', 'suspiró', 'abierto', 'abrieron', 'hablaba', 'bien'],
    sentences: [3],
    excerpts: [['Y hablaba bien.', 'En hij sprak goed.']],
    questions: [
      ['Wat was er met de man aan de hand?', ['Hij was doof en stotterde', 'Hij was blind', 'Hij kon niet lopen'], 0],
      ['Wat betekent "Effata"?', ['Ga open', 'Sta op', 'Wees stil'], 0],
      ['Wat maakt een mens volgens Jezus onrein?', ['Wat uit zijn hart komt', 'Wat hij eet', 'Ongewassen handen'], 0],
    ],
  },
  {
    chapter: 8,
    title: 'Wie ben Ik?',
    summary:
      'Jezus geeft vierduizend mensen te eten en geneest een blinde man. Onderweg vraagt Hij: Wie zeggen de mensen dat Ik ben? Petrus antwoordt: U bent de Christus. Jezus vertelt dat Hij zal lijden, sterven en na drie dagen opstaan. Wie Hem wil volgen, moet zijn kruis opnemen.',
    words: [
      ['la aldea', 'het dorp', { gender: 'f', forms: ['aldeas'] }],
      ['responder', 'antwoorden', { forms: ['respondieron', 'respondió'] }],
      ['unos', 'sommigen', { forms: ['unas'], altNl: ['enkelen'] }],
      ['el profeta', 'de profeet', { gender: 'm', forms: ['profetas'] }],
      ['el Cristo', 'de Christus', { gender: 'm', altNl: ['de Messias', 'Christus'] }],
      ['la cruz', 'het kruis', { gender: 'f' }],
      ['perder', 'verliezen', { forms: ['pierda', 'perderá', 'pierde'] }],
      ['ciego', 'blind', { forms: ['ciegos'] }],
    ],
    section: [
      ['MAR 8:27', 'Jezus ging met zijn leerlingen naar de dorpen bij Caesarea Filippi. Onderweg vroeg Hij zijn leerlingen: Wie zeggen de mensen dat Ik ben?'],
      ['MAR 8:28', 'Ze antwoordden Hem: Sommigen zeggen dat U Johannes de Doper bent. Anderen Elia. Anderen een van de profeten.'],
      ['MAR 8:29', 'Hij vroeg hun: En jullie, wie zeggen jullie dat Ik ben? Petrus antwoordde: U bent de Christus!'],
    ],
    gaps: ['aldeas', 'camino', 'respondieron', 'Unos', 'profetas', 'respondió', 'Cristo'],
    sentences: [],
    excerpts: [
      ['¿Quién dicen los hombres que soy Yo?', 'Wie zeggen de mensen dat Ik ben?'],
      ['¡Tú eres el Cristo!', 'U bent de Christus!'],
    ],
    questions: [
      ['Wat vroeg Jezus aan zijn leerlingen?', ['Wie zeggen de mensen dat Ik ben?', 'Waar gaan we naartoe?', 'Hebben jullie brood?'], 0],
      ['Wat antwoordde Petrus?', ['U bent de Christus', 'U bent Elia', 'U bent een profeet'], 0],
      ['Wat moet je volgens Jezus doen als je Hem wilt volgen?', ['Je kruis opnemen', 'Rijk worden', 'Naar de tempel gaan'], 0],
    ],
  },
  {
    chapter: 9,
    title: 'Wie is de grootste?',
    summary:
      'Op een berg verandert Jezus van gedaante voor de ogen van Petrus, Jakobus en Johannes. Hij geneest een jongen. De leerlingen hebben onderweg ruzie over wie de grootste is. Jezus zegt dat wie de eerste wil zijn, de dienaar van allen moet zijn, en zet een kind in hun midden.',
    words: [
      ['discutir', 'bespreken, ruziën', { forms: ['discutían', 'discutieron'], altNl: ['bespreken', 'ruziën', 'discussiëren'] }],
      ['callar', 'zwijgen', { forms: ['callaban', 'calla'] }],
      ['mayor', 'grootste', { altNl: ['groter', 'oudste'] }],
      ['el primero', 'de eerste', { gender: 'm', forms: ['primer', 'primera'] }],
      ['el último', 'de laatste', { gender: 'm', forms: ['última', 'últimos'] }],
      ['el servidor', 'de dienaar', { gender: 'm' }],
      ['recibir', 'ontvangen', { forms: ['reciba', 'recibe', 'recíbeme'] }],
      ['el brazo', 'de arm', { gender: 'm', forms: ['brazos'] }],
    ],
    section: [
      ['MAR 9:33', 'Ze kwamen in Kafarnaüm, en toen ze in huis waren vroeg Hij hun: Waarover hadden jullie het onderweg?'],
      ['MAR 9:34', 'Maar ze zwegen, want onderweg hadden ze met elkaar besproken wie de grootste was.'],
      ['MAR 9:35', 'Hij ging zitten, riep de twaalf en zei tegen hen: Als iemand de eerste wil zijn, moet hij de laatste zijn en de dienaar van allen.'],
      ['MAR 9:36', 'Hij nam een kind, zette het in hun midden, nam het in zijn armen en zei tegen hen:'],
      ['MAR 9:37', 'Wie zo’n kind ontvangt in mijn Naam, ontvangt Mij. En wie Mij ontvangt, ontvangt niet Mij, maar Hem die Mij gestuurd heeft.'],
    ],
    gaps: ['discutían', 'callaban', 'mayor', 'primero', 'último', 'servidor', 'brazos', 'reciba'],
    sentences: [2],
    excerpts: [['Pero ellos callaban.', 'Maar ze zwegen.']],
    questions: [
      ['Waarover hadden de leerlingen onderweg ruzie?', ['Wie de grootste was', 'Wie het brood had', 'Waar ze zouden slapen'], 0],
      ['Wie is volgens Jezus de eerste?', ['Wie de dienaar van allen is', 'Wie het rijkst is', 'Wie het oudst is'], 0],
      ['Wat nam Jezus in zijn armen?', ['Een kind', 'Een lam', 'Een brood'], 0],
    ],
  },
  {
    chapter: 10,
    title: 'Laat de kinderen bij Mij komen',
    summary:
      'Jezus zegt: laat de kinderen bij Mij komen, want van hen is het koninkrijk van God. Een rijke man vraagt wat hij moet doen om eeuwig leven te krijgen. Jezus zegt dat Hij niet gekomen is om gediend te worden, maar om te dienen. In Jericho geneest Hij de blinde Bartimeüs.',
    words: [
      ['impedir', 'tegenhouden', { forms: ['impidan', 'impide'], altNl: ['verhinderen'] }],
      ['indignarse', 'boos worden', { forms: ['indignó', 'indignaron'], altNl: ['verontwaardigd worden'] }],
      ['en verdad', 'echt, voorwaar', { altNl: ['echt', 'voorwaar', 'werkelijk'] }],
      ['bendecir', 'zegenen', { forms: ['bendecía', 'bendijo'] }],
      ['rico', 'rijk', { forms: ['ricos', 'rica'] }],
      ['servir', 'dienen', { forms: ['servido', 'sirve'] }],
      ['vender', 'verkopen', { forms: ['vende', 'vendió'] }],
      ['el tesoro', 'de schat', { gender: 'm' }],
      ['difícil', 'moeilijk'],
    ],
    section: [
      ['MAR 10:13', 'Ze brachten kinderen bij Hem, zodat Hij ze zou aanraken, maar de leerlingen bestraften degenen die ze brachten.'],
      ['MAR 10:14', 'Toen Jezus dat zag, werd Hij boos en zei: Laat de kinderen bij Mij komen. Houd ze niet tegen, want van hen is het koninkrijk van God.'],
      ['MAR 10:15', 'Echt, Ik zeg jullie: wie het koninkrijk van God niet ontvangt als een kind, komt er zeker niet in.'],
      ['MAR 10:16', 'Hij nam ze in zijn armen, zegende ze en legde zijn handen op hen.'],
    ],
    gaps: ['niños', 'indignó', 'Dejen', 'impidan', 'verdad', 'bendecía'],
    sentences: [2],
    excerpts: [['Dejen que los niños vengan a Mí.', 'Laat de kinderen bij Mij komen.']],
    questions: [
      ['Wat deden de leerlingen met de kinderen?', ['Ze hielden ze tegen', 'Ze speelden met ze', 'Ze gaven ze eten'], 0],
      ['Van wie is het koninkrijk van God volgens Jezus?', ['Van mensen zoals deze kinderen', 'Van de rijken', 'Van de priesters'], 0],
      ['Wie wordt aan het eind van het hoofdstuk genezen?', ['De blinde Bartimeüs', 'Een dove man', 'Een verlamde'], 0],
    ],
  },
  {
    chapter: 11,
    title: 'Intocht in Jeruzalem',
    summary:
      'Jezus rijdt op een ezelsveulen Jeruzalem binnen. De mensen leggen hun mantels en takken op de weg en roepen: Hosanna! In de tempel gooit Jezus de tafels van de geldwisselaars om: Mijn huis zal een huis van gebed heten.',
    words: [
      ['el pollino', 'het ezelsveulen', { gender: 'm', altNl: ['het veulen', 'de jonge ezel'] }],
      ['la ropa', 'de kleding', { gender: 'f', forms: ['ropas'], altNl: ['de mantel', 'de kleren'] }],
      ['extender', 'uitspreiden', { forms: ['extendieron'] }],
      ['la rama', 'de tak', { gender: 'f', forms: ['ramas'] }],
      ['el campo', 'het veld', { gender: 'm', forms: ['campos'] }],
      ['adelante', 'vooruit', { altNl: ['voorop', 'vooraan'] }],
      ['bendito', 'gezegend', { forms: ['Bendito', 'bendita'] }],
      ['el templo', 'de tempel', { gender: 'm' }],
      ['la oración', 'het gebed', { gender: 'f' }],
    ],
    section: [
      ['MAR 11:7', 'Ze brachten het veulen bij Jezus, legden hun mantels erop, en Hij ging erop zitten.'],
      ['MAR 11:8', 'Velen spreidden ook hun mantels uit op de weg, en anderen takken die ze van de velden hadden afgesneden.'],
      ['MAR 11:9', 'Zij die voorop liepen en zij die Hem volgden riepen: Hosanna! Gezegend Hij die komt in de Naam van de Heer!'],
      ['MAR 11:10', 'Gezegend het koninkrijk van onze vader David dat komt! Hosanna in de hoogste hemel!'],
    ],
    gaps: ['pollino', 'ropas', 'extendieron', 'ramas', 'campos', 'adelante', 'Bendito'],
    sentences: [1],
    excerpts: [['¡Bendito el que viene en Nombre del Señor!', 'Gezegend Hij die komt in de Naam van de Heer!']],
    questions: [
      ['Waarop reed Jezus Jeruzalem binnen?', ['Een ezelsveulen', 'Een paard', 'Een kameel'], 0],
      ['Wat legden de mensen op de weg?', ['Mantels en takken', 'Bloemen en brood', 'Stenen'], 0],
      ['Wat riepen de mensen?', ['Hosanna!', 'Kruisig Hem!', 'Wie is dat?'], 0],
    ],
  },
  {
    chapter: 12,
    title: 'Het offer van de weduwe',
    summary:
      'Jezus vertelt een gelijkenis over wijnbouwers. Op een vraag over belasting zegt Hij: Geef de keizer wat van de keizer is, en God wat van God is. Het grootste gebod is God liefhebben en je naaste als jezelf. Een arme weduwe geeft alles wat ze heeft.',
    words: [
      ['la ofrenda', 'het offer', { gender: 'f', forms: ['ofrendas'], altNl: ['de gift'] }],
      ['observar', 'kijken naar', { forms: ['observaba', 'observaban'], altNl: ['observeren', 'gadeslaan'] }],
      ['la gente', 'de mensen', { gender: 'f', altNl: ['het volk'] }],
      ['la viuda', 'de weduwe', { gender: 'f' }],
      ['más', 'meer'],
      ['los demás', 'de anderen', { altNl: ['de rest'] }],
      ['la abundancia', 'de overvloed', { gender: 'f' }],
      ['la pobreza', 'de armoede', { gender: 'f' }],
      ['el César', 'de keizer', { gender: 'm' }],
    ],
    section: [
      ['MAR 12:41', 'Toen Hij tegenover de offerkist zat, keek Hij hoe de mensen geld in de kist gooiden. En veel rijken gooiden er veel in.'],
      ['MAR 12:42', 'Er kwam een arme weduwe, die twee kleine muntjes erin gooide, samen een kwadrans.'],
      ['MAR 12:43', 'Hij riep zijn leerlingen en zei tegen hen: Echt, Ik zeg jullie dat deze arme weduwe meer heeft gegeven dan alle anderen.'],
      ['MAR 12:44', 'Want zij gaven allemaal van hun overvloed, maar zij gaf uit haar armoede alles wat ze had, alles waarvan ze moest leven.'],
    ],
    gaps: ['ofrendas', 'observaba', 'gente', 'viuda', 'más', 'demás', 'abundancia', 'pobreza'],
    sentences: [],
    excerpts: [
      ['Esta pobre viuda echó más que los demás.', 'Deze arme weduwe heeft meer gegeven dan de anderen.'],
      ['Llegó una viuda pobre.', 'Er kwam een arme weduwe.'],
    ],
    questions: [
      ['Hoeveel muntjes gaf de weduwe?', ['Eén', 'Twee', 'Tien'], 1],
      ['Waarom gaf zij volgens Jezus het meest?', ['Ze gaf alles wat ze had', 'Haar munten waren van goud', 'Ze gaf als eerste'], 0],
      ['Wat is volgens Jezus het grootste gebod?', ['God en je naaste liefhebben', 'Belasting betalen', 'Elke dag naar de tempel gaan'], 0],
    ],
  },
  {
    chapter: 13,
    title: 'Wees waakzaam',
    summary:
      'Jezus zegt dat de tempel verwoest zal worden en dat er moeilijke tijden komen, met oorlogen en valse profeten. Laat je niet misleiden. Niemand weet de dag of het uur, behalve de Vader. Daarom: wees waakzaam.',
    words: [
      ['la hora', 'het uur', { gender: 'f' }],
      ['saber', 'weten', { forms: ['sabe', 'saben', 'sé'] }],
      ['alerta', 'waakzaam', { altNl: ['alert'] }],
      ['cuándo', 'wanneer'],
      ['el fin', 'het einde', { gender: 'm' }],
      ['la guerra', 'de oorlog', { gender: 'f', forms: ['guerras'] }],
      ['falso', 'vals', { forms: ['falsos', 'falsa'] }],
      ['engañar', 'misleiden', { forms: ['engañe', 'engañarán'], altNl: ['bedriegen'] }],
    ],
    section: [
      ['MAR 13:31', 'De hemel en de aarde zullen voorbijgaan, maar mijn woorden zullen zeker niet voorbijgaan.'],
      ['MAR 13:32', 'Maar over die dag of dat uur weet niemand iets, ook de engelen in de hemel niet, en ook de Zoon niet, maar alleen de Vader.'],
      ['MAR 13:33', 'Pas op, wees waakzaam, want jullie weten niet wanneer het zover is.'],
    ],
    gaps: ['pasarán', 'palabras', 'hora', 'sabe', 'alerta', 'saben', 'cuándo'],
    sentences: [0, 2],
    questions: [
      ['Wie weet de dag en het uur?', ['Alleen de Vader', 'De engelen', 'De leerlingen'], 0],
      ['Wat zal nooit voorbijgaan?', ['De woorden van Jezus', 'De tempel', 'De hemel en de aarde'], 0],
      ['Wat moeten we volgens Jezus doen?', ['Waakzaam zijn', 'Weggaan', 'Slapen'], 0],
    ],
  },
  {
    chapter: 14,
    title: 'Het laatste avondmaal',
    summary:
      'Een vrouw zalft Jezus met kostbare olie. Bij de Pesachmaaltijd deelt Jezus brood en wijn met zijn leerlingen: dit is mijn lichaam, dit is mijn bloed. In Getsemane bidt Hij, en Judas verraadt Hem. Petrus zegt drie keer dat hij Jezus niet kent.',
    words: [
      ['comer', 'eten', { forms: ['comían', 'comía', 'comen'] }],
      ['partir', 'breken', { forms: ['partió'], altNl: ['delen'] }],
      ['el cuerpo', 'het lichaam', { gender: 'm' }],
      ['la copa', 'de beker', { gender: 'f' }],
      ['beber', 'drinken', { forms: ['bebieron', 'beba', 'bebe'] }],
      ['la sangre', 'het bloed', { gender: 'f' }],
      ['el pacto', 'het verbond', { gender: 'm', forms: ['Pacto'] }],
      ['nuevo', 'nieuw', { forms: ['nueva', 'nuevos'] }],
      ['orar', 'bidden', { forms: ['oró', 'oren', 'oraba'] }],
      ['negar', 'ontkennen', { forms: ['negó', 'negarás'], altNl: ['verloochenen'] }],
    ],
    section: [
      ['MAR 14:22', 'Terwijl ze aten, nam Jezus een brood, dankte, brak het en zei: Neem, dit is mijn lichaam.'],
      ['MAR 14:23', 'Daarna nam Hij een beker, dankte en gaf hun die, en ze dronken er allemaal uit.'],
      ['MAR 14:24', 'En Hij zei: Dit is mijn bloed van het Verbond, dat voor velen vergoten wordt.'],
      ['MAR 14:25', 'Echt, Ik zeg jullie: Ik zal zeker niet meer drinken van de vrucht van de wijnstok tot die dag waarop Ik hem nieuw zal drinken in het koninkrijk van God.'],
    ],
    gaps: ['comían', 'partió', 'cuerpo', 'copa', 'bebieron', 'sangre', 'Pacto', 'nuevo'],
    sentences: [2],
    excerpts: [['Tomen, esto es mi cuerpo.', 'Neem, dit is mijn lichaam.']],
    questions: [
      ['Wat zei Jezus over het brood?', ['Dit is mijn lichaam', 'Dit is voor de armen', 'Eet het snel op'], 0],
      ['Hoe vaak zegt Petrus dat hij Jezus niet kent?', ['Eén keer', 'Drie keer', 'Zeven keer'], 1],
      ['Wie verraadt Jezus?', ['Judas', 'Petrus', 'Johannes'], 0],
    ],
  },
  {
    chapter: 15,
    title: 'De kruisiging',
    summary:
      'Pilatus verhoort Jezus en laat Hem, onder druk van de menigte, kruisigen. ’s Middags komt er duisternis over het land. Jezus roept: Mijn God, mijn God, waarom hebt U Mij verlaten? en sterft. Het voorhangsel van de tempel scheurt, en een Romeinse officier zegt: Werkelijk, deze Man was de Zoon van God.',
    words: [
      ['el mediodía', 'de middag', { gender: 'm', altNl: ['twaalf uur ’s middags'] }],
      ['la voz', 'de stem', { gender: 'f', forms: ['voces'] }],
      ['exclamar', 'uitroepen', { forms: ['exclamó', 'exclamación'], altNl: ['roepen'] }],
      ['desamparar', 'verlaten', { forms: ['desamparaste'], altNl: ['in de steek laten'] }],
      ['oír', 'horen', { forms: ['oírlo', 'oyó', 'oigan', 'oye'] }],
      ['expirar', 'sterven', { forms: ['expiró', 'expirado'], altNl: ['de laatste adem uitblazen'] }],
      ['el velo', 'het voorhangsel', { gender: 'm', altNl: ['het gordijn', 'de sluier'] }],
      ['verdaderamente', 'werkelijk', { forms: ['Verdaderamente'], altNl: ['echt', 'waarlijk'] }],
      ['crucificar', 'kruisigen', { forms: ['crucificado', 'crucifícalo', 'crucificaron'] }],
    ],
    section: [
      ['MAR 15:33', 'Toen het middag werd, kwam er duisternis over het hele land, tot drie uur ’s middags.'],
      ['MAR 15:34', 'Op dat uur riep Jezus met luide stem: Eloï, Eloï, lema sabachtani? Dat betekent: Mijn God, mijn God, waarom hebt U Mij verlaten?'],
      ['MAR 15:37', 'Maar Jezus slaakte een luide kreet en stierf.'],
      ['MAR 15:38', 'Het voorhangsel van het heiligdom scheurde in tweeën, van boven tot beneden.'],
      ['MAR 15:39', 'De officier die tegenover Hem stond, zag hoe Hij gestorven was en riep uit: Werkelijk, deze Man was de Zoon van God!'],
    ],
    gaps: ['mediodía', 'oscuridad', 'exclamó', 'voz', 'desamparaste', 'expiró', 'velo', 'Verdaderamente'],
    sentences: [2],
    excerpts: [['¡Verdaderamente este Hombre era Hijo de Dios!', 'Werkelijk, deze Man was de Zoon van God!']],
    questions: [
      ['Wat riep Jezus aan het kruis?', ['Mijn God, waarom hebt U Mij verlaten?', 'Ik heb dorst', 'Vader, vergeef hun'], 0],
      ['Wat gebeurde er met het voorhangsel van de tempel?', ['Het scheurde in tweeën', 'Het viel op de grond', 'Het werd verbrand'], 0],
      ['Wat zei de officier?', ['Werkelijk, deze Man was de Zoon van God', 'Hij was een profeet', 'Wie is deze man?'], 0],
    ],
  },
  {
    chapter: 16,
    title: 'Hij is opgestaan',
    summary:
      'Op de eerste dag van de week gaan drie vrouwen met geurige olie naar het graf. De steen is weggerold, en een jonge man in het wit zegt: Hij is opgewekt, Hij is niet hier, vertel het aan de leerlingen. De vrouwen vluchten weg, bevend van schrik. Deze vertaling eindigt hier, bij vers 8, zoals de oudste handschriften; het langere slot (verzen 9-20) staat er niet in.',
    words: [
      ['el joven', 'de jongeman', { gender: 'm', altNl: ['de jonge man'] }],
      ['la derecha', 'de rechterkant', { gender: 'f', altNl: ['rechts'] }],
      ['vestido', 'gekleed', { forms: ['vestida'] }],
      ['largo', 'lang', { forms: ['larga'] }],
      ['alarmarse', 'schrikken', { forms: ['alarmaron', 'alarmen'] }],
      ['huir', 'vluchten', { forms: ['huyeron', 'huyó'] }],
      ['el temblor', 'het beven', { gender: 'm', altNl: ['de schrik'] }],
      ['informar', 'vertellen', { forms: ['informaron'], altNl: ['melden', 'informeren'] }],
      ['predicar', 'prediken', { forms: ['prediquen', 'predicaron'], altNl: ['verkondigen'] }],
    ],
    section: [
      ['MAR 16:5', 'Ze gingen het graf binnen en zagen een jonge man rechts zitten, gekleed in een lange witte mantel, en ze schrokken.'],
      ['MAR 16:6', 'Maar hij zei tegen hen: Schrik niet. Jullie zoeken Jezus van Nazaret, die gekruisigd is. Hij is niet hier. Hij is opgewekt. Kijk, hier is de plek waar ze Hem gelegd hadden.'],
      ['MAR 16:7', 'Maar ga, en zeg tegen zijn leerlingen en tegen Petrus dat Hij jullie voorgaat naar Galilea. Daar zullen jullie Hem zien, zoals Hij jullie gezegd heeft.'],
      ['MAR 16:8', 'Ze gingen het graf uit en vluchtten, want ze beefden en waren buiten zichzelf. Ze vertelden niemand iets, want ze waren bang.'],
    ],
    gaps: ['joven', 'derecha', 'vestido', 'largo', 'alarmaron', 'huyeron', 'temblor', 'informaron'],
    sentences: [2],
    excerpts: [['No está aquí. Fue resucitado.', 'Hij is niet hier. Hij is opgewekt.']],
    questions: [
      ['Wie zagen de vrouwen in het graf?', ['Een jonge man in het wit', 'Jezus zelf', 'De bewakers'], 0],
      ['Wat zei hij tegen de vrouwen?', ['Hij is niet hier, Hij is opgewekt', 'Ga naar huis', 'Kom morgen terug'], 0],
      ['Wat deden de vrouwen daarna?', ['Ze vluchtten en waren bang', 'Ze bleven bij het graf', 'Ze gingen zingen'], 0],
    ],
  },
]

function markLesson(c: MarkChapter): Lesson {
  const id = `b3l${c.chapter}`
  const p: Passage = passage(`${id}-p`, `Marcos ${c.chapter}`, `Marcos ${c.chapter}`, c.section, c.gaps)
  return {
    id,
    title: `Marcos ${c.chapter}`,
    intro: c.title,
    words: words(id, c.words),
    sentences: verseSentences(id, p, c.sentences, c.excerpts),
    passage: p,
    chapter: { book: 'MAR', bookName: 'Marcos', chapter: c.chapter, summary: c.summary },
    reading: chapterQuestions(`${id}-r`, `Vragen bij Marcos ${c.chapter}`, c.questions),
  }
}

export const phase3: Unit[] = [
  { id: 'b3a', title: 'Fase 3 · Marcos 1-8', lessons: CHAPTERS.slice(0, 8).map(markLesson) },
  { id: 'b3b', title: 'Fase 3 · Marcos 9-16', lessons: CHAPTERS.slice(8).map(markLesson) },
]
