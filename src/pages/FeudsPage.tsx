import { useState, useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { COLORS, BRAND_COLORS } from '../styles/theme';
import { StatBar, Badge } from '../components/StatBar';
import { Feud, FeudPhase } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Plus, Play, X, TrendingUp, Clock } from 'lucide-react';

const PHASE_COLORS: Record<FeudPhase, string> = {
  Build: COLORS.blue,
  Climax: COLORS.red,
  Blowoff: COLORS.goldLight,
  Cooldown: COLORS.textMuted,
};

const PHASE_ORDER: FeudPhase[] = ['Build', 'Climax', 'Blowoff', 'Cooldown'];

function genId() { return `feud_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`; }

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function FeudsPage() {
  const { feuds, wrestlers, titles, createFeud, updateFeud, endFeud } = useGameStore();
  const [selected, setSelected] = useState<Feud | null>(null);
  const [showCreate, setShowCreate] = useState(false);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex h-full overflow-hidden bg-black"
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1a1a1a] shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Swords className="w-5 h-5 text-[#B8860B]" />
              <h1 className="text-xl text-white tracking-[3px] font-bold">FEUDS ({feuds.length})</h1>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreate(!showCreate)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-bold cursor-pointer text-white"
              style={{
                border: `1px solid ${showCreate ? COLORS.red : COLORS.gold}`,
                background: showCreate ? `${COLORS.red}22` : `${COLORS.gold}22`,
              }}
            >
              {showCreate ? <><X className="w-3 h-3" /> CANCEL</> : <><Plus className="w-3 h-3" /> NEW FEUD</>}
            </motion.button>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-5 py-4">
          {/* Create Form */}
          <AnimatePresence>
            {showCreate && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-[#0a0a0a] rounded-xl p-4 mb-5" style={{ border: `1px solid ${COLORS.gold}44` }}>
                  <div className="text-[#B8860B] text-[11px] font-bold tracking-[2px] mb-3.5">CREATE NEW FEUD</div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <div className="text-[#555555] text-[9px] mb-1">WRESTLER 1</div>
                      <select value={w1} onChange={e => setW1(e.target.value)} className="text-[11px] px-2 py-1.5 w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded text-[#e0e0e0]">
                        <option value="">-- Select --</option>
                        {rosterWrestlers.map(w => (
                          <option key={w.id} value={w.id}>{w.name} ({w.brand})</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <div className="text-[#555555] text-[9px] mb-1">WRESTLER 2</div>
                      <select value={w2} onChange={e => setW2(e.target.value)} className="text-[11px] px-2 py-1.5 w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded text-[#e0e0e0]">
                        <option value="">-- Select --</option>
                        {rosterWrestlers.filter(w => w.id !== w1).map(w => (
                          <option key={w.id} value={w.id}>{w.name} ({w.brand})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div>
                      <div className="text-[#555555] text-[9px] mb-1">PLANNED WEEKS</div>
                      <input type="number" value={weeks} onChange={e => setWeeks(Number(e.target.value))} min={2} max={52}
                        className="text-[11px] px-2 py-1.5 w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded text-[#e0e0e0]" />
                    </div>
                    <div>
                      <div className="text-[#555555] text-[9px] mb-1">TITLE STAKE</div>
                      <select value={titleStake} onChange={e => setTitleStake(e.target.value)} className="text-[11px] px-2 py-1.5 w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded text-[#e0e0e0]">
                        <option value="">None</option>
                        {titles.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <div className="text-[#555555] text-[9px] mb-1">STORY ARC</div>
                      <input value={storyArc} onChange={e => setStoryArc(e.target.value)} placeholder="e.g. Betrayal..."
                        className="text-[11px] px-2 py-1.5 w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded text-[#e0e0e0]" />
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleCreate}
                    disabled={!w1 || !w2 || w1 === w2}
                    className="px-5 py-2 rounded-md text-[11px] font-bold cursor-pointer border-none text-white tracking-wider"
                    style={{ background: w1 && w2 && w1 !== w2 ? COLORS.gold : COLORS.border }}
                  >
                    CREATE FEUD
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feuds list */}
          {feuds.length === 0 && !showCreate && (
            <div className="bg-[#0a0a0a] border border-dashed border-[#1a1a1a] rounded-xl p-10 text-center text-[#555555] text-xs">
              No active feuds. Click "+ NEW FEUD" to start one.
            </div>
          )}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-2.5"
          >
            {feuds.map(f => {
              const fw1 = getWrestler(f.wrestler1Id);
              const fw2 = getWrestler(f.wrestler2Id);
              const isSel = selected?.id === f.id;
              const isOvertime = f.weeksActive > f.weeksPlanned;
              return (
                <motion.div
                  key={f.id}
                  variants={fadeUp}
                  whileHover={{ scale: 1.01, y: -2 }}
                  onClick={() => setSelected(isSel ? null : f)}
                  className="bg-[#0a0a0a] rounded-lg p-3.5 cursor-pointer transition-all"
                  style={{
                    background: isSel ? COLORS.bgHover : COLORS.bgCard,
                    border: `1px solid ${isSel ? PHASE_COLORS[f.phase] : COLORS.border}`,
                    borderLeft: `3px solid ${PHASE_COLORS[f.phase]}`,
                  }}
                >
                  <div className="flex justify-between mb-2">
                    <div className="text-white font-bold text-sm">
                      {fw1?.name || '?'} vs {fw2?.name || '?'}
                    </div>
                    <Swords className="w-4 h-4 text-[#888888]" />
                  </div>
                  <div className="flex gap-1 mb-2 flex-wrap">
                    <Badge text={f.phase} color={PHASE_COLORS[f.phase]} />
                    <Badge text={`${f.weeksActive}/${f.weeksPlanned}w`} color={isOvertime ? COLORS.red : COLORS.textMuted} />
                    <Badge text={`Intensity: ${f.intensity}`} color={COLORS.orange} />
                    {f.titleId && <Badge text="TITLE" color={COLORS.goldLight} />}
                  </div>

                  {/* Phase progression */}
                  <div className="flex gap-0.5 mb-2">
                    {PHASE_ORDER.map(phase => {
                      const isActive = f.phase === phase;
                      const isPast = PHASE_ORDER.indexOf(phase) < PHASE_ORDER.indexOf(f.phase);
                      return (
                        <div
                          key={phase}
                          className="flex-1 h-1 rounded-sm"
                          style={{
                            background: isActive ? PHASE_COLORS[phase] : isPast ? `${PHASE_COLORS[phase]}66` : COLORS.border,
                          }}
                        />
                      );
                    })}
                  </div>

                  <StatBar value={f.crowdInterest} color={f.crowdInterest > 70 ? COLORS.green : f.crowdInterest > 40 ? COLORS.orange : COLORS.red} height={4} label="CROWD INTEREST" showValue />

                  {f.storyArc && (
                    <div className="text-[#555555] text-[10px] mt-1.5 italic">
                      "{f.storyArc}"
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {s && sw1 && sw2 && (
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
                  background: `linear-gradient(135deg, ${PHASE_COLORS[s.phase]}20, transparent)`,
                  border: `1px solid ${PHASE_COLORS[s.phase]}44`,
                }}
              >
                <Swords className="w-7 h-7 mb-1.5" style={{ color: PHASE_COLORS[s.phase] }} />
                <div className="font-bold text-lg text-white">
                  {sw1.name} vs {sw2.name}
                </div>
                <div className="flex gap-1.5 mt-2">
                  <Badge text={s.phase} color={PHASE_COLORS[s.phase]} />
                  {s.titleId && <Badge text="TITLE MATCH" color={COLORS.goldLight} />}
                </div>
              </div>

              {/* Wrestlers comparison */}
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                <div className="text-[#B8860B] text-[10px] font-bold tracking-[2px] mb-2.5">COMPETITORS</div>
                {[sw1, sw2].map(w => (
                  <div key={w.id} className="mb-2.5 pb-2.5 border-b border-[#1a1a1a]">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-white font-bold text-[13px]">{w.flag} {w.name}</span>
                      <Badge text={w.alignment} color={w.alignment === 'Face' ? COLORS.blue : w.alignment === 'Heel' ? COLORS.red : COLORS.goldLight} />
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-[10px]">
                      <div><span className="text-[#555555]">OVR</span> <span className="font-bold" style={{ color: COLORS.goldLight }}>{w.overness}</span></div>
                      <div><span className="text-[#555555]">RING</span> <span className="font-bold" style={{ color: COLORS.green }}>{w.inRing}</span></div>
                      <div><span className="text-[#555555]">MIC</span> <span className="font-bold" style={{ color: COLORS.blue }}>{w.mic}</span></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Feud stats */}
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                <div className="text-[#B8860B] text-[10px] font-bold tracking-[2px] mb-2.5">FEUD DETAILS</div>
                {[
                  ['Phase', s.phase, PHASE_COLORS[s.phase]],
                  ['Intensity', `${s.intensity}/10`, COLORS.orange],
                  ['Weeks Active', `${s.weeksActive}`, COLORS.blue],
                  ['Weeks Planned', `${s.weeksPlanned}`, COLORS.textMuted],
                  ['Story', s.storyArc, COLORS.purple],
                ].map(([l, v, c]) => (
                  <div key={l as string} className="flex justify-between mb-1.5 text-xs">
                    <span className="text-[#888888]">{l}</span>
                    <span className="font-bold" style={{ color: c as string }}>{v}</span>
                  </div>
                ))}
                <div className="mt-2">
                  <StatBar value={s.crowdInterest} color={COLORS.green} height={5} label="CROWD INTEREST" showValue />
                </div>
              </div>

              {/* Phase progression visual */}
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                <div className="text-[#B8860B] text-[10px] font-bold tracking-[2px] mb-2.5">PHASE PROGRESSION</div>
                {PHASE_ORDER.map(phase => {
                  const isActive = s.phase === phase;
                  const isPast = PHASE_ORDER.indexOf(phase) < PHASE_ORDER.indexOf(s.phase);
                  return (
                    <div key={phase} className="flex items-center gap-2 py-1.5">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: isActive ? PHASE_COLORS[phase] : isPast ? `${PHASE_COLORS[phase]}88` : COLORS.border,
                          boxShadow: isActive ? `0 0 6px ${PHASE_COLORS[phase]}` : 'none',
                        }}
                      />
                      <span
                        className="text-xs"
                        style={{
                          color: isActive ? COLORS.white : isPast ? COLORS.textMuted : COLORS.textDark,
                          fontWeight: isActive ? 'bold' : 'normal',
                        }}
                      >
                        {phase}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex gap-2 mb-3.5">
                {s.phase !== 'Cooldown' && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => advancePhase(s)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-md text-[11px] font-bold cursor-pointer border-none text-white tracking-wider"
                    style={{ background: PHASE_COLORS[PHASE_ORDER[PHASE_ORDER.indexOf(s.phase) + 1] || 'Build'] }}
                  >
                    <Play className="w-3 h-3" /> ADVANCE PHASE
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { endFeud(s.id); setSelected(null); }}
                  className="flex-1 flex items-center justify-center gap-1 py-2 rounded-md text-[11px] font-bold cursor-pointer bg-transparent"
                  style={{ border: `1px solid ${COLORS.red}44`, color: COLORS.red }}
                >
                  <X className="w-3 h-3" /> END FEUD
                </motion.button>
              </div>

              <button
                onClick={() => setSelected(null)}
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
