import { useState, useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { COLORS, TIER_COLORS } from '../styles/theme';
import { StatBar, Badge } from '../components/StatBar';
import { Venue } from '../types';

export function VenuesPage() {
  const { venues } = useGameStore();
  const [regionFilter, setRegionFilter] = useState('ALL');
  const [selected, setSelected] = useState<Venue | null>(null);
  const [search, setSearch] = useState('');

  const regions = useMemo(() => {
    const set = new Set(venues.map(v => v.region));
    return ['ALL', ...Array.from(set).sort()];
  }, [venues]);

  const filtered = useMemo(() => {
    let list = venues;
    if (regionFilter !== 'ALL') list = list.filter(v => v.region === regionFilter);
    if (search) list = list.filter(v => v.name.toLowerCase().includes(search.toLowerCase()) || v.city.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [venues, regionFilter, search]);

  const s = selected;

  const estimateRevenue = (v: Venue) => {
    const avgTicket = (v.ticketMin + v.ticketMax) / 2;
    const attendance = Math.floor(v.capacity * 0.85);
    const ticketRev = attendance * avgTicket;
    const merchRev = attendance * v.merchPerFan;
    return { attendance, ticketRev, merchRev, total: ticketRev + merchRev };
  };

  return (
    <div className="fade-in" style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${COLORS.border}`, flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h1 style={{ fontSize: 20, color: COLORS.white, letterSpacing: 3 }}>VENUES ({filtered.length})</h1>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
            {regions.map(r => (
              <button key={r} onClick={() => setRegionFilter(r)} style={{
                padding: '4px 10px', borderRadius: 16, fontSize: 10, fontWeight: 'bold', cursor: 'pointer',
                border: `1px solid ${regionFilter === r ? COLORS.gold : COLORS.border}`,
                background: regionFilter === r ? `${COLORS.gold}22` : 'transparent',
                color: regionFilter === r ? COLORS.white : COLORS.textMuted,
              }}>{r}</button>
            ))}
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search venue or city..."
            style={{ fontSize: 12, width: '100%' }} />
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '8px 12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
            {filtered.map(v => {
              const isSel = selected?.id === v.id;
              const tierColor = TIER_COLORS[v.tier] || COLORS.textMuted;
              return (
                <div key={v.id} onClick={() => setSelected(isSel ? null : v)} style={{
                  background: isSel ? COLORS.bgHover : COLORS.bgCard,
                  border: `1px solid ${isSel ? tierColor : COLORS.border}`,
                  borderLeft: `3px solid ${tierColor}`,
                  borderRadius: 8, padding: 14, cursor: 'pointer', transition: 'all 0.15s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 13 }}>
                      {v.flag} {v.name}
                    </span>
                    <span style={{ fontSize: 16 }}>{v.crowd}</span>
                  </div>
                  <div style={{ color: COLORS.textMuted, fontSize: 11, marginBottom: 6 }}>
                    {v.city} — {v.capacity.toLocaleString()} seats
                  </div>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
                    <Badge text={v.tier} color={tierColor} />
                    <Badge text={v.region} color={COLORS.textMuted} />
                    <Badge text={`Heat: ${v.heat}/10`} color={v.heat >= 8 ? COLORS.red : v.heat >= 5 ? COLORS.orange : COLORS.textDark} />
                  </div>
                  {v.special && (
                    <div style={{ color: COLORS.purple, fontSize: 10, fontStyle: 'italic' }}>{v.special}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail panel */}
      <div style={{
        width: s ? 380 : 0, flexShrink: 0, overflow: 'hidden',
        transition: 'width 0.3s ease', background: COLORS.bgPanel, borderLeft: `1px solid ${COLORS.border}`,
      }}>
        {s && (() => {
          const tierColor = TIER_COLORS[s.tier] || COLORS.textMuted;
          const rev = estimateRevenue(s);
          return (
            <div style={{ width: 380, height: '100%', overflow: 'auto', padding: '18px 16px' }}>
              <div style={{
                background: `linear-gradient(135deg, ${tierColor}20, transparent)`,
                border: `1px solid ${tierColor}44`,
                borderRadius: 10, padding: 18, marginBottom: 16,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 32 }}>{s.flag}</span>
                  <span style={{ fontSize: 28 }}>{s.crowd}</span>
                </div>
                <div style={{ fontWeight: 'bold', fontSize: 20, color: COLORS.white, marginTop: 4 }}>{s.name}</div>
                <div style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 4 }}>{s.city}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  <Badge text={s.tier} color={tierColor} />
                  <Badge text={s.region} color={COLORS.textMuted} />
                  <Badge text={`${s.capacity.toLocaleString()} seats`} color={COLORS.blue} />
                </div>
              </div>

              {/* Stats */}
              <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
                <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 }}>VENUE STATS</div>
                <StatBar value={s.heat} max={10} color={s.heat >= 8 ? COLORS.red : COLORS.orange} height={5} label="HEAT" showValue />
                <div style={{ marginTop: 8 }}>
                  {[
                    ['Capacity', s.capacity.toLocaleString(), COLORS.blue],
                    ['Ticket Range', `$${s.ticketMin} - $${s.ticketMax}`, COLORS.green],
                    ['Merch/Fan', `$${s.merchPerFan}`, COLORS.purple],
                    ['Home For', s.homeFor || 'None', COLORS.textMuted],
                  ].map(([l, v, c]) => (
                    <div key={l as string} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
                      <span style={{ color: COLORS.textMuted }}>{l}</span>
                      <span style={{ color: c as string, fontWeight: 'bold' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue Estimate */}
              <div style={{ background: '#0a1a0a', border: `1px solid ${COLORS.green}33`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
                <div style={{ color: COLORS.green, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 }}>REVENUE ESTIMATE (85% fill)</div>
                {[
                  ['Est. Attendance', rev.attendance.toLocaleString(), COLORS.blue],
                  ['Ticket Revenue', `$${rev.ticketRev.toLocaleString()}`, COLORS.green],
                  ['Merch Revenue', `$${rev.merchRev.toLocaleString()}`, COLORS.purple],
                  ['Total Revenue', `$${rev.total.toLocaleString()}`, COLORS.goldLight],
                ].map(([l, v, c]) => (
                  <div key={l as string} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
                    <span style={{ color: COLORS.textMuted }}>{l}</span>
                    <span style={{ color: c as string, fontWeight: 'bold' }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Mechanics */}
              {s.mechanics.length > 0 && (
                <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
                  <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 }}>BOOKING MECHANICS</div>
                  {s.mechanics.map((m, i) => (
                    <div key={i} style={{ color: COLORS.text, fontSize: 11, padding: '4px 0', borderBottom: i < s.mechanics.length - 1 ? `1px solid ${COLORS.border}` : 'none' }}>
                      {m}
                    </div>
                  ))}
                </div>
              )}

              {/* Vibe & History */}
              <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
                <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 }}>VIBE</div>
                <div style={{ color: COLORS.text, fontSize: 12, lineHeight: 1.5, marginBottom: 10 }}>{s.vibe}</div>
                <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 }}>HISTORY</div>
                <div style={{ color: COLORS.textMuted, fontSize: 11, lineHeight: 1.5 }}>{s.history}</div>
              </div>

              {/* Special */}
              {s.special && (
                <div style={{ background: '#1a0a1a', border: `1px solid ${COLORS.purple}33`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
                  <div style={{ color: COLORS.purple, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 }}>SPECIAL MECHANIC</div>
                  <div style={{ color: COLORS.text, fontSize: 12, lineHeight: 1.5 }}>{s.special}</div>
                </div>
              )}

              {/* Celebrity Affinity */}
              {s.celebAffinity.length > 0 && (
                <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
                  <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 }}>CELEBRITY AFFINITY</div>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {s.celebAffinity.map(c => (
                      <Badge key={c} text={c} color={COLORS.orange} />
                    ))}
                  </div>
                </div>
              )}

              <button onClick={() => setSelected(null)} style={{
                width: '100%', padding: 8, background: 'transparent', border: `1px solid ${COLORS.border}`,
                borderRadius: 5, color: COLORS.textDark, fontSize: 10, letterSpacing: 2, cursor: 'pointer',
              }}>
                CLOSE
              </button>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
