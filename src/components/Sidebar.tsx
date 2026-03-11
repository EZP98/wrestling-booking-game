import { useGameStore } from '../store/gameStore';
import { COLORS, BRAND_COLORS } from '../styles/theme';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'roster', label: 'Roster', icon: '💪' },
  { id: 'titles', label: 'Titles', icon: '🏆' },
  { id: 'booking', label: 'Booking', icon: '📋' },
  { id: 'calendar', label: 'Calendar', icon: '📅' },
  { id: 'feuds', label: 'Feuds', icon: '⚔️' },
  { id: 'factions', label: 'Factions', icon: '👥' },
  { id: 'venues', label: 'Venues', icon: '🏟️' },
  { id: 'celebrities', label: 'Celebrity', icon: '⭐' },
  { id: 'writers', label: 'Writers', icon: '✍️' },
  { id: 'nxt', label: 'NXT Pipeline', icon: '🌱' },
];

export function Sidebar() {
  const { game, currentPage, setPage, advanceWeek } = useGameStore();

  const monthNames = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  return (
    <div style={{
      width: 220, height: '100%', background: 'linear-gradient(180deg, #0a0015 0%, #0d0d1a 100%)',
      borderRight: `1px solid ${COLORS.border}`, display: 'flex', flexDirection: 'column', flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '16px 14px', borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ fontWeight: 'bold', fontSize: 14, color: COLORS.white, letterSpacing: 3 }}>WRESTLING</div>
        <div style={{ color: COLORS.gold, fontSize: 11, letterSpacing: 4, marginTop: 2 }}>BOOKING GAME</div>
      </div>

      {/* Game info */}
      <div style={{ padding: '12px 14px', borderBottom: `1px solid ${COLORS.border}`, background: '#0a0a14' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ color: COLORS.textMuted, fontSize: 10, letterSpacing: 1 }}>WEEK</span>
          <span style={{ color: COLORS.goldLight, fontWeight: 'bold', fontSize: 14 }}>{game.week}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ color: COLORS.textMuted, fontSize: 10, letterSpacing: 1 }}>DATE</span>
          <span style={{ color: COLORS.text, fontSize: 12 }}>{monthNames[game.month]} {game.year}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ color: COLORS.textMuted, fontSize: 10, letterSpacing: 1 }}>BUDGET</span>
          <span style={{ color: game.budget > 0 ? COLORS.green : COLORS.red, fontWeight: 'bold', fontSize: 12 }}>
            ${game.budget.toLocaleString()}k
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: COLORS.textMuted, fontSize: 10, letterSpacing: 1 }}>RATING</span>
          <span style={{ color: COLORS.blue, fontWeight: 'bold', fontSize: 12 }}>{game.overallRating}/100</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: COLORS.textMuted, fontSize: 10, letterSpacing: 1 }}>DIFFICULTY</span>
          <span style={{
            color: game.difficulty === 'Vince Mode' ? COLORS.red : game.difficulty === 'Veteran' ? COLORS.orange : COLORS.blue,
            fontSize: 10, fontWeight: 'bold'
          }}>{game.difficulty.toUpperCase()}</span>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ flex: 1, overflow: 'auto', padding: '8px 0' }}>
        {NAV_ITEMS.map(item => (
          <button key={item.id} onClick={() => setPage(item.id)} style={{
            display: 'flex', alignItems: 'center', gap: 10, width: '100%',
            padding: '10px 14px', border: 'none', borderRadius: 0,
            background: currentPage === item.id ? `${COLORS.gold}15` : 'transparent',
            borderLeft: currentPage === item.id ? `3px solid ${COLORS.gold}` : '3px solid transparent',
            color: currentPage === item.id ? COLORS.white : COLORS.textMuted,
            fontSize: 13, textAlign: 'left',
          }}>
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Advance Week */}
      <div style={{ padding: '12px 14px', borderTop: `1px solid ${COLORS.border}` }}>
        <button onClick={advanceWeek} style={{
          width: '100%', padding: '12px', border: `1px solid ${COLORS.gold}`,
          background: `linear-gradient(135deg, ${COLORS.gold}22, transparent)`,
          color: COLORS.gold, borderRadius: 6, fontWeight: 'bold', fontSize: 13,
          letterSpacing: 2,
        }}>
          NEXT WEEK →
        </button>
      </div>
    </div>
  );
}
