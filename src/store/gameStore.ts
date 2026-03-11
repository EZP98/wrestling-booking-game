import { create } from 'zustand';
import { Wrestler, Title, Venue, Celebrity, Faction, Feud, Writer, Show, CalendarEvent, GameState, ShowCard, Difficulty } from '../types';
import { WRESTLERS } from '../data/wrestlers';
import { TITLES } from '../data/titles';
import { VENUES } from '../data/venues';
import { CELEBRITIES } from '../data/celebrities';
import { FACTIONS } from '../data/factions';
import { SHOWS, CALENDAR_EVENTS } from '../data/shows';
import { WRITERS } from '../data/writers';

interface Store {
  // Data
  wrestlers: Wrestler[];
  titles: Title[];
  venues: Venue[];
  celebrities: Celebrity[];
  factions: Faction[];
  feuds: Feud[];
  writers: Writer[];
  shows: Show[];
  calendar: CalendarEvent[];
  showCards: ShowCard[];

  // Game state
  game: GameState;
  started: boolean;
  currentPage: string;

  // Actions
  startGame: (difficulty: Difficulty) => void;
  setPage: (page: string) => void;
  advanceWeek: () => void;
  updateWrestler: (id: string, updates: Partial<Wrestler>) => void;
  updateTitle: (id: string, updates: Partial<Title>) => void;
  createFeud: (feud: Feud) => void;
  updateFeud: (id: string, updates: Partial<Feud>) => void;
  endFeud: (id: string) => void;
  addShowCard: (card: ShowCard) => void;
  bookEvent: (eventId: string, venueId: string) => void;
  hireWriter: (id: string) => void;
  fireWriter: (id: string) => void;
  callUpNXT: (wrestlerId: string, brand: 'Raw' | 'SmackDown') => void;
}

const INITIAL_GAME: GameState = {
  week: 1,
  month: 1,
  year: 2026,
  season: 1,
  budget: 5000,
  tvDealValue: 800,
  totalRevenue: 0,
  totalExpenses: 0,
  fanSatisfaction: 70,
  overallRating: 70,
  wrestleManiaScore: 0,
  difficulty: 'Creative',
  playerPromotion: 'Raw',
};

export const useGameStore = create<Store>((set, get) => ({
  wrestlers: WRESTLERS,
  titles: TITLES,
  venues: VENUES,
  celebrities: CELEBRITIES,
  factions: FACTIONS,
  feuds: [],
  writers: WRITERS,
  shows: SHOWS,
  calendar: CALENDAR_EVENTS,
  showCards: [],

  game: INITIAL_GAME,
  started: false,
  currentPage: 'home',

  startGame: (difficulty) => set(state => ({
    started: true,
    currentPage: 'dashboard',
    game: {
      ...INITIAL_GAME,
      difficulty,
      budget: difficulty === 'Rookie' ? 10000 : difficulty === 'Creative' ? 5000 : difficulty === 'Veteran' ? 3000 : 2000,
    }
  })),

  setPage: (page) => set({ currentPage: page }),

  advanceWeek: () => set(state => {
    const g = state.game;
    const newWeek = g.week + 1;
    const newMonth = Math.ceil(newWeek / 4.33);

    // Weekly salary expenses
    const weeklyExpenses = state.wrestlers
      .filter(w => ['Raw','SmackDown','NXT'].includes(w.brand))
      .reduce((sum, w) => sum + w.salary, 0);

    // Weekly TV revenue
    const weeklyRevenue = g.tvDealValue;

    // Injury recovery
    const wrestlers = state.wrestlers.map(w => {
      if (w.injuryWeeks > 0) {
        const newWeeks = w.injuryWeeks - 1;
        return { ...w, injuryWeeks: newWeeks, status: newWeeks === 0 ? 'Full Time' as const : w.status };
      }
      return w;
    });

    // NXT growth
    const nxtGrown = wrestlers.map(w => {
      if (w.brand === 'NXT' && w.potentialGrowth > 0) {
        const growth = Math.random() * w.potentialGrowth * 0.3;
        return {
          ...w,
          overness: Math.min(100, w.overness + growth * 0.5),
          inRing: Math.min(100, w.inRing + growth),
          mic: Math.min(100, w.mic + growth * 0.3),
        };
      }
      return w;
    });

    // Title reign weeks
    const titles = state.titles.map(t => ({
      ...t,
      reignWeeks: t.holderId ? t.reignWeeks + 1 : t.reignWeeks,
    }));

    // Feud progression
    const feuds = state.feuds.map(f => ({
      ...f,
      weeksActive: f.weeksActive + 1,
      crowdInterest: Math.max(0, f.crowdInterest + (f.phase === 'Build' ? 2 : f.phase === 'Climax' ? 5 : -3)),
    }));

    // Morale drift
    const moraleDrifted = nxtGrown.map(w => {
      let moraleDelta = 0;
      if (w.overness > 80 && !w.titleId) moraleDelta -= 1;
      if (w.overness < 50 && w.status === 'Full Time') moraleDelta -= 0.5;
      if (w.titleId) moraleDelta += 0.5;
      return { ...w, morale: Math.max(0, Math.min(100, w.morale + moraleDelta)) };
    });

    return {
      wrestlers: moraleDrifted,
      titles,
      feuds,
      game: {
        ...g,
        week: newWeek,
        month: newMonth > 12 ? 1 : newMonth,
        year: newMonth > 12 ? g.year + 1 : g.year,
        budget: g.budget + weeklyRevenue - weeklyExpenses,
        totalRevenue: g.totalRevenue + weeklyRevenue,
        totalExpenses: g.totalExpenses + weeklyExpenses,
      }
    };
  }),

  updateWrestler: (id, updates) => set(state => ({
    wrestlers: state.wrestlers.map(w => w.id === id ? { ...w, ...updates } : w),
  })),

  updateTitle: (id, updates) => set(state => ({
    titles: state.titles.map(t => t.id === id ? { ...t, ...updates } : t),
  })),

  createFeud: (feud) => set(state => ({
    feuds: [...state.feuds, feud],
  })),

  updateFeud: (id, updates) => set(state => ({
    feuds: state.feuds.map(f => f.id === id ? { ...f, ...updates } : f),
  })),

  endFeud: (id) => set(state => ({
    feuds: state.feuds.filter(f => f.id !== id),
  })),

  addShowCard: (card) => set(state => ({
    showCards: [...state.showCards, card],
  })),

  bookEvent: (eventId, venueId) => set(state => ({
    calendar: state.calendar.map(e => e.id === eventId ? { ...e, venueId, isBooked: true } : e),
  })),

  hireWriter: (id) => set(state => ({
    writers: state.writers.map(w => w.id === id ? { ...w, morale: Math.min(100, w.morale + 10) } : w),
  })),

  fireWriter: (id) => set(state => ({
    writers: state.writers.filter(w => w.id !== id),
  })),

  callUpNXT: (wrestlerId, brand) => set(state => ({
    wrestlers: state.wrestlers.map(w =>
      w.id === wrestlerId
        ? { ...w, brand, status: 'Full Time' as const, nxtLevel: undefined, overness: Math.min(100, w.overness + 10) }
        : w
    ),
  })),
}));
