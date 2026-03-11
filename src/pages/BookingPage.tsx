import { useState, useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { COLORS, BRAND_COLORS } from '../styles/theme';
import { Badge } from '../components/StatBar';
import { MatchCard, PromoSegment, MatchType, SegmentType } from '../types';

const MATCH_TYPES: MatchType[] = ['Singles', 'Tag', 'Triple Threat', 'Fatal 4-Way', 'Ladder', 'TLC', 'Hell in a Cell', 'Steel Cage', 'Last Man Standing', 'Iron Man', 'I Quit', 'Royal Rumble', 'Battle Royal', 'Elimination Chamber', 'Money in the Bank'];
const SEGMENT_TYPES: SegmentType[] = ['Promo', 'Backstage', 'Run-In', 'Celebrity', 'Title Ceremony', 'Contract Signing', 'Interview'];

function genId() { return `seg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`; }

export function BookingPage() {
  const { shows, wrestlers, titles, feuds, venues, game, addShowCard } = useGameStore();
  const [selectedShowId, setSelectedShowId] = useState('');
  const [segments, setSegments] = useState<(MatchCard | PromoSegment)[]>([]);
  const [venueId, setVenueId] = useState('');
  const [addingType, setAddingType] = useState<'match' | 'segment' | null>(null);

  // Match builder state
  const [matchType, setMatchType] = useState<MatchType>('Singles');
  const [matchParticipants, setMatchParticipants] = useState<string[]>([]);
  const [matchTitleId, setMatchTitleId] = useState('');
  const [matchStip, setMatchStip] = useState('');
  const [matchWinner, setMatchWinner] = useState('');

  // Segment builder state
  const [segType, setSegType] = useState<SegmentType>('Promo');
  const [segParticipants, setSegParticipants] = useState<string[]>([]);
  const [segDesc, setSegDesc] = useState('');

  const selectedShow = shows.find(s => s.id === selectedShowId);
  const showWrestlers = useMemo(() => {
    if (!selectedShow) return [];
    return wrestlers.filter(w => w.brand === selectedShow.brand && w.injuryWeeks === 0);
  }, [wrestlers, selectedShow]);

  const brandVenues = venues;

  const resetMatchForm = () => {
    setMatchType('Singles');
    setMatchParticipants([]);
    setMatchTitleId('');
    setMatchStip('');
    setMatchWinner('');
    setAddingType(null);
  };

  const resetSegForm = () => {
    setSegType('Promo');
    setSegParticipants([]);
    setSegDesc('');
    setAddingType(null);
  };

  const addMatch = () => {
    if (matchParticipants.length < 2) return;
    const card: MatchCard = {
      id: genId(),
      matchType,
      participants: matchParticipants,
      titleId: matchTitleId || undefined,
      stipulation: matchStip || undefined,
      bookedWinnerId: matchWinner || undefined,
    };
    setSegments(prev => [...prev, card]);
    resetMatchForm();
  };

  const addSegment = () => {
    if (segParticipants.length === 0) return;
    const seg: PromoSegment = {
      id: genId(),
      type: segType,
      participants: segParticipants,
      description: segDesc || `${segType} segment`,
    };
    setSegments(prev => [...prev, seg]);
    resetSegForm();
  };

  const removeSegment = (id: string) => {
    setSegments(prev => prev.filter(s => s.id !== id));
  };

  const moveSegment = (idx: number, dir: -1 | 1) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= segments.length) return;
    const copy = [...segments];
    [copy[idx], copy[newIdx]] = [copy[newIdx], copy[idx]];
    setSegments(copy);
  };

  const submitCard = () => {
    if (!selectedShowId || segments.length === 0 || !venueId) return;
    addShowCard({
      id: `card_${Date.now()}`,
      showId: selectedShowId,
      week: game.week,
      venueId,
      segments,
    });
    setSegments([]);
    setVenueId('');
  };

  const toggleParticipant = (id: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(id) ? list.filter(x => x !== id) : [...list, id]);
  };

  const getWrestlerName = (id: string) => wrestlers.find(w => w.id === id)?.name || '?';

  const isMatch = (seg: MatchCard | PromoSegment): seg is MatchCard => 'matchType' in seg;

  const btnStyle = (active: boolean, color: string): React.CSSProperties => ({
    padding: '4px 10px', borderRadius: 16, fontSize: 10, fontWeight: 'bold', cursor: 'pointer',
    border: `1px solid ${active ? color : COLORS.border}`,
    background: active ? `${color}22` : 'transparent',
    color: active ? COLORS.white : COLORS.textMuted,
  });

  return (
    <div className="fade-in" style={{ padding: 24, overflow: 'auto', height: '100%' }}>
      <h1 style={{ fontSize: 20, color: COLORS.white, letterSpacing: 3, marginBottom: 16 }}>BOOK A SHOW</h1>

      {/* Show selector */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div>
          <div style={{ color: COLORS.textDark, fontSize: 9, letterSpacing: 1, marginBottom: 4 }}>SELECT SHOW</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {shows.filter(s => ['Raw', 'SmackDown', 'NXT'].includes(s.brand)).map(s => (
              <button key={s.id} onClick={() => { setSelectedShowId(s.id); setSegments([]); }} style={{
                padding: '8px 16px', borderRadius: 8, fontSize: 12, fontWeight: 'bold', cursor: 'pointer',
                border: `1px solid ${selectedShowId === s.id ? BRAND_COLORS[s.brand] : COLORS.border}`,
                background: selectedShowId === s.id ? `${BRAND_COLORS[s.brand]}22` : COLORS.bgCard,
                color: selectedShowId === s.id ? COLORS.white : COLORS.textMuted,
              }}>
                {s.name}
              </button>
            ))}
          </div>
        </div>
        {selectedShow && (
          <div>
            <div style={{ color: COLORS.textDark, fontSize: 9, letterSpacing: 1, marginBottom: 4 }}>VENUE</div>
            <select value={venueId} onChange={e => setVenueId(e.target.value)}
              style={{ fontSize: 11, padding: '6px 10px', minWidth: 200 }}>
              <option value="">-- Select Venue --</option>
              {brandVenues.map(v => (
                <option key={v.id} value={v.id}>{v.name} ({v.city}, cap: {v.capacity.toLocaleString()})</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {!selectedShow && (
        <div style={{ color: COLORS.textDark, fontSize: 13, padding: 40, textAlign: 'center' }}>
          Select a show above to start building the card.
        </div>
      )}

      {selectedShow && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Left: Card builder */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ color: COLORS.gold, fontSize: 11, fontWeight: 'bold', letterSpacing: 2 }}>
                BUILD CARD ({segments.length}/{selectedShow.segments} segments)
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => { setAddingType('match'); resetSegForm(); }} style={btnStyle(addingType === 'match', COLORS.red)}>
                  + MATCH
                </button>
                <button onClick={() => { setAddingType('segment'); resetMatchForm(); }} style={btnStyle(addingType === 'segment', COLORS.blue)}>
                  + SEGMENT
                </button>
              </div>
            </div>

            {/* Add Match Form */}
            {addingType === 'match' && (
              <div style={{
                background: COLORS.bgCard, border: `1px solid ${COLORS.red}44`,
                borderRadius: 8, padding: 14, marginBottom: 14,
              }}>
                <div style={{ color: COLORS.red, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 }}>NEW MATCH</div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ color: COLORS.textDark, fontSize: 9, marginBottom: 4 }}>MATCH TYPE</div>
                  <select value={matchType} onChange={e => setMatchType(e.target.value as MatchType)}
                    style={{ fontSize: 11, padding: '4px 8px', width: '100%' }}>
                    {MATCH_TYPES.map(mt => <option key={mt} value={mt}>{mt}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ color: COLORS.textDark, fontSize: 9, marginBottom: 4 }}>
                    PARTICIPANTS ({matchParticipants.length} selected)
                  </div>
                  <div style={{ maxHeight: 150, overflow: 'auto', border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: 6 }}>
                    {showWrestlers.map(w => (
                      <div key={w.id} onClick={() => toggleParticipant(w.id, matchParticipants, setMatchParticipants)} style={{
                        padding: '3px 6px', fontSize: 11, cursor: 'pointer', borderRadius: 4,
                        background: matchParticipants.includes(w.id) ? `${COLORS.red}22` : 'transparent',
                        color: matchParticipants.includes(w.id) ? COLORS.white : COLORS.textMuted,
                      }}>
                        {w.flag} {w.name} ({w.overness})
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ color: COLORS.textDark, fontSize: 9, marginBottom: 4 }}>TITLE ON THE LINE</div>
                  <select value={matchTitleId} onChange={e => setMatchTitleId(e.target.value)}
                    style={{ fontSize: 11, padding: '4px 8px', width: '100%' }}>
                    <option value="">None</option>
                    {titles.filter(t => t.brand === selectedShow.brand).map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ color: COLORS.textDark, fontSize: 9, marginBottom: 4 }}>STIPULATION (optional)</div>
                  <input value={matchStip} onChange={e => setMatchStip(e.target.value)}
                    placeholder="e.g. No DQ, First Blood..." style={{ fontSize: 11, width: '100%' }} />
                </div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ color: COLORS.textDark, fontSize: 9, marginBottom: 4 }}>BOOKED WINNER</div>
                  <select value={matchWinner} onChange={e => setMatchWinner(e.target.value)}
                    style={{ fontSize: 11, padding: '4px 8px', width: '100%' }}>
                    <option value="">-- Select Winner --</option>
                    {matchParticipants.map(pid => {
                      const w = wrestlers.find(x => x.id === pid);
                      return <option key={pid} value={pid}>{w?.name || pid}</option>;
                    })}
                  </select>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={addMatch} disabled={matchParticipants.length < 2} style={{
                    flex: 1, padding: 8, borderRadius: 6, fontSize: 11, fontWeight: 'bold', cursor: 'pointer',
                    background: matchParticipants.length >= 2 ? COLORS.red : COLORS.border,
                    border: 'none', color: COLORS.white,
                  }}>ADD MATCH</button>
                  <button onClick={resetMatchForm} style={{
                    padding: '8px 14px', borderRadius: 6, fontSize: 11, cursor: 'pointer',
                    background: 'transparent', border: `1px solid ${COLORS.border}`, color: COLORS.textMuted,
                  }}>CANCEL</button>
                </div>
              </div>
            )}

            {/* Add Segment Form */}
            {addingType === 'segment' && (
              <div style={{
                background: COLORS.bgCard, border: `1px solid ${COLORS.blue}44`,
                borderRadius: 8, padding: 14, marginBottom: 14,
              }}>
                <div style={{ color: COLORS.blue, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10 }}>NEW SEGMENT</div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ color: COLORS.textDark, fontSize: 9, marginBottom: 4 }}>TYPE</div>
                  <select value={segType} onChange={e => setSegType(e.target.value as SegmentType)}
                    style={{ fontSize: 11, padding: '4px 8px', width: '100%' }}>
                    {SEGMENT_TYPES.map(st => <option key={st} value={st}>{st}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ color: COLORS.textDark, fontSize: 9, marginBottom: 4 }}>
                    PARTICIPANTS ({segParticipants.length} selected)
                  </div>
                  <div style={{ maxHeight: 120, overflow: 'auto', border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: 6 }}>
                    {showWrestlers.map(w => (
                      <div key={w.id} onClick={() => toggleParticipant(w.id, segParticipants, setSegParticipants)} style={{
                        padding: '3px 6px', fontSize: 11, cursor: 'pointer', borderRadius: 4,
                        background: segParticipants.includes(w.id) ? `${COLORS.blue}22` : 'transparent',
                        color: segParticipants.includes(w.id) ? COLORS.white : COLORS.textMuted,
                      }}>
                        {w.flag} {w.name}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ color: COLORS.textDark, fontSize: 9, marginBottom: 4 }}>DESCRIPTION</div>
                  <input value={segDesc} onChange={e => setSegDesc(e.target.value)}
                    placeholder="What happens in this segment..." style={{ fontSize: 11, width: '100%' }} />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={addSegment} disabled={segParticipants.length === 0} style={{
                    flex: 1, padding: 8, borderRadius: 6, fontSize: 11, fontWeight: 'bold', cursor: 'pointer',
                    background: segParticipants.length > 0 ? COLORS.blue : COLORS.border,
                    border: 'none', color: COLORS.white,
                  }}>ADD SEGMENT</button>
                  <button onClick={resetSegForm} style={{
                    padding: '8px 14px', borderRadius: 6, fontSize: 11, cursor: 'pointer',
                    background: 'transparent', border: `1px solid ${COLORS.border}`, color: COLORS.textMuted,
                  }}>CANCEL</button>
                </div>
              </div>
            )}

            {/* Current segments list */}
            {segments.length === 0 && !addingType && (
              <div style={{
                background: COLORS.bgCard, border: `1px dashed ${COLORS.border}`, borderRadius: 8,
                padding: 32, textAlign: 'center', color: COLORS.textDark, fontSize: 12,
              }}>
                No segments yet. Click "+ MATCH" or "+ SEGMENT" to start building.
              </div>
            )}
            {segments.map((seg, idx) => (
              <div key={seg.id} style={{
                background: COLORS.bgCard, border: `1px solid ${COLORS.border}`,
                borderLeft: `3px solid ${isMatch(seg) ? COLORS.red : COLORS.blue}`,
                borderRadius: 8, padding: 12, marginBottom: 8,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{ color: COLORS.textDark, fontSize: 10, fontWeight: 'bold', minWidth: 20 }}>#{idx + 1}</div>
                <div style={{ flex: 1 }}>
                  {isMatch(seg) ? (
                    <>
                      <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                        <Badge text={seg.matchType} color={COLORS.red} />
                        {seg.stipulation && <Badge text={seg.stipulation} color={COLORS.orange} />}
                        {seg.titleId && <Badge text="TITLE" color={COLORS.goldLight} />}
                      </div>
                      <div style={{ color: COLORS.white, fontSize: 12, fontWeight: 'bold' }}>
                        {seg.participants.map(getWrestlerName).join(' vs ')}
                      </div>
                      {seg.bookedWinnerId && (
                        <div style={{ color: COLORS.green, fontSize: 10, marginTop: 2 }}>
                          Winner: {getWrestlerName(seg.bookedWinnerId)}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <Badge text={seg.type} color={COLORS.blue} />
                      <div style={{ color: COLORS.white, fontSize: 12, marginTop: 4 }}>
                        {seg.participants.map(getWrestlerName).join(', ')}
                      </div>
                      {seg.description && (
                        <div style={{ color: COLORS.textDark, fontSize: 10, marginTop: 2 }}>{seg.description}</div>
                      )}
                    </>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <button onClick={() => moveSegment(idx, -1)} style={{
                    background: 'transparent', border: `1px solid ${COLORS.border}`, borderRadius: 4,
                    color: COLORS.textDark, fontSize: 10, padding: '2px 6px', cursor: 'pointer',
                  }}>&#9650;</button>
                  <button onClick={() => moveSegment(idx, 1)} style={{
                    background: 'transparent', border: `1px solid ${COLORS.border}`, borderRadius: 4,
                    color: COLORS.textDark, fontSize: 10, padding: '2px 6px', cursor: 'pointer',
                  }}>&#9660;</button>
                  <button onClick={() => removeSegment(seg.id)} style={{
                    background: 'transparent', border: `1px solid ${COLORS.red}44`, borderRadius: 4,
                    color: COLORS.red, fontSize: 10, padding: '2px 6px', cursor: 'pointer',
                  }}>X</button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Card Preview */}
          <div>
            <div style={{
              background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 18,
              position: 'sticky', top: 0,
            }}>
              <div style={{
                textAlign: 'center', marginBottom: 16,
                background: `linear-gradient(135deg, ${BRAND_COLORS[selectedShow.brand]}22, transparent)`,
                border: `1px solid ${BRAND_COLORS[selectedShow.brand]}44`,
                borderRadius: 8, padding: 14,
              }}>
                <div style={{ color: BRAND_COLORS[selectedShow.brand], fontSize: 10, fontWeight: 'bold', letterSpacing: 3 }}>
                  {selectedShow.brand.toUpperCase()} PRESENTS
                </div>
                <div style={{ color: COLORS.white, fontSize: 20, fontWeight: 'bold', marginTop: 4 }}>{selectedShow.name}</div>
                <div style={{ color: COLORS.textMuted, fontSize: 11, marginTop: 4 }}>
                  Week {game.week} — {selectedShow.day}
                  {venueId && ` — ${venues.find(v => v.id === venueId)?.name || ''}`}
                </div>
              </div>

              {segments.length === 0 ? (
                <div style={{ color: COLORS.textDark, fontSize: 11, textAlign: 'center', padding: 24 }}>
                  Card is empty. Add matches and segments.
                </div>
              ) : (
                segments.map((seg, idx) => (
                  <div key={seg.id} style={{
                    padding: '10px 0',
                    borderBottom: idx < segments.length - 1 ? `1px solid ${COLORS.border}` : 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <span style={{ color: COLORS.textDark, fontSize: 9, fontWeight: 'bold' }}>#{idx + 1}</span>
                      {isMatch(seg) ? (
                        <Badge text={seg.matchType} color={COLORS.red} />
                      ) : (
                        <Badge text={seg.type} color={COLORS.blue} />
                      )}
                      {isMatch(seg) && seg.titleId && (
                        <span style={{ color: COLORS.goldLight, fontSize: 10 }}>🏆 {titles.find(t => t.id === seg.titleId)?.name}</span>
                      )}
                    </div>
                    <div style={{ color: COLORS.white, fontSize: 12, fontWeight: 'bold' }}>
                      {isMatch(seg)
                        ? seg.participants.map(getWrestlerName).join(' vs ')
                        : seg.participants.map(getWrestlerName).join(', ')
                      }
                    </div>
                    {isMatch(seg) && seg.stipulation && (
                      <div style={{ color: COLORS.orange, fontSize: 10, marginTop: 2 }}>{seg.stipulation}</div>
                    )}
                  </div>
                ))
              )}

              {segments.length > 0 && (
                <button onClick={submitCard} disabled={!venueId} style={{
                  width: '100%', padding: 10, borderRadius: 6, fontSize: 12, fontWeight: 'bold', marginTop: 16,
                  cursor: venueId ? 'pointer' : 'not-allowed',
                  background: venueId ? `linear-gradient(135deg, ${BRAND_COLORS[selectedShow.brand]}, ${BRAND_COLORS[selectedShow.brand]}88)` : COLORS.border,
                  border: 'none', color: COLORS.white, letterSpacing: 1,
                }}>
                  SUBMIT SHOW CARD
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
