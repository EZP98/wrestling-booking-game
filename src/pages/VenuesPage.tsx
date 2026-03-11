import { useState, useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { COLORS, TIER_COLORS } from '../styles/theme';
import { StatBar, Badge } from '../components/StatBar';
import { Venue } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, MapPin, Users, Star, DollarSign, Music, X, Search, Flame } from 'lucide-react';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export function VenuesPage() {
  const { venues } = useGameStore();
  const [regionFilter, setRegionFilter] = useState('ALL');
  const [selected, setSelected] = useState<Venue | null>(null);
  const [search, setSearch] = useState('');

  const regions = useMemo(() => {
    const set = new Set(venues.map(v => v.region));
    return ['ALL', ...Array.from(set).sort()];
  }, [venues]);

  const filtered = useMemo(() => {
    let list = venues;
    if (regionFilter !== 'ALL') list = list.filter(v => v.region === regionFilter);
    if (search) list = list.filter(v => v.name.toLowerCase().includes(search.toLowerCase()) || v.city.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [venues, regionFilter, search]);

  const s = selected;

  const estimateRevenue = (v: Venue) => {
    const avgTicket = (v.ticketMin + v.ticketMax) / 2;
    const attendance = Math.floor(v.capacity * 0.85);
    const ticketRev = attendance * avgTicket;
    const merchRev = attendance * v.merchPerFan;
    return { attendance, ticketRev, merchRev, total: ticketRev + merchRev };
  };

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
              <Building2 className="w-5 h-5 text-[#B8860B]" />
              <h1 className="text-xl text-white tracking-[3px] font-bold">VENUES ({filtered.length})</h1>
            </div>
          </div>
          <div className="flex gap-1.5 flex-wrap mb-2.5">
            {regions.map(r => (
              <motion.button
                key={r}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setRegionFilter(r)}
                className="px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors"
                style={{
                  border: `1px solid ${regionFilter === r ? COLORS.gold : COLORS.border}`,
                  background: regionFilter === r ? `${COLORS.gold}22` : 'transparent',
                  color: regionFilter === r ? COLORS.white : COLORS.textMuted,
                }}
              >
                {r}
              </motion.button>
            ))}
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#555555] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search venue or city..."
              className="text-xs w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-md pl-8 pr-3 py-1.5 text-[#e0e0e0] placeholder-[#555555]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto px-3 py-2">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-2.5"
          >
            {filtered.map(v => {
              const isSel = selected?.id === v.id;
              const tierColor = TIER_COLORS[v.tier] || COLORS.textMuted;
              return (
                <motion.div
                  key={v.id}
                  variants={fadeUp}
                  whileHover={{ scale: 1.01, y: -2 }}
                  onClick={() => setSelected(isSel ? null : v)}
                  className="rounded-lg p-3.5 cursor-pointer transition-all"
                  style={{
                    background: isSel ? COLORS.bgHover : COLORS.bgCard,
                    border: `1px solid ${isSel ? tierColor : COLORS.border}`,
                    borderLeft: `3px solid ${tierColor}`,
                  }}
                >
                  <div className="flex justify-between mb-1.5">
                    <span className="text-white font-bold text-[13px]">
                      {v.flag} {v.name}
                    </span>
                    <span className="text-base">{v.crowd}</span>
                  </div>
                  <div className="text-[#888888] text-[11px] mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {v.city} — <Users className="w-3 h-3" /> {v.capacity.toLocaleString()} seats
                  </div>
                  <div className="flex gap-1 mb-2 flex-wrap">
                    <Badge text={v.tier} color={tierColor} />
                    <Badge text={v.region} color={COLORS.textMuted} />
                    <span className="inline-flex items-center gap-0.5">
                      <Flame className="w-2.5 h-2.5" style={{ color: v.heat >= 8 ? COLORS.red : v.heat >= 5 ? COLORS.orange : COLORS.textDark }} />
                      <Badge text={`Heat: ${v.heat}/10`} color={v.heat >= 8 ? COLORS.red : v.heat >= 5 ? COLORS.orange : COLORS.textDark} />
                    </span>
                  </div>
                  {v.special && (
                    <div className="text-[10px] italic flex items-center gap-1" style={{ color: COLORS.purple }}>
                      <Star className="w-3 h-3" /> {v.special}
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
        {s && (() => {
          const tierColor = TIER_COLORS[s.tier] || COLORS.textMuted;
          const rev = estimateRevenue(s);
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
                    background: `linear-gradient(135deg, ${tierColor}20, transparent)`,
                    border: `1px solid ${tierColor}44`,
                  }}
                >
                  <div className="flex justify-between">
                    <span className="text-[32px]">{s.flag}</span>
                    <span className="text-[28px]">{s.crowd}</span>
                  </div>
                  <div className="font-bold text-xl text-white mt-1">{s.name}</div>
                  <div className="text-[#888888] text-xs mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {s.city}
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    <Badge text={s.tier} color={tierColor} />
                    <Badge text={s.region} color={COLORS.textMuted} />
                    <Badge text={`${s.capacity.toLocaleString()} seats`} color={COLORS.blue} />
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                  <div className="text-[#B8860B] text-[10px] font-bold tracking-[2px] mb-2.5 flex items-center gap-1">
                    <Flame className="w-3 h-3" /> VENUE STATS
                  </div>
                  <StatBar value={s.heat} max={10} color={s.heat >= 8 ? COLORS.red : COLORS.orange} height={5} label="HEAT" showValue />
                  <div className="mt-2">
                    {[
                      ['Capacity', s.capacity.toLocaleString(), COLORS.blue],
                      ['Ticket Range', `$${s.ticketMin} - $${s.ticketMax}`, COLORS.green],
                      ['Merch/Fan', `$${s.merchPerFan}`, COLORS.purple],
                      ['Home For', s.homeFor || 'None', COLORS.textMuted],
                    ].map(([l, v, c]) => (
                      <div key={l as string} className="flex justify-between mb-1.5 text-xs">
                        <span className="text-[#888888]">{l}</span>
                        <span className="font-bold" style={{ color: c as string }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Revenue Estimate */}
                <div className="rounded-lg p-3.5 mb-3.5" style={{ background: '#0a1a0a', border: `1px solid ${COLORS.green}33` }}>
                  <div className="text-[10px] font-bold tracking-[2px] mb-2.5 flex items-center gap-1" style={{ color: COLORS.green }}>
                    <DollarSign className="w-3 h-3" /> REVENUE ESTIMATE (85% fill)
                  </div>
                  {[
                    ['Est. Attendance', rev.attendance.toLocaleString(), COLORS.blue],
                    ['Ticket Revenue', `$${rev.ticketRev.toLocaleString()}`, COLORS.green],
                    ['Merch Revenue', `$${rev.merchRev.toLocaleString()}`, COLORS.purple],
                    ['Total Revenue', `$${rev.total.toLocaleString()}`, COLORS.goldLight],
                  ].map(([l, v, c]) => (
                    <div key={l as string} className="flex justify-between mb-1.5 text-xs">
                      <span className="text-[#888888]">{l}</span>
                      <span className="font-bold" style={{ color: c as string }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Mechanics */}
                {s.mechanics.length > 0 && (
                  <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                    <div className="text-[#B8860B] text-[10px] font-bold tracking-[2px] mb-2">BOOKING MECHANICS</div>
                    {s.mechanics.map((m, i) => (
                      <div
                        key={i}
                        className="text-[#e0e0e0] text-[11px] py-1"
                        style={{ borderBottom: i < s.mechanics.length - 1 ? `1px solid ${COLORS.border}` : 'none' }}
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                )}

                {/* Vibe & History */}
                <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                  <div className="text-[#B8860B] text-[10px] font-bold tracking-[2px] mb-2">VIBE</div>
                  <div className="text-[#e0e0e0] text-xs leading-relaxed mb-2.5">{s.vibe}</div>
                  <div className="text-[#B8860B] text-[10px] font-bold tracking-[2px] mb-2">HISTORY</div>
                  <div className="text-[#888888] text-[11px] leading-relaxed">{s.history}</div>
                </div>

                {/* Special */}
                {s.special && (
                  <div className="rounded-lg p-3.5 mb-3.5" style={{ background: '#1a0a1a', border: `1px solid ${COLORS.purple}33` }}>
                    <div className="text-[10px] font-bold tracking-[2px] mb-2 flex items-center gap-1" style={{ color: COLORS.purple }}>
                      <Music className="w-3 h-3" /> SPECIAL MECHANIC
                    </div>
                    <div className="text-[#e0e0e0] text-xs leading-relaxed">{s.special}</div>
                  </div>
                )}

                {/* Celebrity Affinity */}
                {s.celebAffinity.length > 0 && (
                  <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3.5 mb-3.5">
                    <div className="text-[#B8860B] text-[10px] font-bold tracking-[2px] mb-2 flex items-center gap-1">
                      <Star className="w-3 h-3" /> CELEBRITY AFFINITY
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {s.celebAffinity.map(c => (
                        <Badge key={c} text={c} color={COLORS.orange} />
                      ))}
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
