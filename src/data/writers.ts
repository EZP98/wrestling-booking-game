import { Writer } from '../types';

export const WRITERS: Writer[] = [
  { id:'wr1', name:'Tony Vanguard', role:'Head Writer (Raw)', level:4, morale:80,
    specialty:'Long-term storytelling', personality:'Metodico, preciso, odia i cambi dell\'ultimo minuto',
    trait:'I suoi archi narrativi sono i migliori ma ha bisogno di 8+ settimane per costruirli',
    bio:'Ex sceneggiatore HBO. Porta struttura narrativa in tre atti ad ogni feud. Tende a sotto-utilizzare il midcard perché si concentra troppo sul main event.',
    icon:'📝' },

  { id:'wr2', name:'Maria "Blaze" Cortez', role:'Head Writer (SmackDown)', level:4, morale:85,
    specialty:'Women\'s division & intergender storytelling', personality:'Aggressiva, innovativa, pushes boundaries',
    trait:'Le sue storyline femminili sono le migliori del business. Tende a creare drama backstage con altri writer.',
    bio:'Ex booker SHIMMER. La ragione per cui la Women\'s division è presa sul serio. Se la perdi, le donne perdono 20% quality in 4 settimane.',
    icon:'🔥' },

  { id:'wr3', name:'Jim "Old School" Patterson', role:'NXT Brand Writer', level:3, morale:75,
    specialty:'NXT Pipeline & talent development', personality:'Tradizionalista, lento, ma infallibile sui fondamentali',
    trait:'Ogni NXT star che passa per lui arriva main roster-ready. Odia il "sports entertainment" moderno.',
    bio:'Ex agent di Jim Ross. Conosce la psicologia del match come nessuno. I talent che sviluppa hanno +3 potentialGrowth rate. Ma se gli dai un main eventer, lo sottoutilizza.',
    icon:'🎩' },

  { id:'wr4', name:'Zack "Viral" Chen', role:'Social Media & Segments Writer', level:3, morale:90,
    specialty:'Viral moments & comedy segments', personality:'Iperattivo, Gen-Z, vive su Twitter/TikTok',
    trait:'Ogni segmento che scrive ha +30% social media traction. Pessimo con storyline serie.',
    bio:'Ex content creator diventato writer. Sa esattamente cosa diventa virale. R-Truth, Sami Zayn comedy, celebrity segments — il suo dominio. Non dargli mai un main event serio.',
    icon:'📱' },

  { id:'wr5', name:'Elena Volkov', role:'Tag & Stable Writer', level:3, morale:78,
    specialty:'Faction dynamics & tag team booking', personality:'Analitica, riservata, pensa in termini di gruppo',
    trait:'Le sue stable storyline hanno stabilità +20%. I tag match che prenota sono sempre +0.5 stelle.',
    bio:'Ex booker NJPW/Stardom per il mercato occidentale. Capisce la dinamica di gruppo meglio di chiunque. Le sue fazioni non implodono mai per caso — solo per scelta narrativa.',
    icon:'🕸️' },

  { id:'wr6', name:'Marcus "The Shark" DeLuca', role:'Contract Negotiator', level:4, morale:72,
    specialty:'Talent contracts & financial deals', personality:'Spietato, pragmatico, vede solo i numeri',
    trait:'Riduce i costi contrattuali del 15%. Ma i wrestler che negozia con lui perdono -5 morale.',
    bio:'Ex agente sportivo NBA. Sa come spremere ogni dollaro. I suoi contratti sono sempre vantaggiosi per la compagnia — ma i talent lo odiano.',
    icon:'🦈' },

  { id:'wr7', name:'Dave "The Agent" Mercer', role:'Match Agent', level:4, morale:82,
    specialty:'Match layout & in-ring psychology', personality:'Calmo, esperto, rispettato da tutti',
    trait:'I match che agenta sono +1 stella quality. Conosce i limiti fisici di ogni wrestler.',
    bio:'Ex wrestler mid-card diventato il miglior agent del business. Sa quando chiamare uno spot e quando lasciare improvvisare. I wrestler lo adorano perché li protegge.',
    icon:'🎬' },

  { id:'wr8', name:'Priya "Scout" Sharma', role:'Talent Scout', level:3, morale:88,
    specialty:'Indie & international talent discovery', personality:'Entusiasta, connessa globalmente, sempre in viaggio',
    trait:'Trova talenti indie 6 mesi prima della concorrenza. Specializzata in mercati Giappone, UK, Mexico.',
    bio:'Ex giornalista wrestling con contatti in NJPW, Progress, CMLL, NOAH. Ogni talent che scouta arriva con +2 overness rispetto al normale debutto.',
    icon:'🔭' },

  { id:'wr9', name:'Tommy "TV" Russo', role:'TV Producer', level:3, morale:70,
    specialty:'TV production & pacing', personality:'Stressato, perfezionista, ma sa fare TV',
    trait:'Il pacing degli show che produce è perfetto — nessun segmento morto. Ma brucia writer junior.',
    bio:'Ex produttore SNL e Late Night. Capisce il ritmo televisivo. I suoi show hanno sempre rating +5% rispetto alla media. Ma il backstage lo teme per le sue esplosioni.',
    icon:'📺' },

  { id:'wr10', name:'Carlos "Lucha" Mendez', role:'International Wrestling Consultant', level:3, morale:85,
    specialty:'Lucha libre & cross-promo booking', personality:'Appassionato, rispettoso delle tradizioni, ponte tra mondi',
    trait:'Ogni cross-promo AAA/Mexico che organizza ha +25% quality. Capisce la meccanica delle maschere.',
    bio:'Ex booker AAA e consulente CMLL. Senza di lui, la meccanica maschere non funziona. I match lucha che prenota sono autentici — non WWE-ificati.',
    icon:'🎭' },
];
