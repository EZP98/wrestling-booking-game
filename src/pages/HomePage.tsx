import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { COLORS } from '../styles/theme';
import { Difficulty } from '../types';

const DIFFICULTIES: { id: Difficulty; name: string; desc: string; color: string; icon: string }[] = [
  { id: 'Rookie', name: 'ROOKIE BOOKER', desc: 'AI sempre attiva, budget infinito, zero morale. Impara le basi.', color: COLORS.green, icon: '🟢' },
  { id: 'Creative', name: 'CREATIVE WRITER', desc: 'Budget reale, infortuni rari, AI suggerisce. Il modo consigliato.', color: COLORS.blue, icon: '🔵' },
  { id: 'Veteran', name: 'VETERAN BOOKER', desc: 'Zero AI, budget stretto, community reattiva. Per esperti.', color: COLORS.orange, icon: '🟠' },
  { id: 'Vince Mode', name: 'VINCE MODE', desc: 'Interferenza dirigenza, tagli budget random, poaching. Incubo.', color: COLORS.red, icon: '🔴' },
];

export function HomePage() {
  const startGame = useGameStore(s => s.startGame);
  const [selected, setSelected] = useState<Difficulty>('Creative');
  const [hoveredDiff, setHoveredDiff] = useState<Difficulty | null>(null);

  return (
    <div style={{
      height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse at center, #1a0015 0%, #070710 70%)',
    }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🏟️</div>
        <h1 style={{
          fontFamily: 'Georgia, serif', fontSize: 42, fontWeight: 'bold',
          color: COLORS.white, letterSpacing: 6, marginBottom: 8,
          textShadow: `0 0 40px ${COLORS.gold}44`,
        }}>
          WRESTLING
        </h1>
        <h2 style={{
          fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 'bold',
          color: COLORS.gold, letterSpacing: 8, marginBottom: 16,
        }}>
          BOOKING GAME
        </h2>
        <p style={{ color: COLORS.textMuted, fontSize: 14, maxWidth: 500, lineHeight: 1.8 }}>
          Diventa l'Head of Creative. Gestisci WWE, AEW, TNA, ROH e AAA.
          <br />Costruisci feud leggendari. Porta il tuo roster a WrestleMania.
        </p>
      </div>

      {/* Difficulty select */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 36, maxWidth: 700 }}>
        {DIFFICULTIES.map(d => (
          <button
            key={d.id}
            onClick={() => setSelected(d.id)}
            onMouseEnter={() => setHoveredDiff(d.id)}
            onMouseLeave={() => setHoveredDiff(null)}
            style={{
              padding: '20px 16px', borderRadius: 10,
              border: `2px solid ${selected === d.id ? d.color : COLORS.border}`,
              background: selected === d.id ? `${d.color}15` : COLORS.bgCard,
              textAlign: 'center', minWidth: 150,
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 8 }}>{d.icon}</div>
            <div style={{ color: d.color, fontWeight: 'bold', fontSize: 11, letterSpacing: 2, marginBottom: 8 }}>{d.name}</div>
            <div style={{ color: COLORS.textMuted, fontSize: 10, lineHeight: 1.6 }}>{d.desc}</div>
          </button>
        ))}
      </div>

      {/* Start */}
      <button onClick={() => startGame(selected)} style={{
        padding: '16px 60px', border: `2px solid ${COLORS.gold}`,
        background: `linear-gradient(135deg, ${COLORS.gold}33, ${COLORS.gold}11)`,
        color: COLORS.gold, borderRadius: 8, fontWeight: 'bold', fontSize: 18,
        letterSpacing: 4,
      }}>
        START GAME
      </button>

      {/* Stats preview */}
      <div style={{ marginTop: 48, display: 'flex', gap: 32, color: COLORS.textDark, fontSize: 11 }}>
        <span>60+ Wrestlers</span>
        <span>5 Federazioni</span>
        <span>32 Venue</span>
        <span>17 Celebrity</span>
        <span>24 Eventi</span>
        <span>10 Writer</span>
      </div>
    </div>
  );
}
