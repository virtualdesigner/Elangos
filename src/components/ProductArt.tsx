import type { CSSProperties } from 'react';
import type { ProductKind } from '../types';

interface ProductArtProps {
  kind: ProductKind;
  color: string;
}

const LABELS: Record<ProductKind, string> = {
  dal: 'DESI TUR DAL',
  moong: 'WHOLE GREEN GRAM',
  rajma: 'WAGHYA RAJMA',
  peanut: 'RAW PEANUTS',
  rice: 'NATIVE RICE',
};

const SEEDS = Array.from({ length: 34 }, (_, i) => ({
  x: 15 + ((i * 37) % 170),
  y: 20 + ((i * 53) % 180),
  r: 3 + (i % 4),
  rot: (i * 29) % 180,
}));

export function ProductArt({ kind, color }: ProductArtProps) {
  return (
    <div className={`product-art art-${kind}`} style={{ '--seed': color } as CSSProperties}>
      <div className="art-glow"></div>
      <div className="grain-bowl">
        {SEEDS.map((s, i) => (
          <i
            key={i}
            style={{
              left: `${s.x / 2.05}%`,
              top: `${s.y / 2.2}%`,
              width: s.r * 1.6,
              height: s.r,
              transform: `rotate(${s.rot}deg)`,
            }}
          />
        ))}
      </div>
      <div className="art-label">
        <span>TWO BROTHERS</span>
        <b>{LABELS[kind] ?? 'NATIVE RICE'}</b>
        <small>UNPOLISHED • FARM FRESH</small>
      </div>
      <div className="art-bottom">TWO BROTHERS INDIA FARMS</div>
    </div>
  );
}
