export default function ParticleField() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">

      {/* ── Base dark radial vignette ── */}
      <div className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 110% 90% at 50% 0%, rgba(108,99,255,0.13) 0%, transparent 65%), radial-gradient(ellipse 80% 60% at 80% 100%, rgba(0,196,240,0.10) 0%, transparent 60%)',
        }}
      />

      {/* ── Drifting aurora orbs ── */}
      <div className="absolute rounded-full animate-aurora"
        style={{
          width: '900px', height: '900px',
          top: '-260px', right: '-240px',
          background: 'radial-gradient(circle, rgba(108,99,255,0.16) 0%, rgba(108,99,255,0.05) 45%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div className="absolute rounded-full animate-aurora"
        style={{
          width: '750px', height: '750px',
          bottom: '-180px', left: '-160px',
          background: 'radial-gradient(circle, rgba(0,196,240,0.12) 0%, rgba(0,196,240,0.04) 45%, transparent 70%)',
          filter: 'blur(90px)',
          animationDelay: '-9s',
        }}
      />
      <div className="absolute rounded-full animate-float-slow"
        style={{
          width: '500px', height: '500px',
          top: '25%', left: '5%',
          background: 'radial-gradient(circle, rgba(124,116,255,0.09) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div className="absolute rounded-full animate-float"
        style={{
          width: '350px', height: '350px',
          top: '10%', left: '38%',
          background: 'radial-gradient(circle, rgba(0,196,240,0.07) 0%, transparent 70%)',
          filter: 'blur(70px)',
          animationDelay: '-5s',
        }}
      />

      {/* ── Flat top grid (standard overhead) ── */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(108,99,255,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,99,255,0.045) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 40%, rgba(0,0,0,0.35) 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 40%, rgba(0,0,0,0.35) 0%, transparent 75%)',
        }}
      />

      {/* ── Perspective grid — converging vanishing point at bottom ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '-15%',
          width: '130%',
          height: '55%',
          backgroundImage: `
            linear-gradient(rgba(108,99,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,99,255,0.09) 1px, transparent 1px)
          `,
          backgroundSize: '88px 88px',
          transform: 'perspective(520px) rotateX(62deg)',
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 45%, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 45%, transparent 80%)',
        }}
      />

      {/* ── Subtle noise grain overlay ── */}
      <div className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      {/* ── Floating glint dots (SVG, static) ── */}
      <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        {[
          [12, 22], [34, 64], [55, 18], [78, 45], [92, 8],
          [8, 80], [25, 55], [45, 88], [68, 70], [85, 35],
          [20, 40], [60, 30], [75, 85], [50, 60], [38, 12],
        ].map(([cx, cy], i) => (
          <circle key={i}
            cx={`${cx}%`} cy={`${cy}%`}
            r={i % 3 === 0 ? '1.4' : '0.9'}
            fill={i % 4 === 0 ? 'rgba(108,99,255,0.7)' : i % 4 === 1 ? 'rgba(0,196,240,0.6)' : 'rgba(255,255,255,0.5)'}
          />
        ))}
      </svg>

      {/* ── Horizontal glow line accent ── */}
      <div className="absolute left-0 right-0"
        style={{
          top: '38%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(108,99,255,0.25) 30%, rgba(0,196,240,0.2) 70%, transparent 100%)',
          maskImage: 'linear-gradient(90deg, transparent, white 20%, white 80%, transparent)',
        }}
      />
    </div>
  );
}
