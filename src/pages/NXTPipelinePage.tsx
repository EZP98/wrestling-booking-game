import { useState, useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { COLORS, BRAND_COLORS } from '../styles/theme';
import { StatBar, Badge } from '../components/StatBar';
import { Wrestler } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, ArrowUpCircle, TrendingUp, Star, X } from 'lucide-react';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex h-full overflow-hidden bg-black"
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1a1a1a] shrink-0">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <Sprout className="w-5 h-5 text-[#F1C40F]" />
              <h1 className="text-xl text-white tracking-[3px] font-bold">
                <span className="text-[#F1C40F]">NXT</span> PIPELINE ({nxtRoster.length})
              </h1>
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="text-[11px] px-2.5 py-1.5 bg-[#0a0a0a] border border-[#1a1a1a] rounded text-[#e0e0e0]"
            >
              <option value="potentialGrowth">Sort: Growth Potential</option>
              <option value="nxtLevel">Sort: NXT Level</option>
              <option value="overness">Sort: Overness</option>
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-3 py-2">
          {nxtRoster.length === 0 && (
            <div className="bg-[#0a0a0a] border border-dashed border-[#1a1a1a] rounded-xl p-10 text-center text-[#555555] text-xs">
              No NXT wrestlers in the pipeline.
            </div>
          )}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-2.5"
          >
            {nxtRoster.map(w => {
              const isSel = selected?.id === w.id;
              const levelColor = getLevelColor(w.nxtLevel);
              const growthColor = getGrowthColor(w.potentialGrowth);
              return (
                <motion.div
                  key={w.id}
                  variants={fadeUp}
                  whileHover={{ scale: 1.01, y: -2 }}
                  onClick={() => setSelected(isSel ? null : w)}
                  className="rounded-lg p-3.5 cursor-pointer transition-all"
                  style={{
                    background: isSel ? COLORS.bgHover : COLORS.bgCard,
                    border: `1px solid ${isSel ? COLORS.goldLight : COLORS.border}`,
                    borderLeft: `3px solid ${levelColor}`,
                  }}
                >
                  <div className="flex justify-between mb-1.5">
                    <span className="text-white font-bold text-[13px]">
                      {w.flag} {w.name}
                    </span>
                    <div
                      className="rounded-full px-2 py-0.5 flex items-center gap-1"
                      style={{
                        background: `${growthColor}22`,
                        border: `1px solid ${growthColor}44`,
                      }}
                    >
                      <TrendingUp className="w-2.5 h-2.5" style={{ color: growthColor }} />
                      <span className="text-[10px] font-bold" style={{ color: growthColor }}>
                        +{w.potentialGrowth}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-2 flex-wrap">
                    <Badge text={getLevelLabel(w.nxtLevel)} color={levelColor} />
                    <Badge text={`Lv.${w.nxtLevel || 0}/5`} color={levelColor} />
                    <Badge text={w.alignment} color={w.alignment === 'Face' ? COLORS.blue : w.alignment === 'Heel' ? COLORS.red : COLORS.goldLight} />
                    <Badge text={w.style} color={COLORS.purple} />
                  </div>

                  {/* Core stats */}
                  <div className="grid grid-cols-3 gap-1 mb-2">
                    <div>
                      <div className="text-[#555555] text-[8px] tracking-widest">OVR</div>
                      <div className="font-bold text-sm" style={{ color: COLORS.goldLight }}>{Math.round(w.overness)}</div>
                    </div>
                    <div>
                      <div className="text-[#555555] text-[8px] tracking-widest">RING</div>
                      <div className="font-bold text-sm" style={{ color: COLORS.green }}>{Math.round(w.inRing)}</div>
                    </div>
                    <div>
                      <div className="text-[#555555] text-[8px] tracking-widest">MIC</div>
                      <div className="font-bold text-sm" style={{ color: COLORS.blue }}>{Math.round(w.mic)}</div>
                    </div>
                  </div>

                  {/* Growth potential bar */}
                  <StatBar value={w.potentialGrowth} max={10} color={growthColor} height={4} label="GROWTH POTENTIAL" showValue />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {s && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 360, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 overflow-hidden bg-[#050505] border-l border-[#1a1a1a]"
          >
            <div className="w-[360px] h-full overflow-auto p-4">
              <div
                className="rounded-xl p-[18px] mb-4"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.goldLight}20, transparent)`,
                  border: `1px solid ${COLORS.goldLight}44`,
                }}
              >
                <div className="flex justify-between mb-1.5">
                  <span className="text-[28px]">{s.flag}</span>
                  <Badge text={getLevelLabel(s.nxtLevel)} color={getLevelColor(s.nxtLevel)} />
                </div>
                <div className="font-bold text-xl text-white">{s.name}</div>
                <div className="text-[#888888] text-xs mt-1">
                  {s.hometown || 'Unknown'} — Age {s.age}
                </div>
                <div className="flex gap-1.5 mt-2">
                  <Badge text="NXT" color={COLORS.goldLight} />
                  <Badge text={s.style} color={COLORS.purple} />
                  <Badge text={s.alignment} color={s.alignment === 'Face' ? COLORS.blue : s.alignment === 'Heel' ? COLORS.red : COLORS.goldLight} />
                </div>
              </div>

              {/* Attributes */}
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                <div className="text-[#B8860B] text-[10px] font-bold tracking-[2px] mb-2.5 flex items-center gap-1">
                  <Star className="w-3 h-3" /> ATTRIBUTES
                </div>
                {[
                  ['Overness', s.overness, COLORS.goldLight],
                  ['In-Ring', s.inRing, COLORS.green],
                  ['Mic Skills', s.mic, COLORS.blue],
                  ['Look', s.look, COLORS.purple],
                  ['Stamina', s.stamina, COLORS.orange],
                  ['Charisma', s.charisma, COLORS.red],
                ].map(([label, value, color]) => (
                  <div key={label as string} className="mb-2">
                    <StatBar value={Math.round(value as number)} color={color as string} height={5} label={label as string} showValue />
                  </div>
                ))}
              </div>

              {/* Growth */}
              <div className="rounded-lg p-3.5 mb-3.5" style={{ background: '#0a1a0a', border: `1px solid ${COLORS.green}33` }}>
                <div className="text-[10px] font-bold tracking-[2px] mb-2.5 flex items-center gap-1" style={{ color: COLORS.green }}>
                  <TrendingUp className="w-3 h-3" /> DEVELOPMENT
                </div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#888888]">NXT Level</span>
                  <span className="font-bold" style={{ color: getLevelColor(s.nxtLevel) }}>
                    {getLevelLabel(s.nxtLevel)} ({s.nxtLevel || 0}/5)
                  </span>
                </div>
                <div className="mb-2">
                  <StatBar value={s.nxtLevel || 0} max={5} color={getLevelColor(s.nxtLevel)} height={6} label="NXT LEVEL" />
                </div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#888888]">Growth Potential</span>
                  <span className="font-bold" style={{ color: getGrowthColor(s.potentialGrowth) }}>{s.potentialGrowth}/10</span>
                </div>
                <StatBar value={s.potentialGrowth} max={10} color={getGrowthColor(s.potentialGrowth)} height={6} label="GROWTH RATE" />
              </div>

              {/* Status */}
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                <div className="text-[#B8860B] text-[10px] font-bold tracking-[2px] mb-2.5">STATUS</div>
                {[
                  ['Morale', `${s.morale}`, s.morale > 70 ? COLORS.green : s.morale > 40 ? COLORS.orange : COLORS.red],
                  ['Popularity', `${s.popularity}`, COLORS.blue],
                  ['Salary', `$${s.salary}k/week`, COLORS.green],
                  ['Contract Left', `${s.contractWeeks} weeks`, COLORS.textMuted],
                  ['Injury Risk', `${s.injuryRisk}%`, s.injuryRisk > 40 ? COLORS.red : COLORS.green],
                ].map(([l, v, c]) => (
                  <div key={l as string} className="flex justify-between mb-1.5 text-xs">
                    <span className="text-[#888888]">{l}</span>
                    <span className="font-bold" style={{ color: c as string }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Finisher */}
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#888888]">Finisher</span>
                  <span className="font-bold" style={{ color: COLORS.red }}>{s.finisher}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#888888]">Theme</span>
                  <span style={{ color: COLORS.purple }}>{s.theme}</span>
                </div>
              </div>

              {/* Call Up */}
              <div
                className="rounded-lg p-3.5 mb-3.5"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.gold}10, transparent)`,
                  border: `1px solid ${COLORS.gold}44`,
                }}
              >
                <div className="text-[10px] font-bold tracking-[2px] mb-2.5 flex items-center gap-1" style={{ color: COLORS.goldLight }}>
                  <ArrowUpCircle className="w-3 h-3" /> CALL UP TO MAIN ROSTER
                </div>
                <div className="flex gap-2 mb-2.5">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setCallUpBrand('Raw')}
                    className="flex-1 py-2 rounded-md text-[11px] font-bold cursor-pointer"
                    style={{
                      border: `1px solid ${callUpBrand === 'Raw' ? BRAND_COLORS.Raw : COLORS.border}`,
                      background: callUpBrand === 'Raw' ? `${BRAND_COLORS.Raw}22` : 'transparent',
                      color: callUpBrand === 'Raw' ? COLORS.white : COLORS.textMuted,
                    }}
                  >
                    RAW
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setCallUpBrand('SmackDown')}
                    className="flex-1 py-2 rounded-md text-[11px] font-bold cursor-pointer"
                    style={{
                      border: `1px solid ${callUpBrand === 'SmackDown' ? BRAND_COLORS.SmackDown : COLORS.border}`,
                      background: callUpBrand === 'SmackDown' ? `${BRAND_COLORS.SmackDown}22` : 'transparent',
                      color: callUpBrand === 'SmackDown' ? COLORS.white : COLORS.textMuted,
                    }}
                  >
                    SMACKDOWN
                  </motion.button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleCallUp(s)}
                  className="w-full py-2.5 rounded-md text-xs font-bold cursor-pointer border-none text-white tracking-wider flex items-center justify-center gap-1"
                  style={{ background: `linear-gradient(135deg, ${BRAND_COLORS[callUpBrand]}, ${BRAND_COLORS[callUpBrand]}88)` }}
                >
                  <ArrowUpCircle className="w-3.5 h-3.5" /> CALL UP TO {callUpBrand.toUpperCase()}
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
