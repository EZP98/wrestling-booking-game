import { useState, useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { COLORS, BRAND_COLORS } from '../styles/theme';
import { Badge } from '../components/StatBar';
import { CalendarEvent, ShowTier } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Star, Check, X } from 'lucide-react';

const TIER_BADGE_COLORS: Record<ShowTier, string> = {
  Weekly: COLORS.textMuted,
  'Monthly PLE': COLORS.blue,
  'Big 4': COLORS.orange,
  WrestleMania: COLORS.goldLight,
  'Cross-Promo': COLORS.purple,
};

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function CalendarPage() {
  const { calendar, venues, game, bookEvent } = useGameStore();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [bookingVenueId, setBookingVenueId] = useState('');
  const [tierFilter, setTierFilter] = useState('ALL');

  const filtered = useMemo(() => {
    if (tierFilter === 'ALL') return calendar;
    return calendar.filter(e => e.tier === tierFilter);
  }, [calendar, tierFilter]);

  const byMonth = useMemo(() => {
    const map: Record<number, CalendarEvent[]> = {};
    for (let m = 1; m <= 12; m++) map[m] = [];
    filtered.forEach(e => {
      if (e.month >= 1 && e.month <= 12) map[e.month].push(e);
    });
    return map;
  }, [filtered]);

  const handleBook = () => {
    if (selectedEvent && bookingVenueId) {
      bookEvent(selectedEvent.id, bookingVenueId);
      setSelectedEvent(null);
      setBookingVenueId('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex h-full overflow-hidden bg-black"
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1a1a1a] shrink-0">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#B8860B]" />
              <h1 className="text-xl text-white tracking-[3px] font-bold">CALENDAR {game.year}</h1>
            </div>
            <div className="flex gap-1.5">
              <Badge text={`WEEK ${game.week}`} color={COLORS.goldLight} />
              <Badge text={MONTH_NAMES[game.month - 1]} color={COLORS.blue} />
            </div>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {['ALL', 'Weekly', 'Monthly PLE', 'Big 4', 'WrestleMania', 'Cross-Promo'].map(t => (
              <motion.button
                key={t}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTierFilter(t)}
                className="px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors"
                style={{
                  border: `1px solid ${tierFilter === t ? (TIER_BADGE_COLORS[t as ShowTier] || COLORS.gold) : COLORS.border}`,
                  background: tierFilter === t ? `${TIER_BADGE_COLORS[t as ShowTier] || COLORS.gold}22` : 'transparent',
                  color: tierFilter === t ? COLORS.white : COLORS.textMuted,
                }}
              >
                {t}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto px-5 py-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-3 gap-3"
          >
            {Object.entries(byMonth).map(([monthStr, events]) => {
              const month = parseInt(monthStr);
              const isCurrent = month === game.month;
              return (
                <motion.div
                  key={month}
                  variants={fadeUp}
                  className="bg-[#0a0a0a] rounded-xl p-3.5 min-h-[120px]"
                  style={{
                    border: `1px solid ${isCurrent ? COLORS.goldLight + '66' : COLORS.border}`,
                    boxShadow: isCurrent ? `0 0 12px ${COLORS.goldLight}15` : 'none',
                  }}
                >
                  <div className="flex justify-between items-center mb-2.5 pb-2 border-b border-[#1a1a1a]">
                    <span
                      className="text-[13px] font-bold tracking-wider"
                      style={{ color: isCurrent ? COLORS.goldLight : COLORS.white }}
                    >
                      {MONTH_NAMES[month - 1].toUpperCase()}
                    </span>
                    {events.length > 0 && (
                      <span className="text-[#555555] text-[10px]">{events.length} events</span>
                    )}
                  </div>
                  {events.length === 0 && (
                    <div className="text-[#555555] text-[10px]">No events</div>
                  )}
                  {events.map(e => {
                    const isPast = e.week < game.week;
                    return (
                      <motion.div
                        key={e.id}
                        whileHover={{ scale: 1.02, x: 2 }}
                        onClick={() => setSelectedEvent(e)}
                        className="px-2 py-1.5 mb-1 rounded-md cursor-pointer transition-all"
                        style={{
                          background: selectedEvent?.id === e.id ? `${TIER_BADGE_COLORS[e.tier]}22` : 'transparent',
                          border: `1px solid ${selectedEvent?.id === e.id ? TIER_BADGE_COLORS[e.tier] + '44' : 'transparent'}`,
                          opacity: isPast ? 0.5 : 1,
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-white text-[11px] font-bold">{e.name}</span>
                          <span className="text-[#555555] text-[9px]">W{e.week}</span>
                        </div>
                        <div className="flex gap-1 mt-1">
                          <Badge text={e.tier} color={TIER_BADGE_COLORS[e.tier]} />
                          <Badge text={e.brand} color={BRAND_COLORS[e.brand] || COLORS.textMuted} />
                          {e.isBooked && (
                            <span className="inline-flex items-center gap-0.5">
                              <Check className="w-2.5 h-2.5 text-[#2ECC71]" />
                              <Badge text="BOOKED" color={COLORS.green} />
                            </span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Booking panel */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 340, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 overflow-hidden bg-[#050505] border-l border-[#1a1a1a]"
          >
            <div className="w-[340px] h-full overflow-auto p-4">
              <div
                className="rounded-xl p-4 mb-4"
                style={{
                  background: `linear-gradient(135deg, ${TIER_BADGE_COLORS[selectedEvent.tier]}20, transparent)`,
                  border: `1px solid ${TIER_BADGE_COLORS[selectedEvent.tier]}44`,
                }}
              >
                <Calendar className="w-7 h-7 mb-1.5" style={{ color: TIER_BADGE_COLORS[selectedEvent.tier] }} />
                <div className="font-bold text-xl text-white">{selectedEvent.name}</div>
                <div className="text-[#888888] text-xs mt-1">Week {selectedEvent.week}</div>
                <div className="flex gap-1.5 mt-2">
                  <Badge text={selectedEvent.tier} color={TIER_BADGE_COLORS[selectedEvent.tier]} />
                  <Badge text={selectedEvent.brand} color={BRAND_COLORS[selectedEvent.brand] || COLORS.textMuted} />
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                <div className="text-[#B8860B] text-[10px] font-bold tracking-[2px] mb-2.5">STATUS</div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#888888]">Status</span>
                  <Badge text={selectedEvent.isBooked ? 'BOOKED' : 'UNBOOKED'} color={selectedEvent.isBooked ? COLORS.green : COLORS.orange} />
                </div>
                {selectedEvent.isBooked && selectedEvent.venueId && (
                  <div className="flex justify-between text-xs">
                    <span className="text-[#888888] flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Venue
                    </span>
                    <span className="text-white font-bold">
                      {venues.find(v => v.id === selectedEvent.venueId)?.name || '?'}
                    </span>
                  </div>
                )}
              </div>

              {!selectedEvent.isBooked && selectedEvent.week >= game.week && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5"
                >
                  <div className="text-[#B8860B] text-[10px] font-bold tracking-[2px] mb-2.5">
                    <MapPin className="w-3 h-3 inline mr-1" />
                    BOOK VENUE
                  </div>
                  <select
                    value={bookingVenueId}
                    onChange={e => setBookingVenueId(e.target.value)}
                    className="text-[11px] px-2.5 py-1.5 w-full mb-2.5 bg-[#0a0a0a] border border-[#1a1a1a] rounded text-[#e0e0e0]"
                  >
                    <option value="">-- Select Venue --</option>
                    {venues.map(v => (
                      <option key={v.id} value={v.id}>{v.flag} {v.name} ({v.city}, {v.capacity.toLocaleString()})</option>
                    ))}
                  </select>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleBook}
                    disabled={!bookingVenueId}
                    className="w-full py-2 rounded-md text-[11px] font-bold border-none text-white tracking-wider"
                    style={{
                      cursor: bookingVenueId ? 'pointer' : 'not-allowed',
                      background: bookingVenueId ? COLORS.green : COLORS.border,
                    }}
                  >
                    <Check className="w-3 h-3 inline mr-1" />
                    CONFIRM BOOKING
                  </motion.button>
                </motion.div>
              )}

              <button
                onClick={() => setSelectedEvent(null)}
                className="w-full py-2 bg-transparent border border-[#1a1a1a] rounded text-[#555555] text-[10px] tracking-[2px] cursor-pointer hover:text-white hover:border-[#2a2a2a] transition-colors flex items-center justify-center gap-1"
              >
                <X className="w-3 h-3" /> CLOSE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
