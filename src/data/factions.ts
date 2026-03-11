import { Faction } from '../types';

export const FACTIONS: Faction[] = [
  { id:'f1', name:'The Bloodline', brand:'SmackDown', leader:'Solo Sikoa',
    members:['w18','w27','w28'], alignment:'Heel', power:9, stability:6,
    story:'Civil War imminente — Roman Reigns vs Solo Sikoa per la leadership. Paul Heyman agente doppio tra le due fazioni. Jacob Fatu è il wildcard: il più pericoloso fisicamente ma il meno politico. Tama Tonga è il soldato fedele.',
    mechanic:'BLOODLINE CIVIL WAR: Quando Roman e Solo si incontrano, il crowd heat raddoppia. Il turn di un membro genera +25 overness immediato.' },

  { id:'f2', name:'Judgment Day', brand:'Raw', leader:'Finn Bálor',
    members:['w8','w7','w33'], alignment:'Heel', power:8, stability:7,
    story:'Dirty Dom è il membro più popolare ma il meno rispettato. Finn Bálor ha il potere ma Dominik ha i fan. Liv Morgan dentro come wild card. Power struggle latente.',
    mechanic:'JUDGMENT DAY NUMBERS GAME: Nei match 1v1, il membro JD può chiamare un run-in. 70% successo. 30% il face li batte tutti e il crowd esplode.' },

  { id:'f3', name:'Don Callis Family', brand:'AEW', leader:'Don Callis (manager)',
    members:['w62','w65'], alignment:'Heel', power:10, stability:6,
    story:'Takeshita vuole il world title. Okada ha già il palmarès. L\'ambizione interna è il punto debole. Kenny Omega return cambierebbe tutto — Don Callis ha tradito Omega per creare questa stable.',
    mechanic:'CALLIS MANIPULATION: Don Callis può interferire in QUALSIASI match AEW. +15% match controversy. Se Omega ritorna, la faction implode.' },

  { id:'f4', name:'Alpha Academy', brand:'Raw', leader:'Chad Gable',
    members:[], alignment:'Tweener', power:5, stability:8,
    story:'Chad Gable merita un push come singolo. La Academy è il veicolo — ma il pubblico vuole Gable campione, non manager. Elevation arc in corso.',
    mechanic:'MASTER GABLE: Ogni membro della Academy ottiene +5 in-ring per allenamento. Gable singolo = crowd pop automatico.' },

  { id:'f5', name:'No Quarter Catch Crew', brand:'NXT', leader:'Charlie Dempsey',
    members:['w105','w106'], alignment:'Heel', power:6, stability:8,
    story:'Il crew di tecnici puri di NXT. Dempsey è il call-up candidate più pronto. Myles Borne il successore. Lo stile catch-as-catch-can è la loro identità.',
    mechanic:'CATCH CLINIC: I loro match sono automaticamente +0.5 stelle quality. Il call-up di Dempsey porta il gimmick sul main roster.' },

  { id:'f6', name:'Best Friends', brand:'AEW', leader:'Orange Cassidy',
    members:['w66'], alignment:'Face', power:5, stability:9,
    story:'La comedy faction più amata. Orange Cassidy è il cuore — lazy genius che nasconde un wrestler eccellente. I Best Friends sono il comfort food del wrestling.',
    mechanic:'LAZY GENIUS: Orange Cassidy perde apposta i primi 5 minuti poi esplode. Il crowd pop della transizione = +20 segment rating.' },

  { id:'f7', name:'The Hardys', brand:'TNA', leader:'Matt Hardy',
    members:['w83','w84'], alignment:'Face', power:6, stability:5,
    story:'L\'ultimo run insieme. Jeff è fragile fisicamente. Matt è il cervello. Ogni match potrebbe essere l\'ultimo — e il pubblico lo sa. Nostalgia pura.',
    mechanic:'LAST RIDE: Ogni ladder match dei Hardys ha +30% crowd investment automatico. Se uno si infortuna, l\'altro ottiene +20 overness per sympathy.' },

  { id:'f8', name:'Los Vipers', brand:'AAA', leader:'Psycho Clown',
    members:['w96','w97'], alignment:'Face', power:7, stability:7,
    story:'La fazione mexicana classica. Psycho Clown è l\'icona. La meccanica maschere è centrale — perdere la maschera in AAA è peggio che perdere il titolo.',
    mechanic:'LUCHA HONOR: Se un membro perde una Lucha de Apuestas, la fazione ottiene +15 overness per vendetta arc. Se vince, +10 prestige permanente.' },
];
