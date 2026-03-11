import { useState, useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { COLORS, BRAND_COLORS } from '../styles/theme';
import { StatBar, Badge } from '../components/StatBar';
import { Title } from '../types';

const TIER_COLORS: Record<string, string> = {
  World: COLORS.goldLight,
  Midcard: COLORS.blue,
  Tag: COLORS.green,
  Specialty: COLORS.purple,
};

export function TitlesPage() {
  const { titles, wrestlers } = useGameStore();
  const [selected, setSelected] = useState<Title | null>(null);
  const [brandFilter, setBrandFilter] = useState('ALL');

  const brands = useMemo(() => {
    const set = new Set(titles.map(t => t.brand));
    return ['ALL', ...Array.from(set)];
  }, [titles]);

  const grouped = useMemo(() => {
    const filtered = brandFilter === 'ALL' ? titles : titles.filter(t => t.brand === brandFilter);
    const map: Record<string, Title[]> = {};
    filtered.forEach(t => {
      if (!map[t.brand]) map[t.brand] = [];
      map[t.brand].push(t);
    });
    return map;
  }, [titles, brandFilter]);

  const s = selected;

  return (
    <div className="fade-in" style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${COLORS.border}`, flexShrink: 0 }}>
          <h1 style={{ fontSize: 20, color: COLORS.white, letterSpacing: 3, marginBottom: 12 }}>CHAMPIONSHIPS</h1>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {brands.map(b => (
              <button key={b} onClick={() => setBrandFilter(b)} style={{
                padding: '4px 10px', borderRadius: 16, fontSize: 10, fontWeight: 'bold',
                border: `1px solid ${brandFilter === b ? (BRAND_COLORS[b] || COLORS.gold) : COLORS.border}`,
                background: brandFilter === b ? `${BRAND_COLORS[b] || COLORS.gold}22` : 'transparent',
                color: brandFilter === b ? COLORS.white : COLORS.textMuted,
                cursor: 'pointer',
              }}>{b}</button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px' }}>
          {Object.entries(grouped).map(([brand, brandTitles]) => (
            <div key={brand} style={{ marginBottom: 24 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
                borderBottom: `2px solid ${BRAND_COLORS[brand] || COLORS.gold}44`, paddingBottom: 8,
              }}>
                <span style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: BRAND_COLORS[brand] || COLORS.gold,
                }} />
                <span style={{ color: BRAND_COLORS[brand] || COLORS.gold, fontSize: 13, fontWeight: 'bold', letterSpacing: 2 }}>
                  {brand.toUpperCase()}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
                {brandTitles.map(t => {
                  const isSel = selected?.id === t.id;
                  return (
                    <div key={t.id} onClick={() => setSelected(isSel ? null : t)} style={{
                      background: isSel ? COLORS.bgHover : COLORS.bgCard,
                      border: `1px solid ${isSel ? COLORS.gold : COLORS.border}`,
                      borderLeft: `3px solid ${TIER_COLORS[t.tier] || COLORS.gold}`,
                      borderRadius: 8, padding: 14, cursor: 'pointer', transition: 'all 0.15s',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <div>
                          <div style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 14 }}>{t.name}</div>
                          <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                            <Badge text={t.tier} color={TIER_COLORS[t.tier] || COLORS.gold} />
                            {t.isTag && <Badge text="TAG" color={COLORS.purple} />}
                            {t.gender !== 'Any' && <Badge text={t.gender} color={COLORS.textMuted} />}
                          </div>
                        </div>
                        <span style={{ fontSize: 22 }}>🏆</span>
                      </div>
                      <div style={{
                        background: COLORS.bg, borderRadius: 6, padding: '8px 10px', marginBottom: 8,
                        border: `1px solid ${COLORS.border}`,
                      }}>
                        <div style={{ color: COLORS.textDark, fontSize: 9, letterSpacing: 1, marginBottom: 4 }}>CURRENT HOLDER</div>
                        <div style={{ color: t.holderId ? COLORS.white : COLORS.textDark, fontWeight: 'bold', fontSize: 13 }}>
                          {t.holderName || 'VACANT'}
                          {t.isTag && t.secondHolderName && ` & ${t.secondHolderName}`}
                        </div>
                        {t.holderId && (
                          <div style={{ color: COLORS.textMuted, fontSize: 10, marginTop: 2 }}>
                            Reign: {t.reignWeeks} weeks
                          </div>
                        )}
                      </div>
                      <StatBar value={t.prestige} color={COLORS.gold} height={5} label="PRESTIGE" showValue />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <div style={{
        width: s ? 360 : 0, flexShrink: 0, overflow: 'hidden',
        transition: 'width 0.3s ease', background: COLORS.bgPanel, borderLeft: `1px solid ${COLORS.border}`,
      }}>
        {s && (
          <div style={{ width: 360, height: '100%', overflow: 'auto', padding: '18px 16px' }}>
            <div style={{
              background: `linear-gradient(135deg, ${COLORS.gold}20, transparent)`,
              border: `1px solid ${COLORS.gold}44`,
              borderRadius: 10, padding: 18, marginBottom: 16,
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🏆</div>
              <div style={{ fontWeight: 'bold', fontSize: 20, color: COLORS.white }}>{s.name}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <Badge text={s.brand} color={BRAND_COLORS[s.brand] || COLORS.textMuted} />
                <Badge text={s.tier} color={TIER_COLORS[s.tier] || COLORS.gold} />
                {s.isTag && <Badge text="TAG TEAM" color={COLORS.purple} />}
                {s.gender !== 'Any' && <Badge text={s.gender} color={COLORS.textMuted} />}
              </div>
            </div>

            <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
              <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 }}>CURRENT REIGN</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                <span style={{ color: COLORS.textMuted }}>Champion</span>
                <span style={{ color: COLORS.white, fontWeight: 'bold' }}>
                  {s.holderName || 'VACANT'}
                  {s.isTag && s.secondHolderName && ` & ${s.secondHolderName}`}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 10 }}>
                <span style={{ color: COLORS.textMuted }}>Reign Length</span>
                <span style={{ color: COLORS.goldLight, fontWeight: 'bold' }}>{s.reignWeeks} weeks</span>
              </div>
              <StatBar value={s.prestige} color={COLORS.gold} height={6} label="PRESTIGE" showValue />
            </div>

            {/* Holder stats */}
            {s.holderId && (() => {
              const holder = wrestlers.find(w => w.id === s.holderId);
              return holder ? (
                <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
                  <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 }}>CHAMPION STATS</div>
                  {[
                    ['Overness', holder.overness, COLORS.goldLight],
                    ['In-Ring', holder.inRing, COLORS.green],
                    ['Mic Skills', holder.mic, COLORS.blue],
                    ['Popularity', holder.popularity, COLORS.purple],
                  ].map(([label, value, color]) => (
                    <div key={label as string} style={{ marginBottom: 6 }}>
                      <StatBar value={value as number} color={color as string} height={4} label={label as string} showValue />
                    </div>
                  ))}
                </div>
              ) : null;
            })()}

            {/* History */}
            <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
              <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 }}>
                TITLE HISTORY ({s.history.length})
              </div>
              {s.history.length === 0 && (
                <div style={{ color: COLORS.textDark, fontSize: 11 }}>No previous reigns</div>
              )}
              {s.history.map((h, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 0', borderBottom: i < s.history.length - 1 ? `1px solid ${COLORS.border}` : 'none',
                }}>
                  <div>
                    <div style={{ color: COLORS.white, fontSize: 12, fontWeight: 'bold' }}>{h.holderName}</div>
                    <div style={{ color: COLORS.textDark, fontSize: 10 }}>Won at: {h.wonAt}</div>
                  </div>
                  <div style={{ color: COLORS.textMuted, fontSize: 11 }}>{h.weeks}w</div>
                </div>
              ))}
            </div>

            <button onClick={() => setSelected(null)} style={{
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
