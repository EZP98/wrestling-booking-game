import { useGameStore } from '../store/gameStore';
import { COLORS, BRAND_COLORS } from '../styles/theme';
import { StatBar, Badge } from '../components/StatBar';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Tv,
  TrendingDown,
  BarChart3,
  Users,
  Star,
  Trophy,
  Calendar,
  AlertTriangle,
  Swords,
  HeartPulse,
  Frown,
  Clock,
  CheckCircle,
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

const sectionCard = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

const sectionContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

export function DashboardPage() {
  const { game, wrestlers, titles, feuds, calendar } = useGameStore();

  const wweRoster = wrestlers.filter(w => ['Raw', 'SmackDown', 'NXT'].includes(w.brand));
  const injured = wweRoster.filter(w => w.injuryWeeks > 0);
  const unhappy = wweRoster.filter(w => w.morale < 50);
  const champions = titles.filter(t => t.holderId && ['Raw', 'SmackDown', 'NXT'].includes(t.brand));
  const upcomingEvents = calendar.filter(e => e.week >= game.week && e.week <= game.week + 4);
  const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const weeklyExpenses = wweRoster.reduce((s, w) => s + w.salary, 0);
  const topStars = [...wweRoster].sort((a, b) => b.overness - a.overness).slice(0, 8);

  const statCards: { icon: React.ReactNode; label: string; value: string; colorClass: string }[] = [
    {
      icon: <DollarSign className="w-3.5 h-3.5 text-green-500" />,
      label: 'Budget',
      value: `$${game.budget.toLocaleString()}k`,
      colorClass: game.budget > 0 ? 'text-green-500' : 'text-red-500',
    },
    {
      icon: <Tv className="w-3.5 h-3.5 text-blue-500" />,
      label: 'TV Deal',
      value: `$${game.tvDealValue}k/week`,
      colorClass: 'text-blue-500',
    },
    {
      icon: <TrendingDown className="w-3.5 h-3.5 text-orange-500" />,
      label: 'Weekly Cost',
      value: `$${weeklyExpenses}k`,
      colorClass: 'text-orange-500',
    },
    {
      icon: <BarChart3 className="w-3.5 h-3.5 text-purple-500" />,
      label: 'Overall Rating',
      value: `${game.overallRating}/100`,
      colorClass: 'text-purple-500',
    },
    {
      icon: <Users className="w-3.5 h-3.5 text-[#e0e0e0]" />,
      label: 'WWE Roster',
      value: `${wweRoster.length} active`,
      colorClass: 'text-[#e0e0e0]',
    },
  ];

  return (
    <div className="p-6 overflow-auto h-full bg-black">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center mb-6"
      >
        <div>
          <h1 className="text-[22px] text-white tracking-[3px] font-bold">DASHBOARD</h1>
          <p className="text-[#888888] text-xs mt-1">
            Week {game.week} — {monthNames[game.month]} {game.year} — Season {game.season}
          </p>
        </div>
        <div className="flex gap-2">
          <Badge text={`WM SCORE: ${game.wrestleManiaScore}`} color={COLORS.goldLight} />
          <Badge text={`FAN: ${game.fanSatisfaction}%`} color={COLORS.blue} />
        </div>
      </motion.div>

      {/* Top stats row */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-5 gap-3 mb-5"
      >
        {statCards.map(card => (
          <motion.div
            key={card.label}
            variants={cardItem}
            whileHover={{ scale: 1.03 }}
            className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-4 py-3.5"
          >
            <div className="text-[#555555] text-[10px] tracking-[1px] mb-1.5 flex items-center gap-1.5">
              {card.icon} {card.label}
            </div>
            <div className={`font-bold text-lg ${card.colorClass}`}>{card.value}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* 3-column grid */}
      <motion.div
        variants={sectionContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 gap-4"
      >
        {/* Top Stars */}
        <motion.div
          variants={sectionCard}
          className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-[10px] p-4"
        >
          <div className="text-[#B8860B] text-[11px] font-bold tracking-[2px] mb-3 flex items-center gap-2">
            <Star className="w-3.5 h-3.5" /> TOP STARS
          </div>
          {topStars.map((w, i) => (
            <div
              key={w.id}
              className={`flex items-center gap-2.5 py-2 ${i < topStars.length - 1 ? 'border-b border-[#1a1a1a]' : ''}`}
            >
              <span className="text-[#555555] text-[10px] w-4">#{i + 1}</span>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-white text-xs font-bold">
                    {w.flag} {w.name}
                  </span>
                  {w.titleId && <Trophy className="w-3 h-3 text-[#F1C40F]" />}
                </div>
                <div className="flex gap-1 mt-1">
                  <Badge text={w.brand} color={BRAND_COLORS[w.brand] || COLORS.textMuted} />
                  <Badge
                    text={w.alignment}
                    color={
                      w.alignment === 'Face'
                        ? COLORS.blue
                        : w.alignment === 'Heel'
                          ? COLORS.red
                          : COLORS.goldLight
                    }
                  />
                </div>
              </div>
              <span className="text-[#F1C40F] font-bold text-base">{w.overness}</span>
            </div>
          ))}
        </motion.div>

        {/* Champions */}
        <motion.div
          variants={sectionCard}
          className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-[10px] p-4"
        >
          <div className="text-[#F1C40F] text-[11px] font-bold tracking-[2px] mb-3 flex items-center gap-2">
            <Trophy className="w-3.5 h-3.5" /> CURRENT CHAMPIONS
          </div>
          {champions.map(t => (
            <div key={t.id} className="py-2 border-b border-[#1a1a1a]">
              <div className="text-[#888888] text-[10px] mb-1">{t.name}</div>
              <div className="flex justify-between items-center">
                <span className="text-white text-xs font-bold">
                  {t.holderName || 'VACANT'}
                  {t.isTag && t.secondHolderName && ` & ${t.secondHolderName}`}
                </span>
                <span className="text-[#555555] text-[10px]">{t.reignWeeks}w</span>
              </div>
              <StatBar value={t.prestige} color={COLORS.gold} height={3} />
            </div>
          ))}
        </motion.div>

        {/* Right column */}
        <motion.div variants={sectionCard} className="flex flex-col gap-4">
          {/* Upcoming Events */}
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-[10px] p-4">
            <div className="text-red-500 text-[11px] font-bold tracking-[2px] mb-3 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> UPCOMING EVENTS
            </div>
            {upcomingEvents.length === 0 && (
              <div className="text-[#555555] text-[11px]">No events in the next 4 weeks</div>
            )}
            {upcomingEvents.map(e => (
              <div
                key={e.id}
                className="flex justify-between items-center py-2 border-b border-[#1a1a1a]"
              >
                <div>
                  <div className="text-white text-xs font-bold">{e.name}</div>
                  <div className="text-[#555555] text-[10px]">Week {e.week}</div>
                </div>
                <Badge
                  text={e.isBooked ? 'BOOKED' : 'OPEN'}
                  color={e.isBooked ? COLORS.green : COLORS.orange}
                />
              </div>
            ))}
          </div>

          {/* Alerts */}
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-[10px] p-4">
            <div className="text-orange-500 text-[11px] font-bold tracking-[2px] mb-3 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5" /> ALERTS
            </div>
            {injured.length > 0 && (
              <div className="text-red-500 text-[11px] mb-2 flex items-start gap-1.5">
                <HeartPulse className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>
                  {injured.length} injured: {injured.map(w => `${w.name} (${w.injuryWeeks}w)`).join(', ')}
                </span>
              </div>
            )}
            {unhappy.length > 0 && (
              <div className="text-orange-500 text-[11px] mb-2 flex items-start gap-1.5">
                <Frown className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>
                  {unhappy.length} unhappy: {unhappy.map(w => w.name).join(', ')}
                </span>
              </div>
            )}
            {feuds.filter(f => f.weeksActive > f.weeksPlanned).length > 0 && (
              <div className="text-[#F1C40F] text-[11px] flex items-start gap-1.5">
                <Clock className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>
                  {feuds.filter(f => f.weeksActive > f.weeksPlanned).length} feuds running overtime
                </span>
              </div>
            )}
            {injured.length === 0 && unhappy.length === 0 && (
              <div className="text-green-500 text-[11px] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" /> All clear!
              </div>
            )}
          </div>

          {/* Active Feuds */}
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-[10px] p-4">
            <div className="text-purple-500 text-[11px] font-bold tracking-[2px] mb-3 flex items-center gap-2">
              <Swords className="w-3.5 h-3.5" /> ACTIVE FEUDS ({feuds.length})
            </div>
            {feuds.length === 0 && (
              <div className="text-[#555555] text-[11px]">No active feuds. Go to Feuds to create one.</div>
            )}
            {feuds.slice(0, 4).map(f => {
              const w1 = wrestlers.find(w => w.id === f.wrestler1Id);
              const w2 = wrestlers.find(w => w.id === f.wrestler2Id);
              return (
                <div key={f.id} className="py-1.5 border-b border-[#1a1a1a]">
                  <div className="text-white text-[11px]">
                    {w1?.name || '?'} vs {w2?.name || '?'}
                  </div>
                  <div className="flex gap-1.5 mt-1">
                    <Badge text={f.phase} color={f.phase === 'Climax' ? COLORS.red : COLORS.blue} />
                    <span className="text-[#555555] text-[10px]">
                      Week {f.weeksActive}/{f.weeksPlanned}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
