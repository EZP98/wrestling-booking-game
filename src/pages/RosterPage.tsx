import { useState, useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { COLORS, BRAND_COLORS, ALIGNMENT_COLORS, STATUS_COLORS } from '../styles/theme';
import { StatBar, Badge } from '../components/StatBar';
import { Wrestler } from '../types';

export function RosterPage() {
  const { wrestlers, titles } = useGameStore();
  const [brandFilter, setBrandFilter] = useState('ALL');
  const [genderFilter, setGenderFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Wrestler | null>(null);
  const [sortBy, setSortBy] = useState<'overness' | 'inRing' | 'mic' | 'name'>('overness');

  const filtered = useMemo(() => {
    let list = wrestlers;
    if (brandFilter !== 'ALL') list = list.filter(w => w.brand === brandFilter);
    if (genderFilter !== 'ALL') list = list.filter(w => w.gender === genderFilter);
    if (search) list = list.filter(w => w.name.toLowerCase().includes(search.toLowerCase()));
    return [...list].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return b[sortBy] - a[sortBy];
    });
  }, [wrestlers, brandFilter, genderFilter, search, sortBy]);

  const s = selected;

  return (
    <div className="fade-in" style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* Main list */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${COLORS.border}`, flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h1 style={{ fontSize: 20, color: COLORS.white, letterSpacing: 3 }}>ROSTER ({filtered.length})</h1>
          </div>
          {/* Filters */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
            {['ALL','Raw','SmackDown','NXT','AEW','TNA','ROH','AAA'].map(b => (
              <button key={b} onClick={() => setBrandFilter(b)} style={{
                padding: '4px 10px', borderRadius: 16, fontSize: 10, fontWeight: 'bold',
                border: `1px solid ${brandFilter === b ? (BRAND_COLORS[b] || COLORS.gold) : COLORS.border}`,
                background: brandFilter === b ? `${BRAND_COLORS[b] || COLORS.gold}22` : 'transparent',
                color: brandFilter === b ? COLORS.white : COLORS.textMuted,
              }}>{b}</button>
            ))}
            <span style={{ width: 1, background: COLORS.border, margin: '0 4px' }} />
            {['ALL','Male','Female'].map(g => (
              <button key={g} onClick={() => setGenderFilter(g)} style={{
                padding: '4px 10px', borderRadius: 16, fontSize: 10,
                border: `1px solid ${genderFilter === g ? COLORS.purple : COLORS.border}`,
                background: genderFilter === g ? `${COLORS.purple}22` : 'transparent',
                color: genderFilter === g ? COLORS.white : COLORS.textMuted,
              }}>{g === 'ALL' ? 'All' : g}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search wrestler..."
              style={{ flex: 1, fontSize: 12 }} />
            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} style={{ fontSize: 11, padding: '6px 10px' }}>
              <option value="overness">Sort: Overness</option>
              <option value="inRing">Sort: In-Ring</option>
              <option value="mic">Sort: Mic</option>
              <option value="name">Sort: Name</option>
            </select>
          </div>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflow: 'auto', padding: '8px 12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
            {filtered.map(w => {
              const isSel = selected?.id === w.id;
              return (
                <div key={w.id} onClick={() => setSelected(isSel ? null : w)} style={{
                  background: isSel ? COLORS.bgHover : COLORS.bgCard,
                  border: `1px solid ${isSel ? BRAND_COLORS[w.brand] || COLORS.gold : COLORS.border}`,
                  borderLeft: `3px solid ${BRAND_COLORS[w.brand] || COLORS.textDark}`,
                  borderRadius: 8, padding: '12px', cursor: 'pointer', transition: 'all 0.15s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 13 }}>
                      {w.flag} {w.name}
                    </span>
                    {w.titleId && <span style={{ fontSize: 14 }}>🏆</span>}
                  </div>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
                    <Badge text={w.brand} color={BRAND_COLORS[w.brand] || COLORS.textMuted} />
                    <Badge text={w.alignment} color={ALIGNMENT_COLORS[w.alignment]} />
                    <Badge text={w.status} color={STATUS_COLORS[w.status] || COLORS.textDark} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
                    <div>
                      <div style={{ color: COLORS.textDark, fontSize: 8, letterSpacing: 1 }}>OVR</div>
                      <div style={{ color: COLORS.goldLight, fontWeight: 'bold', fontSize: 14 }}>{w.overness}</div>
                    </div>
                    <div>
                      <div style={{ color: COLORS.textDark, fontSize: 8, letterSpacing: 1 }}>RING</div>
                      <div style={{ color: COLORS.green, fontWeight: 'bold', fontSize: 14 }}>{w.inRing}</div>
                    </div>
                    <div>
                      <div style={{ color: COLORS.textDark, fontSize: 8, letterSpacing: 1 }}>MIC</div>
                      <div style={{ color: COLORS.blue, fontWeight: 'bold', fontSize: 14 }}>{w.mic}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail panel */}
      <div style={{
        width: s ? 340 : 0, flexShrink: 0, overflow: 'hidden',
        transition: 'width 0.3s ease', background: COLORS.bgPanel, borderLeft: `1px solid ${COLORS.border}`,
      }}>
        {s && (
          <div style={{ width: 340, height: '100%', overflow: 'auto', padding: '18px 16px' }}>
            {/* Header */}
            <div style={{
              background: `linear-gradient(135deg, ${BRAND_COLORS[s.brand] || COLORS.gold}20, transparent)`,
              border: `1px solid ${BRAND_COLORS[s.brand] || COLORS.gold}44`,
              borderRadius: 10, padding: 16, marginBottom: 14,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 28 }}>{s.flag}</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  <Badge text={s.alignment} color={ALIGNMENT_COLORS[s.alignment]} />
                  <Badge text={s.status} color={STATUS_COLORS[s.status] || COLORS.textDark} />
                </div>
              </div>
              <div style={{ fontWeight: 'bold', fontSize: 20, color: COLORS.white }}>{s.name}</div>
              <div style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 4 }}>
                {s.hometown || 'Unknown'} — Age {s.age}
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <Badge text={s.brand} color={BRAND_COLORS[s.brand] || COLORS.textMuted} />
                <Badge text={s.style} color={COLORS.purple} />
                {s.faction && <Badge text={s.faction} color={COLORS.orange} />}
              </div>
            </div>

            {/* Stats */}
            <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 12 }}>
              <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 }}>ATTRIBUTES</div>
              {[
                ['Overness', s.overness, COLORS.goldLight],
                ['In-Ring', s.inRing, COLORS.green],
                ['Mic Skills', s.mic, COLORS.blue],
                ['Look', s.look, COLORS.purple],
                ['Stamina', s.stamina, COLORS.orange],
                ['Charisma', s.charisma, COLORS.red],
              ].map(([label, value, color]) => (
                <div key={label as string} style={{ marginBottom: 8 }}>
                  <StatBar value={value as number} color={color as string} height={5} label={label as string} showValue />
                </div>
              ))}
            </div>

            {/* Status */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
              <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: 10 }}>
                <div style={{ color: COLORS.textDark, fontSize: 9 }}>MORALE</div>
                <div style={{ color: s.morale > 70 ? COLORS.green : s.morale > 40 ? COLORS.orange : COLORS.red, fontWeight: 'bold', fontSize: 18 }}>
                  {s.morale}
                </div>
                <StatBar value={s.morale} color={s.morale > 70 ? COLORS.green : s.morale > 40 ? COLORS.orange : COLORS.red} height={3} />
              </div>
              <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: 10 }}>
                <div style={{ color: COLORS.textDark, fontSize: 9 }}>POPULARITY</div>
                <div style={{ color: COLORS.blue, fontWeight: 'bold', fontSize: 18 }}>{s.popularity}</div>
                <StatBar value={s.popularity} color={COLORS.blue} height={3} />
              </div>
            </div>

            {/* Contract */}
            <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 12 }}>
              <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 }}>CONTRACT</div>
              {[
                ['Salary', `$${s.salary}k/week`, COLORS.green],
                ['Contract Left', `${s.contractWeeks} weeks`, COLORS.blue],
                ['Injury Risk', `${s.injuryRisk}%`, s.injuryRisk > 40 ? COLORS.red : COLORS.green],
                ['Injury Status', s.injuryWeeks > 0 ? `OUT ${s.injuryWeeks}w` : 'Healthy', s.injuryWeeks > 0 ? COLORS.red : COLORS.green],
              ].map(([l, v, c]) => (
                <div key={l as string} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color: COLORS.textMuted }}>{l}</span>
                  <span style={{ color: c as string, fontWeight: 'bold' }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Finisher & Theme */}
            <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 12 }}>
              <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 }}>DETAILS</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
                <span style={{ color: COLORS.textMuted }}>Finisher</span>
                <span style={{ color: COLORS.red, fontWeight: 'bold' }}>{s.finisher}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
                <span style={{ color: COLORS.textMuted }}>Theme</span>
                <span style={{ color: COLORS.purple }}>{s.theme}</span>
              </div>
              {s.nxtLevel !== undefined && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color: COLORS.textMuted }}>NXT Level</span>
                  <span style={{ color: COLORS.goldLight, fontWeight: 'bold' }}>{s.nxtLevel}/5</span>
                </div>
              )}
              {s.potentialGrowth > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: COLORS.textMuted }}>Growth Potential</span>
                  <span style={{ color: COLORS.green, fontWeight: 'bold' }}>{s.potentialGrowth}/10</span>
                </div>
              )}
            </div>

            {/* Title */}
            {s.titleId && (() => {
              const t = titles.find(t => t.id === s.titleId);
              return t ? (
                <div style={{ background: '#1a1400', border: `1px solid ${COLORS.gold}33`, borderRadius: 8, padding: 14, marginBottom: 12 }}>
                  <div style={{ color: COLORS.goldLight, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 }}>🏆 CHAMPION</div>
                  <div style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 14 }}>{t.name}</div>
                  <div style={{ color: COLORS.textMuted, fontSize: 11, marginTop: 4 }}>Reign: {t.reignWeeks} weeks</div>
                  <StatBar value={t.prestige} color={COLORS.gold} height={4} label="PRESTIGE" showValue />
                </div>
              ) : null;
            })()}

            <button onClick={() => setSelected(null)} style={{
              width: '100%', padding: 8, background: 'transparent', border: `1px solid ${COLORS.border}`,
              borderRadius: 5, color: COLORS.textDark, fontSize: 10, letterSpacing: 2,
            }}>
              CLOSE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
