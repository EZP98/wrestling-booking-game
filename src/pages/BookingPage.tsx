import { useState, useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { COLORS, BRAND_COLORS } from '../styles/theme';
import { Badge } from '../components/StatBar';
import { MatchCard, PromoSegment, MatchType, SegmentType } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, Plus, Trash2, Trophy, Users, CheckCircle, ChevronDown, ChevronUp, X } from 'lucide-react';

const MATCH_TYPES: MatchType[] = ['Singles', 'Tag', 'Triple Threat', 'Fatal 4-Way', 'Ladder', 'TLC', 'Hell in a Cell', 'Steel Cage', 'Last Man Standing', 'Iron Man', 'I Quit', 'Royal Rumble', 'Battle Royal', 'Elimination Chamber', 'Money in the Bank'];
const SEGMENT_TYPES: SegmentType[] = ['Promo', 'Backstage', 'Run-In', 'Celebrity', 'Title Ceremony', 'Contract Signing', 'Interview'];

function genId() { return `seg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`; }

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function BookingPage() {
  const { shows, wrestlers, titles, feuds, venues, game, addShowCard } = useGameStore();
  const [selectedShowId, setSelectedShowId] = useState('');
  const [segments, setSegments] = useState<(MatchCard | PromoSegment)[]>([]);
  const [venueId, setVenueId] = useState('');
  const [addingType, setAddingType] = useState<'match' | 'segment' | null>(null);

  const [matchType, setMatchType] = useState<MatchType>('Singles');
  const [matchParticipants, setMatchParticipants] = useState<string[]>([]);
  const [matchTitleId, setMatchTitleId] = useState('');
  const [matchStip, setMatchStip] = useState('');
  const [matchWinner, setMatchWinner] = useState('');

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 overflow-auto h-full bg-black"
    >
      <div className="flex items-center gap-3 mb-4">
        <ClipboardList className="w-5 h-5 text-[#B8860B]" />
        <h1 className="text-xl text-white tracking-[3px] font-bold">BOOK A SHOW</h1>
      </div>

      {/* Show selector */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <div>
          <div className="text-[#555555] text-[9px] tracking-widest mb-1">SELECT SHOW</div>
          <div className="flex gap-1.5">
            {shows.filter(s => ['Raw', 'SmackDown', 'NXT'].includes(s.brand)).map(s => (
              <motion.button
                key={s.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setSelectedShowId(s.id); setSegments([]); }}
                className="px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                style={{
                  border: `1px solid ${selectedShowId === s.id ? BRAND_COLORS[s.brand] : COLORS.border}`,
                  background: selectedShowId === s.id ? `${BRAND_COLORS[s.brand]}22` : COLORS.bgCard,
                  color: selectedShowId === s.id ? COLORS.white : COLORS.textMuted,
                }}
              >
                {s.name}
              </motion.button>
            ))}
          </div>
        </div>
        {selectedShow && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <div className="text-[#555555] text-[9px] tracking-widest mb-1">VENUE</div>
            <select
              value={venueId}
              onChange={e => setVenueId(e.target.value)}
              className="text-[11px] px-2.5 py-1.5 min-w-[200px] bg-[#0a0a0a] border border-[#1a1a1a] rounded text-[#e0e0e0]"
            >
              <option value="">-- Select Venue --</option>
              {brandVenues.map(v => (
                <option key={v.id} value={v.id}>{v.name} ({v.city}, cap: {v.capacity.toLocaleString()})</option>
              ))}
            </select>
          </motion.div>
        )}
      </div>

      {!selectedShow && (
        <div className="text-[#555555] text-sm p-10 text-center">
          Select a show above to start building the card.
        </div>
      )}

      {selectedShow && (
        <div className="grid grid-cols-2 gap-5">
          {/* Left: Card builder */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="text-[#B8860B] text-[11px] font-bold tracking-[2px]">
                BUILD CARD ({segments.length}/{selectedShow.segments} segments)
              </div>
              <div className="flex gap-1.5">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setAddingType('match'); resetSegForm(); }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer"
                  style={{
                    border: `1px solid ${addingType === 'match' ? COLORS.red : COLORS.border}`,
                    background: addingType === 'match' ? `${COLORS.red}22` : 'transparent',
                    color: addingType === 'match' ? COLORS.white : COLORS.textMuted,
                  }}
                >
                  <Plus className="w-3 h-3" /> MATCH
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setAddingType('segment'); resetMatchForm(); }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer"
                  style={{
                    border: `1px solid ${addingType === 'segment' ? COLORS.blue : COLORS.border}`,
                    background: addingType === 'segment' ? `${COLORS.blue}22` : 'transparent',
                    color: addingType === 'segment' ? COLORS.white : COLORS.textMuted,
                  }}
                >
                  <Plus className="w-3 h-3" /> SEGMENT
                </motion.button>
              </div>
            </div>

            {/* Add Match Form */}
            <AnimatePresence>
              {addingType === 'match' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div
                    className="bg-[#0a0a0a] rounded-lg p-3.5 mb-3.5"
                    style={{ border: `1px solid ${COLORS.red}44` }}
                  >
                    <div className="text-[10px] font-bold tracking-[2px] mb-2.5" style={{ color: COLORS.red }}>NEW MATCH</div>
                    <div className="mb-2.5">
                      <div className="text-[#555555] text-[9px] mb-1">MATCH TYPE</div>
                      <select
                        value={matchType}
                        onChange={e => setMatchType(e.target.value as MatchType)}
                        className="text-[11px] px-2 py-1 w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded text-[#e0e0e0]"
                      >
                        {MATCH_TYPES.map(mt => <option key={mt} value={mt}>{mt}</option>)}
                      </select>
                    </div>
                    <div className="mb-2.5">
                      <div className="text-[#555555] text-[9px] mb-1">
                        PARTICIPANTS ({matchParticipants.length} selected)
                      </div>
                      <div className="max-h-[150px] overflow-auto border border-[#1a1a1a] rounded-md p-1.5">
                        {showWrestlers.map(w => (
                          <div
                            key={w.id}
                            onClick={() => toggleParticipant(w.id, matchParticipants, setMatchParticipants)}
                            className="px-1.5 py-0.5 text-[11px] cursor-pointer rounded"
                            style={{
                              background: matchParticipants.includes(w.id) ? `${COLORS.red}22` : 'transparent',
                              color: matchParticipants.includes(w.id) ? COLORS.white : COLORS.textMuted,
                            }}
                          >
                            {w.flag} {w.name} ({w.overness})
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mb-2.5">
                      <div className="text-[#555555] text-[9px] mb-1">TITLE ON THE LINE</div>
                      <select
                        value={matchTitleId}
                        onChange={e => setMatchTitleId(e.target.value)}
                        className="text-[11px] px-2 py-1 w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded text-[#e0e0e0]"
                      >
                        <option value="">None</option>
                        {titles.filter(t => t.brand === selectedShow.brand).map(t => (
                          <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2.5">
                      <div className="text-[#555555] text-[9px] mb-1">STIPULATION (optional)</div>
                      <input
                        value={matchStip}
                        onChange={e => setMatchStip(e.target.value)}
                        placeholder="e.g. No DQ, First Blood..."
                        className="text-[11px] w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded px-2 py-1 text-[#e0e0e0]"
                      />
                    </div>
                    <div className="mb-2.5">
                      <div className="text-[#555555] text-[9px] mb-1">BOOKED WINNER</div>
                      <select
                        value={matchWinner}
                        onChange={e => setMatchWinner(e.target.value)}
                        className="text-[11px] px-2 py-1 w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded text-[#e0e0e0]"
                      >
                        <option value="">-- Select Winner --</option>
                        {matchParticipants.map(pid => {
                          const w = wrestlers.find(x => x.id === pid);
                          return <option key={pid} value={pid}>{w?.name || pid}</option>;
                        })}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={addMatch}
                        disabled={matchParticipants.length < 2}
                        className="flex-1 py-2 rounded-md text-[11px] font-bold cursor-pointer border-none text-white"
                        style={{ background: matchParticipants.length >= 2 ? COLORS.red : COLORS.border }}
                      >
                        ADD MATCH
                      </motion.button>
                      <button
                        onClick={resetMatchForm}
                        className="px-3.5 py-2 rounded-md text-[11px] cursor-pointer bg-transparent border border-[#1a1a1a] text-[#888888]"
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Add Segment Form */}
            <AnimatePresence>
              {addingType === 'segment' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div
                    className="bg-[#0a0a0a] rounded-lg p-3.5 mb-3.5"
                    style={{ border: `1px solid ${COLORS.blue}44` }}
                  >
                    <div className="text-[10px] font-bold tracking-[2px] mb-2.5" style={{ color: COLORS.blue }}>NEW SEGMENT</div>
                    <div className="mb-2.5">
                      <div className="text-[#555555] text-[9px] mb-1">TYPE</div>
                      <select
                        value={segType}
                        onChange={e => setSegType(e.target.value as SegmentType)}
                        className="text-[11px] px-2 py-1 w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded text-[#e0e0e0]"
                      >
                        {SEGMENT_TYPES.map(st => <option key={st} value={st}>{st}</option>)}
                      </select>
                    </div>
                    <div className="mb-2.5">
                      <div className="text-[#555555] text-[9px] mb-1">
                        PARTICIPANTS ({segParticipants.length} selected)
                      </div>
                      <div className="max-h-[120px] overflow-auto border border-[#1a1a1a] rounded-md p-1.5">
                        {showWrestlers.map(w => (
                          <div
                            key={w.id}
                            onClick={() => toggleParticipant(w.id, segParticipants, setSegParticipants)}
                            className="px-1.5 py-0.5 text-[11px] cursor-pointer rounded"
                            style={{
                              background: segParticipants.includes(w.id) ? `${COLORS.blue}22` : 'transparent',
                              color: segParticipants.includes(w.id) ? COLORS.white : COLORS.textMuted,
                            }}
                          >
                            {w.flag} {w.name}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mb-2.5">
                      <div className="text-[#555555] text-[9px] mb-1">DESCRIPTION</div>
                      <input
                        value={segDesc}
                        onChange={e => setSegDesc(e.target.value)}
                        placeholder="What happens in this segment..."
                        className="text-[11px] w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded px-2 py-1 text-[#e0e0e0]"
                      />
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={addSegment}
                        disabled={segParticipants.length === 0}
                        className="flex-1 py-2 rounded-md text-[11px] font-bold cursor-pointer border-none text-white"
                        style={{ background: segParticipants.length > 0 ? COLORS.blue : COLORS.border }}
                      >
                        ADD SEGMENT
                      </motion.button>
                      <button
                        onClick={resetSegForm}
                        className="px-3.5 py-2 rounded-md text-[11px] cursor-pointer bg-transparent border border-[#1a1a1a] text-[#888888]"
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Current segments list */}
            {segments.length === 0 && !addingType && (
              <div className="bg-[#0a0a0a] border border-dashed border-[#1a1a1a] rounded-lg p-8 text-center text-[#555555] text-xs">
                No segments yet. Click "+ MATCH" or "+ SEGMENT" to start building.
              </div>
            )}
            <motion.div variants={stagger} initial="hidden" animate="show">
              {segments.map((seg, idx) => (
                <motion.div
                  key={seg.id}
                  variants={fadeUp}
                  layout
                  className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3 mb-2 flex items-center gap-2.5"
                  style={{ borderLeft: `3px solid ${isMatch(seg) ? COLORS.red : COLORS.blue}` }}
                >
                  <div className="text-[#555555] text-[10px] font-bold min-w-[20px]">#{idx + 1}</div>
                  <div className="flex-1">
                    {isMatch(seg) ? (
                      <>
                        <div className="flex gap-1 mb-1">
                          <Badge text={seg.matchType} color={COLORS.red} />
                          {seg.stipulation && <Badge text={seg.stipulation} color={COLORS.orange} />}
                          {seg.titleId && <Badge text="TITLE" color={COLORS.goldLight} />}
                        </div>
                        <div className="text-white text-xs font-bold">
                          {seg.participants.map(getWrestlerName).join(' vs ')}
                        </div>
                        {seg.bookedWinnerId && (
                          <div className="flex items-center gap-1 mt-0.5">
                            <CheckCircle className="w-3 h-3 text-[#2ECC71]" />
                            <span className="text-[#2ECC71] text-[10px]">Winner: {getWrestlerName(seg.bookedWinnerId)}</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <Badge text={seg.type} color={COLORS.blue} />
                        <div className="text-white text-xs mt-1">
                          {seg.participants.map(getWrestlerName).join(', ')}
                        </div>
                        {seg.description && (
                          <div className="text-[#555555] text-[10px] mt-0.5">{seg.description}</div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <button
                      onClick={() => moveSegment(idx, -1)}
                      className="bg-transparent border border-[#1a1a1a] rounded p-0.5 cursor-pointer text-[#555555] hover:text-white transition-colors"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => moveSegment(idx, 1)}
                      className="bg-transparent border border-[#1a1a1a] rounded p-0.5 cursor-pointer text-[#555555] hover:text-white transition-colors"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeSegment(seg.id)}
                      className="bg-transparent rounded p-0.5 cursor-pointer transition-colors"
                      style={{ border: `1px solid ${COLORS.red}44`, color: COLORS.red }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Card Preview */}
          <div>
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-[18px] sticky top-0">
              <div
                className="text-center mb-4 rounded-lg p-3.5"
                style={{
                  background: `linear-gradient(135deg, ${BRAND_COLORS[selectedShow.brand]}22, transparent)`,
                  border: `1px solid ${BRAND_COLORS[selectedShow.brand]}44`,
                }}
              >
                <div className="text-[10px] font-bold tracking-[3px]" style={{ color: BRAND_COLORS[selectedShow.brand] }}>
                  {selectedShow.brand.toUpperCase()} PRESENTS
                </div>
                <div className="text-white text-xl font-bold mt-1">{selectedShow.name}</div>
                <div className="text-[#888888] text-[11px] mt-1">
                  Week {game.week} — {selectedShow.day}
                  {venueId && ` — ${venues.find(v => v.id === venueId)?.name || ''}`}
                </div>
              </div>

              {segments.length === 0 ? (
                <div className="text-[#555555] text-[11px] text-center p-6">
                  Card is empty. Add matches and segments.
                </div>
              ) : (
                segments.map((seg, idx) => (
                  <motion.div
                    key={seg.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-2.5"
                    style={{ borderBottom: idx < segments.length - 1 ? `1px solid ${COLORS.border}` : 'none' }}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[#555555] text-[9px] font-bold">#{idx + 1}</span>
                      {isMatch(seg) ? (
                        <Badge text={seg.matchType} color={COLORS.red} />
                      ) : (
                        <Badge text={seg.type} color={COLORS.blue} />
                      )}
                      {isMatch(seg) && seg.titleId && (
                        <span className="flex items-center gap-1 text-[10px]" style={{ color: COLORS.goldLight }}>
                          <Trophy className="w-3 h-3" /> {titles.find(t => t.id === seg.titleId)?.name}
                        </span>
                      )}
                    </div>
                    <div className="text-white text-xs font-bold">
                      {isMatch(seg)
                        ? seg.participants.map(getWrestlerName).join(' vs ')
                        : seg.participants.map(getWrestlerName).join(', ')
                      }
                    </div>
                    {isMatch(seg) && seg.stipulation && (
                      <div className="text-[10px] mt-0.5" style={{ color: COLORS.orange }}>{seg.stipulation}</div>
                    )}
                  </motion.div>
                ))
              )}

              {segments.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={submitCard}
                  disabled={!venueId}
                  className="w-full py-2.5 rounded-md text-xs font-bold mt-4 border-none text-white tracking-wider"
                  style={{
                    cursor: venueId ? 'pointer' : 'not-allowed',
                    background: venueId
                      ? `linear-gradient(135deg, ${BRAND_COLORS[selectedShow.brand]}, ${BRAND_COLORS[selectedShow.brand]}88)`
                      : COLORS.border,
                  }}
                >
                  SUBMIT SHOW CARD
                </motion.button>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
