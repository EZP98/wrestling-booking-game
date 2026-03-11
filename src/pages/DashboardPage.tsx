import { useGameStore } from '../store/gameStore';
import { COLORS, BRAND_COLORS } from '../styles/theme';
import { StatBar, Badge } from '../components/StatBar';

export function DashboardPage() {
  const { game, wrestlers, titles, feuds, calendar, shows } = useGameStore();

  const wweRoster = wrestlers.filter(w => ['Raw','SmackDown','NXT'].includes(w.brand));
  const injured = wweRoster.filter(w => w.injuryWeeks > 0);
  const unhappy = wweRoster.filter(w => w.morale < 50);
  const champions = titles.filter(t => t.holderId && ['Raw','SmackDown','NXT'].includes(t.brand));
  const upcomingEvents = calendar.filter(e => e.week >= game.week && e.week <= game.week + 4);
  const monthNames = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const weeklyExpenses = wweRoster.reduce((s, w) => s + w.salary, 0);
  const topStars = [...wweRoster].sort((a, b) => b.overness - a.overness).slice(0, 8);

  return (
    <div className="fade-in" style={{ padding: 24, overflow: 'auto', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, color: COLORS.white, letterSpacing: 3 }}>DASHBOARD</h1>
          <p style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 4 }}>
            Week {game.week} — {monthNames[game.month]} {game.year} — Season {game.season}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Badge text={`WM SCORE: ${game.wrestleManiaScore}`} color={COLORS.goldLight} />
          <Badge text={`FAN: ${game.fanSatisfaction}%`} color={COLORS.blue} />
        </div>
      </div>

      {/* Top stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          ['💰', 'Budget', `$${game.budget.toLocaleString()}k`, game.budget > 0 ? COLORS.green : COLORS.red],
          ['📺', 'TV Deal', `$${game.tvDealValue}k/week`, COLORS.blue],
          ['💸', 'Weekly Cost', `$${weeklyExpenses}k`, COLORS.orange],
          ['📊', 'Overall Rating', `${game.overallRating}/100`, COLORS.purple],
          ['👥', 'WWE Roster', `${wweRoster.length} active`, COLORS.text],
        ].map(([icon, label, value, color]) => (
          <div key={label as string} style={{
            background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: '14px 16px',
          }}>
            <div style={{ color: COLORS.textDark, fontSize: 10, letterSpacing: 1, marginBottom: 6 }}>{icon} {label}</div>
            <div style={{ color: color as string, fontWeight: 'bold', fontSize: 18 }}>{value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        {/* Top Stars */}
        <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: COLORS.gold, fontSize: 11, fontWeight: 'bold', letterSpacing: 2, marginBottom: 12 }}>
            🌟 TOP STARS
          </div>
          {topStars.map((w, i) => (
            <div key={w.id} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
              borderBottom: i < topStars.length - 1 ? `1px solid ${COLORS.border}` : 'none',
            }}>
              <span style={{ color: COLORS.textDark, fontSize: 10, width: 16 }}>#{i + 1}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: COLORS.white, fontSize: 12, fontWeight: 'bold' }}>{w.flag} {w.name}</span>
                  {w.titleId && <span style={{ color: COLORS.goldLight, fontSize: 10 }}>🏆</span>}
                </div>
                <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                  <Badge text={w.brand} color={BRAND_COLORS[w.brand] || COLORS.textMuted} />
                  <Badge text={w.alignment} color={w.alignment === 'Face' ? COLORS.blue : w.alignment === 'Heel' ? COLORS.red : COLORS.goldLight} />
                </div>
              </div>
              <span style={{ color: COLORS.goldLight, fontWeight: 'bold', fontSize: 16 }}>{w.overness}</span>
            </div>
          ))}
        </div>

        {/* Champions */}
        <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: COLORS.goldLight, fontSize: 11, fontWeight: 'bold', letterSpacing: 2, marginBottom: 12 }}>
            🏆 CURRENT CHAMPIONS
          </div>
          {champions.map(t => (
            <div key={t.id} style={{ padding: '8px 0', borderBottom: `1px solid ${COLORS.border}` }}>
              <div style={{ color: COLORS.textMuted, fontSize: 10, marginBottom: 4 }}>{t.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: COLORS.white, fontSize: 12, fontWeight: 'bold' }}>
                  {t.holderName || 'VACANT'}
                  {t.isTag && t.secondHolderName && ` & ${t.secondHolderName}`}
                </span>
                <span style={{ color: COLORS.textDark, fontSize: 10 }}>{t.reignWeeks}w</span>
              </div>
              <StatBar value={t.prestige} color={COLORS.gold} height={3} />
            </div>
          ))}
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Upcoming Events */}
          <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
            <div style={{ color: COLORS.red, fontSize: 11, fontWeight: 'bold', letterSpacing: 2, marginBottom: 12 }}>
              📅 UPCOMING EVENTS
            </div>
            {upcomingEvents.length === 0 && (
              <div style={{ color: COLORS.textDark, fontSize: 11 }}>No events in the next 4 weeks</div>
            )}
            {upcomingEvents.map(e => (
              <div key={e.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 0', borderBottom: `1px solid ${COLORS.border}`,
              }}>
                <div>
                  <div style={{ color: COLORS.white, fontSize: 12, fontWeight: 'bold' }}>{e.name}</div>
                  <div style={{ color: COLORS.textDark, fontSize: 10 }}>Week {e.week}</div>
                </div>
                <Badge
                  text={e.isBooked ? 'BOOKED' : 'OPEN'}
                  color={e.isBooked ? COLORS.green : COLORS.orange}
                />
              </div>
            ))}
          </div>

          {/* Alerts */}
          <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
            <div style={{ color: COLORS.orange, fontSize: 11, fontWeight: 'bold', letterSpacing: 2, marginBottom: 12 }}>
              ⚠️ ALERTS
            </div>
            {injured.length > 0 && (
              <div style={{ color: COLORS.red, fontSize: 11, marginBottom: 8 }}>
                🏥 {injured.length} injured: {injured.map(w => `${w.name} (${w.injuryWeeks}w)`).join(', ')}
              </div>
            )}
            {unhappy.length > 0 && (
              <div style={{ color: COLORS.orange, fontSize: 11, marginBottom: 8 }}>
                😤 {unhappy.length} unhappy: {unhappy.map(w => w.name).join(', ')}
              </div>
            )}
            {feuds.filter(f => f.weeksActive > f.weeksPlanned).length > 0 && (
              <div style={{ color: COLORS.goldLight, fontSize: 11 }}>
                ⏰ {feuds.filter(f => f.weeksActive > f.weeksPlanned).length} feuds running overtime
              </div>
            )}
            {injured.length === 0 && unhappy.length === 0 && (
              <div style={{ color: COLORS.green, fontSize: 11 }}>All clear!</div>
            )}
          </div>

          {/* Active Feuds */}
          <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
            <div style={{ color: COLORS.purple, fontSize: 11, fontWeight: 'bold', letterSpacing: 2, marginBottom: 12 }}>
              ⚔️ ACTIVE FEUDS ({feuds.length})
            </div>
            {feuds.length === 0 && (
              <div style={{ color: COLORS.textDark, fontSize: 11 }}>No active feuds. Go to Feuds to create one.</div>
            )}
            {feuds.slice(0, 4).map(f => {
              const w1 = wrestlers.find(w => w.id === f.wrestler1Id);
              const w2 = wrestlers.find(w => w.id === f.wrestler2Id);
              return (
                <div key={f.id} style={{ padding: '6px 0', borderBottom: `1px solid ${COLORS.border}` }}>
                  <div style={{ color: COLORS.white, fontSize: 11 }}>
                    {w1?.name || '?'} vs {w2?.name || '?'}
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                    <Badge text={f.phase} color={f.phase === 'Climax' ? COLORS.red : COLORS.blue} />
                    <span style={{ color: COLORS.textDark, fontSize: 10 }}>Week {f.weeksActive}/{f.weeksPlanned}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
