import { Wrestler } from '../types';

export const WRESTLERS: Wrestler[] = [
  // ══════════════════════════════════════
  // RAW ROSTER
  // ══════════════════════════════════════
  { id:'w1', name:'CM Punk', brand:'Raw', gender:'Male', alignment:'Face', status:'Full Time',
    overness:95, inRing:90, mic:98, look:85, stamina:75, charisma:97, morale:80, popularity:96,
    salary:250, age:47, injuryRisk:45, injuryWeeks:0, finisher:'GTS', theme:'Cult of Personality',
    hometown:'Chicago, IL', style:'Technical', potentialGrowth:0, contractWeeks:104, flag:'🇺🇸' },

  { id:'w2', name:'Seth Rollins', brand:'Raw', gender:'Male', alignment:'Face', status:'Injured',
    overness:92, inRing:95, mic:88, look:90, stamina:85, charisma:90, morale:70, popularity:91,
    salary:220, age:39, injuryRisk:40, injuryWeeks:8, finisher:'Curb Stomp', theme:'Visionary',
    hometown:'Davenport, IA', style:'High Flyer', potentialGrowth:0, contractWeeks:156, flag:'🇺🇸' },

  { id:'w3', name:'Drew McIntyre', brand:'Raw', gender:'Male', alignment:'Heel', status:'Full Time',
    overness:88, inRing:88, mic:85, look:92, stamina:82, charisma:85, morale:75, popularity:87,
    salary:180, age:40, injuryRisk:30, injuryWeeks:0, finisher:'Claymore', theme:'Broken Dreams',
    hometown:'Ayr, Scotland', style:'Powerhouse', potentialGrowth:0, contractWeeks:130, flag:'🇬🇧' },

  { id:'w4', name:'Gunther', brand:'Raw', gender:'Male', alignment:'Heel', status:'Full Time',
    overness:90, inRing:94, mic:82, look:88, stamina:90, charisma:88, morale:85, popularity:89,
    salary:160, age:37, injuryRisk:20, injuryWeeks:0, finisher:'Powerbomb / Chop', theme:'Symphony No.9',
    hometown:'Vienna, Austria', style:'Technical', potentialGrowth:0, contractWeeks:156, flag:'🇦🇹' },

  { id:'w5', name:'Jey Uso', brand:'Raw', gender:'Male', alignment:'Face', status:'Full Time',
    overness:87, inRing:82, mic:78, look:83, stamina:85, charisma:90, morale:90, popularity:92,
    salary:150, age:38, injuryRisk:30, injuryWeeks:0, finisher:'Uso Splash', theme:'Main Event Jey',
    hometown:'San Francisco, CA', style:'High Flyer', potentialGrowth:0, contractWeeks:130, flag:'🇺🇸' },

  { id:'w6', name:'Damian Priest', brand:'Raw', gender:'Male', alignment:'Face', status:'Full Time',
    overness:83, inRing:80, mic:78, look:90, stamina:82, charisma:82, morale:78, popularity:82,
    salary:130, age:41, injuryRisk:25, injuryWeeks:0, finisher:'South of Heaven', theme:'Judgment',
    hometown:'New York, NY', style:'Powerhouse', potentialGrowth:0, contractWeeks:104, flag:'🇺🇸' },

  { id:'w7', name:'Dominik Mysterio', brand:'Raw', gender:'Male', alignment:'Heel', status:'Full Time',
    overness:82, inRing:72, mic:80, look:75, stamina:80, charisma:85, morale:85, popularity:84,
    salary:100, age:28, injuryRisk:20, injuryWeeks:0, finisher:'619 / Frog Splash', theme:'Dirty Dom',
    hometown:'San Diego, CA', style:'Showman', potentialGrowth:3, contractWeeks:156, flag:'🇺🇸' },

  { id:'w8', name:'Finn Bálor', brand:'Raw', gender:'Male', alignment:'Heel', status:'Full Time',
    overness:84, inRing:88, mic:75, look:88, stamina:78, charisma:85, morale:75, popularity:83,
    salary:140, age:44, injuryRisk:35, injuryWeeks:0, finisher:'Coup de Grâce', theme:'Demon King',
    faction:'Judgment Day', hometown:'Bray, Ireland', style:'Technical', potentialGrowth:0, contractWeeks:78, flag:'🇮🇪' },

  { id:'w9', name:'Sami Zayn', brand:'Raw', gender:'Male', alignment:'Face', status:'Full Time',
    overness:88, inRing:86, mic:92, look:72, stamina:80, charisma:93, morale:90, popularity:91,
    salary:140, age:39, injuryRisk:30, injuryWeeks:0, finisher:'Helluva Kick', theme:'Worlds Apart',
    hometown:'Montréal, QC', style:'Technical', potentialGrowth:0, contractWeeks:104, flag:'🇨🇦' },

  { id:'w10', name:'Bronson Reed', brand:'Raw', gender:'Male', alignment:'Heel', status:'Full Time',
    overness:75, inRing:78, mic:65, look:80, stamina:72, charisma:70, morale:80, popularity:73,
    salary:90, age:31, injuryRisk:30, injuryWeeks:0, finisher:'Tsunami', theme:'Colossus',
    hometown:'Melbourne, Australia', style:'Powerhouse', potentialGrowth:2, contractWeeks:130, flag:'🇦🇺' },

  { id:'w11', name:'Ludwig Kaiser', brand:'Raw', gender:'Male', alignment:'Heel', status:'Full Time',
    overness:72, inRing:82, mic:78, look:85, stamina:85, charisma:78, morale:82, popularity:70,
    salary:80, age:31, injuryRisk:15, injuryWeeks:0, finisher:'Kaiser Roll', theme:'Imperium',
    hometown:'Mannheim, Germany', style:'Technical', potentialGrowth:4, contractWeeks:156, flag:'🇩🇪' },

  { id:'w12', name:'Pete Dunne', brand:'Raw', gender:'Male', alignment:'Heel', status:'Full Time',
    overness:70, inRing:90, mic:70, look:75, stamina:85, charisma:72, morale:78, popularity:68,
    salary:75, age:28, injuryRisk:20, injuryWeeks:0, finisher:'Bitter End', theme:'Bruiserweight',
    hometown:'Birmingham, UK', style:'Technical', potentialGrowth:3, contractWeeks:104, flag:'🇬🇧' },

  { id:'w13', name:'Braun Strowman', brand:'Raw', gender:'Male', alignment:'Face', status:'Full Time',
    overness:80, inRing:68, mic:65, look:95, stamina:70, charisma:75, morale:75, popularity:79,
    salary:150, age:42, injuryRisk:35, injuryWeeks:0, finisher:'Running Powerslam', theme:'Monster Among Men',
    hometown:'Sherrills Ford, NC', style:'Powerhouse', potentialGrowth:0, contractWeeks:78, flag:'🇺🇸' },

  { id:'w14', name:'The Miz', brand:'Raw', gender:'Male', alignment:'Heel', status:'Part Time',
    overness:78, inRing:72, mic:92, look:82, stamina:70, charisma:90, morale:80, popularity:77,
    salary:120, age:44, injuryRisk:25, injuryWeeks:0, finisher:'Skull Crushing Finale', theme:'I Came to Play',
    hometown:'Cleveland, OH', style:'Showman', potentialGrowth:0, contractWeeks:52, flag:'🇺🇸' },

  { id:'w15', name:'R-Truth', brand:'Raw', gender:'Male', alignment:'Face', status:'Full Time',
    overness:75, inRing:65, mic:88, look:72, stamina:68, charisma:92, morale:95, popularity:80,
    salary:80, age:52, injuryRisk:30, injuryWeeks:0, finisher:'Lie Detector', theme:"What's Up",
    hometown:'Charlotte, NC', style:'Showman', potentialGrowth:0, contractWeeks:52, flag:'🇺🇸' },

  // ══════════════════════════════════════
  // SMACKDOWN ROSTER
  // ══════════════════════════════════════
  { id:'w16', name:'Cody Rhodes', brand:'SmackDown', gender:'Male', alignment:'Face', status:'Full Time',
    overness:97, inRing:88, mic:95, look:92, stamina:82, charisma:96, morale:95, popularity:98,
    salary:280, age:39, injuryRisk:25, injuryWeeks:0, finisher:'Cross Rhodes', theme:'Kingdom',
    titleId:'t1', hometown:'Marietta, GA', style:'Technical', potentialGrowth:0, contractWeeks:208, flag:'🇺🇸' },

  { id:'w17', name:'Roman Reigns', brand:'SmackDown', gender:'Male', alignment:'Tweener', status:'Part Time Legend',
    overness:98, inRing:85, mic:90, look:95, stamina:78, charisma:98, morale:85, popularity:97,
    salary:350, age:40, injuryRisk:30, injuryWeeks:0, finisher:'Spear', theme:'Head of the Table',
    faction:'Bloodline', hometown:'Pensacola, FL', style:'Powerhouse', potentialGrowth:0, contractWeeks:52, flag:'🇺🇸' },

  { id:'w18', name:'Solo Sikoa', brand:'SmackDown', gender:'Male', alignment:'Heel', status:'Full Time',
    overness:82, inRing:78, mic:72, look:85, stamina:82, charisma:78, morale:80, popularity:80,
    salary:120, age:31, injuryRisk:20, injuryWeeks:0, finisher:'Samoan Spike', theme:'Tribal Heir',
    faction:'Bloodline', hometown:'San Francisco, CA', style:'Brawler', potentialGrowth:4, contractWeeks:156, flag:'🇺🇸' },

  { id:'w19', name:'Kevin Owens', brand:'SmackDown', gender:'Male', alignment:'Tweener', status:'Full Time',
    overness:88, inRing:90, mic:92, look:70, stamina:78, charisma:90, morale:80, popularity:88,
    salary:160, age:40, injuryRisk:30, injuryWeeks:0, finisher:'Stunner', theme:'Fight Owens Fight',
    hometown:'Marieville, QC', style:'Brawler', potentialGrowth:0, contractWeeks:104, flag:'🇨🇦' },

  { id:'w20', name:'LA Knight', brand:'SmackDown', gender:'Male', alignment:'Face', status:'Full Time',
    overness:85, inRing:78, mic:90, look:85, stamina:80, charisma:92, morale:88, popularity:88,
    salary:130, age:41, injuryRisk:20, injuryWeeks:0, finisher:'BFT', theme:'YEAH!',
    hometown:'Woodland Hills, CA', style:'Showman', potentialGrowth:0, contractWeeks:130, flag:'🇺🇸' },

  { id:'w21', name:'Penta', brand:'SmackDown', gender:'Male', alignment:'Face', status:'Full Time',
    overness:83, inRing:92, mic:75, look:88, stamina:82, charisma:82, morale:85, popularity:84,
    salary:130, age:39, injuryRisk:35, injuryWeeks:0, finisher:'Penta Driver', theme:'Zero Fear',
    titleId:'t3', hometown:'Mexico City, MX', style:'High Flyer', potentialGrowth:0, contractWeeks:130, flag:'🇲🇽' },

  { id:'w22', name:'Andrade', brand:'SmackDown', gender:'Male', alignment:'Tweener', status:'Full Time',
    overness:78, inRing:90, mic:72, look:90, stamina:82, charisma:78, morale:75, popularity:76,
    salary:110, age:34, injuryRisk:25, injuryWeeks:0, finisher:'La Sombra', theme:'El Idolo',
    hometown:'Gómez Palacio, MX', style:'High Flyer', potentialGrowth:1, contractWeeks:104, flag:'🇲🇽' },

  { id:'w23', name:'Jimmy Uso', brand:'SmackDown', gender:'Male', alignment:'Face', status:'Full Time',
    overness:80, inRing:80, mic:75, look:82, stamina:78, charisma:82, morale:78, popularity:80,
    salary:130, age:38, injuryRisk:30, injuryWeeks:0, finisher:'Uso Splash', theme:'Day One',
    hometown:'San Francisco, CA', style:'High Flyer', potentialGrowth:0, contractWeeks:104, flag:'🇺🇸' },

  { id:'w24', name:'Randy Orton', brand:'SmackDown', gender:'Male', alignment:'Tweener', status:'Part Time',
    overness:92, inRing:88, mic:85, look:90, stamina:72, charisma:90, morale:80, popularity:92,
    salary:200, age:46, injuryRisk:40, injuryWeeks:0, finisher:'RKO', theme:'Voices',
    hometown:'St. Louis, MO', style:'Technical', potentialGrowth:0, contractWeeks:52, flag:'🇺🇸' },

  { id:'w25', name:'Santos Escobar', brand:'SmackDown', gender:'Male', alignment:'Heel', status:'Full Time',
    overness:75, inRing:85, mic:80, look:82, stamina:82, charisma:80, morale:78, popularity:74,
    salary:90, age:34, injuryRisk:20, injuryWeeks:0, finisher:'Phantom Driver', theme:'Santos',
    hometown:'Mexico City, MX', style:'Technical', potentialGrowth:2, contractWeeks:130, flag:'🇲🇽' },

  { id:'w26', name:'Carmelo Hayes', brand:'SmackDown', gender:'Male', alignment:'Heel', status:'Full Time',
    overness:72, inRing:82, mic:80, look:85, stamina:85, charisma:82, morale:78, popularity:72,
    salary:80, age:29, injuryRisk:15, injuryWeeks:0, finisher:'Nothing But Net', theme:'Him',
    hometown:'Boston, MA', style:'High Flyer', potentialGrowth:5, contractWeeks:156, flag:'🇺🇸' },

  { id:'w27', name:'Tama Tonga', brand:'SmackDown', gender:'Male', alignment:'Heel', status:'Full Time',
    overness:68, inRing:75, mic:65, look:80, stamina:80, charisma:68, morale:82, popularity:66,
    salary:80, age:40, injuryRisk:25, injuryWeeks:0, finisher:'Gun Stun', theme:'Guerrillas of Destiny',
    faction:'Bloodline', hometown:'Tampa, FL', style:'Brawler', potentialGrowth:0, contractWeeks:104, flag:'🇺🇸' },

  { id:'w28', name:'Jacob Fatu', brand:'SmackDown', gender:'Male', alignment:'Heel', status:'Full Time',
    overness:78, inRing:85, mic:60, look:88, stamina:85, charisma:72, morale:85, popularity:78,
    salary:100, age:31, injuryRisk:20, injuryWeeks:0, finisher:'Moonsault / Samoan Drop', theme:'Samoan Werewolf',
    faction:'Bloodline', hometown:'San Francisco, CA', style:'Powerhouse', potentialGrowth:5, contractWeeks:156, flag:'🇺🇸' },

  // ══════════════════════════════════════
  // WOMEN'S — RAW
  // ══════════════════════════════════════
  { id:'w30', name:'Rhea Ripley', brand:'Raw', gender:'Female', alignment:'Tweener', status:'Full Time',
    overness:93, inRing:88, mic:85, look:95, stamina:85, charisma:92, morale:85, popularity:94,
    salary:180, age:28, injuryRisk:25, injuryWeeks:0, finisher:'Riptide', theme:'Mami',
    hometown:'Adelaide, Australia', style:'Powerhouse', potentialGrowth:1, contractWeeks:156, flag:'🇦🇺' },

  { id:'w31', name:'Becky Lynch', brand:'Raw', gender:'Female', alignment:'Face', status:'Full Time',
    overness:92, inRing:85, mic:95, look:88, stamina:80, charisma:95, morale:82, popularity:93,
    salary:200, age:39, injuryRisk:30, injuryWeeks:0, finisher:'Dis-Arm-Her', theme:'The Man',
    hometown:'Dublin, Ireland', style:'Technical', potentialGrowth:0, contractWeeks:104, flag:'🇮🇪' },

  { id:'w32', name:'Bianca Belair', brand:'Raw', gender:'Female', alignment:'Face', status:'Full Time',
    overness:87, inRing:85, mic:78, look:92, stamina:90, charisma:85, morale:82, popularity:86,
    salary:150, age:35, injuryRisk:20, injuryWeeks:0, finisher:'KOD', theme:'EST',
    hometown:'Knoxville, TN', style:'Powerhouse', potentialGrowth:1, contractWeeks:130, flag:'🇺🇸' },

  { id:'w33', name:'Liv Morgan', brand:'Raw', gender:'Female', alignment:'Heel', status:'Full Time',
    overness:82, inRing:78, mic:78, look:88, stamina:82, charisma:82, morale:80, popularity:82,
    salary:110, age:30, injuryRisk:20, injuryWeeks:0, finisher:'Oblivion', theme:'Revenge',
    hometown:'Elmwood Park, NJ', style:'High Flyer', potentialGrowth:2, contractWeeks:130, flag:'🇺🇸' },

  { id:'w34', name:'IYO SKY', brand:'Raw', gender:'Female', alignment:'Tweener', status:'Full Time',
    overness:82, inRing:95, mic:68, look:85, stamina:85, charisma:78, morale:80, popularity:80,
    salary:110, age:34, injuryRisk:25, injuryWeeks:0, finisher:'Over The Moonsault', theme:'Genius of the Sky',
    hometown:'Tokyo, Japan', style:'High Flyer', potentialGrowth:0, contractWeeks:104, flag:'🇯🇵' },

  { id:'w35', name:'Nia Jax', brand:'Raw', gender:'Female', alignment:'Heel', status:'Full Time',
    overness:75, inRing:65, mic:70, look:80, stamina:68, charisma:70, morale:72, popularity:72,
    salary:120, age:40, injuryRisk:30, injuryWeeks:0, finisher:'Annihilator', theme:'Not Like Most Girls',
    hometown:'Sydney, Australia', style:'Powerhouse', potentialGrowth:0, contractWeeks:78, flag:'🇦🇺' },

  { id:'w36', name:'AJ Lee', brand:'Raw', gender:'Female', alignment:'Face', status:'Returned',
    overness:85, inRing:80, mic:90, look:82, stamina:75, charisma:92, morale:90, popularity:87,
    salary:150, age:39, injuryRisk:35, injuryWeeks:0, finisher:'Black Widow', theme:'Lets Light It Up',
    titleId:'t8', hometown:'Union City, NJ', style:'Technical', potentialGrowth:0, contractWeeks:52, flag:'🇺🇸' },

  // ══════════════════════════════════════
  // WOMEN'S — SMACKDOWN
  // ══════════════════════════════════════
  { id:'w37', name:'Tiffany Stratton', brand:'SmackDown', gender:'Female', alignment:'Heel', status:'Full Time',
    overness:80, inRing:82, mic:78, look:92, stamina:85, charisma:82, morale:85, popularity:80,
    salary:90, age:25, injuryRisk:15, injuryWeeks:0, finisher:'Prettiest Moonsault Ever', theme:'Its Tiffy Time',
    titleId:'t7', hometown:'Prior Lake, MN', style:'High Flyer', potentialGrowth:6, contractWeeks:208, flag:'🇺🇸' },

  { id:'w38', name:'Bayley', brand:'SmackDown', gender:'Female', alignment:'Tweener', status:'Full Time',
    overness:85, inRing:85, mic:85, look:78, stamina:80, charisma:88, morale:80, popularity:84,
    salary:140, age:35, injuryRisk:25, injuryWeeks:0, finisher:'Rose Plant', theme:'Role Model',
    hometown:'San Jose, CA', style:'Technical', potentialGrowth:0, contractWeeks:104, flag:'🇺🇸' },

  { id:'w39', name:'Naomi', brand:'SmackDown', gender:'Female', alignment:'Face', status:'Full Time',
    overness:75, inRing:78, mic:72, look:85, stamina:82, charisma:78, morale:78, popularity:76,
    salary:100, age:37, injuryRisk:25, injuryWeeks:0, finisher:'Rear View', theme:'Glow',
    hometown:'Pensacola, FL', style:'High Flyer', potentialGrowth:0, contractWeeks:78, flag:'🇺🇸' },

  { id:'w40', name:'Charlotte Flair', brand:'SmackDown', gender:'Female', alignment:'Heel', status:'Part Time',
    overness:88, inRing:90, mic:82, look:92, stamina:78, charisma:85, morale:70, popularity:86,
    salary:200, age:40, injuryRisk:35, injuryWeeks:0, finisher:'Figure Eight', theme:'The Queen',
    hometown:'Charlotte, NC', style:'Technical', potentialGrowth:0, contractWeeks:52, flag:'🇺🇸' },

  // ══════════════════════════════════════
  // LEGENDS / PART TIME
  // ══════════════════════════════════════
  { id:'w50', name:'John Cena', brand:'Raw', gender:'Male', alignment:'Face', status:'Part Time Legend',
    overness:97, inRing:75, mic:92, look:90, stamina:70, charisma:97, morale:95, popularity:98,
    salary:400, age:48, injuryRisk:40, injuryWeeks:0, finisher:'Attitude Adjustment', theme:'The Time Is Now',
    hometown:'West Newbury, MA', style:'Showman', potentialGrowth:0, contractWeeks:26, flag:'🇺🇸' },

  { id:'w51', name:'The Rock', brand:'SmackDown', gender:'Male', alignment:'Tweener', status:'Legend Speciale',
    overness:99, inRing:72, mic:99, look:95, stamina:65, charisma:99, morale:90, popularity:99,
    salary:500, age:53, injuryRisk:50, injuryWeeks:0, finisher:"Rock Bottom / People's Elbow", theme:'Electrifying',
    hometown:'Miami, FL', style:'Showman', potentialGrowth:0, contractWeeks:8, flag:'🇺🇸' },

  { id:'w52', name:'Brock Lesnar', brand:'SmackDown', gender:'Male', alignment:'Tweener', status:'Retired/Return',
    overness:95, inRing:88, mic:65, look:98, stamina:80, charisma:85, morale:70, popularity:94,
    salary:350, age:48, injuryRisk:35, injuryWeeks:0, finisher:'F-5', theme:'Next Big Thing',
    hometown:'Webster, SD', style:'Powerhouse', potentialGrowth:0, contractWeeks:12, flag:'🇺🇸' },

  { id:'w53', name:'The Undertaker', brand:'Raw', gender:'Male', alignment:'Face', status:'Retired/Return',
    overness:96, inRing:55, mic:80, look:95, stamina:40, charisma:98, morale:85, popularity:96,
    salary:300, age:60, injuryRisk:70, injuryWeeks:0, finisher:'Tombstone Piledriver', theme:'Rest in Peace',
    hometown:'Houston, TX', style:'Powerhouse', potentialGrowth:0, contractWeeks:4, flag:'🇺🇸' },

  // ══════════════════════════════════════
  // AEW ROSTER
  // ══════════════════════════════════════
  { id:'w60', name:'MJF', brand:'AEW', gender:'Male', alignment:'Heel', status:'Full Time',
    overness:92, inRing:82, mic:97, look:88, stamina:80, charisma:95, morale:75, popularity:90,
    salary:200, age:28, injuryRisk:15, injuryWeeks:0, finisher:'Double Cross', theme:'Better Than You',
    hometown:'Long Island, NY', style:'Showman', potentialGrowth:2, contractWeeks:156, flag:'🇺🇸' },

  { id:'w61', name:'Will Ospreay', brand:'AEW', gender:'Male', alignment:'Face', status:'Full Time',
    overness:88, inRing:98, mic:80, look:85, stamina:85, charisma:85, morale:82, popularity:87,
    salary:180, age:31, injuryRisk:40, injuryWeeks:0, finisher:'Hidden Blade / Storm Driver', theme:'Aerial Assassin',
    hometown:'Havant, UK', style:'High Flyer', potentialGrowth:1, contractWeeks:130, flag:'🇬🇧' },

  { id:'w62', name:'Kazuchika Okada', brand:'AEW', gender:'Male', alignment:'Heel', status:'Full Time',
    overness:85, inRing:95, mic:72, look:90, stamina:82, charisma:85, morale:78, popularity:83,
    salary:180, age:37, injuryRisk:25, injuryWeeks:0, finisher:'Rainmaker', theme:'Rainmaker',
    faction:'Don Callis Family', hometown:'Anjō, Japan', style:'Technical', potentialGrowth:0, contractWeeks:130, flag:'🇯🇵' },

  { id:'w63', name:'Jon Moxley', brand:'AEW', gender:'Male', alignment:'Tweener', status:'Full Time',
    overness:90, inRing:85, mic:90, look:82, stamina:78, charisma:90, morale:80, popularity:89,
    salary:180, age:40, injuryRisk:35, injuryWeeks:0, finisher:'Death Rider / Paradigm Shift', theme:'Wild Thing',
    hometown:'Cincinnati, OH', style:'Brawler', potentialGrowth:0, contractWeeks:104, flag:'🇺🇸' },

  { id:'w64', name:'Swerve Strickland', brand:'AEW', gender:'Male', alignment:'Tweener', status:'Full Time',
    overness:82, inRing:88, mic:82, look:85, stamina:85, charisma:85, morale:82, popularity:81,
    salary:130, age:33, injuryRisk:20, injuryWeeks:0, finisher:'Swerve Stomp', theme:'Whose House',
    hometown:'Tacoma, WA', style:'High Flyer', potentialGrowth:3, contractWeeks:130, flag:'🇺🇸' },

  { id:'w65', name:'Konosuke Takeshita', brand:'AEW', gender:'Male', alignment:'Heel', status:'Full Time',
    overness:78, inRing:92, mic:60, look:88, stamina:90, charisma:72, morale:85, popularity:76,
    salary:100, age:29, injuryRisk:20, injuryWeeks:0, finisher:'Blue Thunder Bomb', theme:'Don Callis Special',
    faction:'Don Callis Family', hometown:'Tokyo, Japan', style:'Powerhouse', potentialGrowth:5, contractWeeks:156, flag:'🇯🇵' },

  { id:'w66', name:'Orange Cassidy', brand:'AEW', gender:'Male', alignment:'Face', status:'Full Time',
    overness:80, inRing:82, mic:85, look:72, stamina:78, charisma:88, morale:85, popularity:82,
    salary:110, age:34, injuryRisk:20, injuryWeeks:0, finisher:'Orange Punch', theme:'Freshly Squeezed',
    hometown:'Wherever', style:'Showman', potentialGrowth:0, contractWeeks:104, flag:'🇺🇸' },

  { id:'w67', name:'Hangman Adam Page', brand:'AEW', gender:'Male', alignment:'Tweener', status:'Full Time',
    overness:82, inRing:88, mic:78, look:82, stamina:82, charisma:80, morale:72, popularity:80,
    salary:140, age:34, injuryRisk:25, injuryWeeks:0, finisher:'Buckshot Lariat', theme:'Anxious Millennial Cowboy',
    hometown:'Richmond, VA', style:'Brawler', potentialGrowth:0, contractWeeks:104, flag:'🇺🇸' },

  { id:'w68', name:'Thekla', brand:'AEW', gender:'Female', alignment:'Heel', status:'Full Time',
    overness:72, inRing:80, mic:68, look:82, stamina:82, charisma:75, morale:80, popularity:70,
    salary:70, age:26, injuryRisk:20, injuryWeeks:0, finisher:'Supernova', theme:'Queen of the Underworld',
    hometown:'Tokyo, Japan', style:'High Flyer', potentialGrowth:5, contractWeeks:130, flag:'🇯🇵' },

  { id:'w69', name:'Mariah May', brand:'AEW', gender:'Female', alignment:'Heel', status:'Full Time',
    overness:78, inRing:80, mic:75, look:90, stamina:82, charisma:80, morale:82, popularity:76,
    salary:80, age:27, injuryRisk:15, injuryWeeks:0, finisher:'May Day', theme:'Glamour',
    hometown:'Teddington, UK', style:'Technical', potentialGrowth:5, contractWeeks:130, flag:'🇬🇧' },

  { id:'w70', name:'FTR - Dax Harwood', brand:'AEW', gender:'Male', alignment:'Face', status:'Full Time',
    overness:80, inRing:90, mic:78, look:78, stamina:80, charisma:78, morale:78, popularity:79,
    salary:110, age:34, injuryRisk:25, injuryWeeks:0, finisher:'Shatter Machine', theme:'FTR',
    hometown:'Pinehurst, NC', style:'Technical', potentialGrowth:0, contractWeeks:78, flag:'🇺🇸' },

  { id:'w71', name:'FTR - Cash Wheeler', brand:'AEW', gender:'Male', alignment:'Face', status:'Full Time',
    overness:78, inRing:88, mic:72, look:78, stamina:80, charisma:75, morale:78, popularity:77,
    salary:100, age:34, injuryRisk:25, injuryWeeks:0, finisher:'Shatter Machine', theme:'FTR',
    hometown:'Asheboro, NC', style:'Technical', potentialGrowth:0, contractWeeks:78, flag:'🇺🇸' },

  // ══════════════════════════════════════
  // TNA ROSTER
  // ══════════════════════════════════════
  { id:'w80', name:'Mike Santana', brand:'TNA', gender:'Male', alignment:'Face', status:'Full Time',
    overness:75, inRing:82, mic:78, look:82, stamina:82, charisma:80, morale:85, popularity:73,
    salary:70, age:33, injuryRisk:20, injuryWeeks:0, finisher:'Spin the Block', theme:'Santana',
    hometown:'Brooklyn, NY', style:'Brawler', potentialGrowth:3, contractWeeks:104, flag:'🇺🇸' },

  { id:'w81', name:'Joe Hendry', brand:'TNA', gender:'Male', alignment:'Face', status:'Full Time',
    overness:78, inRing:75, mic:85, look:82, stamina:80, charisma:88, morale:88, popularity:80,
    salary:70, age:34, injuryRisk:15, injuryWeeks:0, finisher:'Standing Ovation', theme:'I Believe in Joe Hendry',
    hometown:'Edinburgh, Scotland', style:'Showman', potentialGrowth:4, contractWeeks:104, flag:'🇬🇧' },

  { id:'w82', name:'Nic Nemeth', brand:'TNA', gender:'Male', alignment:'Face', status:'Full Time',
    overness:80, inRing:85, mic:82, look:82, stamina:78, charisma:82, morale:80, popularity:78,
    salary:80, age:44, injuryRisk:30, injuryWeeks:0, finisher:'Danger Zone', theme:'Nic Nemeth',
    hometown:'Hollywood, FL', style:'Technical', potentialGrowth:0, contractWeeks:78, flag:'🇺🇸' },

  { id:'w83', name:'Matt Hardy', brand:'TNA', gender:'Male', alignment:'Face', status:'Part Time Legend',
    overness:75, inRing:65, mic:78, look:70, stamina:60, charisma:80, morale:78, popularity:75,
    salary:60, age:50, injuryRisk:50, injuryWeeks:0, finisher:'Twist of Fate', theme:'The Hardy Boyz',
    hometown:'Cameron, NC', style:'Brawler', potentialGrowth:0, contractWeeks:52, flag:'🇺🇸' },

  { id:'w84', name:'Jeff Hardy', brand:'TNA', gender:'Male', alignment:'Face', status:'Part Time Legend',
    overness:82, inRing:72, mic:68, look:80, stamina:60, charisma:85, morale:72, popularity:82,
    salary:70, age:47, injuryRisk:55, injuryWeeks:0, finisher:'Swanton Bomb', theme:'No More Words',
    hometown:'Cameron, NC', style:'High Flyer', potentialGrowth:0, contractWeeks:52, flag:'🇺🇸' },

  { id:'w85', name:'Arianna Grace', brand:'TNA', gender:'Female', alignment:'Heel', status:'Full Time',
    overness:65, inRing:70, mic:72, look:85, stamina:78, charisma:72, morale:80, popularity:63,
    salary:40, age:24, injuryRisk:10, injuryWeeks:0, finisher:'Grace Note', theme:'Pageant Queen',
    hometown:'Stamford, CT', style:'Showman', potentialGrowth:5, contractWeeks:130, flag:'🇺🇸' },

  // ══════════════════════════════════════
  // ROH ROSTER
  // ══════════════════════════════════════
  { id:'w90', name:'Bandido', brand:'ROH', gender:'Male', alignment:'Face', status:'Full Time',
    overness:72, inRing:90, mic:65, look:82, stamina:82, charisma:72, morale:80, popularity:70,
    salary:60, age:29, injuryRisk:25, injuryWeeks:0, finisher:'21 Plex', theme:'Bandido',
    hometown:'Torreón, MX', style:'High Flyer', potentialGrowth:4, contractWeeks:104, flag:'🇲🇽' },

  { id:'w91', name:'Mark Briscoe', brand:'ROH', gender:'Male', alignment:'Face', status:'Full Time',
    overness:75, inRing:85, mic:75, look:72, stamina:80, charisma:78, morale:85, popularity:74,
    salary:60, age:40, injuryRisk:30, injuryWeeks:0, finisher:'Froggy Bow', theme:'Dem Boys',
    hometown:'Sandy Fork, DE', style:'Brawler', potentialGrowth:0, contractWeeks:78, flag:'🇺🇸' },

  // ══════════════════════════════════════
  // AAA ROSTER
  // ══════════════════════════════════════
  { id:'w95', name:'El Hijo del Vikingo', brand:'AAA', gender:'Male', alignment:'Face', status:'Full Time',
    overness:80, inRing:95, mic:68, look:90, stamina:88, charisma:80, morale:85, popularity:82,
    salary:50, age:27, injuryRisk:35, injuryWeeks:0, finisher:'630 Senton', theme:'Vikingo',
    hometown:'Torreón, MX', style:'High Flyer', potentialGrowth:5, contractWeeks:130, flag:'🇲🇽' },

  { id:'w96', name:'Psycho Clown', brand:'AAA', gender:'Male', alignment:'Face', status:'Full Time',
    overness:82, inRing:78, mic:75, look:85, stamina:78, charisma:85, morale:88, popularity:85,
    salary:45, age:36, injuryRisk:25, injuryWeeks:0, finisher:'Psycho Driver', theme:'Psycho Circus',
    hometown:'Mexico City, MX', style:'Brawler', potentialGrowth:0, contractWeeks:104, flag:'🇲🇽' },

  { id:'w97', name:'Laredo Kid', brand:'AAA', gender:'Male', alignment:'Face', status:'Full Time',
    overness:70, inRing:88, mic:60, look:78, stamina:82, charisma:70, morale:80, popularity:68,
    salary:35, age:32, injuryRisk:30, injuryWeeks:0, finisher:'Laredo Fly', theme:'Laredo Kid',
    hometown:'Laredo, TX', style:'High Flyer', potentialGrowth:2, contractWeeks:78, flag:'🇲🇽' },

  // ══════════════════════════════════════
  // NXT ROSTER (Pipeline)
  // ══════════════════════════════════════
  { id:'w100', name:'Trick Williams', brand:'NXT', gender:'Male', alignment:'Face', status:'NXT',
    overness:72, inRing:75, mic:82, look:88, stamina:85, charisma:85, morale:88, popularity:74,
    salary:50, age:28, injuryRisk:15, injuryWeeks:0, finisher:'Trick Shot', theme:'Whoop That Trick',
    nxtLevel:4, hometown:'Atlanta, GA', style:'Showman', potentialGrowth:7, contractWeeks:156, flag:'🇺🇸' },

  { id:'w101', name:'Oba Femi', brand:'NXT', gender:'Male', alignment:'Heel', status:'NXT',
    overness:70, inRing:78, mic:70, look:95, stamina:82, charisma:75, morale:85, popularity:70,
    salary:45, age:24, injuryRisk:10, injuryWeeks:0, finisher:'Pop-Up Powerbomb', theme:'Nigerian Giant',
    nxtLevel:3, hometown:'Lagos, Nigeria', style:'Powerhouse', potentialGrowth:8, contractWeeks:208, flag:'🇳🇬' },

  { id:'w102', name:'Je\'Von Evans', brand:'NXT', gender:'Male', alignment:'Face', status:'NXT',
    overness:62, inRing:78, mic:65, look:80, stamina:88, charisma:72, morale:85, popularity:62,
    salary:30, age:19, injuryRisk:15, injuryWeeks:0, finisher:'Springboard Cutter', theme:'Young OG',
    nxtLevel:2, hometown:'Killeen, TX', style:'High Flyer', potentialGrowth:9, contractWeeks:208, flag:'🇺🇸' },

  { id:'w103', name:'Roxanne Perez', brand:'NXT', gender:'Female', alignment:'Heel', status:'NXT',
    overness:70, inRing:82, mic:75, look:85, stamina:82, charisma:78, morale:82, popularity:70,
    salary:40, age:22, injuryRisk:15, injuryWeeks:0, finisher:'Pop Rox', theme:'Prodigy',
    nxtLevel:4, hometown:'Mesquite, TX', style:'Technical', potentialGrowth:7, contractWeeks:156, flag:'🇺🇸' },

  { id:'w104', name:'Giulia', brand:'NXT', gender:'Female', alignment:'Face', status:'NXT',
    overness:68, inRing:85, mic:72, look:90, stamina:82, charisma:80, morale:82, popularity:68,
    salary:45, age:30, injuryRisk:20, injuryWeeks:0, finisher:'Glorious Driver', theme:'Giulia',
    nxtLevel:3, hometown:'Tokyo, Japan', style:'Technical', potentialGrowth:5, contractWeeks:130, flag:'🇯🇵' },

  { id:'w105', name:'Charlie Dempsey', brand:'NXT', gender:'Male', alignment:'Heel', status:'NXT',
    overness:60, inRing:85, mic:65, look:78, stamina:82, charisma:68, morale:80, popularity:58,
    salary:30, age:24, injuryRisk:10, injuryWeeks:0, finisher:'Bridging German Suplex', theme:'Heritage',
    nxtLevel:2, hometown:'Blackpool, UK', style:'Technical', potentialGrowth:7, contractWeeks:156, flag:'🇬🇧' },

  { id:'w106', name:'Myles Borne', brand:'NXT', gender:'Male', alignment:'Heel', status:'NXT',
    overness:55, inRing:78, mic:60, look:80, stamina:82, charisma:62, morale:78, popularity:52,
    salary:25, age:27, injuryRisk:10, injuryWeeks:0, finisher:'Catch Suplex', theme:'No Quarter',
    nxtLevel:2, hometown:'Charlotte, NC', style:'Technical', potentialGrowth:6, contractWeeks:156, flag:'🇺🇸' },
];
