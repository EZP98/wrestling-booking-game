import { Show, CalendarEvent } from '../types';

export const SHOWS: Show[] = [
  // WWE
  { id:'s1', name:'Monday Night Raw', brand:'Raw', day:'Monday', hours:3, segments:8,
    tier:'Weekly', network:'Netflix', rating:1.8, maxRating:3.0 },
  { id:'s2', name:'Friday Night SmackDown', brand:'SmackDown', day:'Friday', hours:2, segments:6,
    tier:'Weekly', network:'FOX', rating:2.0, maxRating:3.2 },
  { id:'s3', name:'NXT', brand:'NXT', day:'Tuesday', hours:2, segments:6,
    tier:'Weekly', network:'CW', rating:0.7, maxRating:1.2 },

  // AEW
  { id:'s4', name:'AEW Dynamite', brand:'AEW', day:'Wednesday', hours:2, segments:6,
    tier:'Weekly', network:'TBS', rating:0.8, maxRating:1.5 },
  { id:'s5', name:'AEW Collision', brand:'AEW', day:'Saturday', hours:2, segments:5,
    tier:'Weekly', network:'TNT', rating:0.5, maxRating:1.0 },

  // TNA
  { id:'s6', name:'TNA iMPACT!', brand:'TNA', day:'Thursday', hours:2, segments:5,
    tier:'Weekly', network:'AXS TV', rating:0.15, maxRating:0.4 },

  // Development
  { id:'s7', name:'NXT Level Up', brand:'NXT', day:'Friday', hours:1, segments:3,
    tier:'Weekly', network:'Peacock', rating:0.1, maxRating:0.3 },
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  // JANUARY
  { id:'e1', name:'Royal Rumble', week:4, month:1, tier:'Big 4', brand:'Raw', isBooked:false },

  // FEBRUARY
  { id:'e2', name:'Elimination Chamber', week:8, month:2, tier:'Monthly PLE', brand:'SmackDown', isBooked:false },

  // MARCH
  { id:'e3', name:'ROH Revolution', week:10, month:3, tier:'Cross-Promo', brand:'ROH', isBooked:false },
  { id:'e4', name:'TNA Hard to Kill', week:11, month:3, tier:'Cross-Promo', brand:'TNA', isBooked:false },
  { id:'e5', name:'Fastlane', week:12, month:3, tier:'Monthly PLE', brand:'Raw', isBooked:false },

  // APRIL
  { id:'e6', name:'WrestleMania (Night 1)', week:14, month:4, tier:'WrestleMania', brand:'Raw', isBooked:false },
  { id:'e7', name:'WrestleMania (Night 2)', week:14, month:4, tier:'WrestleMania', brand:'SmackDown', isBooked:false },
  { id:'e8', name:'Raw After Mania', week:15, month:4, tier:'Weekly', brand:'Raw', isBooked:false },

  // MAY
  { id:'e9', name:'Backlash France', week:18, month:5, tier:'Monthly PLE', brand:'SmackDown', isBooked:false },
  { id:'e10', name:'AEW Double or Nothing', week:20, month:5, tier:'Cross-Promo', brand:'AEW', isBooked:false },

  // JUNE
  { id:'e11', name:'King & Queen of the Ring', week:22, month:6, tier:'Monthly PLE', brand:'Raw', isBooked:false },
  { id:'e12', name:'Forbidden Door', week:24, month:6, tier:'Cross-Promo', brand:'AEW', isBooked:false },
  { id:'e13', name:'TNA Slammiversary', week:24, month:6, tier:'Cross-Promo', brand:'TNA', isBooked:false },

  // JULY
  { id:'e14', name:'Money in the Bank', week:27, month:7, tier:'Big 4', brand:'SmackDown', isBooked:false },
  { id:'e15', name:'AAA TripleMania', week:28, month:7, tier:'Cross-Promo', brand:'AAA', isBooked:false },

  // AUGUST
  { id:'e16', name:'SummerSlam', week:32, month:8, tier:'Big 4', brand:'Raw', isBooked:false },

  // SEPTEMBER
  { id:'e17', name:'Bash in Berlin', week:35, month:9, tier:'Monthly PLE', brand:'SmackDown', isBooked:false },
  { id:'e18', name:'AEW All In (Wembley)', week:36, month:9, tier:'Cross-Promo', brand:'AEW', isBooked:false },

  // OCTOBER
  { id:'e19', name:'Bad Blood', week:40, month:10, tier:'Monthly PLE', brand:'Raw', isBooked:false },
  { id:'e20', name:'TNA Bound for Glory', week:42, month:10, tier:'Cross-Promo', brand:'TNA', isBooked:false },

  // NOVEMBER
  { id:'e21', name:'Crown Jewel', week:44, month:11, tier:'Monthly PLE', brand:'SmackDown', isBooked:false },
  { id:'e22', name:'Survivor Series: WarGames', week:47, month:11, tier:'Big 4', brand:'Raw', isBooked:false },
  { id:'e23', name:'AEW Full Gear', week:46, month:11, tier:'Cross-Promo', brand:'AEW', isBooked:false },

  // DECEMBER
  { id:'e24', name:'Saturday Night\'s Main Event', week:50, month:12, tier:'Monthly PLE', brand:'SmackDown', isBooked:false },
  { id:'e25', name:'AEW Worlds End', week:52, month:12, tier:'Cross-Promo', brand:'AEW', isBooked:false },
  { id:'e26', name:'ROH Final Battle', week:51, month:12, tier:'Cross-Promo', brand:'ROH', isBooked:false },
];
