import { COLORS } from '../styles/theme';

interface Props {
  value: number;
  max?: number;
  color?: string;
  height?: number;
  label?: string;
  showValue?: boolean;
}

export function StatBar({ value, max = 100, color = COLORS.blue, height = 4, label, showValue = false }: Props) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
          {label && <span style={{ color: COLORS.textDark, fontSize: 9, letterSpacing: 1 }}>{label}</span>}
          {showValue && <span style={{ color, fontSize: 10, fontWeight: 'bold' }}>{value}</span>}
        </div>
      )}
      <div style={{ background: COLORS.border, borderRadius: height / 2, height, overflow: 'hidden' }}>
        <div style={{
          width: `${pct}%`, height: '100%', borderRadius: height / 2,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          transition: 'width 0.5s ease',
        }} />
      </div>
    </div>
  );
}

interface BadgeProps {
  text: string;
  color: string;
  bg?: string;
}

export function Badge({ text, color, bg }: BadgeProps) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: 10,
      background: bg || `${color}22`, border: `1px solid ${color}44`,
      color, fontSize: 9, fontWeight: 'bold', letterSpacing: 0.5,
      whiteSpace: 'nowrap',
    }}>
      {text}
    </span>
  );
}
