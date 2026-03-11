import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Crown, Clock, Star, X } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { COLORS, BRAND_COLORS } from '../styles/theme';
import { StatBar, Badge } from '../components/StatBar';
import { Title } from '../types';

const TIER_COLORS: Record<string, string> = {
  World: COLORS.goldLight,
  Midcard: COLORS.blue,
  Tag: COLORS.green,
  Specialty: COLORS.purple,
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: 'easeOut' as const },
  }),
};

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.35, ease: 'easeOut' as const },
  }),
};

export function TitlesPage() {
  const { titles, wrestlers } = useGameStore();
  const [selected, setSelected] = useState<Title | null>(null);
  const [brandFilter, setBrandFilter] = useState('ALL');

  const brands = useMemo(() => {
    const set = new Set(titles.map(t => t.brand));
    return ['ALL', ...Array.from(set)];
  }, [titles]);

  const grouped = useMemo(() => {
    const filtered = brandFilter === 'ALL' ? titles : titles.filter(t => t.brand === brandFilter);
    const map: Record<string, Title[]> = {};
    filtered.forEach(t => {
      if (!map[t.brand]) map[t.brand] = [];
      map[t.brand].push(t);
    });
    return map;
  }, [titles, brandFilter]);

  const s = selected;

  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 border-b border-[#1a1a1a] px-5 py-4">
          <div className="mb-3 flex items-center gap-3">
            <Trophy className="h-5 w-5" style={{ color: COLORS.gold }} />
            <h1 className="text-xl font-bold tracking-[3px] text-white">CHAMPIONSHIPS</h1>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {brands.map(b => (
              <button
                key={b}
                onClick={() => setBrandFilter(b)}
                className={`cursor-pointer rounded-full px-2.5 py-1 text-[10px] font-bold transition-all duration-150 ${
                  brandFilter === b
                    ? 'text-white'
                    : 'text-[#888888] hover:text-white'
                }`}
                style={{
                  border: `1px solid ${brandFilter === b ? (BRAND_COLORS[b] || COLORS.gold) : COLORS.border}`,
                  background: brandFilter === b ? `${BRAND_COLORS[b] || COLORS.gold}22` : 'transparent',
                }}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto px-5 py-4">
          {Object.entries(grouped).map(([brand, brandTitles], sectionIdx) => (
            <motion.div
              key={brand}
              custom={sectionIdx}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              {/* Brand heading */}
              <div
                className="mb-3 flex items-center gap-2 pb-2"
                style={{ borderBottom: `2px solid ${BRAND_COLORS[brand] || COLORS.gold}44` }}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: BRAND_COLORS[brand] || COLORS.gold }}
                />
                <span
                  className="text-[13px] font-bold tracking-[2px]"
                  style={{ color: BRAND_COLORS[brand] || COLORS.gold }}
                >
                  {brand.toUpperCase()}
                </span>
              </div>

              {/* Title cards grid */}
              <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-2.5">
                {brandTitles.map((t, cardIdx) => {
                  const isSel = selected?.id === t.id;
                  return (
                    <motion.div
                      key={t.id}
                      custom={cardIdx}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
                      onClick={() => setSelected(isSel ? null : t)}
                      className="cursor-pointer rounded-lg p-3.5 transition-colors duration-150"
                      style={{
                        background: isSel ? COLORS.bgHover : COLORS.bgCard,
                        border: `1px solid ${isSel ? COLORS.gold : COLORS.border}`,
                        borderLeft: `3px solid ${TIER_COLORS[t.tier] || COLORS.gold}`,
                      }}
                    >
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <div className="text-sm font-bold text-white">{t.name}</div>
                          <div className="mt-1 flex gap-1">
                            <Badge text={t.tier} color={TIER_COLORS[t.tier] || COLORS.gold} />
                            {t.isTag && <Badge text="TAG" color={COLORS.purple} />}
                            {t.gender !== 'Any' && <Badge text={t.gender} color={COLORS.textMuted} />}
                          </div>
                        </div>
                        <Trophy className="h-5 w-5 shrink-0" style={{ color: COLORS.gold }} />
                      </div>

                      {/* Current holder */}
                      <div className="mb-2 rounded-md border border-[#1a1a1a] bg-black px-2.5 py-2">
                        <div className="mb-1 text-[9px] tracking-widest text-[#555555]">CURRENT HOLDER</div>
                        <div className={`text-[13px] font-bold ${t.holderId ? 'text-white' : 'text-[#555555]'}`}>
                          {t.holderName || 'VACANT'}
                          {t.isTag && t.secondHolderName && ` & ${t.secondHolderName}`}
                        </div>
                        {t.holderId && (
                          <div className="mt-0.5 flex items-center gap-1 text-[10px] text-[#888888]">
                            <Clock className="h-2.5 w-2.5" />
                            Reign: {t.reignWeeks} weeks
                          </div>
                        )}
                      </div>

                      <StatBar value={t.prestige} color={COLORS.gold} height={5} label="PRESTIGE" showValue />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {s && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 360, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="shrink-0 overflow-hidden border-l border-[#1a1a1a] bg-[#050505]"
          >
            <div className="h-full w-[360px] overflow-auto px-4 py-[18px]">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="mb-4 rounded-[10px] p-[18px]"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.gold}20, transparent)`,
                  border: `1px solid ${COLORS.gold}44`,
                }}
              >
                <Trophy className="mb-2 h-8 w-8" style={{ color: COLORS.gold }} />
                <div className="text-xl font-bold text-white">{s.name}</div>
                <div className="mt-2 flex gap-1.5">
                  <Badge text={s.brand} color={BRAND_COLORS[s.brand] || COLORS.textMuted} />
                  <Badge text={s.tier} color={TIER_COLORS[s.tier] || COLORS.gold} />
                  {s.isTag && <Badge text="TAG TEAM" color={COLORS.purple} />}
                  {s.gender !== 'Any' && <Badge text={s.gender} color={COLORS.textMuted} />}
                </div>
              </motion.div>

              {/* Current Reign */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="mb-3.5 rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] p-3.5"
              >
                <div className="mb-2.5 flex items-center gap-2">
                  <Crown className="h-3 w-3" style={{ color: COLORS.gold }} />
                  <span className="text-[10px] font-bold tracking-[2px]" style={{ color: COLORS.gold }}>CURRENT REIGN</span>
                </div>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-[#888888]">Champion</span>
                  <span className="font-bold text-white">
                    {s.holderName || 'VACANT'}
                    {s.isTag && s.secondHolderName && ` & ${s.secondHolderName}`}
                  </span>
                </div>
                <div className="mb-2.5 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-[#888888]">
                    <Clock className="h-3 w-3" />
                    Reign Length
                  </span>
                  <span className="font-bold" style={{ color: COLORS.goldLight }}>{s.reignWeeks} weeks</span>
                </div>
                <StatBar value={s.prestige} color={COLORS.gold} height={6} label="PRESTIGE" showValue />
              </motion.div>

              {/* Holder stats */}
              {s.holderId && (() => {
                const holder = wrestlers.find(w => w.id === s.holderId);
                return holder ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="mb-3.5 rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] p-3.5"
                  >
                    <div className="mb-2.5 flex items-center gap-2">
                      <Star className="h-3 w-3" style={{ color: COLORS.gold }} />
                      <span className="text-[10px] font-bold tracking-[2px]" style={{ color: COLORS.gold }}>CHAMPION STATS</span>
                    </div>
                    {([
                      ['Overness', holder.overness, COLORS.goldLight],
                      ['In-Ring', holder.inRing, COLORS.green],
                      ['Mic Skills', holder.mic, COLORS.blue],
                      ['Popularity', holder.popularity, COLORS.purple],
                    ] as const).map(([label, value, color]) => (
                      <div key={label} className="mb-1.5">
                        <StatBar value={value} color={color} height={4} label={label} showValue />
                      </div>
                    ))}
                  </motion.div>
                ) : null;
              })()}

              {/* History */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="mb-3.5 rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] p-3.5"
              >
                <div className="mb-2.5 flex items-center gap-2">
                  <Clock className="h-3 w-3" style={{ color: COLORS.gold }} />
                  <span className="text-[10px] font-bold tracking-[2px]" style={{ color: COLORS.gold }}>
                    TITLE HISTORY ({s.history.length})
                  </span>
                </div>
                {s.history.length === 0 && (
                  <div className="text-[11px] text-[#555555]">No previous reigns</div>
                )}
                {s.history.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2"
                    style={{
                      borderBottom: i < s.history.length - 1 ? `1px solid ${COLORS.border}` : 'none',
                    }}
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{h.holderName}</div>
                      <div className="text-[10px] text-[#555555]">Won at: {h.wonAt}</div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-[#888888]">
                      <Clock className="h-2.5 w-2.5" />
                      {h.weeks}w
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => setSelected(null)}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-[#1a1a1a] bg-transparent py-2 text-[10px] tracking-[2px] text-[#555555] transition-colors hover:border-[#B8860B] hover:text-white"
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
