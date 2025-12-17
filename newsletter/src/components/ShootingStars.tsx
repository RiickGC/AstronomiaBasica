import { useMemo } from 'react';

export default function ShootingStars() {
  // Gerar estrelas 3D com profundidade - AUMENTADO para 400 estrelas
  const stars3D = useMemo(() => 
    [...Array(400)].map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 200, // -100 a 100
      y: (Math.random() - 0.5) * 200, // -100 a 100
      z: Math.random() * 2500, // 0 a 2500 (maior profundidade)
      delay: Math.random() * 25, // 0-25s
      duration: 10 + Math.random() * 15, // 10-25s (variação maior)
    })),
    []
  );

  return (
    <div className="starfield">
      {stars3D.map((star) => (
        <div
          key={star.id}
          className="star-3d"
          style={{
            '--x': star.x,
            '--y': star.y,
            '--z': star.z,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

