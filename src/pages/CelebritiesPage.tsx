import { useState, useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { COLORS } from '../styles/theme';
import { StatBar, Badge } from '../components/StatBar';
import { Celebrity, CelebCategory } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Mic, Dumbbell, Smartphone, Clapperboard, Zap, Heart, X, Search } from 'lucide-react';

const CAT_COLORS: Record<CelebCategory, string> = {
  Music: COLORS.purple,
  Athlete: COLORS.green,
  Creator: COLORS.blue,
  Actor: COLORS.orange,
};

const CAT_ICONS: Record<CelebCategory, React.ReactNode> = {
  Music: <Mic className="w-4 h-4" />,
  Athlete: <Dumbbell className="w-4 h-4" />,
  Creator: <Smartphone className="w-4 h-4" />,
  Actor: <Clapperboard className="w-4 h-4" />,
};

const COST_LABELS = ['', '$', '$$', '$$$', '$$$$'];

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export function CelebritiesPage() {
  const { celebrities } = useGameStore();
  const [catFilter, setCatFilter] = useState('ALL');
  const [selected, setSelected] = useState<Celebrity | null>(null);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = celebrities;
    if (catFilter !== 'ALL') list = list.filter(c => c.category === catFilter);
    if (search) list = list.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [celebrities, catFilter, search]);

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
              <Star className="w-5 h-5 text-[#B8860B]" />
              <h1 className="text-xl text-white tracking-[3px] font-bold">CELEBRITIES ({filtered.length})</h1>
            </div>
          </div>
          <div className="flex gap-1.5 mb-2.5">
            {['ALL', 'Music', 'Athlete', 'Creator', 'Actor'].map(c => (
              <motion.button
                key={c}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCatFilter(c)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors"
                style={{
                  border: `1px solid ${catFilter === c ? (CAT_COLORS[c as CelebCategory] || COLORS.gold) : COLORS.border}`,
                  background: catFilter === c ? `${CAT_COLORS[c as CelebCategory] || COLORS.gold}22` : 'transparent',
                  color: catFilter === c ? COLORS.white : COLORS.textMuted,
                }}
              >
                {c !== 'ALL' && CAT_ICONS[c as CelebCategory]}
                {c}
              </motion.button>
            ))}
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#555555] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search celebrity..."
              className="text-xs w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-md pl-8 pr-3 py-1.5 text-[#e0e0e0] placeholder-[#555555]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto px-3 py-2">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-2.5"
          >
            {filtered.map(c => {
              const isSel = selected?.id === c.id;
              const catColor = CAT_COLORS[c.category] || COLORS.textMuted;
              return (
                <motion.div
                  key={c.id}
                  variants={fadeUp}
                  whileHover={{ scale: 1.02, y: -2 }}
                  onClick={() => setSelected(isSel ? null : c)}
                  className="rounded-lg p-3.5 cursor-pointer transition-all"
                  style={{
                    background: isSel ? COLORS.bgHover : COLORS.bgCard,
                    border: `1px solid ${isSel ? catColor : COLORS.border}`,
                    borderLeft: `3px solid ${catColor}`,
                  }}
                >
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[28px]">{c.icon}</span>
                    <Badge text={COST_LABELS[c.cost] || `$${c.cost}`} color={c.cost >= 3 ? COLORS.goldLight : COLORS.green} />
                  </div>
                  <div className="text-white font-bold text-sm mb-0.5">
                    {c.flag} {c.name}
                  </div>
                  <div className="text-[#888888] text-[10px] mb-2">{c.origin}</div>
                  <div className="flex gap-1 mb-2">
                    <Badge text={c.category} color={catColor} />
                    <Badge text={c.alignment} color={c.alignment === 'Face' ? COLORS.blue : c.alignment === 'Heel' ? COLORS.red : COLORS.goldLight} />
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div>
                      <div className="text-[#555555] text-[8px] tracking-widest flex items-center gap-0.5">
                        <Zap className="w-2.5 h-2.5" /> HYPE
                      </div>
                      <div className="font-bold text-sm" style={{ color: COLORS.orange }}>{c.hype}</div>
                    </div>
                    <div>
                      <div className="text-[#555555] text-[8px] tracking-widest flex items-center gap-0.5">
                        <Dumbbell className="w-2.5 h-2.5" /> FIGHT
                      </div>
                      <div className="font-bold text-sm" style={{ color: COLORS.red }}>{c.fightSkill}</div>
                    </div>
                    <div>
                      <div className="text-[#555555] text-[8px] tracking-widest flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5" /> POP
                      </div>
                      <div className="font-bold text-sm" style={{ color: COLORS.blue }}>{c.overness}</div>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {c.roles.map(r => (
                      <span key={r} className="text-[#555555] text-[9px] px-1.5 py-0.5 rounded bg-[#1a1a1a]/50">
                        {r}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {s && (() => {
          const catColor = CAT_COLORS[s.category] || COLORS.textMuted;
          return (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 380, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="shrink-0 overflow-hidden bg-[#050505] border-l border-[#1a1a1a]"
            >
              <div className="w-[380px] h-full overflow-auto p-4">
                <div
                  className="rounded-xl p-[18px] mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${catColor}20, transparent)`,
                    border: `1px solid ${catColor}44`,
                  }}
                >
                  <div className="flex justify-between">
                    <span className="text-[40px]">{s.icon}</span>
                    <Badge text={COST_LABELS[s.cost] || `$${s.cost}`} color={COLORS.goldLight} />
                  </div>
                  <div className="font-bold text-[22px] text-white mt-1.5">
                    {s.flag} {s.name}
                  </div>
                  <div className="text-[#888888] text-xs mt-1">{s.origin}</div>
                  <div className="flex gap-1.5 mt-2">
                    <Badge text={s.category} color={catColor} />
                    <Badge text={s.alignment} color={s.alignment === 'Face' ? COLORS.blue : s.alignment === 'Heel' ? COLORS.red : COLORS.goldLight} />
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                  <div className="text-[#B8860B] text-[10px] font-bold tracking-[2px] mb-2.5">ATTRIBUTES</div>
                  {[
                    ['Hype', s.hype, COLORS.orange],
                    ['Fight Skill', s.fightSkill, COLORS.red],
                    ['Overness (Pop)', s.overness, COLORS.blue],
                  ].map(([label, value, color]) => (
                    <div key={label as string} className="mb-2">
                      <StatBar value={value as number} max={10} color={color as string} height={5} label={label as string} showValue />
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                  <div className="text-[#B8860B] text-[10px] font-bold tracking-[2px] mb-2">PROFILE</div>
                  <div className="text-[#e0e0e0] text-xs leading-relaxed mb-2.5">{s.desc}</div>
                  <div className="text-[#555555] text-[10px] italic">{s.history}</div>
                </div>

                {/* Mechanic */}
                <div className="rounded-lg p-3.5 mb-3.5" style={{ background: '#1a0a1a', border: `1px solid ${COLORS.purple}33` }}>
                  <div className="text-[10px] font-bold tracking-[2px] mb-2 flex items-center gap-1" style={{ color: COLORS.purple }}>
                    <Zap className="w-3 h-3" /> SPECIAL MECHANIC
                  </div>
                  <div className="text-[#e0e0e0] text-xs leading-relaxed">{s.mechanic}</div>
                </div>

                {/* Cost Note */}
                <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                  <div className="text-[#B8860B] text-[10px] font-bold tracking-[2px] mb-2">COST NOTE</div>
                  <div className="text-[#888888] text-xs leading-relaxed">{s.costNote}</div>
                </div>

                {/* Roles */}
                <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                  <div className="text-[#B8860B] text-[10px] font-bold tracking-[2px] mb-2">ROLES</div>
                  <div className="flex gap-1 flex-wrap">
                    {s.roles.map(r => <Badge key={r} text={r} color={catColor} />)}
                  </div>
                </div>

                {/* Chemistry */}
                {s.chemistry.length > 0 && (
                  <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                    <div className="text-[10px] font-bold tracking-[2px] mb-2 flex items-center gap-1" style={{ color: COLORS.green }}>
                      <Heart className="w-3 h-3" /> CHEMISTRY
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {s.chemistry.map(ch => <Badge key={ch} text={ch} color={COLORS.green} />)}
                    </div>
                  </div>
                )}

                {/* Conflicts */}
                {s.conflict.length > 0 && (
                  <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                    <div className="text-[10px] font-bold tracking-[2px] mb-2" style={{ color: COLORS.red }}>CONFLICTS</div>
                    <div className="flex gap-1 flex-wrap">
                      {s.conflict.map(co => <Badge key={co} text={co} color={COLORS.red} />)}
                    </div>
                  </div>
                )}

                {/* Best Venues */}
                {s.venues.length > 0 && (
                  <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                    <div className="text-[10px] font-bold tracking-[2px] mb-2" style={{ color: COLORS.blue }}>BEST VENUES</div>
                    <div className="flex gap-1 flex-wrap">
                      {s.venues.map(v => <Badge key={v} text={v} color={COLORS.blue} />)}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setSelected(null)}
                  className="w-full py-2 bg-transparent border border-[#1a1a1a] rounded text-[#555555] text-[10px] tracking-[2px] cursor-pointer hover:text-white hover:border-[#2a2a2a] transition-colors flex items-center justify-center gap-1"
                >
                  <X className="w-3 h-3" /> CLOSE
                </button>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </motion.div>
  );
}
