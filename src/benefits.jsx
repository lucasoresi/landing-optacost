// benefits.jsx — Bento asimétrico con mini-visualizaciones
function Benefits({ t }) {
  return (
    <section id="benefits" className="section section-divider">
      <div className="container">
        <header style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          textAlign: "center", marginBottom: 56, gap: 18,
        }}>
          <span className="eyebrow">{t.benefits.eyebrow}</span>
          <h2 className="section-title" style={{ maxWidth: "20ch" }}>
            {t.benefits.title_a} <em>{t.benefits.title_em}</em>
          </h2>
          <p className="section-lede" style={{ marginTop: 0, textAlign: "center", marginInline: "auto" }}>
            {t.benefits.lede}
          </p>
        </header>

        <BentoGrid items={t.benefits.items} lang={t.lang || "es"} />
      </div>
    </section>
  );
}

function BentoGrid({ items, lang }) {
  // Layout: 4-col grid
  // [ FEATURE (col 1-2, row 1-2) ][ small (col 3) ][ small (col 4) ]
  // [                            ][ wide (col 3-4)              ]
  // [ small (col 1) ][ small (col 2) ][ wide (col 3-4)          ]
  // -> 6 items, asymmetric

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(6, 1fr)",
      gridAutoRows: "minmax(220px, auto)",
      gap: 14,
    }}>
      {/* 01 — Big feature: cálculo de rentabilidad with line chart */}
      <BentoCard span={{ col: 3, row: 2 }} item={items[0]} variant="hero">
        <BentoChart />
      </BentoCard>

      {/* 02 — Asignación: small with bars */}
      <BentoCard span={{ col: 3 }} item={items[1]} variant="small">
        <BentoAllocBars />
      </BentoCard>

      {/* 03 — Toma de decisiones: KPI list */}
      <BentoCard span={{ col: 3 }} item={items[2]} variant="small">
        <BentoKpiList />
      </BentoCard>

      {/* 04 — Planificación: timeline / calendar */}
      <BentoCard span={{ col: 2 }} item={items[3]} variant="small">
        <BentoTimeline />
      </BentoCard>

      {/* 05 — Centralización: orbit / hub */}
      <BentoCard span={{ col: 2 }} item={items[4]} variant="small">
        <BentoHub />
      </BentoCard>

      {/* 06 — Soporte */}
      <BentoCard span={{ col: 2 }} item={items[5]} variant="small">
        <BentoSupport lang={lang} />
      </BentoCard>
    </div>
  );
}

function BentoCard({ span, item, variant = "small", children }) {
  const [hover, setHover] = React.useState(false);
  const isHero = variant === "hero";

  const gridStyles = {
    gridColumn: `span ${span.col}`,
    gridRow: span.row ? `span ${span.row}` : "auto",
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...gridStyles,
        position: "relative",
        borderRadius: 28,
        background: isHero
          ? "linear-gradient(155deg, oklch(0.97 0.02 148), oklch(0.94 0.04 148))"
          : "var(--bg-tint)",
        border: `1px solid ${isHero ? "oklch(0.85 0.05 148)" : "var(--border)"}`,
        padding: isHero ? "32px 32px 0" : "24px 24px 0",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "all .28s cubic-bezier(.2,.7,.2,1)",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hover
          ? "0 22px 50px -25px oklch(0.18 0.018 250 / 0.18)"
          : "0 1px 0 oklch(1 0 0 / 0.5) inset",
      }}
    >
      {/* Top tag */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span className="mono" style={{
          fontSize: 10.5, color: isHero ? "var(--accent-deep)" : "var(--muted)",
          letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500,
        }}>
          {item.n} — {item.t}
        </span>
        {isHero && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "4px 10px", borderRadius: 999,
            background: "oklch(1 0 0 / 0.5)", color: "var(--accent-deep)",
            fontSize: 10.5, fontWeight: 500,
            fontFamily: "var(--f-mono)", letterSpacing: "0.04em",
          }}>
            <Icon.spark /> destacado
          </span>
        )}
      </div>

      {/* Headline metric */}
      <div className="mono" style={{
        fontSize: isHero ? "clamp(40px, 4vw, 60px)" : "clamp(28px, 2.6vw, 38px)",
        fontWeight: 500,
        letterSpacing: "-0.03em",
        color: "var(--ink)",
        lineHeight: 1,
      }}>
        {item.metric}
      </div>
      <div style={{
        fontSize: 12, color: "var(--muted)",
        marginTop: 6, fontFamily: "var(--f-mono)",
        textTransform: "uppercase", letterSpacing: "0.05em",
      }}>
        {item.metricLabel}
      </div>

      {/* Description */}
      <div style={{
        marginTop: isHero ? 24 : 16,
        fontSize: isHero ? 16 : 14,
        color: "var(--ink-soft)",
        lineHeight: 1.5,
        maxWidth: isHero ? "38ch" : "30ch",
        letterSpacing: "-0.005em",
      }}>
        {item.d}
      </div>

      {/* Filler */}
      <div style={{ flex: 1, minHeight: isHero ? 24 : 18 }} />

      {/* Visualization at bottom */}
      <div style={{ marginInline: isHero ? -32 : -24, marginBottom: 0 }}>
        {children}
      </div>
    </div>
  );
}

