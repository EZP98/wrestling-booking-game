// ══════════════════════════════════════
// WRESTLING BOOKING GAME — TYPES
// ══════════════════════════════════════

export type Alignment = 'Face' | 'Heel' | 'Tweener';
export type WrestlerStatus = 'Full Time' | 'Part Time' | 'Part Time Legend' | 'Legend Speciale' | 'Returned' | 'Retired/Return' | 'Injured' | 'NXT' | 'Free Agent';
export type Brand = 'Raw' | 'SmackDown' | 'NXT' | 'AEW' | 'TNA' | 'ROH' | 'AAA' | 'Free Agent';
export type Gender = 'Male' | 'Female';
export type TitleTier = 'World' | 'Midcard' | 'Tag' | 'Specialty';
export type ShowTier = 'Weekly' | 'Monthly PLE' | 'Big 4' | 'WrestleMania' | 'Cross-Promo';
export type VenueTier = 'MEGA-EVENTO' | 'LEGGENDARIO' | 'ICONIC' | 'CALDO' | 'PREMIUM' | 'STANDARD';
export type CelebCategory = 'Music' | 'Athlete' | 'Creator' | 'Actor';
export type Difficulty = 'Rookie' | 'Creative' | 'Veteran' | 'Vince Mode';
export type FeudPhase = 'Build' | 'Climax' | 'Blowoff' | 'Cooldown';
export type MatchType = 'Singles' | 'Tag' | 'Triple Threat' | 'Fatal 4-Way' | 'Royal Rumble' | 'Ladder' | 'TLC' | 'Hell in a Cell' | 'Steel Cage' | 'Last Man Standing' | 'Iron Man' | 'Battle Royal' | 'Elimination Chamber' | 'Money in the Bank' | 'I Quit' | 'Mask vs Mask' | 'Hair vs Hair' | 'Lucha de Apuestas';
export type SegmentType = 'Match' | 'Promo' | 'Backstage' | 'Run-In' | 'Celebrity' | 'Title Ceremony' | 'Contract Signing' | 'Interview';

export interface Wrestler {
  id: string;
  name: string;
  brand: Brand;
  gender: Gender;
  alignment: Alignment;
  status: WrestlerStatus;
  overness: number;       // 0-100
  inRing: number;         // 0-100
  mic: number;            // 0-100
  look: number;           // 0-100
  stamina: number;        // 0-100
  charisma: number;       // 0-100
  morale: number;         // 0-100
  popularity: number;     // 0-100 (fan reaction)
  salary: number;         // weekly in thousands
  age: number;
  injuryRisk: number;     // 0-100
  injuryWeeks: number;    // 0 = healthy
  finisher: string;
  theme: string;
  faction?: string;
  titleId?: string;
  hometown?: string;
  style: string;          // e.g. "Technical", "Powerhouse", "High Flyer", "Brawler", "Showman"
  potentialGrowth: number; // NXT growth rate 0-10
  contractWeeks: number;
  nxtLevel?: number;      // 0-5 for NXT pipeline
  flag: string;
}

export interface Title {
  id: string;
  name: string;
  brand: Brand;
  tier: TitleTier;
  gender: Gender | 'Any';
  holderId?: string;
  holderName?: string;
  reignWeeks: number;
  prestige: number;       // 0-100
  history: { holderId: string; holderName: string; weeks: number; wonAt: string }[];
  isTag?: boolean;
  secondHolderId?: string;
  secondHolderName?: string;
}

export interface Show {
  id: string;
  name: string;
  brand: Brand;
  day: string;
  hours: number;
  segments: number;
  tier: ShowTier;
  network: string;
  rating: number;         // current TV rating
  maxRating: number;      // peak possible
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  region: string;
  lat: number;
  lng: number;
  capacity: number;
  tier: VenueTier;
  heat: number;           // 1-10
  ticketMin: number;
  ticketMax: number;
  merchPerFan: number;
  flag: string;
  homeFor: string;
  vibe: string;
  special: string | null;
  mechanics: string[];
  history: string;
  celebAffinity: string[];
  crowd: string;
}

export interface Celebrity {
  id: string;
  name: string;
  category: CelebCategory;
  icon: string;
  cost: number;           // 1-4
  hype: number;           // 1-10
  fightSkill: number;     // 1-10
  overness: number;       // 1-10
  alignment: string;
  origin: string;
  flag: string;
  desc: string;
  history: string;
  roles: string[];
  chemistry: string[];
  conflict: string[];
  venues: string[];
  mechanic: string;
  costNote: string;
}

export interface Faction {
  id: string;
  name: string;
  brand: Brand;
  leader: string;
  members: string[];
  alignment: Alignment;
  power: number;          // 1-10
  stability: number;      // 1-10
  story: string;
  mechanic: string;
}

export interface Feud {
  id: string;
  wrestler1Id: string;
  wrestler2Id: string;
  phase: FeudPhase;
  intensity: number;      // 1-10
  weeksActive: number;
  weeksPlanned: number;
  titleId?: string;
  storyArc: string;
  payoffEvent?: string;
  crowdInterest: number;  // 0-100
}

export interface Writer {
  id: string;
  name: string;
  role: string;
  level: number;          // 1-5
  morale: number;         // 0-100
  specialty: string;
  personality: string;
  trait: string;
  bio: string;
  icon: string;
}

export interface MatchCard {
  id: string;
  matchType: MatchType;
  participants: string[]; // wrestler IDs
  titleId?: string;
  feudId?: string;
  stipulation?: string;
  bookedWinnerId?: string;
  starRating?: number;    // 0-5
  crowdReaction?: number; // 0-100
}

export interface ShowCard {
  id: string;
  showId: string;
  week: number;
  venueId: string;
  segments: (MatchCard | PromoSegment)[];
  tvRating?: number;
  attendance?: number;
  revenue?: number;
}

export interface PromoSegment {
  id: string;
  type: SegmentType;
  participants: string[];
  feudId?: string;
  description: string;
  crowdReaction?: number;
}

export interface GameState {
  week: number;
  month: number;
  year: number;
  season: number;
  budget: number;
  tvDealValue: number;
  totalRevenue: number;
  totalExpenses: number;
  fanSatisfaction: number;  // 0-100
  overallRating: number;    // 0-100
  wrestleManiaScore: number;
  difficulty: Difficulty;
  playerPromotion: Brand;
}

export interface CalendarEvent {
  id: string;
  name: string;
  week: number;
  month: number;
  tier: ShowTier;
  brand: Brand;
  venueId?: string;
  isBooked: boolean;
}
