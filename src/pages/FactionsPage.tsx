import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { COLORS, BRAND_COLORS, ALIGNMENT_COLORS } from '../styles/theme';
import { StatBar, Badge } from '../components/StatBar';
import { Faction } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, Zap, Star, X } from 'lucide-react';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function FactionsPage() {
  const { factions, wrestlers } = useGameStore();
  const [selected, setSelected] = useState<Faction | null>(null);

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
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#B8860B]" />
            <h1 className="text-xl text-white tracking-[3px] font-bold">FACTIONS ({factions.length})</h1>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-5 py-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3"
          >
            {factions.map(f => {
              const isSel = selected?.id === f.id;
              const memberWrestlers = f.members.map(name => wrestlers.find(w => w.name === name)).filter(Boolean);
              return (
                <motion.div
                  key={f.id}
                  variants={fadeUp}
                  whileHover={{ scale: 1.01, y: -2 }}
                  onClick={() => setSelected(isSel ? null : f)}
                  className="rounded-lg p-4 cursor-pointer transition-all"
                  style={{
                    background: isSel ? COLORS.bgHover : COLORS.bgCard,
                    border: `1px solid ${isSel ? ALIGNMENT_COLORS[f.alignment] : COLORS.border}`,
                    borderLeft: `3px solid ${ALIGNMENT_COLORS[f.alignment]}`,
                  }}
                >
                  <div className="flex justify-between mb-2">
                    <div className="text-white font-bold text-base">{f.name}</div>
                    <Users className="w-5 h-5 text-[#888888]" />
                  </div>

                  <div className="flex gap-1 mb-2.5 flex-wrap">
                    <Badge text={f.brand} color={BRAND_COLORS[f.brand] || COLORS.textMuted} />
                    <Badge text={f.alignment} color={ALIGNMENT_COLORS[f.alignment]} />
                    <Badge text={`${f.members.length} members`} color={COLORS.textMuted} />
                  </div>

                  <div className="mb-1">
                    <div className="text-[#555555] text-[9px] tracking-widest mb-1">LEADER</div>
                    <div className="font-bold text-[13px] flex items-center gap-1" style={{ color: COLORS.goldLight }}>
                      <Star className="w-3 h-3" /> {f.leader}
                    </div>
                  </div>

                  <div className="flex gap-1.5 mb-2 flex-wrap mt-2">
                    {f.members.filter(m => m !== f.leader).map(m => (
                      <span key={m} className="text-[#888888] text-[10px] px-1.5 py-0.5 rounded bg-[#1a1a1a]/50">
                        {m}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <StatBar value={f.power} max={10} color={COLORS.red} height={4} label="POWER" showValue />
                    </div>
                    <div>
                      <StatBar value={f.stability} max={10} color={COLORS.green} height={4} label="STABILITY" showValue />
                    </div>
                  </div>
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
                  background: `linear-gradient(135deg, ${ALIGNMENT_COLORS[s.alignment]}20, transparent)`,
                  border: `1px solid ${ALIGNMENT_COLORS[s.alignment]}44`,
                }}
              >
                <Shield className="w-8 h-8 mb-1.5" style={{ color: ALIGNMENT_COLORS[s.alignment] }} />
                <div className="font-bold text-[22px] text-white">{s.name}</div>
                <div className="flex gap-1.5 mt-2">
                  <Badge text={s.brand} color={BRAND_COLORS[s.brand] || COLORS.textMuted} />
                  <Badge text={s.alignment} color={ALIGNMENT_COLORS[s.alignment]} />
                </div>
              </div>

              {/* Power & Stability */}
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                <div className="text-[#B8860B] text-[10px] font-bold tracking-[2px] mb-2.5">STATS</div>
                <div className="mb-2">
                  <StatBar value={s.power} max={10} color={COLORS.red} height={6} label="POWER" showValue />
                </div>
                <StatBar value={s.stability} max={10} color={COLORS.green} height={6} label="STABILITY" showValue />
              </div>

              {/* Members */}
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                <div className="text-[#B8860B] text-[10px] font-bold tracking-[2px] mb-2.5">
                  <Users className="w-3 h-3 inline mr-1" />
                  MEMBERS ({s.members.length})
                </div>
                {s.members.map(name => {
                  const w = wrestlers.find(wr => wr.name === name);
                  const isLeader = name === s.leader;
                  return (
                    <div key={name} className="flex justify-between items-center py-2 border-b border-[#1a1a1a]">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-white text-xs font-bold">
                            {w?.flag || ''} {name}
                          </span>
                          {isLeader && (
                            <span className="flex items-center gap-0.5">
                              <Star className="w-2.5 h-2.5" style={{ color: COLORS.goldLight }} />
                              <Badge text="LEADER" color={COLORS.goldLight} />
                            </span>
                          )}
                        </div>
                        {w && (
                          <div className="flex gap-2 mt-1 text-[10px]">
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
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                <div className="text-[#B8860B] text-[10px] font-bold tracking-[2px] mb-2">STORY ARC</div>
                <div className="text-[#e0e0e0] text-xs leading-relaxed">{s.story}</div>
              </div>

              {/* Special Mechanic */}
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                <div className="text-[#B8860B] text-[10px] font-bold tracking-[2px] mb-2 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> SPECIAL MECHANIC
                </div>
                <div className="text-xs leading-relaxed" style={{ color: COLORS.purple }}>{s.mechanic}</div>
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