/* ─── Mini visualizations ─── */

function BentoChart() {
  // Smooth area chart filling bottom
  const pts = [[0, 100],[30, 92],[60, 88],[90, 70],[120, 75],[150, 55],[180, 60],[210, 38],[240, 42],[270, 26],[300, 30],[330, 18],[360, 22]];
  const line = "M " + pts.map(([x, y]) => `${x} ${y}`).join(" L ");
  const area = line + " L 360 140 L 0 140 Z";
  return (
    <svg viewBox="0 0 360 140" width="100%" height="140" preserveAspectRatio="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id="bChart" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.42 0.10 148)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="oklch(0.42 0.10 148)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#bChart)" />
      <path d={line} fill="none" stroke="oklch(0.38 0.10 148)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" className="chart-path" />
      {pts.filter((_, i) => i === pts.length - 1).map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="6" fill="oklch(1 0 0 / 0.7)" />
          <circle cx={x} cy={y} r="3" fill="oklch(0.38 0.10 148)" />
        </g>
      ))}
    </svg>
  );
}

function BentoAllocBars() {
  // 4 grouped pairs (direct vs indirect)
  const groups = [
    { l: "Sede A", d: 64, i: 24 },
    { l: "Sede B", d: 52, i: 30 },
    { l: "Sede C", d: 38, i: 28 },
    { l: "Sede D", d: 46, i: 18 },
  ];
  const w = 360, h = 110, bw = 18, gap = 6, groupGap = 28;
  const groupW = bw * 2 + gap;
  const totalW = groupW * groups.length + groupGap * (groups.length - 1);
  const startX = (w - totalW) / 2;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} style={{ display: "block" }}>
      {groups.map((g, i) => {
        const gx = startX + i * (groupW + groupGap);
        const hd = (g.d / 80) * (h - 24);
        const hi = (g.i / 80) * (h - 24);
        return (
          <g key={i}>
            <rect x={gx} y={h - hd - 16} width={bw} height={hd} rx="3" fill="var(--accent-deep)">
              <animate attributeName="height" from="0" to={hd} dur="0.8s" fill="freeze" />
              <animate attributeName="y" from={h - 16} to={h - hd - 16} dur="0.8s" fill="freeze" />
            </rect>
            <rect x={gx + bw + gap} y={h - hi - 16} width={bw} height={hi} rx="3" fill="oklch(0.78 0.08 148)" opacity="0.7">
              <animate attributeName="height" from="0" to={hi} dur="0.8s" begin="0.1s" fill="freeze" />
              <animate attributeName="y" from={h - 16} to={h - hi - 16} dur="0.8s" begin="0.1s" fill="freeze" />
            </rect>
            <text x={gx + groupW / 2} y={h - 4} textAnchor="middle" fontSize="9" fill="var(--muted)" fontFamily="var(--f-mono)">
              {g.l}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function BentoKpiList() {
  const rows = [
    { l: "ROI por práctica", v: "+24%", c: "good" },
    { l: "Dispersión convenios", v: "0.18σ", c: "neutral" },
    { l: "Costo unitario med.", v: "$ 412", c: "neutral" },
    { l: "Margen ponderado", v: "+19,2%", c: "good" },
  ];
  return (
    <div style={{ padding: "0 24px 24px", display: "flex", flexDirection: "column", gap: 6 }}>
      {rows.map((r, i) => (
        <div key={i} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "8px 12px", borderRadius: 10,
          background: "var(--bg)", border: "1px solid var(--border)",
        }}>
          <span style={{ fontSize: 12, color: "var(--ink-soft)" }}>{r.l}</span>
          <span className="mono" style={{
            fontSize: 12.5, fontWeight: 500,
            color: r.c === "good" ? "var(--accent-deep)" : "var(--ink)",
          }}>{r.v}</span>
        </div>
      ))}
    </div>
  );
}

function BentoTimeline() {
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
  return (
    <div style={{ padding: "0 24px 22px" }}>
      <div style={{ position: "relative", height: 60 }}>
        {/* Axis */}
        <div style={{
          position: "absolute", left: 0, right: 0, top: 26,
          height: 1, background: "var(--border)",
        }} />
        {/* Past markers */}
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{
            position: "absolute", top: 22, left: `${(i / 5) * 100}%`,
            width: 9, height: 9, borderRadius: "50%",
            background: "var(--accent-deep)", transform: "translateX(-50%)",
          }} />
        ))}
        {/* Now marker */}
        <div style={{
          position: "absolute", top: 18, left: `${(4 / 5) * 100}%`,
          width: 17, height: 17, borderRadius: "50%",
          background: "white", border: "3px solid var(--accent-deep)",
          transform: "translateX(-50%)",
          boxShadow: "0 0 0 4px oklch(0.94 0.04 148 / 0.6)",
        }} />
        {/* Future markers */}
        {[5].map((i) => (
          <div key={i} style={{
            position: "absolute", top: 22, left: `${(i / 5) * 100}%`,
            width: 9, height: 9, borderRadius: "50%",
            background: "var(--bg)", border: "2px dashed var(--accent-deep)",
            transform: "translateX(-50%)",
          }} />
        ))}
        {/* Labels */}
        {months.map((m, i) => (
          <div key={m} className="mono" style={{
            position: "absolute", top: 42, left: `${(i / 5) * 100}%`,
            transform: "translateX(-50%)",
            fontSize: 9.5, color: i === 4 ? "var(--accent-deep)" : "var(--muted)",
            fontWeight: i === 4 ? 600 : 400,
            letterSpacing: "0.05em",
          }}>{m}</div>
        ))}
      </div>
    </div>
  );
}

