// dashboard.jsx — mocks reusables que imitan la app real
const fmt = (n) => n.toLocaleString("es-AR");

// ── Sidebar mini ──
function MockSidebar({ active = "home" }) {
  const items = [
    { k: "home", label: "Home" },
    { k: "deriv", label: "Derivaciones", open: active === "deriv" },
    { k: "obras", label: "Obras sociales", open: active === "obras" },
    { k: "pract", label: "Prácticas" },
    { k: "insum", label: "Insumos" },
    { k: "costos", label: "Costos extra" },
    { k: "fact", label: "Facturación", open: active === "facturacion" },
    { k: "ind", label: "Costos indirectos" },
  ];
  return (
    <div style={{
      width: 180, borderRight: "1px solid var(--border)", padding: "14px 10px",
      fontSize: 12.5, color: "var(--ink-soft)", background: "var(--bg)",
      display: "flex", flexDirection: "column", gap: 2,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 8px 14px", borderBottom: "1px solid var(--border)", marginBottom: 8 }}>
        <div style={{ width: 26, height: 26, borderRadius: 6, background: "var(--ink)", color: "var(--bg)", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 600 }}>N</div>
        <div>
          <div style={{ fontWeight: 600, color: "var(--ink)", fontSize: 12 }}>Nanni Labs</div>
          <div style={{ fontSize: 10, color: "var(--muted)" }}>Costos y márgenes</div>
        </div>
      </div>
      <div style={{ fontSize: 9.5, color: "var(--muted)", letterSpacing: "0.05em", textTransform: "uppercase", padding: "6px 8px 4px" }}>Optacost 3.12</div>
      {items.map((it) => (
        <div key={it.k} style={{
          padding: "6px 8px", borderRadius: 6,
          background: active === it.k ? "var(--bg-tint)" : "transparent",
          color: active === it.k ? "var(--ink)" : "var(--ink-soft)",
          fontWeight: active === it.k ? 500 : 400,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ width: 14, height: 14, borderRadius: 3, background: "var(--bg-deep)", display: "inline-block" }} />
          <span style={{ flex: 1 }}>{it.label}</span>
          {it.open && <Icon.arrowDown style={{ opacity: 0.6 }} />}
        </div>
      ))}
    </div>
  );
}

// ── KPI grid (home / facturación) ──
function KPIGrid({ kind = "home" }) {
  if (kind === "home") {
    return (
      <>
        <div className="kpi-card amber">
          <div className="lbl"><span>Insumos bajo stock</span><span className="icon"><Icon.alert /></span></div>
          <div className="val">41</div>
          <div className="sub">activos con bajo stock</div>
        </div>
        <div className="kpi-card green">
          <div className="lbl"><span>Margen del mes</span><span className="icon"><Icon.trend /></span></div>
          <div className="val">+ 18,4 %</div>
          <div className="sub">vs. mes anterior</div>
        </div>
        <div className="kpi-card blue">
          <div className="lbl"><span>Prácticas analizadas</span><span className="icon"><Icon.hash /></span></div>
          <div className="val">293.007</div>
          <div className="sub">en lo que va de 2026</div>
        </div>
      </>
    );
  }
  // facturación
  return (
    <>
      <div className="kpi-card green">
        <div className="lbl"><span>Bruto total</span><span className="icon"><Icon.dollar /></span></div>
        <div className="val">$ 13.870.716.306</div>
        <div className="sub">Facturado + ventanilla</div>
      </div>
      <div className="kpi-card green">
        <div className="lbl"><span>Bruto facturado</span><span className="icon"><Icon.dollar /></span></div>
        <div className="val">$ 11.145.034.135</div>
        <div className="sub">Sin deducciones</div>
      </div>
      <div className="kpi-card amber">
        <div className="lbl"><span>Costo total</span><span className="icon"><Icon.dollar /></span></div>
        <div className="val">$ 3.500.286.037</div>
        <div className="sub">Acumulado del período</div>
      </div>
      <div className="kpi-card green">
        <div className="lbl"><span>Margen total</span><span className="icon"><Icon.trend /></span></div>
        <div className="val">$ 10.370.430.269</div>
        <div className="sub">+ 24,7 % vs. trim. anterior</div>
      </div>
    </>
  );
}

// ── Tabla de prácticas (mini) ──
function MockTable({ rows = 5, lang = "es" }) {
  const data = [
    { code: "P85800", name: "17 OH PROGESTERONA", margin: 28, date: "26/05/2026" },
    { code: "P99971", name: "17 OH PROGESTERONA (CON EXTRACCION)", margin: 40, date: "26/05/2026" },
    { code: "P77511", name: "17 OH PROGESTERONA NEONATAL", margin: 23, date: "26/05/2026" },
    { code: "P07029", name: "5 NUCLEOTIDASA (5 N)", margin: 39, date: "26/05/2026" },
    { code: "P10767", name: "7-DEHIDROCOLESTEROL [SUERO]", margin: 80, date: "26/05/2026" },
    { code: "P00112", name: "ALFA-1 ANTITRIPSINA", margin: 11, date: "25/05/2026" },
  ].slice(0, rows);
  const colTags = {
    es: ["Código", "Práctica", "Margen", "Últ. actualización"],
    en: ["Code", "Test", "Margin", "Last update"],
  }[lang] || ["Código", "Práctica", "Margen", "Últ. actualización"];

  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", background: "var(--bg)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "70px 1fr 70px 110px", padding: "10px 14px", fontSize: 11, color: "var(--muted)", borderBottom: "1px solid var(--border)", background: "var(--bg-tint)", fontWeight: 500 }}>
        {colTags.map((c) => <span key={c}>{c} ↕</span>)}
      </div>
      {data.map((r, i) => (
        <div key={r.code} style={{
          display: "grid", gridTemplateColumns: "70px 1fr 70px 110px",
          padding: "11px 14px", fontSize: 12.5,
          borderBottom: i < data.length - 1 ? "1px solid var(--border)" : "none",
          alignItems: "center",
        }}>
          <span className="mono" style={{ color: "var(--ink-soft)" }}>{r.code}</span>
          <span style={{ color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.name}</span>
          <span>
            <span className={`tag ${r.margin >= 30 ? "green" : r.margin >= 20 ? "amber" : "amber"}`} style={{ fontSize: 11 }}>
              {r.margin}%
            </span>
          </span>
          <span className="mono" style={{ color: "var(--muted)", fontSize: 11 }}>{r.date}</span>
        </div>
      ))}
    </div>
  );
}

