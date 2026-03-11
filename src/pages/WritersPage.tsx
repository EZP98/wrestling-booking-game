import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { COLORS } from '../styles/theme';
import { StatBar, Badge } from '../components/StatBar';
import { Writer } from '../types';

const LEVEL_COLORS = [COLORS.textDark, COLORS.textMuted, COLORS.blue, COLORS.purple, COLORS.goldLight, COLORS.red];

function renderStars(level: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < level ? COLORS.goldLight : COLORS.textDark, fontSize: 12 }}>
      ★
    </span>
  ));
}

export function WritersPage() {
  const { writers, hireWriter, fireWriter } = useGameStore();
  const [selected, setSelected] = useState<Writer | null>(null);

  const s = selected;

  return (
    <div className="fade-in" style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${COLORS.border}`, flexShrink: 0 }}>
          <h1 style={{ fontSize: 20, color: COLORS.white, letterSpacing: 3 }}>WRITING TEAM ({writers.length})</h1>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
            {writers.map(w => {
              const isSel = selected?.id === w.id;
              const levelColor = LEVEL_COLORS[w.level] || COLORS.textMuted;
              return (
                <div key={w.id} onClick={() => setSelected(isSel ? null : w)} style={{
                  background: isSel ? COLORS.bgHover : COLORS.bgCard,
                  border: `1px solid ${isSel ? levelColor : COLORS.border}`,
                  borderLeft: `3px solid ${levelColor}`,
                  borderRadius: 8, padding: 16, cursor: 'pointer', transition: 'all 0.15s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 24 }}>{w.icon}</span>
                      <div>
                        <div style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 14 }}>{w.name}</div>
                        <div style={{ color: COLORS.textMuted, fontSize: 10 }}>{w.role}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 8 }}>{renderStars(w.level)}</div>

                  <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
                    <Badge text={w.specialty} color={COLORS.purple} />
                    <Badge text={w.personality} color={COLORS.blue} />
                    <Badge text={w.trait} color={COLORS.orange} />
                  </div>

                  <StatBar value={w.morale} color={w.morale > 70 ? COLORS.green : w.morale > 40 ? COLORS.orange : COLORS.red}
                    height={4} label="MORALE" showValue />
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
            <div style={{
              background: `linear-gradient(135deg, ${LEVEL_COLORS[s.level]}20, transparent)`,
              border: `1px solid ${LEVEL_COLORS[s.level]}44`,
              borderRadius: 10, padding: 18, marginBottom: 16,
            }}>
              <div style={{ fontSize: 40, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontWeight: 'bold', fontSize: 22, color: COLORS.white }}>{s.name}</div>
              <div style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 4 }}>{s.role}</div>
              <div style={{ marginTop: 8 }}>{renderStars(s.level)}</div>
            </div>

            {/* Stats */}
            <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
              <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 }}>DETAILS</div>
              {[
                ['Level', `${s.level}/5`, LEVEL_COLORS[s.level]],
                ['Specialty', s.specialty, COLORS.purple],
                ['Personality', s.personality, COLORS.blue],
                ['Trait', s.trait, COLORS.orange],
              ].map(([l, v, c]) => (
                <div key={l as string} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color: COLORS.textMuted }}>{l}</span>
                  <span style={{ color: c as string, fontWeight: 'bold' }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop: 8 }}>
                <StatBar value={s.morale} color={s.morale > 70 ? COLORS.green : s.morale > 40 ? COLORS.orange : COLORS.red}
                  height={6} label="MORALE" showValue />
              </div>
            </div>

            {/* Bio */}
            <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
              <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 }}>BIO</div>
              <div style={{ color: COLORS.text, fontSize: 12, lineHeight: 1.6 }}>{s.bio}</div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              <button onClick={() => { hireWriter(s.id); setSelected({ ...s, morale: Math.min(100, s.morale + 10) }); }} style={{
                flex: 1, padding: 8, borderRadius: 6, fontSize: 11, fontWeight: 'bold', cursor: 'pointer',
                background: COLORS.green, border: 'none', color: COLORS.white, letterSpacing: 1,
              }}>
                BOOST MORALE
              </button>
              <button onClick={() => { fireWriter(s.id); setSelected(null); }} style={{
                flex: 1, padding: 8, borderRadius: 6, fontSize: 11, fontWeight: 'bold', cursor: 'pointer',
                background: 'transparent', border: `1px solid ${COLORS.red}44`, color: COLORS.red,
              }}>
                FIRE WRITER
              </button>
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