function BentoHub() {
  return (
    <div style={{ padding: "0 24px 18px", display: "grid", placeItems: "center", position: "relative" }}>
      <svg viewBox="0 0 240 110" width="100%" height="110">
        {/* Connecting lines */}
        {[[40, 25], [40, 85], [200, 25], [200, 85]].map(([x, y], i) => (
          <line key={i} x1="120" y1="55" x2={x} y2={y} stroke="oklch(0.78 0.08 148)" strokeWidth="1" strokeDasharray="2 3" opacity="0.7" />
        ))}
        {/* Outer dots */}
        {[[40, 25], [40, 85], [200, 25], [200, 85]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="14" fill="var(--bg)" stroke="var(--border)" />
            <text x={x} y={y + 3} textAnchor="middle" fontSize="9" fill="var(--muted)" fontFamily="var(--f-mono)">
              {["LIS", "ERP", "HIS", "API"][i]}
            </text>
          </g>
        ))}
        {/* Center */}
        <circle cx="120" cy="55" r="26" fill="var(--accent-deep)" />
        <circle cx="120" cy="55" r="34" fill="none" stroke="var(--accent-deep)" strokeWidth="1" opacity="0.25" />
        <circle cx="120" cy="55" r="42" fill="none" stroke="var(--accent-deep)" strokeWidth="1" opacity="0.12" />
        <text x="120" y="58" textAnchor="middle" fontSize="11" fill="white" fontFamily="var(--f-sans)" fontWeight="600">OC</text>
      </svg>
    </div>
  );
}

function BentoSupport({ lang }) {
  const msgs = lang === "en" ? [
    { who: "you", t: "How do I tag indirect costs?" },
    { who: "us",  t: "Here — let me show you in the platform." },
  ] : [
    { who: "you", t: "¿Cómo asigno los costos indirectos?" },
    { who: "us",  t: "Mirá, te lo muestro en la plataforma." },
  ];
  return (
    <div style={{ padding: "0 24px 22px", display: "flex", flexDirection: "column", gap: 6 }}>
      {msgs.map((m, i) => (
        <div key={i} style={{
          alignSelf: m.who === "you" ? "flex-end" : "flex-start",
          maxWidth: "82%",
          padding: "7px 12px",
          borderRadius: 14,
          fontSize: 12,
          background: m.who === "you" ? "var(--accent-deep)" : "var(--bg)",
          color: m.who === "you" ? "white" : "var(--ink)",
          border: m.who === "us" ? "1px solid var(--border)" : "none",
          lineHeight: 1.35,
        }}>
          {m.t}
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { Benefits });