// ── Chart line (margen en el tiempo) ──
function ChartLine({ height = 140 }) {
  // Coords de un grafico margen evolution
  const pts = [
    [0, 90], [30, 80], [60, 95], [90, 60], [120, 65], [150, 40],
    [180, 50], [210, 30], [240, 38], [270, 22], [300, 28], [330, 14], [360, 18],
  ];
  const path = "M " + pts.map(([x, y]) => `${x} ${y}`).join(" L ");
  const area = path + ` L 360 ${height} L 0 ${height} Z`;
  return (
    <svg viewBox={`0 0 360 ${height}`} width="100%" height={height} preserveAspectRatio="none">
      <defs>
        <linearGradient id="gAcc" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%"  stopColor="var(--accent)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* gridlines */}
      {[30, 70, 110].map((y) => (
        <line key={y} x1="0" x2="360" y1={y} y2={y} stroke="var(--border)" strokeDasharray="2 4" />
      ))}
      <path d={area} fill="url(#gAcc)" />
      <path d={path} fill="none" stroke="var(--accent-deep)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="chart-path" />
      {pts.filter((_, i) => i % 3 === 0).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="var(--accent-deep)" />
      ))}
    </svg>
  );
}

// ── Bar chart (convenios) ──
function ChartBars({ data, height = 200 }) {
  const max = Math.max(...data.map((d) => Math.abs(d.v)));
  const w = 360, gap = 8;
  const bw = (w - gap * (data.length - 1)) / data.length;
  return (
    <svg viewBox={`0 0 ${w} ${height}`} width="100%" height={height}>
      <line x1="0" x2={w} y1={height / 2} y2={height / 2} stroke="var(--border)" strokeDasharray="2 4" />
      {data.map((d, i) => {
        const x = i * (bw + gap);
        const h = (Math.abs(d.v) / max) * (height / 2 - 14);
        const y = d.v >= 0 ? height / 2 - h : height / 2;
        const fill = d.v >= 0
          ? (d.v / max > 0.6 ? "var(--accent-deep)" : "var(--accent)")
          : "oklch(0.7 0.13 25)";
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={h} fill={fill} rx="2">
              <animate attributeName="height" from="0" to={h} dur="0.8s" fill="freeze" />
              <animate attributeName="y" from={height / 2} to={y} dur="0.8s" fill="freeze" />
            </rect>
            <text x={x + bw / 2} y={height - 4} textAnchor="middle" fontSize="9" fill="var(--muted)" fontFamily="var(--f-mono)">
              {d.l}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Donut ──
function ChartDonut({ value = 68 }) {
  const r = 44, c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <svg viewBox="0 0 120 120" width="140" height="140">
      <circle cx="60" cy="60" r={r} fill="none" stroke="var(--bg-deep)" strokeWidth="10" />
      <circle cx="60" cy="60" r={r} fill="none" stroke="var(--accent)" strokeWidth="10"
              strokeDasharray={`${dash} ${c}`} strokeDashoffset="0" strokeLinecap="round"
              transform="rotate(-90 60 60)">
        <animate attributeName="stroke-dasharray" from={`0 ${c}`} to={`${dash} ${c}`} dur="1.2s" fill="freeze" />
      </circle>
      <text x="60" y="64" textAnchor="middle" fontSize="22" fill="var(--ink)" fontFamily="var(--f-mono)" fontWeight="500">{value}%</text>
      <text x="60" y="82" textAnchor="middle" fontSize="8" fill="var(--muted)" fontFamily="var(--f-mono)" letterSpacing="0.1em">UB COVERAGE</text>
    </svg>
  );
}

// ── Mock browser chrome wrapper ──
function MockChrome({ url = "nanni.app.optacost.com/dashboard", children, style }) {
  return (
    <div className="mock" style={style}>
      <div className="mock-chrome">
        <div className="dots"><i/><i/><i/></div>
        <div className="url">{url}</div>
        <div style={{ width: 30 }} />
      </div>
      {children}
    </div>
  );
}

Object.assign(window, {
  MockSidebar, KPIGrid, MockTable, ChartLine, ChartBars, ChartDonut, MockChrome, fmt,
});
