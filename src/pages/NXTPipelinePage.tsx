import { useState, useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { COLORS, BRAND_COLORS } from '../styles/theme';
import { StatBar, Badge } from '../components/StatBar';
import { Wrestler } from '../types';

export function NXTPipelinePage() {
  const { wrestlers, callUpNXT } = useGameStore();
  const [selected, setSelected] = useState<Wrestler | null>(null);
  const [callUpBrand, setCallUpBrand] = useState<'Raw' | 'SmackDown'>('Raw');
  const [sortBy, setSortBy] = useState<'nxtLevel' | 'potentialGrowth' | 'overness'>('potentialGrowth');

  const nxtRoster = useMemo(() => {
    return wrestlers
      .filter(w => w.brand === 'NXT')
      .sort((a, b) => {
        if (sortBy === 'nxtLevel') return (b.nxtLevel || 0) - (a.nxtLevel || 0);
        if (sortBy === 'potentialGrowth') return b.potentialGrowth - a.potentialGrowth;
        return b.overness - a.overness;
      });
  }, [wrestlers, sortBy]);

  const getLevelLabel = (level: number | undefined) => {
    const labels = ['Trainee', 'Rookie', 'Rising', 'Featured', 'Main Event', 'Ready'];
    return labels[level || 0] || 'Trainee';
  };

  const getLevelColor = (level: number | undefined) => {
    const colors = [COLORS.textDark, COLORS.textMuted, COLORS.blue, COLORS.purple, COLORS.orange, COLORS.goldLight];
    return colors[level || 0] || COLORS.textDark;
  };

  const getGrowthColor = (growth: number) => {
    if (growth >= 8) return COLORS.goldLight;
    if (growth >= 6) return COLORS.green;
    if (growth >= 4) return COLORS.blue;
    return COLORS.textMuted;
  };

  const handleCallUp = (wrestler: Wrestler) => {
    callUpNXT(wrestler.id, callUpBrand);
    setSelected(null);
  };

  const s = selected;

  return (
    <div className="fade-in" style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${COLORS.border}`, flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h1 style={{ fontSize: 20, color: COLORS.white, letterSpacing: 3 }}>
              <span style={{ color: COLORS.goldLight }}>NXT</span> PIPELINE ({nxtRoster.length})
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} style={{ fontSize: 11, padding: '6px 10px' }}>
              <option value="potentialGrowth">Sort: Growth Potential</option>
              <option value="nxtLevel">Sort: NXT Level</option>
              <option value="overness">Sort: Overness</option>
            </select>
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '8px 12px' }}>
          {nxtRoster.length === 0 && (
            <div style={{
              background: COLORS.bgCard, border: `1px dashed ${COLORS.border}`, borderRadius: 10,
              padding: 40, textAlign: 'center', color: COLORS.textDark, fontSize: 12,
            }}>
              No NXT wrestlers in the pipeline.
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
            {nxtRoster.map(w => {
              const isSel = selected?.id === w.id;
              const levelColor = getLevelColor(w.nxtLevel);
              const growthColor = getGrowthColor(w.potentialGrowth);
              return (
                <div key={w.id} onClick={() => setSelected(isSel ? null : w)} style={{
                  background: isSel ? COLORS.bgHover : COLORS.bgCard,
                  border: `1px solid ${isSel ? COLORS.goldLight : COLORS.border}`,
                  borderLeft: `3px solid ${levelColor}`,
                  borderRadius: 8, padding: 14, cursor: 'pointer', transition: 'all 0.15s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 13 }}>
                      {w.flag} {w.name}
                    </span>
                    <div style={{
                      background: `${growthColor}22`, border: `1px solid ${growthColor}44`,
                      borderRadius: 10, padding: '2px 8px',
                    }}>
                      <span style={{ color: growthColor, fontSize: 10, fontWeight: 'bold' }}>
                        +{w.potentialGrowth}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
                    <Badge text={getLevelLabel(w.nxtLevel)} color={levelColor} />
                    <Badge text={`Lv.${w.nxtLevel || 0}/5`} color={levelColor} />
                    <Badge text={w.alignment} color={w.alignment === 'Face' ? COLORS.blue : w.alignment === 'Heel' ? COLORS.red : COLORS.goldLight} />
                    <Badge text={w.style} color={COLORS.purple} />
                  </div>

                  {/* Core stats with growth highlight */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, marginBottom: 8 }}>
                    <div>
                      <div style={{ color: COLORS.textDark, fontSize: 8, letterSpacing: 1 }}>OVR</div>
                      <div style={{ color: COLORS.goldLight, fontWeight: 'bold', fontSize: 14 }}>{Math.round(w.overness)}</div>
                    </div>
                    <div>
                      <div style={{ color: COLORS.textDark, fontSize: 8, letterSpacing: 1 }}>RING</div>
                      <div style={{ color: COLORS.green, fontWeight: 'bold', fontSize: 14 }}>{Math.round(w.inRing)}</div>
                    </div>
                    <div>
                      <div style={{ color: COLORS.textDark, fontSize: 8, letterSpacing: 1 }}>MIC</div>
                      <div style={{ color: COLORS.blue, fontWeight: 'bold', fontSize: 14 }}>{Math.round(w.mic)}</div>
                    </div>
                  </div>

                  {/* Growth potential bar */}
                  <StatBar value={w.potentialGrowth} max={10} color={growthColor} height={4} label="GROWTH POTENTIAL" showValue />
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
              background: `linear-gradient(135deg, ${COLORS.goldLight}20, transparent)`,
              border: `1px solid ${COLORS.goldLight}44`,
              borderRadius: 10, padding: 18, marginBottom: 16,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 28 }}>{s.flag}</span>
                <Badge text={getLevelLabel(s.nxtLevel)} color={getLevelColor(s.nxtLevel)} />
              </div>
              <div style={{ fontWeight: 'bold', fontSize: 20, color: COLORS.white }}>{s.name}</div>
              <div style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 4 }}>
                {s.hometown || 'Unknown'} — Age {s.age}
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <Badge text="NXT" color={COLORS.goldLight} />
                <Badge text={s.style} color={COLORS.purple} />
                <Badge text={s.alignment} color={s.alignment === 'Face' ? COLORS.blue : s.alignment === 'Heel' ? COLORS.red : COLORS.goldLight} />
              </div>
            </div>

            {/* Attributes */}
            <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
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
                  <StatBar value={Math.round(value as number)} color={color as string} height={5} label={label as string} showValue />
                </div>
              ))}
            </div>

            {/* Growth */}
            <div style={{
              background: '#0a1a0a', border: `1px solid ${COLORS.green}33`,
              borderRadius: 8, padding: 14, marginBottom: 14,
            }}>
              <div style={{ color: COLORS.green, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 }}>DEVELOPMENT</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                <span style={{ color: COLORS.textMuted }}>NXT Level</span>
                <span style={{ color: getLevelColor(s.nxtLevel), fontWeight: 'bold' }}>
                  {getLevelLabel(s.nxtLevel)} ({s.nxtLevel || 0}/5)
                </span>
              </div>
              <div style={{ marginBottom: 8 }}>
                <StatBar value={s.nxtLevel || 0} max={5} color={getLevelColor(s.nxtLevel)} height={6} label="NXT LEVEL" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                <span style={{ color: COLORS.textMuted }}>Growth Potential</span>
                <span style={{ color: getGrowthColor(s.potentialGrowth), fontWeight: 'bold' }}>{s.potentialGrowth}/10</span>
              </div>
              <StatBar value={s.potentialGrowth} max={10} color={getGrowthColor(s.potentialGrowth)} height={6} label="GROWTH RATE" />
            </div>

            {/* Status */}
            <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
              <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 }}>STATUS</div>
              {[
                ['Morale', `${s.morale}`, s.morale > 70 ? COLORS.green : s.morale > 40 ? COLORS.orange : COLORS.red],
                ['Popularity', `${s.popularity}`, COLORS.blue],
                ['Salary', `$${s.salary}k/week`, COLORS.green],
                ['Contract Left', `${s.contractWeeks} weeks`, COLORS.textMuted],
                ['Injury Risk', `${s.injuryRisk}%`, s.injuryRisk > 40 ? COLORS.red : COLORS.green],
              ].map(([l, v, c]) => (
                <div key={l as string} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color: COLORS.textMuted }}>{l}</span>
                  <span style={{ color: c as string, fontWeight: 'bold' }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Finisher */}
            <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                <span style={{ color: COLORS.textMuted }}>Finisher</span>
                <span style={{ color: COLORS.red, fontWeight: 'bold' }}>{s.finisher}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <span style={{ color: COLORS.textMuted }}>Theme</span>
                <span style={{ color: COLORS.purple }}>{s.theme}</span>
              </div>
            </div>

            {/* Call Up */}
            <div style={{
              background: `linear-gradient(135deg, ${COLORS.gold}10, transparent)`,
              border: `1px solid ${COLORS.gold}44`,
              borderRadius: 8, padding: 14, marginBottom: 14,
            }}>
              <div style={{ color: COLORS.goldLight, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 }}>CALL UP TO MAIN ROSTER</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <button onClick={() => setCallUpBrand('Raw')} style={{
                  flex: 1, padding: 8, borderRadius: 6, fontSize: 11, fontWeight: 'bold', cursor: 'pointer',
                  border: `1px solid ${callUpBrand === 'Raw' ? BRAND_COLORS.Raw : COLORS.border}`,
                  background: callUpBrand === 'Raw' ? `${BRAND_COLORS.Raw}22` : 'transparent',
                  color: callUpBrand === 'Raw' ? COLORS.white : COLORS.textMuted,
                }}>RAW</button>
                <button onClick={() => setCallUpBrand('SmackDown')} style={{
                  flex: 1, padding: 8, borderRadius: 6, fontSize: 11, fontWeight: 'bold', cursor: 'pointer',
                  border: `1px solid ${callUpBrand === 'SmackDown' ? BRAND_COLORS.SmackDown : COLORS.border}`,
                  background: callUpBrand === 'SmackDown' ? `${BRAND_COLORS.SmackDown}22` : 'transparent',
                  color: callUpBrand === 'SmackDown' ? COLORS.white : COLORS.textMuted,
                }}>SMACKDOWN</button>
              </div>
              <button onClick={() => handleCallUp(s)} style={{
                width: '100%', padding: 10, borderRadius: 6, fontSize: 12, fontWeight: 'bold', cursor: 'pointer',
                background: `linear-gradient(135deg, ${BRAND_COLORS[callUpBrand]}, ${BRAND_COLORS[callUpBrand]}88)`,
                border: 'none', color: COLORS.white, letterSpacing: 1,
              }}>
                CALL UP TO {callUpBrand.toUpperCase()}
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
