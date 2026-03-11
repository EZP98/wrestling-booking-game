import { Title } from '../types';

export const TITLES: Title[] = [
  // ══════════════════════════════════════
  // WWE TITLES
  // ══════════════════════════════════════
  { id:'t1', name:'WWE Championship', brand:'SmackDown', tier:'World', gender:'Male',
    holderId:'w16', holderName:'Cody Rhodes', reignWeeks:48, prestige:100,
    history:[{ holderId:'w16', holderName:'Cody Rhodes', weeks:48, wonAt:'WrestleMania 40' }] },

  { id:'t2', name:'World Heavyweight Championship', brand:'Raw', tier:'World', gender:'Male',
    holderId:'w1', holderName:'CM Punk', reignWeeks:12, prestige:95,
    history:[{ holderId:'w1', holderName:'CM Punk', weeks:12, wonAt:'Royal Rumble 2026' }] },

  { id:'t3', name:'WWE Intercontinental Championship', brand:'SmackDown', tier:'Midcard', gender:'Male',
    holderId:'w21', holderName:'Penta', reignWeeks:8, prestige:82,
    history:[{ holderId:'w21', holderName:'Penta', weeks:8, wonAt:'SmackDown' }] },

  { id:'t4', name:'WWE United States Championship', brand:'Raw', tier:'Midcard', gender:'Male',
    holderId:'w4', holderName:'Gunther', reignWeeks:16, prestige:78,
    history:[{ holderId:'w4', holderName:'Gunther', weeks:16, wonAt:'Raw' }] },

  { id:'t5', name:'WWE Tag Team Championship', brand:'Raw', tier:'Tag', gender:'Male', isTag:true,
    holderId:'w8', holderName:'Judgment Day', reignWeeks:10, prestige:70,
    secondHolderId:'w7', secondHolderName:'Dominik Mysterio',
    history:[{ holderId:'w8', holderName:'Judgment Day', weeks:10, wonAt:'Raw' }] },

  { id:'t6', name:'WWE Undisputed Tag Championship', brand:'SmackDown', tier:'Tag', gender:'Male', isTag:true,
    reignWeeks:0, prestige:72,
    history:[] },

  { id:'t7', name:'WWE Women\'s Championship', brand:'SmackDown', tier:'World', gender:'Female',
    holderId:'w37', holderName:'Tiffany Stratton', reignWeeks:6, prestige:88,
    history:[{ holderId:'w37', holderName:'Tiffany Stratton', weeks:6, wonAt:'SmackDown' }] },

  { id:'t8', name:'Women\'s World Championship', brand:'Raw', tier:'World', gender:'Female',
    holderId:'w30', holderName:'Rhea Ripley', reignWeeks:14, prestige:90,
    history:[{ holderId:'w30', holderName:'Rhea Ripley', weeks:14, wonAt:'WrestleMania' }] },

  { id:'t9', name:'Women\'s Intercontinental Championship', brand:'Raw', tier:'Midcard', gender:'Female',
    holderId:'w36', holderName:'AJ Lee', reignWeeks:4, prestige:65,
    history:[{ holderId:'w36', holderName:'AJ Lee', weeks:4, wonAt:'Raw' }] },

  { id:'t10', name:'Women\'s Tag Team Championship', brand:'Raw', tier:'Tag', gender:'Female', isTag:true,
    reignWeeks:0, prestige:55,
    history:[] },

  { id:'t11', name:'NXT Championship', brand:'NXT', tier:'World', gender:'Male',
    holderId:'w100', holderName:'Trick Williams', reignWeeks:8, prestige:72,
    history:[{ holderId:'w100', holderName:'Trick Williams', weeks:8, wonAt:'NXT' }] },

  { id:'t12', name:'NXT Women\'s Championship', brand:'NXT', tier:'World', gender:'Female',
    holderId:'w103', holderName:'Roxanne Perez', reignWeeks:12, prestige:68,
    history:[{ holderId:'w103', holderName:'Roxanne Perez', weeks:12, wonAt:'NXT' }] },

  { id:'t13', name:'NXT North American Championship', brand:'NXT', tier:'Midcard', gender:'Male',
    holderId:'w101', holderName:'Oba Femi', reignWeeks:20, prestige:60,
    history:[{ holderId:'w101', holderName:'Oba Femi', weeks:20, wonAt:'NXT' }] },

  // ══════════════════════════════════════
  // AEW TITLES
  // ══════════════════════════════════════
  { id:'t20', name:'AEW World Championship', brand:'AEW', tier:'World', gender:'Male',
    holderId:'w60', holderName:'MJF', reignWeeks:20, prestige:85,
    history:[{ holderId:'w60', holderName:'MJF', weeks:20, wonAt:'Full Gear' }] },

  { id:'t21', name:'AEW International Championship', brand:'AEW', tier:'Midcard', gender:'Male',
    holderId:'w61', holderName:'Will Ospreay', reignWeeks:10, prestige:75,
    history:[{ holderId:'w61', holderName:'Will Ospreay', weeks:10, wonAt:'Dynamite' }] },

  { id:'t22', name:'AEW Tag Team Championship', brand:'AEW', tier:'Tag', gender:'Male', isTag:true,
    holderId:'w70', holderName:'FTR', reignWeeks:14, prestige:78,
    secondHolderId:'w71', secondHolderName:'Cash Wheeler',
    history:[{ holderId:'w70', holderName:'FTR', weeks:14, wonAt:'Dynamite' }] },

  { id:'t23', name:'AEW Women\'s World Championship', brand:'AEW', tier:'World', gender:'Female',
    holderId:'w68', holderName:'Thekla', reignWeeks:6, prestige:65,
    history:[{ holderId:'w68', holderName:'Thekla', weeks:6, wonAt:'Dynamite' }] },

  { id:'t24', name:'AEW TNT Championship', brand:'AEW', tier:'Midcard', gender:'Male',
    holderId:'w64', holderName:'Swerve Strickland', reignWeeks:8, prestige:68,
    history:[{ holderId:'w64', holderName:'Swerve Strickland', weeks:8, wonAt:'Collision' }] },

  // ══════════════════════════════════════
  // TNA TITLES
  // ══════════════════════════════════════
  { id:'t30', name:'TNA World Championship', brand:'TNA', tier:'World', gender:'Male',
    holderId:'w80', holderName:'Mike Santana', reignWeeks:6, prestige:65,
    history:[{ holderId:'w80', holderName:'Mike Santana', weeks:6, wonAt:'Hard to Kill' }] },

  { id:'t31', name:'TNA Knockouts Championship', brand:'TNA', tier:'World', gender:'Female',
    holderId:'w85', holderName:'Arianna Grace', reignWeeks:4, prestige:55,
    history:[{ holderId:'w85', holderName:'Arianna Grace', weeks:4, wonAt:'iMPACT' }] },

  { id:'t32', name:'TNA Tag Team Championship', brand:'TNA', tier:'Tag', gender:'Male', isTag:true,
    holderId:'w83', holderName:'The Hardys', reignWeeks:10, prestige:58,
    secondHolderId:'w84', secondHolderName:'Jeff Hardy',
    history:[{ holderId:'w83', holderName:'The Hardys', weeks:10, wonAt:'iMPACT' }] },

  // ══════════════════════════════════════
  // ROH TITLES
  // ══════════════════════════════════════
  { id:'t40', name:'ROH World Championship', brand:'ROH', tier:'World', gender:'Male',
    holderId:'w90', holderName:'Bandido', reignWeeks:8, prestige:60,
    history:[{ holderId:'w90', holderName:'Bandido', weeks:8, wonAt:'Final Battle' }] },

  // ══════════════════════════════════════
  // AAA TITLES
  // ══════════════════════════════════════
  { id:'t50', name:'AAA Mega Championship', brand:'AAA', tier:'World', gender:'Male',
    holderId:'w95', holderName:'El Hijo del Vikingo', reignWeeks:24, prestige:70,
    history:[{ holderId:'w95', holderName:'El Hijo del Vikingo', weeks:24, wonAt:'TripleMania' }] },
];
