import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SortAsc, X, Heart, TrendingUp, Mic, Eye, Zap, Sparkles, FileText, Music, Crown } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { COLORS, BRAND_COLORS, ALIGNMENT_COLORS, STATUS_COLORS } from '../styles/theme';
import { StatBar, Badge } from '../components/StatBar';
import { Wrestler } from '../types';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.3, ease: 'easeOut' as const },
  }),
};

export function RosterPage() {
  const { wrestlers, titles } = useGameStore();
  const [brandFilter, setBrandFilter] = useState('ALL');
  const [genderFilter, setGenderFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Wrestler | null>(null);
  const [sortBy, setSortBy] = useState<'overness' | 'inRing' | 'mic' | 'name'>('overness');

  const filtered = useMemo(() => {
    let list = wrestlers;
    if (brandFilter !== 'ALL') list = list.filter(w => w.brand === brandFilter);
    if (genderFilter !== 'ALL') list = list.filter(w => w.gender === genderFilter);
    if (search) list = list.filter(w => w.name.toLowerCase().includes(search.toLowerCase()));
    return [...list].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return b[sortBy] - a[sortBy];
    });
  }, [wrestlers, brandFilter, genderFilter, search, sortBy]);

  const s = selected;

  return (
    <div className="flex h-full overflow-hidden">
      {/* Main list */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 border-b border-[#1a1a1a] px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-[3px] text-white">
              ROSTER ({filtered.length})
            </h1>
          </div>

          {/* Brand filters */}
          <div className="mb-2.5 flex flex-wrap gap-1.5">
            {['ALL', 'Raw', 'SmackDown', 'NXT', 'AEW', 'TNA', 'ROH', 'AAA'].map(b => (
              <button
                key={b}
                onClick={() => setBrandFilter(b)}
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold transition-all duration-150 ${
                  brandFilter === b
                    ? 'text-white'
                    : 'border-[#1a1a1a] text-[#888888] hover:text-white'
                }`}
                style={{
                  border: `1px solid ${brandFilter === b ? (BRAND_COLORS[b] || COLORS.gold) : COLORS.border}`,
                  background: brandFilter === b ? `${BRAND_COLORS[b] || COLORS.gold}22` : 'transparent',
                }}
              >
                {b}
              </button>
            ))}
            <span className="mx-1 w-px bg-[#1a1a1a]" />
            {['ALL', 'Male', 'Female'].map(g => (
              <button
                key={g}
                onClick={() => setGenderFilter(g)}
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold transition-all duration-150 ${
                  genderFilter === g
                    ? 'text-white'
                    : 'text-[#888888] hover:text-white'
                }`}
                style={{
                  border: `1px solid ${genderFilter === g ? COLORS.purple : COLORS.border}`,
                  background: genderFilter === g ? `${COLORS.purple}22` : 'transparent',
                }}
              >
                {g === 'ALL' ? 'All' : g}
              </button>
            ))}
          </div>

          {/* Search + Sort */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#555555]" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search wrestler..."
                className="w-full rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] py-1.5 pl-8 pr-3 text-xs text-white placeholder-[#555555] outline-none focus:border-[#B8860B]"
              />
            </div>
            <div className="relative">
              <SortAsc className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#555555]" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as 'overness' | 'inRing' | 'mic' | 'name')}
                className="appearance-none rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] py-1.5 pl-8 pr-6 text-[11px] text-white outline-none focus:border-[#B8860B]"
              >
                <option value="overness">Sort: Overness</option>
                <option value="inRing">Sort: In-Ring</option>
                <option value="mic">Sort: Mic</option>
                <option value="name">Sort: Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-auto p-3">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2">
            {filtered.map((w, i) => {
              const isSel = selected?.id === w.id;
              return (
                <motion.div
                  key={w.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
                  onClick={() => setSelected(isSel ? null : w)}
                  className="cursor-pointer rounded-lg p-3 transition-colors duration-150"
                  style={{
                    background: isSel ? COLORS.bgHover : COLORS.bgCard,
                    border: `1px solid ${isSel ? BRAND_COLORS[w.brand] || COLORS.gold : COLORS.border}`,
                    borderLeft: `3px solid ${BRAND_COLORS[w.brand] || COLORS.textDark}`,
                  }}
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[13px] font-bold text-white">
                      {w.flag} {w.name}
                    </span>
                    {w.titleId && (
                      <Crown className="h-4 w-4" style={{ color: COLORS.gold }} />
                    )}
                  </div>
                  <div className="mb-2 flex flex-wrap gap-1">
                    <Badge text={w.brand} color={BRAND_COLORS[w.brand] || COLORS.textMuted} />
                    <Badge text={w.alignment} color={ALIGNMENT_COLORS[w.alignment]} />
                    <Badge text={w.status} color={STATUS_COLORS[w.status] || COLORS.textDark} />
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div>
                      <div className="text-[8px] tracking-widest text-[#555555]">OVR</div>
                      <div className="text-sm font-bold" style={{ color: COLORS.goldLight }}>{w.overness}</div>
                    </div>
                    <div>
                      <div className="text-[8px] tracking-widest text-[#555555]">RING</div>
                      <div className="text-sm font-bold" style={{ color: COLORS.green }}>{w.inRing}</div>
                    </div>
                    <div>
                      <div className="text-[8px] tracking-widest text-[#555555]">MIC</div>
                      <div className="text-sm font-bold" style={{ color: COLORS.blue }}>{w.mic}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {s && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 340, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="shrink-0 overflow-hidden border-l border-[#1a1a1a] bg-[#050505]"
          >
            <div className="h-full w-[340px] overflow-auto px-4 py-[18px]">
              {/* Detail Header */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="mb-3.5 rounded-[10px] p-4"
                style={{
                  background: `linear-gradient(135deg, ${BRAND_COLORS[s.brand] || COLORS.gold}20, transparent)`,
                  border: `1px solid ${BRAND_COLORS[s.brand] || COLORS.gold}44`,
                }}
              >
                <div className="mb-1.5 flex items-start justify-between">
                  <span className="text-[28px]">{s.flag}</span>
                  <div className="flex gap-1">
                    <Badge text={s.alignment} color={ALIGNMENT_COLORS[s.alignment]} />
                    <Badge text={s.status} color={STATUS_COLORS[s.status] || COLORS.textDark} />
                  </div>
                </div>
                <div className="text-xl font-bold text-white">{s.name}</div>
                <div className="mt-1 text-xs text-[#888888]">
                  {s.hometown || 'Unknown'} — Age {s.age}
                </div>
                <div className="mt-2 flex gap-1.5">
                  <Badge text={s.brand} color={BRAND_COLORS[s.brand] || COLORS.textMuted} />
                  <Badge text={s.style} color={COLORS.purple} />
                  {s.faction && <Badge text={s.faction} color={COLORS.orange} />}
                </div>
              </motion.div>

              {/* Attributes */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="mb-3 rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] p-3.5"
              >
                <div className="mb-2.5 flex items-center gap-2">
                  <TrendingUp className="h-3 w-3" style={{ color: COLORS.gold }} />
                  <span className="text-[10px] font-bold tracking-[2px]" style={{ color: COLORS.gold }}>ATTRIBUTES</span>
                </div>
                {([
                  ['Overness', s.overness, COLORS.goldLight, TrendingUp],
                  ['In-Ring', s.inRing, COLORS.green, Zap],
                  ['Mic Skills', s.mic, COLORS.blue, Mic],
                  ['Look', s.look, COLORS.purple, Eye],
                  ['Stamina', s.stamina, COLORS.orange, Heart],
                  ['Charisma', s.charisma, COLORS.red, Sparkles],
                ] as const).map(([label, value, color]) => (
                  <div key={label} className="mb-2">
                    <StatBar value={value} color={color} height={5} label={label} showValue />
                  </div>
                ))}
              </motion.div>

              {/* Morale / Popularity */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="mb-3 grid grid-cols-2 gap-2"
              >
                <div className="rounded-md border border-[#1a1a1a] bg-[#0a0a0a] p-2.5">
                  <div className="flex items-center gap-1">
                    <Heart className="h-2.5 w-2.5 text-[#555555]" />
                    <span className="text-[9px] text-[#555555]">MORALE</span>
                  </div>
                  <div
                    className="text-lg font-bold"
                    style={{ color: s.morale > 70 ? COLORS.green : s.morale > 40 ? COLORS.orange : COLORS.red }}
                  >
                    {s.morale}
                  </div>
                  <StatBar
                    value={s.morale}
                    color={s.morale > 70 ? COLORS.green : s.morale > 40 ? COLORS.orange : COLORS.red}
                    height={3}
                  />
                </div>
                <div className="rounded-md border border-[#1a1a1a] bg-[#0a0a0a] p-2.5">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-2.5 w-2.5 text-[#555555]" />
                    <span className="text-[9px] text-[#555555]">POPULARITY</span>
                  </div>
                  <div className="text-lg font-bold" style={{ color: COLORS.blue }}>
                    {s.popularity}
                  </div>
                  <StatBar value={s.popularity} color={COLORS.blue} height={3} />
                </div>
              </motion.div>

              {/* Contract */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="mb-3 rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] p-3.5"
              >
                <div className="mb-2.5 flex items-center gap-2">
                  <FileText className="h-3 w-3" style={{ color: COLORS.gold }} />
                  <span className="text-[10px] font-bold tracking-[2px]" style={{ color: COLORS.gold }}>CONTRACT</span>
                </div>
                {([
                  ['Salary', `$${s.salary}k/week`, COLORS.green],
                  ['Contract Left', `${s.contractWeeks} weeks`, COLORS.blue],
                  ['Injury Risk', `${s.injuryRisk}%`, s.injuryRisk > 40 ? COLORS.red : COLORS.green],
                  ['Injury Status', s.injuryWeeks > 0 ? `OUT ${s.injuryWeeks}w` : 'Healthy', s.injuryWeeks > 0 ? COLORS.red : COLORS.green],
                ] as const).map(([l, v, c]) => (
                  <div key={l} className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-[#888888]">{l}</span>
                    <span className="font-bold" style={{ color: c }}>{v}</span>
                  </div>
                ))}
              </motion.div>

              {/* Details: Finisher, Theme, etc. */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="mb-3 rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] p-3.5"
              >
                <div className="mb-2.5 flex items-center gap-2">
                  <Zap className="h-3 w-3" style={{ color: COLORS.gold }} />
                  <span className="text-[10px] font-bold tracking-[2px]" style={{ color: COLORS.gold }}>DETAILS</span>
                </div>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-[#888888]">
                    <Zap className="h-3 w-3" style={{ color: COLORS.red }} />
                    Finisher
                  </span>
                  <span className="font-bold" style={{ color: COLORS.red }}>{s.finisher}</span>
                </div>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-[#888888]">
                    <Music className="h-3 w-3" style={{ color: COLORS.purple }} />
                    Theme
                  </span>
                  <span style={{ color: COLORS.purple }}>{s.theme}</span>
                </div>
                {s.nxtLevel !== undefined && (
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-[#888888]">NXT Level</span>
                    <span className="font-bold" style={{ color: COLORS.goldLight }}>{s.nxtLevel}/5</span>
                  </div>
                )}
                {s.potentialGrowth > 0 && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-[#888888]">
                      <Sparkles className="h-3 w-3" style={{ color: COLORS.green }} />
                      Growth Potential
                    </span>
                    <span className="font-bold" style={{ color: COLORS.green }}>{s.potentialGrowth}/10</span>
                  </div>
                )}
              </motion.div>

              {/* Champion title */}
              {s.titleId && (() => {
                const t = titles.find(t => t.id === s.titleId);
                return t ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35, duration: 0.3 }}
                    className="mb-3 rounded-lg p-3.5"
                    style={{
                      background: '#1a1400',
                      border: `1px solid ${COLORS.gold}33`,
                    }}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <Crown className="h-4 w-4" style={{ color: COLORS.goldLight }} />
                      <span className="text-[10px] font-bold tracking-[2px]" style={{ color: COLORS.goldLight }}>CHAMPION</span>
                    </div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="mt-1 text-[11px] text-[#888888]">Reign: {t.reignWeeks} weeks</div>
                    <div className="mt-2">
                      <StatBar value={t.prestige} color={COLORS.gold} height={4} label="PRESTIGE" showValue />
                    </div>
                  </motion.div>
                ) : null;
              })()}

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => setSelected(null)}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-[#1a1a1a] bg-transparent py-2 text-[10px] tracking-[2px] text-[#555555] transition-colors hover:border-[#B8860B] hover:text-white"
              >
                <X className="h-3 w-3" />
                CLOSE
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
