import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { COLORS } from '../styles/theme';
import { StatBar, Badge } from '../components/StatBar';
import { Writer } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, Star, Heart, X, Trash2 } from 'lucide-react';

const LEVEL_COLORS = [COLORS.textDark, COLORS.textMuted, COLORS.blue, COLORS.purple, COLORS.goldLight, COLORS.red];

function renderStars(level: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className="w-3 h-3"
      style={{ color: i < level ? COLORS.goldLight : COLORS.textDark }}
      fill={i < level ? COLORS.goldLight : 'none'}
    />
  ));
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function WritersPage() {
  const { writers, hireWriter, fireWriter } = useGameStore();
  const [selected, setSelected] = useState<Writer | null>(null);

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
            <PenTool className="w-5 h-5 text-[#B8860B]" />
            <h1 className="text-xl text-white tracking-[3px] font-bold">WRITING TEAM ({writers.length})</h1>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-5 py-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3"
          >
            {writers.map(w => {
              const isSel = selected?.id === w.id;
              const levelColor = LEVEL_COLORS[w.level] || COLORS.textMuted;
              return (
                <motion.div
                  key={w.id}
                  variants={fadeUp}
                  whileHover={{ scale: 1.01, y: -2 }}
                  onClick={() => setSelected(isSel ? null : w)}
                  className="rounded-lg p-4 cursor-pointer transition-all"
                  style={{
                    background: isSel ? COLORS.bgHover : COLORS.bgCard,
                    border: `1px solid ${isSel ? levelColor : COLORS.border}`,
                    borderLeft: `3px solid ${levelColor}`,
                  }}
                >
                  <div className="flex justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{w.icon}</span>
                      <div>
                        <div className="text-white font-bold text-sm">{w.name}</div>
                        <div className="text-[#888888] text-[10px]">{w.role}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex mb-2">{renderStars(w.level)}</div>

                  <div className="flex gap-1 mb-2 flex-wrap">
                    <Badge text={w.specialty} color={COLORS.purple} />
                    <Badge text={w.personality} color={COLORS.blue} />
                    <Badge text={w.trait} color={COLORS.orange} />
                  </div>

                  <StatBar value={w.morale} color={w.morale > 70 ? COLORS.green : w.morale > 40 ? COLORS.orange : COLORS.red}
                    height={4} label="MORALE" showValue />
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
            animate={{ width: 340, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 overflow-hidden bg-[#050505] border-l border-[#1a1a1a]"
          >
            <div className="w-[340px] h-full overflow-auto p-4">
              <div
                className="rounded-xl p-[18px] mb-4"
                style={{
                  background: `linear-gradient(135deg, ${LEVEL_COLORS[s.level]}20, transparent)`,
                  border: `1px solid ${LEVEL_COLORS[s.level]}44`,
                }}
              >
                <div className="text-[40px] mb-1.5">{s.icon}</div>
                <div className="font-bold text-[22px] text-white">{s.name}</div>
                <div className="text-[#888888] text-xs mt-1">{s.role}</div>
                <div className="flex mt-2">{renderStars(s.level)}</div>
              </div>

              {/* Stats */}
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                <div className="text-[#B8860B] text-[10px] font-bold tracking-[2px] mb-2.5">DETAILS</div>
                {[
                  ['Level', `${s.level}/5`, LEVEL_COLORS[s.level]],
                  ['Specialty', s.specialty, COLORS.purple],
                  ['Personality', s.personality, COLORS.blue],
                  ['Trait', s.trait, COLORS.orange],
                ].map(([l, v, c]) => (
                  <div key={l as string} className="flex justify-between mb-1.5 text-xs">
                    <span className="text-[#888888]">{l}</span>
                    <span className="font-bold" style={{ color: c as string }}>{v}</span>
                  </div>
                ))}
                <div className="mt-2">
                  <StatBar value={s.morale} color={s.morale > 70 ? COLORS.green : s.morale > 40 ? COLORS.orange : COLORS.red}
                    height={6} label="MORALE" showValue />
                </div>
              </div>

              {/* Bio */}
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                <div className="text-[#B8860B] text-[10px] font-bold tracking-[2px] mb-2">BIO</div>
                <div className="text-[#e0e0e0] text-xs leading-relaxed">{s.bio}</div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mb-3.5">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { hireWriter(s.id); setSelected({ ...s, morale: Math.min(100, s.morale + 10) }); }}
                  className="flex-1 flex items-center justify-center gap-1 py-2 rounded-md text-[11px] font-bold cursor-pointer border-none text-white tracking-wider"
                  style={{ background: COLORS.green }}
                >
                  <Heart className="w-3 h-3" /> BOOST MORALE
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { fireWriter(s.id); setSelected(null); }}
                  className="flex-1 flex items-center justify-center gap-1 py-2 rounded-md text-[11px] font-bold cursor-pointer bg-transparent"
                  style={{ border: `1px solid ${COLORS.red}44`, color: COLORS.red }}
                >
                  <Trash2 className="w-3 h-3" /> FIRE WRITER
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
