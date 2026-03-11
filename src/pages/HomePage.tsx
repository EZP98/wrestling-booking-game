import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Difficulty } from '../types';
import { motion } from 'framer-motion';
import { Gamepad2, PenLine, ShieldAlert, Flame, Users, Map, Sparkles, Calendar, UserCog } from 'lucide-react';

const DIFFICULTIES: { id: Difficulty; name: string; desc: string; twColor: string; icon: React.ReactNode }[] = [
  {
    id: 'Rookie',
    name: 'ROOKIE BOOKER',
    desc: 'AI sempre attiva, budget infinito, zero morale. Impara le basi.',
    twColor: 'green',
    icon: <Gamepad2 className="w-6 h-6 text-green-500" />,
  },
  {
    id: 'Creative',
    name: 'CREATIVE WRITER',
    desc: 'Budget reale, infortuni rari, AI suggerisce. Il modo consigliato.',
    twColor: 'blue',
    icon: <PenLine className="w-6 h-6 text-blue-500" />,
  },
  {
    id: 'Veteran',
    name: 'VETERAN BOOKER',
    desc: 'Zero AI, budget stretto, community reattiva. Per esperti.',
    twColor: 'orange',
    icon: <ShieldAlert className="w-6 h-6 text-orange-500" />,
  },
  {
    id: 'Vince Mode',
    name: 'VINCE MODE',
    desc: 'Interferenza dirigenza, tagli budget random, poaching. Incubo.',
    twColor: 'red',
    icon: <Flame className="w-6 h-6 text-red-500" />,
  },
];

const borderColorMap: Record<string, string> = {
  green: 'border-green-500',
  blue: 'border-blue-500',
  orange: 'border-orange-500',
  red: 'border-red-500',
};

const bgSelectedMap: Record<string, string> = {
  green: 'bg-green-500/10',
  blue: 'bg-blue-500/10',
  orange: 'bg-orange-500/10',
  red: 'bg-red-500/10',
};

const textColorMap: Record<string, string> = {
  green: 'text-green-500',
  blue: 'text-blue-500',
  orange: 'text-orange-500',
  red: 'text-red-500',
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export function HomePage() {
  const startGame = useGameStore(s => s.startGame);
  const [selected, setSelected] = useState<Difficulty>('Creative');

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black">
      {/* Title */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[42px] font-bold text-white tracking-[6px] mb-2"
          style={{ textShadow: '0 0 40px rgba(184, 134, 11, 0.27)' }}
        >
          WRESTLING
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-[28px] font-bold text-[#B8860B] tracking-[8px] mb-4"
        >
          BOOKING GAME
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[#888888] text-sm max-w-[500px] leading-[1.8]"
        >
          Diventa l&apos;Head of Creative. Gestisci WWE, AEW, TNA, ROH e AAA.
          <br />
          Costruisci feud leggendari. Porta il tuo roster a WrestleMania.
        </motion.p>
      </div>

      {/* Difficulty select */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-4 gap-3 mb-9 max-w-[700px]"
      >
        {DIFFICULTIES.map(d => {
          const isSelected = selected === d.id;
          return (
            <motion.button
              key={d.id}
              variants={cardItem}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(d.id)}
              className={`
                px-4 py-5 rounded-[10px] text-center min-w-[150px] cursor-pointer
                border-2 transition-colors duration-200
                ${isSelected ? borderColorMap[d.twColor] : 'border-[#1a1a1a]'}
                ${isSelected ? bgSelectedMap[d.twColor] : 'bg-[#0a0a0a]'}
              `}
            >
              <div className="mb-2 flex justify-center">{d.icon}</div>
              <div className={`font-bold text-[11px] tracking-[2px] mb-2 ${textColorMap[d.twColor]}`}>
                {d.name}
              </div>
              <div className="text-[#888888] text-[10px] leading-[1.6]">{d.desc}</div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Start */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        onClick={() => startGame(selected)}
        className="px-[60px] py-4 border-2 border-[#B8860B] bg-gradient-to-br from-[#B8860B33] to-[#B8860B11] text-[#B8860B] rounded-lg font-bold text-lg tracking-[4px] cursor-pointer"
      >
        START GAME
      </motion.button>

      {/* Stats preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-12 flex gap-8 text-[#555555] text-[11px]"
      >
        <span className="flex items-center gap-1.5">
          <Users className="w-3 h-3" /> 60+ Wrestlers
        </span>
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3" /> 5 Federazioni
        </span>
        <span className="flex items-center gap-1.5">
          <Map className="w-3 h-3" /> 32 Venue
        </span>
        <span className="flex items-center gap-1.5">
          <UserCog className="w-3 h-3" /> 17 Celebrity
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3 h-3" /> 24 Eventi
        </span>
        <span className="flex items-center gap-1.5">
          <PenLine className="w-3 h-3" /> 10 Writer
        </span>
      </motion.div>
    </div>
  );
}
