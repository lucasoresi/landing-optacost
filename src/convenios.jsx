// convenios.jsx — análisis por convenios (sección visual rica)
function Convenios({ t }) {
  return (
    <section id="convenios" className="section section-divider" style={{
      background: "var(--bg-tint)",
    }}>
      <div className="container">
        <header style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end", marginBottom: 56 }}>
          <div>
            <span className="eyebrow">{t.convenios.eyebrow}</span>
            <h2 className="section-title" style={{ marginTop: 18 }}>
              {t.convenios.title_a} <em>{t.convenios.title_em}</em>
            </h2>
          </div>
          <p className="section-lede" style={{ marginTop: 0 }}>{t.convenios.lede}</p>
        </header>

        <div style={{
          background: "var(--bg)", border: "1px solid var(--border)",
          borderRadius: 18, padding: 28,
          boxShadow: "0 1px 0 oklch(1 0 0 / 0.7) inset, 0 24px 60px -28px oklch(0.18 0.018 250 / 0.16)",
        }}>
          <ConvenioMatrix t={t} />
        </div>
      </div>
    </section>
  );
}

function ConvenioMatrix({ t }) {
  // Filas: convenios, Columnas: meses (12)
  const months = ["E","F","M","A","M","J","J","A","S","O","N","D"];
  const convenios = [
    { name: "OSDE 410",   vals: [22,24,26,28,30,31,33,34,36,37,38,38], avg: 38 },
    { name: "Swiss SMG30",vals: [18,19,21,22,24,25,26,27,28,29,30,31], avg: 31 },
    { name: "Galeno Plata", vals: [12,14,16,17,19,20,21,22,23,23,24,24], avg: 24 },
    { name: "Medifé Plus", vals: [10,11,13,14,16,17,18,19,20,21,21,22], avg: 22 },
    { name: "Federada",  vals: [8,9,10,11,12,13,14,15,16,17,18,18], avg: 18 },
    { name: "PAMI Cap.", vals: [16,15,14,13,12,11,10,9,8,7,6,4], avg: 4 },
    { name: "IOMA Cap.", vals: [9,8,7,6,5,4,3,2,1,0,-1,-2], avg: -2 },
    { name: "OSPE Cap.", vals: [4,3,2,1,0,-1,-2,-3,-4,-5,-6,-7], avg: -7 },
  ];

  const cellColor = (v) => {
    if (v >= 25) return { bg: "oklch(0.75 0.16 148)", fg: "white" };
    if (v >= 15) return { bg: "oklch(0.85 0.11 148)", fg: "var(--accent-deep)" };
    if (v >= 5)  return { bg: "oklch(0.94 0.05 148)", fg: "var(--accent-deep)" };
    if (v >= 0)  return { bg: "oklch(0.93 0.05 90)",  fg: "oklch(0.45 0.1 70)" };
    if (v >= -5) return { bg: "oklch(0.88 0.08 50)",  fg: "white" };
    return                { bg: "oklch(0.65 0.18 25)", fg: "white" };
  };

  return (
    <div>
      {/* Legend + controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          {t.convenios.legend.map((l, i) => {
            const sw = l.c === "good" ? "oklch(0.75 0.16 148)" : l.c === "warn" ? "oklch(0.88 0.1 70)" : "oklch(0.65 0.18 25)";
            return (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12.5, color: "var(--ink-soft)" }}>
                <span style={{ width: 14, height: 14, borderRadius: 3, background: sw, display: "inline-block" }} />
                {l.l}
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <span className="tag green"><span className="live-dot" /> en vivo</span>
          <span className="tag">2026</span>
        </div>
      </div>

      {/* Matrix */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "minmax(140px, 1.3fr) repeat(12, 1fr) 70px",
        gap: 4,
        alignItems: "center",
      }}>
        {/* Header row */}
        <div className="mono" style={{ fontSize: 10.5, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>CONVENIO</div>
        {months.map((m, i) => (
          <div key={i} className="mono" style={{ fontSize: 10.5, color: "var(--muted)", textAlign: "center", letterSpacing: "0.04em" }}>{m}</div>
        ))}
        <div className="mono" style={{ fontSize: 10.5, color: "var(--muted)", letterSpacing: "0.06em", textAlign: "right" }}>AVG</div>

        {convenios.map((c, i) => (
          <React.Fragment key={c.name}>
            <div style={{ fontSize: 13.5, color: "var(--ink)", padding: "4px 0" }}>{c.name}</div>
            {c.vals.map((v, j) => {
              const cc = cellColor(v);
              return (
                <div key={j} title={`${c.name} · ${months[j]}: ${v >= 0 ? "+" : ""}${v}%`} style={{
                  aspectRatio: "1.05 / 1",
                  background: cc.bg, color: cc.fg,
                  borderRadius: 4, display: "grid", placeItems: "center",
                  fontFamily: "var(--f-mono)", fontSize: 10, fontWeight: 500,
                  cursor: "default",
                  transition: "transform .15s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.18)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  {v >= 0 ? v : v}
                </div>
              );
            })}
            <div className="mono" style={{
              textAlign: "right", padding: "4px 6px",
              fontSize: 13, fontWeight: 500,
              color: c.avg >= 15 ? "var(--accent-deep)" : c.avg >= 0 ? "oklch(0.45 0.1 70)" : "oklch(0.5 0.16 25)",
            }}>
              {c.avg >= 0 ? "+" : ""}{c.avg}%
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Footnote */}
      <div style={{ display: "flex", gap: 32, marginTop: 28, paddingTop: 20, borderTop: "1px solid var(--border)", flexWrap: "wrap" }}>
        <Footnote label="Convenios analizados" v="128" />
        <Footnote label="Margen ponderado" v="+ 19,2%" highlight />
        <Footnote label="Oportunidad de renegociación" v="$ 84.3M / año" />
        <Footnote label="Última actualización" v="hace 4 min" />
      </div>
    </div>
  );
}

function Footnote({ label, v, highlight }) {
  return (
    <div>
      <div className="mono" style={{ fontSize: 10.5, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
      <div className="mono" style={{ fontSize: 22, fontWeight: 500, marginTop: 4, color: highlight ? "var(--accent-deep)" : "var(--ink)", letterSpacing: "-0.02em" }}>{v}</div>
    </div>
  );
}

Object.assign(window, { Convenios });
