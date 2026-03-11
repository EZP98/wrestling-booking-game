import { useState, useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { COLORS, BRAND_COLORS } from '../styles/theme';
import { Badge } from '../components/StatBar';
import { CalendarEvent, ShowTier } from '../types';

const TIER_BADGE_COLORS: Record<ShowTier, string> = {
  Weekly: COLORS.textMuted,
  'Monthly PLE': COLORS.blue,
  'Big 4': COLORS.orange,
  WrestleMania: COLORS.goldLight,
  'Cross-Promo': COLORS.purple,
};

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
    <div className="fade-in" style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${COLORS.border}`, flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h1 style={{ fontSize: 20, color: COLORS.white, letterSpacing: 3 }}>CALENDAR {game.year}</h1>
            <div style={{ display: 'flex', gap: 6 }}>
              <Badge text={`WEEK ${game.week}`} color={COLORS.goldLight} />
              <Badge text={MONTH_NAMES[game.month - 1]} color={COLORS.blue} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['ALL', 'Weekly', 'Monthly PLE', 'Big 4', 'WrestleMania', 'Cross-Promo'].map(t => (
              <button key={t} onClick={() => setTierFilter(t)} style={{
                padding: '4px 10px', borderRadius: 16, fontSize: 10, fontWeight: 'bold', cursor: 'pointer',
                border: `1px solid ${tierFilter === t ? (TIER_BADGE_COLORS[t as ShowTier] || COLORS.gold) : COLORS.border}`,
                background: tierFilter === t ? `${TIER_BADGE_COLORS[t as ShowTier] || COLORS.gold}22` : 'transparent',
                color: tierFilter === t ? COLORS.white : COLORS.textMuted,
              }}>{t}</button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {Object.entries(byMonth).map(([monthStr, events]) => {
              const month = parseInt(monthStr);
              const isCurrent = month === game.month;
              return (
                <div key={month} style={{
                  background: COLORS.bgCard,
                  border: `1px solid ${isCurrent ? COLORS.goldLight + '66' : COLORS.border}`,
                  borderRadius: 10, padding: 14, minHeight: 120,
                  boxShadow: isCurrent ? `0 0 12px ${COLORS.goldLight}15` : 'none',
                }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginBottom: 10, paddingBottom: 8, borderBottom: `1px solid ${COLORS.border}`,
                  }}>
                    <span style={{
                      color: isCurrent ? COLORS.goldLight : COLORS.white,
                      fontSize: 13, fontWeight: 'bold', letterSpacing: 1,
                    }}>
                      {MONTH_NAMES[month - 1].toUpperCase()}
                    </span>
                    {events.length > 0 && (
                      <span style={{ color: COLORS.textDark, fontSize: 10 }}>{events.length} events</span>
                    )}
                  </div>
                  {events.length === 0 && (
                    <div style={{ color: COLORS.textDark, fontSize: 10 }}>No events</div>
                  )}
                  {events.map(e => {
                    const isPast = e.week < game.week;
                    return (
                      <div key={e.id} onClick={() => setSelectedEvent(e)} style={{
                        padding: '6px 8px', marginBottom: 4, borderRadius: 6, cursor: 'pointer',
                        background: selectedEvent?.id === e.id ? `${TIER_BADGE_COLORS[e.tier]}22` : 'transparent',
                        border: `1px solid ${selectedEvent?.id === e.id ? TIER_BADGE_COLORS[e.tier] + '44' : 'transparent'}`,
                        opacity: isPast ? 0.5 : 1,
                        transition: 'all 0.15s',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: COLORS.white, fontSize: 11, fontWeight: 'bold' }}>{e.name}</span>
                          <span style={{ color: COLORS.textDark, fontSize: 9 }}>W{e.week}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                          <Badge text={e.tier} color={TIER_BADGE_COLORS[e.tier]} />
                          <Badge text={e.brand} color={BRAND_COLORS[e.brand] || COLORS.textMuted} />
                          {e.isBooked && <Badge text="BOOKED" color={COLORS.green} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Booking panel */}
      <div style={{
        width: selectedEvent ? 340 : 0, flexShrink: 0, overflow: 'hidden',
        transition: 'width 0.3s ease', background: COLORS.bgPanel, borderLeft: `1px solid ${COLORS.border}`,
      }}>
        {selectedEvent && (
          <div style={{ width: 340, height: '100%', overflow: 'auto', padding: '18px 16px' }}>
            <div style={{
              background: `linear-gradient(135deg, ${TIER_BADGE_COLORS[selectedEvent.tier]}20, transparent)`,
              border: `1px solid ${TIER_BADGE_COLORS[selectedEvent.tier]}44`,
              borderRadius: 10, padding: 16, marginBottom: 16,
            }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>📅</div>
              <div style={{ fontWeight: 'bold', fontSize: 20, color: COLORS.white }}>{selectedEvent.name}</div>
              <div style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 4 }}>Week {selectedEvent.week}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <Badge text={selectedEvent.tier} color={TIER_BADGE_COLORS[selectedEvent.tier]} />
                <Badge text={selectedEvent.brand} color={BRAND_COLORS[selectedEvent.brand] || COLORS.textMuted} />
              </div>
            </div>

            <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
              <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 }}>STATUS</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                <span style={{ color: COLORS.textMuted }}>Status</span>
                <Badge text={selectedEvent.isBooked ? 'BOOKED' : 'UNBOOKED'} color={selectedEvent.isBooked ? COLORS.green : COLORS.orange} />
              </div>
              {selectedEvent.isBooked && selectedEvent.venueId && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: COLORS.textMuted }}>Venue</span>
                  <span style={{ color: COLORS.white, fontWeight: 'bold' }}>
                    {venues.find(v => v.id === selectedEvent.venueId)?.name || '?'}
                  </span>
                </div>
              )}
            </div>

            {!selectedEvent.isBooked && selectedEvent.week >= game.week && (
              <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
                <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 }}>BOOK VENUE</div>
                <select value={bookingVenueId} onChange={e => setBookingVenueId(e.target.value)}
                  style={{ fontSize: 11, padding: '6px 10px', width: '100%', marginBottom: 10 }}>
                  <option value="">-- Select Venue --</option>
                  {venues.map(v => (
                    <option key={v.id} value={v.id}>{v.flag} {v.name} ({v.city}, {v.capacity.toLocaleString()})</option>
                  ))}
                </select>
                <button onClick={handleBook} disabled={!bookingVenueId} style={{
                  width: '100%', padding: 8, borderRadius: 6, fontSize: 11, fontWeight: 'bold', cursor: bookingVenueId ? 'pointer' : 'not-allowed',
                  background: bookingVenueId ? COLORS.green : COLORS.border,
                  border: 'none', color: COLORS.white, letterSpacing: 1,
                }}>
                  CONFIRM BOOKING
                </button>
              </div>
            )}

            <button onClick={() => setSelectedEvent(null)} style={{
              width: '100%', padding: 8, background: 'transparent', border: `1px solid ${COLORS.border}`,
              borderRadius: 5, color: COLORS.textDark, fontSize: 10, letterSpacing: 2, cursor: 'pointer',
            }}>
              CLOSE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
