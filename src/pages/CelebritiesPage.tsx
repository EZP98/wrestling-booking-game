import { useState, useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { COLORS } from '../styles/theme';
import { StatBar, Badge } from '../components/StatBar';
import { Celebrity, CelebCategory } from '../types';

const CAT_COLORS: Record<CelebCategory, string> = {
  Music: COLORS.purple,
  Athlete: COLORS.green,
  Creator: COLORS.blue,
  Actor: COLORS.orange,
};

const COST_LABELS = ['', '$', '$$', '$$$', '$$$$'];

export function CelebritiesPage() {
  const { celebrities } = useGameStore();
  const [catFilter, setCatFilter] = useState('ALL');
  const [selected, setSelected] = useState<Celebrity | null>(null);

  const filtered = useMemo(() => {
    if (catFilter === 'ALL') return celebrities;
    return celebrities.filter(c => c.category === catFilter);
  }, [celebrities, catFilter]);

  const s = selected;

  return (
    <div className="fade-in" style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${COLORS.border}`, flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h1 style={{ fontSize: 20, color: COLORS.white, letterSpacing: 3 }}>CELEBRITIES ({filtered.length})</h1>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['ALL', 'Music', 'Athlete', 'Creator', 'Actor'].map(c => (
              <button key={c} onClick={() => setCatFilter(c)} style={{
                padding: '4px 10px', borderRadius: 16, fontSize: 10, fontWeight: 'bold', cursor: 'pointer',
                border: `1px solid ${catFilter === c ? (CAT_COLORS[c as CelebCategory] || COLORS.gold) : COLORS.border}`,
                background: catFilter === c ? `${CAT_COLORS[c as CelebCategory] || COLORS.gold}22` : 'transparent',
                color: catFilter === c ? COLORS.white : COLORS.textMuted,
              }}>{c}</button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '8px 12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
            {filtered.map(c => {
              const isSel = selected?.id === c.id;
              const catColor = CAT_COLORS[c.category] || COLORS.textMuted;
              return (
                <div key={c.id} onClick={() => setSelected(isSel ? null : c)} style={{
                  background: isSel ? COLORS.bgHover : COLORS.bgCard,
                  border: `1px solid ${isSel ? catColor : COLORS.border}`,
                  borderLeft: `3px solid ${catColor}`,
                  borderRadius: 8, padding: 14, cursor: 'pointer', transition: 'all 0.15s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 28 }}>{c.icon}</span>
                    <Badge text={COST_LABELS[c.cost] || `$${c.cost}`} color={c.cost >= 3 ? COLORS.goldLight : COLORS.green} />
                  </div>
                  <div style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 14, marginBottom: 2 }}>
                    {c.flag} {c.name}
                  </div>
                  <div style={{ color: COLORS.textMuted, fontSize: 10, marginBottom: 8 }}>{c.origin}</div>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
                    <Badge text={c.category} color={catColor} />
                    <Badge text={c.alignment} color={c.alignment === 'Face' ? COLORS.blue : c.alignment === 'Heel' ? COLORS.red : COLORS.goldLight} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
                    <div>
                      <div style={{ color: COLORS.textDark, fontSize: 8, letterSpacing: 1 }}>HYPE</div>
                      <div style={{ color: COLORS.orange, fontWeight: 'bold', fontSize: 14 }}>{c.hype}</div>
                    </div>
                    <div>
                      <div style={{ color: COLORS.textDark, fontSize: 8, letterSpacing: 1 }}>FIGHT</div>
                      <div style={{ color: COLORS.red, fontWeight: 'bold', fontSize: 14 }}>{c.fightSkill}</div>
                    </div>
                    <div>
                      <div style={{ color: COLORS.textDark, fontSize: 8, letterSpacing: 1 }}>POP</div>
                      <div style={{ color: COLORS.blue, fontWeight: 'bold', fontSize: 14 }}>{c.overness}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
                    {c.roles.map(r => (
                      <span key={r} style={{
                        color: COLORS.textDark, fontSize: 9, padding: '1px 5px',
                        background: `${COLORS.border}88`, borderRadius: 3,
                      }}>{r}</span>
                    ))}
                  </div>
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
          const catColor = CAT_COLORS[s.category] || COLORS.textMuted;
          return (
            <div style={{ width: 380, height: '100%', overflow: 'auto', padding: '18px 16px' }}>
              <div style={{
                background: `linear-gradient(135deg, ${catColor}20, transparent)`,
                border: `1px solid ${catColor}44`,
                borderRadius: 10, padding: 18, marginBottom: 16,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 40 }}>{s.icon}</span>
                  <Badge text={COST_LABELS[s.cost] || `$${s.cost}`} color={COLORS.goldLight} />
                </div>
                <div style={{ fontWeight: 'bold', fontSize: 22, color: COLORS.white, marginTop: 6 }}>
                  {s.flag} {s.name}
                </div>
                <div style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 4 }}>{s.origin}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  <Badge text={s.category} color={catColor} />
                  <Badge text={s.alignment} color={s.alignment === 'Face' ? COLORS.blue : s.alignment === 'Heel' ? COLORS.red : COLORS.goldLight} />
                </div>
              </div>

              {/* Stats */}
              <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
                <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 }}>ATTRIBUTES</div>
                {[
                  ['Hype', s.hype, COLORS.orange],
                  ['Fight Skill', s.fightSkill, COLORS.red],
                  ['Overness (Pop)', s.overness, COLORS.blue],
                ].map(([label, value, color]) => (
                  <div key={label as string} style={{ marginBottom: 8 }}>
                    <StatBar value={value as number} max={10} color={color as string} height={5} label={label as string} showValue />
                  </div>
                ))}
              </div>

              {/* Description */}
              <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
                <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 }}>PROFILE</div>
                <div style={{ color: COLORS.text, fontSize: 12, lineHeight: 1.5, marginBottom: 10 }}>{s.desc}</div>
                <div style={{ color: COLORS.textDark, fontSize: 10, fontStyle: 'italic' }}>{s.history}</div>
              </div>

              {/* Mechanic */}
              <div style={{ background: '#1a0a1a', border: `1px solid ${COLORS.purple}33`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
                <div style={{ color: COLORS.purple, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 }}>SPECIAL MECHANIC</div>
                <div style={{ color: COLORS.text, fontSize: 12, lineHeight: 1.5 }}>{s.mechanic}</div>
              </div>

              {/* Cost Note */}
              <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
                <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 }}>COST NOTE</div>
                <div style={{ color: COLORS.textMuted, fontSize: 12, lineHeight: 1.5 }}>{s.costNote}</div>
              </div>

              {/* Roles */}
              <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
                <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 }}>ROLES</div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {s.roles.map(r => <Badge key={r} text={r} color={catColor} />)}
                </div>
              </div>

              {/* Chemistry */}
              {s.chemistry.length > 0 && (
                <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
                  <div style={{ color: COLORS.green, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 }}>CHEMISTRY</div>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {s.chemistry.map(ch => <Badge key={ch} text={ch} color={COLORS.green} />)}
                  </div>
                </div>
              )}

              {/* Conflicts */}
              {s.conflict.length > 0 && (
                <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
                  <div style={{ color: COLORS.red, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 }}>CONFLICTS</div>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {s.conflict.map(co => <Badge key={co} text={co} color={COLORS.red} />)}
                  </div>
                </div>
              )}

              {/* Best Venues */}
              {s.venues.length > 0 && (
                <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
                  <div style={{ color: COLORS.blue, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 }}>BEST VENUES</div>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {s.venues.map(v => <Badge key={v} text={v} color={COLORS.blue} />)}
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
