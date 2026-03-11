import { useState, useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { COLORS, BRAND_COLORS } from '../styles/theme';
import { StatBar, Badge } from '../components/StatBar';
import { Feud, FeudPhase } from '../types';

const PHASE_COLORS: Record<FeudPhase, string> = {
  Build: COLORS.blue,
  Climax: COLORS.red,
  Blowoff: COLORS.goldLight,
  Cooldown: COLORS.textMuted,
};

const PHASE_ORDER: FeudPhase[] = ['Build', 'Climax', 'Blowoff', 'Cooldown'];

function genId() { return `feud_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`; }

export function FeudsPage() {
  const { feuds, wrestlers, titles, createFeud, updateFeud, endFeud } = useGameStore();
  const [selected, setSelected] = useState<Feud | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  // Create form state
  const [w1, setW1] = useState('');
  const [w2, setW2] = useState('');
  const [weeks, setWeeks] = useState(6);
  const [titleStake, setTitleStake] = useState('');
  const [storyArc, setStoryArc] = useState('');

  const rosterWrestlers = useMemo(() =>
    wrestlers.filter(w => ['Raw', 'SmackDown', 'NXT'].includes(w.brand) && w.injuryWeeks === 0)
      .sort((a, b) => b.overness - a.overness),
    [wrestlers]
  );

  const getWrestler = (id: string) => wrestlers.find(w => w.id === id);

  const handleCreate = () => {
    if (!w1 || !w2 || w1 === w2) return;
    createFeud({
      id: genId(),
      wrestler1Id: w1,
      wrestler2Id: w2,
      phase: 'Build',
      intensity: 5,
      weeksActive: 0,
      weeksPlanned: weeks,
      titleId: titleStake || undefined,
      storyArc: storyArc || 'Personal rivalry',
      crowdInterest: 50,
    });
    setW1(''); setW2(''); setWeeks(6); setTitleStake(''); setStoryArc('');
    setShowCreate(false);
  };

  const advancePhase = (feud: Feud) => {
    const idx = PHASE_ORDER.indexOf(feud.phase);
    if (idx < PHASE_ORDER.length - 1) {
      updateFeud(feud.id, { phase: PHASE_ORDER[idx + 1] });
    }
  };

  const s = selected;
  const sw1 = s ? getWrestler(s.wrestler1Id) : null;
  const sw2 = s ? getWrestler(s.wrestler2Id) : null;

  return (
    <div className="fade-in" style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${COLORS.border}`, flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: 20, color: COLORS.white, letterSpacing: 3 }}>FEUDS ({feuds.length})</h1>
            <button onClick={() => setShowCreate(!showCreate)} style={{
              padding: '6px 14px', borderRadius: 16, fontSize: 10, fontWeight: 'bold', cursor: 'pointer',
              border: `1px solid ${showCreate ? COLORS.red : COLORS.gold}`,
              background: showCreate ? `${COLORS.red}22` : `${COLORS.gold}22`,
              color: COLORS.white,
            }}>
              {showCreate ? 'CANCEL' : '+ NEW FEUD'}
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px' }}>
          {/* Create Form */}
          {showCreate && (
            <div style={{
              background: COLORS.bgCard, border: `1px solid ${COLORS.gold}44`,
              borderRadius: 10, padding: 16, marginBottom: 20,
            }}>
              <div style={{ color: COLORS.gold, fontSize: 11, fontWeight: 'bold', letterSpacing: 2, marginBottom: 14 }}>CREATE NEW FEUD</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <div style={{ color: COLORS.textDark, fontSize: 9, marginBottom: 4 }}>WRESTLER 1</div>
                  <select value={w1} onChange={e => setW1(e.target.value)} style={{ fontSize: 11, padding: '6px 8px', width: '100%' }}>
                    <option value="">-- Select --</option>
                    {rosterWrestlers.map(w => (
                      <option key={w.id} value={w.id}>{w.name} ({w.brand})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <div style={{ color: COLORS.textDark, fontSize: 9, marginBottom: 4 }}>WRESTLER 2</div>
                  <select value={w2} onChange={e => setW2(e.target.value)} style={{ fontSize: 11, padding: '6px 8px', width: '100%' }}>
                    <option value="">-- Select --</option>
                    {rosterWrestlers.filter(w => w.id !== w1).map(w => (
                      <option key={w.id} value={w.id}>{w.name} ({w.brand})</option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <div style={{ color: COLORS.textDark, fontSize: 9, marginBottom: 4 }}>PLANNED WEEKS</div>
                  <input type="number" value={weeks} onChange={e => setWeeks(Number(e.target.value))} min={2} max={52}
                    style={{ fontSize: 11, padding: '6px 8px', width: '100%' }} />
                </div>
                <div>
                  <div style={{ color: COLORS.textDark, fontSize: 9, marginBottom: 4 }}>TITLE STAKE</div>
                  <select value={titleStake} onChange={e => setTitleStake(e.target.value)} style={{ fontSize: 11, padding: '6px 8px', width: '100%' }}>
                    <option value="">None</option>
                    {titles.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ color: COLORS.textDark, fontSize: 9, marginBottom: 4 }}>STORY ARC</div>
                  <input value={storyArc} onChange={e => setStoryArc(e.target.value)} placeholder="e.g. Betrayal..."
                    style={{ fontSize: 11, padding: '6px 8px', width: '100%' }} />
                </div>
              </div>
              <button onClick={handleCreate} disabled={!w1 || !w2 || w1 === w2} style={{
                padding: '8px 20px', borderRadius: 6, fontSize: 11, fontWeight: 'bold', cursor: 'pointer',
                background: w1 && w2 && w1 !== w2 ? COLORS.gold : COLORS.border,
                border: 'none', color: COLORS.white, letterSpacing: 1,
              }}>
                CREATE FEUD
              </button>
            </div>
          )}

          {/* Feuds list */}
          {feuds.length === 0 && !showCreate && (
            <div style={{
              background: COLORS.bgCard, border: `1px dashed ${COLORS.border}`, borderRadius: 10,
              padding: 40, textAlign: 'center', color: COLORS.textDark, fontSize: 12,
            }}>
              No active feuds. Click "+ NEW FEUD" to start one.
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 10 }}>
            {feuds.map(f => {
              const fw1 = getWrestler(f.wrestler1Id);
              const fw2 = getWrestler(f.wrestler2Id);
              const isSel = selected?.id === f.id;
              const isOvertime = f.weeksActive > f.weeksPlanned;
              return (
                <div key={f.id} onClick={() => setSelected(isSel ? null : f)} style={{
                  background: isSel ? COLORS.bgHover : COLORS.bgCard,
                  border: `1px solid ${isSel ? PHASE_COLORS[f.phase] : COLORS.border}`,
                  borderLeft: `3px solid ${PHASE_COLORS[f.phase]}`,
                  borderRadius: 8, padding: 14, cursor: 'pointer', transition: 'all 0.15s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 14 }}>
                      {fw1?.name || '?'} vs {fw2?.name || '?'}
                    </div>
                    <span style={{ fontSize: 18 }}>⚔️</span>
                  </div>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
                    <Badge text={f.phase} color={PHASE_COLORS[f.phase]} />
                    <Badge text={`${f.weeksActive}/${f.weeksPlanned}w`} color={isOvertime ? COLORS.red : COLORS.textMuted} />
                    <Badge text={`Intensity: ${f.intensity}`} color={COLORS.orange} />
                    {f.titleId && <Badge text="TITLE" color={COLORS.goldLight} />}
                  </div>

                  {/* Phase progression */}
                  <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
                    {PHASE_ORDER.map(phase => {
                      const isActive = f.phase === phase;
                      const isPast = PHASE_ORDER.indexOf(phase) < PHASE_ORDER.indexOf(f.phase);
                      return (
                        <div key={phase} style={{
                          flex: 1, height: 4, borderRadius: 2,
                          background: isActive ? PHASE_COLORS[phase] : isPast ? `${PHASE_COLORS[phase]}66` : COLORS.border,
                        }} />
                      );
                    })}
                  </div>

                  <StatBar value={f.crowdInterest} color={f.crowdInterest > 70 ? COLORS.green : f.crowdInterest > 40 ? COLORS.orange : COLORS.red} height={4} label="CROWD INTEREST" showValue />

                  {f.storyArc && (
                    <div style={{ color: COLORS.textDark, fontSize: 10, marginTop: 6, fontStyle: 'italic' }}>
                      "{f.storyArc}"
                    </div>
                  )}
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
        {s && sw1 && sw2 && (
          <div style={{ width: 340, height: '100%', overflow: 'auto', padding: '18px 16px' }}>
            <div style={{
              background: `linear-gradient(135deg, ${PHASE_COLORS[s.phase]}20, transparent)`,
              border: `1px solid ${PHASE_COLORS[s.phase]}44`,
              borderRadius: 10, padding: 16, marginBottom: 16,
            }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>⚔️</div>
              <div style={{ fontWeight: 'bold', fontSize: 18, color: COLORS.white }}>
                {sw1.name} vs {sw2.name}
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <Badge text={s.phase} color={PHASE_COLORS[s.phase]} />
                {s.titleId && <Badge text="TITLE MATCH" color={COLORS.goldLight} />}
              </div>
            </div>

            {/* Wrestlers comparison */}
            <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
              <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 }}>COMPETITORS</div>
              {[sw1, sw2].map(w => (
                <div key={w.id} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: `1px solid ${COLORS.border}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 13 }}>{w.flag} {w.name}</span>
                    <Badge text={w.alignment} color={w.alignment === 'Face' ? COLORS.blue : w.alignment === 'Heel' ? COLORS.red : COLORS.goldLight} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, fontSize: 10 }}>
                    <div><span style={{ color: COLORS.textDark }}>OVR</span> <span style={{ color: COLORS.goldLight, fontWeight: 'bold' }}>{w.overness}</span></div>
                    <div><span style={{ color: COLORS.textDark }}>RING</span> <span style={{ color: COLORS.green, fontWeight: 'bold' }}>{w.inRing}</span></div>
                    <div><span style={{ color: COLORS.textDark }}>MIC</span> <span style={{ color: COLORS.blue, fontWeight: 'bold' }}>{w.mic}</span></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Feud stats */}
            <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
              <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 }}>FEUD DETAILS</div>
              {[
                ['Phase', s.phase, PHASE_COLORS[s.phase]],
                ['Intensity', `${s.intensity}/10`, COLORS.orange],
                ['Weeks Active', `${s.weeksActive}`, COLORS.blue],
                ['Weeks Planned', `${s.weeksPlanned}`, COLORS.textMuted],
                ['Story', s.storyArc, COLORS.purple],
              ].map(([l, v, c]) => (
                <div key={l as string} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color: COLORS.textMuted }}>{l}</span>
                  <span style={{ color: c as string, fontWeight: 'bold' }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop: 8 }}>
                <StatBar value={s.crowdInterest} color={COLORS.green} height={5} label="CROWD INTEREST" showValue />
              </div>
            </div>

            {/* Phase progression visual */}
            <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
              <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 }}>PHASE PROGRESSION</div>
              {PHASE_ORDER.map(phase => {
                const isActive = s.phase === phase;
                const isPast = PHASE_ORDER.indexOf(phase) < PHASE_ORDER.indexOf(s.phase);
                return (
                  <div key={phase} style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0',
                  }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: isActive ? PHASE_COLORS[phase] : isPast ? `${PHASE_COLORS[phase]}88` : COLORS.border,
                      boxShadow: isActive ? `0 0 6px ${PHASE_COLORS[phase]}` : 'none',
                    }} />
                    <span style={{
                      color: isActive ? COLORS.white : isPast ? COLORS.textMuted : COLORS.textDark,
                      fontSize: 12, fontWeight: isActive ? 'bold' : 'normal',
                    }}>{phase}</span>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              {s.phase !== 'Cooldown' && (
                <button onClick={() => advancePhase(s)} style={{
                  flex: 1, padding: 8, borderRadius: 6, fontSize: 11, fontWeight: 'bold', cursor: 'pointer',
                  background: PHASE_COLORS[PHASE_ORDER[PHASE_ORDER.indexOf(s.phase) + 1] || 'Build'],
                  border: 'none', color: COLORS.white, letterSpacing: 1,
                }}>
                  ADVANCE PHASE
                </button>
              )}
              <button onClick={() => { endFeud(s.id); setSelected(null); }} style={{
                flex: 1, padding: 8, borderRadius: 6, fontSize: 11, fontWeight: 'bold', cursor: 'pointer',
                background: 'transparent', border: `1px solid ${COLORS.red}44`, color: COLORS.red,
              }}>
                END FEUD
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
