import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { COLORS, BRAND_COLORS, ALIGNMENT_COLORS } from '../styles/theme';
import { StatBar, Badge } from '../components/StatBar';
import { Faction } from '../types';

export function FactionsPage() {
  const { factions, wrestlers } = useGameStore();
  const [selected, setSelected] = useState<Faction | null>(null);

  const s = selected;

  return (
    <div className="fade-in" style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${COLORS.border}`, flexShrink: 0 }}>
          <h1 style={{ fontSize: 20, color: COLORS.white, letterSpacing: 3 }}>FACTIONS ({factions.length})</h1>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
            {factions.map(f => {
              const isSel = selected?.id === f.id;
              const memberWrestlers = f.members.map(name => wrestlers.find(w => w.name === name)).filter(Boolean);
              return (
                <div key={f.id} onClick={() => setSelected(isSel ? null : f)} style={{
                  background: isSel ? COLORS.bgHover : COLORS.bgCard,
                  border: `1px solid ${isSel ? ALIGNMENT_COLORS[f.alignment] : COLORS.border}`,
                  borderLeft: `3px solid ${ALIGNMENT_COLORS[f.alignment]}`,
                  borderRadius: 8, padding: 16, cursor: 'pointer', transition: 'all 0.15s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 16 }}>{f.name}</div>
                    <span style={{ fontSize: 18 }}>👥</span>
                  </div>

                  <div style={{ display: 'flex', gap: 4, marginBottom: 10, flexWrap: 'wrap' }}>
                    <Badge text={f.brand} color={BRAND_COLORS[f.brand] || COLORS.textMuted} />
                    <Badge text={f.alignment} color={ALIGNMENT_COLORS[f.alignment]} />
                    <Badge text={`${f.members.length} members`} color={COLORS.textMuted} />
                  </div>

                  <div style={{ marginBottom: 4 }}>
                    <div style={{ color: COLORS.textDark, fontSize: 9, letterSpacing: 1, marginBottom: 4 }}>LEADER</div>
                    <div style={{ color: COLORS.goldLight, fontWeight: 'bold', fontSize: 13 }}>{f.leader}</div>
                  </div>

                  <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap', marginTop: 8 }}>
                    {f.members.filter(m => m !== f.leader).map(m => (
                      <span key={m} style={{
                        color: COLORS.textMuted, fontSize: 10, padding: '2px 6px',
                        background: `${COLORS.border}88`, borderRadius: 4,
                      }}>{m}</span>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <div>
                      <StatBar value={f.power} max={10} color={COLORS.red} height={4} label="POWER" showValue />
                    </div>
                    <div>
                      <StatBar value={f.stability} max={10} color={COLORS.green} height={4} label="STABILITY" showValue />
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
        width: s ? 360 : 0, flexShrink: 0, overflow: 'hidden',
        transition: 'width 0.3s ease', background: COLORS.bgPanel, borderLeft: `1px solid ${COLORS.border}`,
      }}>
        {s && (
          <div style={{ width: 360, height: '100%', overflow: 'auto', padding: '18px 16px' }}>
            <div style={{
              background: `linear-gradient(135deg, ${ALIGNMENT_COLORS[s.alignment]}20, transparent)`,
              border: `1px solid ${ALIGNMENT_COLORS[s.alignment]}44`,
              borderRadius: 10, padding: 18, marginBottom: 16,
            }}>
              <div style={{ fontSize: 32, marginBottom: 6 }}>👥</div>
              <div style={{ fontWeight: 'bold', fontSize: 22, color: COLORS.white }}>{s.name}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <Badge text={s.brand} color={BRAND_COLORS[s.brand] || COLORS.textMuted} />
                <Badge text={s.alignment} color={ALIGNMENT_COLORS[s.alignment]} />
              </div>
            </div>

            {/* Power & Stability */}
            <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
              <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 }}>STATS</div>
              <div style={{ marginBottom: 8 }}>
                <StatBar value={s.power} max={10} color={COLORS.red} height={6} label="POWER" showValue />
              </div>
              <StatBar value={s.stability} max={10} color={COLORS.green} height={6} label="STABILITY" showValue />
            </div>

            {/* Members */}
            <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
              <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 }}>
                MEMBERS ({s.members.length})
              </div>
              {s.members.map(name => {
                const w = wrestlers.find(wr => wr.name === name);
                const isLeader = name === s.leader;
                return (
                  <div key={name} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 0', borderBottom: `1px solid ${COLORS.border}`,
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ color: COLORS.white, fontSize: 12, fontWeight: 'bold' }}>
                          {w?.flag || ''} {name}
                        </span>
                        {isLeader && <Badge text="LEADER" color={COLORS.goldLight} />}
                      </div>
                      {w && (
                        <div style={{ display: 'flex', gap: 8, marginTop: 4, fontSize: 10 }}>
                          <span style={{ color: COLORS.goldLight }}>OVR {w.overness}</span>
                          <span style={{ color: COLORS.green }}>RING {w.inRing}</span>
                          <span style={{ color: COLORS.blue }}>MIC {w.mic}</span>
                        </div>
                      )}
                    </div>
                    {w && (
                      <Badge text={w.status} color={w.status === 'Full Time' ? COLORS.green : COLORS.orange} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Story Arc */}
            <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
              <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 }}>STORY ARC</div>
              <div style={{ color: COLORS.text, fontSize: 12, lineHeight: 1.5 }}>{s.story}</div>
            </div>

            {/* Special Mechanic */}
            <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
              <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 }}>SPECIAL MECHANIC</div>
              <div style={{ color: COLORS.purple, fontSize: 12, lineHeight: 1.5 }}>{s.mechanic}</div>
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
