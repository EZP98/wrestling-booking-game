import { useGameStore } from '../store/gameStore';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Trophy,
  ClipboardList,
  Calendar,
  Swords,
  Shield,
  Building2,
  Star,
  PenTool,
  Sprout,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'roster', label: 'Roster', icon: Users },
  { id: 'titles', label: 'Titles', icon: Trophy },
  { id: 'booking', label: 'Booking', icon: ClipboardList },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'feuds', label: 'Feuds', icon: Swords },
  { id: 'factions', label: 'Factions', icon: Shield },
  { id: 'venues', label: 'Venues', icon: Building2 },
  { id: 'celebrities', label: 'Celebrity', icon: Star },
  { id: 'writers', label: 'Writers', icon: PenTool },
  { id: 'nxt', label: 'NXT Pipeline', icon: Sprout },
];

export function Sidebar() {
  const { game, currentPage, setPage, advanceWeek } = useGameStore();

  const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const budgetColor = game.budget > 0 ? 'text-wwe-green' : 'text-wwe-red';
  const difficultyColor =
    game.difficulty === 'Vince Mode'
      ? 'text-wwe-red'
      : game.difficulty === 'Veteran'
        ? 'text-wwe-orange'
        : 'text-wwe-blue';

  return (
    <div className="w-[220px] h-full bg-black border-r border-border flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-3.5 py-4 border-b border-border">
        <div className="font-bold text-sm text-white tracking-[3px]">WRESTLING</div>
        <div className="text-gold text-[11px] tracking-[4px] mt-0.5">BOOKING GAME</div>
      </div>

      {/* Game Info */}
      <div className="px-3.5 py-3 border-b border-border bg-panel">
        <div className="flex justify-between mb-1.5">
          <span className="text-muted text-[10px] tracking-[1px]">WEEK</span>
          <span className="text-gold-light font-bold text-sm">{game.week}</span>
        </div>
        <div className="flex justify-between mb-1.5">
          <span className="text-muted text-[10px] tracking-[1px]">DATE</span>
          <span className="text-[#e0e0e0] text-xs">
            {monthNames[game.month]} {game.year}
          </span>
        </div>
        <div className="flex justify-between mb-1.5">
          <span className="text-muted text-[10px] tracking-[1px]">BUDGET</span>
          <span className={`${budgetColor} font-bold text-xs`}>${game.budget.toLocaleString()}k</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-muted text-[10px] tracking-[1px]">RATING</span>
          <span className="text-wwe-blue font-bold text-xs">{game.overallRating}/100</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted text-[10px] tracking-[1px]">DIFFICULTY</span>
          <span className={`${difficultyColor} text-[10px] font-bold`}>{game.difficulty.toUpperCase()}</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-auto py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              onClick={() => setPage(item.id)}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={`
                flex items-center gap-2.5 w-full px-3.5 py-2.5
                border-none text-left text-[13px]
                border-l-[3px] transition-colors duration-150
                ${
                  isActive
                    ? 'border-l-gold bg-gold/[0.08] text-white'
                    : 'border-l-transparent text-muted hover:text-white hover:bg-white/[0.03]'
                }
              `}
            >
              <Icon
                size={16}
                className={`shrink-0 ${isActive ? 'text-gold' : 'text-muted'}`}
              />
              <span>{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      {/* Advance Week */}
      <div className="px-3.5 py-3 border-t border-border">
        <motion.button
          onClick={advanceWeek}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="
            w-full py-3 rounded-md
            border border-gold bg-gold/[0.08]
            text-gold font-bold text-[13px] tracking-[2px]
            flex items-center justify-center gap-2
            hover:bg-gold/[0.15] transition-colors duration-150
          "
        >
          NEXT WEEK
          <ChevronRight size={16} />
        </motion.button>
      </div>
    </div>
  );
}
