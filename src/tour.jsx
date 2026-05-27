// tour.jsx — Tour interactivo del producto
function Tour({ t }) {
  const [active, setActive] = React.useState(0);
  const steps = t.tour.steps;
  const step = steps[active];

  // Auto-advance suave
  React.useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % steps.length);
    }, 6500);
    return () => clearInterval(id);
  }, [steps.length]);

  return (
    <section id="tour" className="section section-divider">
      <div className="container">
        <header style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end", marginBottom: 56 }}>
          <div>
            <span className="eyebrow">{t.tour.eyebrow}</span>
            <h2 className="section-title" style={{ marginTop: 18 }}>
              {t.tour.title_a} <em>{t.tour.title_em}</em>
            </h2>
          </div>
          <p className="section-lede" style={{ marginTop: 0 }}>{t.tour.lede}</p>
        </header>

        <div style={{
          display: "grid",
          gridTemplateColumns: "360px 1fr",
          gap: 32,
          alignItems: "start",
        }}>
          {/* Steps list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {steps.map((s, i) => (
              <TourStep
                key={i}
                step={s}
                active={i === active}
                onClick={() => setActive(i)}
                progress={i === active}
              />
            ))}

            <div style={{
              marginTop: 18, padding: "16px 18px",
              border: "1px solid var(--border)", borderRadius: 12,
              background: "var(--bg-tint)",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div className="live-dot" />
              <div style={{ flex: 1, fontSize: 12.5, color: "var(--ink-soft)" }}>
                Demo en vivo · {active + 1} / {steps.length}
              </div>
              <button
                onClick={() => setActive((a) => (a + 1) % steps.length)}
                className="btn btn-ghost btn-sm" style={{ padding: "6px 10px", borderRadius: 999 }}
              >
                <Icon.arrow />
              </button>
            </div>
          </div>

          {/* Mock area */}
          <TourMock stepKey={step.k} />
        </div>
      </div>
    </section>
  );
}

function TourStep({ step, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      appearance: "none", border: "none",
      textAlign: "left",
      padding: "20px 22px",
      borderRadius: 14,
      background: active ? "var(--ink)" : "transparent",
      color: active ? "var(--bg)" : "var(--ink)",
      transition: "all .25s ease",
      cursor: "pointer",
      borderLeft: active ? "none" : "1px solid var(--border)",
      borderRight: active ? "none" : "1px solid var(--border)",
      borderTop: active ? "none" : "1px solid var(--border)",
      borderBottom: active ? "none" : "1px solid var(--border)",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 14, marginBottom: 6,
      }}>
        <span className="mono" style={{
          fontSize: 11,
          color: active ? "var(--accent)" : "var(--muted)",
          letterSpacing: "0.08em",
        }}>{step.n}</span>
        <span style={{
          flex: 1, fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em",
        }}>{step.t}</span>
        {active && <Icon.arrow style={{ color: "var(--accent)" }} />}
      </div>
      <div style={{
        fontSize: 13.5, lineHeight: 1.5,
        color: active ? "oklch(0.78 0.012 250)" : "var(--muted)",
        paddingLeft: 32,
      }}>{step.d}</div>
    </button>
  );
}

function TourMock({ stepKey }) {
  return (
    <div style={{ position: "relative" }}>
      <MockChrome url={`nanni.app.optacost.com/${stepKey === "home" ? "dashboard" : stepKey === "facturacion" ? "reports/general" : stepKey === "obras" ? "os" : "decisions"}`}>
        <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", minHeight: 540 }}>
          <MockSidebar active={stepKey === "decision" ? "fact" : stepKey} />
          <div key={stepKey} style={{ animation: "rise .5s ease-out both" }}>
            {stepKey === "home"        && <ScreenHome />}
            {stepKey === "facturacion" && <ScreenFact />}
            {stepKey === "obras"       && <ScreenObras />}
            {stepKey === "decision"    && <ScreenDecision />}
          </div>
        </div>
      </MockChrome>
    </div>
  );
}

function ScreenHome() {
  return (
    <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <div style={{ fontSize: 12, color: "var(--muted)" }}>Home</div>
        <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-0.02em", marginTop: 4 }}>Actividades</div>
      </div>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 18px", borderRadius: 10,
        background: "var(--warn-tint)", border: "1px solid oklch(0.85 0.06 90)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "oklch(0.5 0.13 70)" }}><Icon.alert /></span>
          <span style={{ fontSize: 14 }}>Existen <b>41</b> insumos activos con bajo stock.</span>
        </div>
        <a style={{ color: "var(--accent-deep)", fontSize: 13, fontWeight: 500, display: "flex", gap: 4, alignItems: "center" }}>
          Ver insumos <Icon.arrow />
        </a>
      </div>

      <div className="grid grid-3" style={{ gap: 12 }}>
        <KPIGrid kind="home" />
      </div>

      <div>
        <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 10 }}>Prácticas desactualizadas</div>
        <MockTable rows={5} />
      </div>
    </div>
  );
}

function ScreenFact() {
  return (
    <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--muted)" }}>
        <span>Facturación</span><Icon.arrow style={{ opacity: 0.4 }} />
        <span style={{ color: "var(--ink)", fontWeight: 500 }}>Informe por sede</span>
        <span style={{ flex: 1 }} />
        <span className="tag green"><span className="live-dot" /> 14:25</span>
      </div>

      <div>
        <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>Análisis por sede</div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Costos y márgenes sobre facturaciones</div>
      </div>

      <div className="grid grid-3" style={{ gap: 12 }}>
        <KPIGrid kind="facturacion" />
      </div>

      <div style={{
        border: "1px solid var(--border)", borderRadius: 10, padding: 16, background: "var(--bg)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 500 }}>Top 10 prácticas por bruto facturado</span>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="tag"><Icon.filter /> Filtros</span>
            <span className="tag">Exportar</span>
          </div>
        </div>
        <MockTable rows={4} />
      </div>
    </div>
  );
}

function ScreenObras() {
  return (
    <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>Valores UB por obra social</div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Unidad bioquímica · PASTELEROS</div>
        </div>
        <span style={{ flex: 1 }} />
        <button className="btn btn-ghost btn-sm">Actualizar</button>
      </div>

      <div className="grid grid-2" style={{ gap: 14 }}>
        <div style={{ padding: 22, border: "1px solid var(--border)", borderRadius: 12, background: "var(--bg)" }}>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>Precio UB</div>
          <div className="mono" style={{ fontSize: 46, fontWeight: 500, letterSpacing: "-0.03em", marginTop: 12 }}>
            $ 1.232<span style={{ color: "var(--muted)" }}>,24</span>
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>Pesos / UB</div>
          <hr className="rule" style={{ margin: "18px 0" }} />
          <div className="tag green" style={{ fontSize: 11 }}>+ 12,4% vs. mes anterior</div>
        </div>
        <div style={{ padding: 22, border: "1px solid var(--border)", borderRadius: 12, background: "var(--bg)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 500 }}>Evolución UB</span>
            <span className="tag" style={{ fontSize: 10 }}>25 may 2025 — 26 may 2026</span>
          </div>
          <ChartLine height={140} />
        </div>
      </div>

      <div style={{ border: "1px solid var(--border)", borderRadius: 10, padding: 16, background: "var(--bg)" }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10 }}>Aranceles por convenio</div>
        <ConvenioRows />
      </div>
    </div>
  );
}

function ConvenioRows() {
  const rows = [
    { name: "OSDE 410", margin: 38, vol: "12.408" },
    { name: "Swiss Medical SMG30", margin: 31, vol: "8.214" },
    { name: "Galeno Plata", margin: 24, vol: "5.872" },
    { name: "PAMI Capital", margin: 14, vol: "21.103" },
    { name: "OSPE Capital", margin: -3, vol: "1.948" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {rows.map((r) => (
        <div key={r.name} style={{
          display: "grid", gridTemplateColumns: "1fr 100px 90px",
          alignItems: "center", padding: "10px 6px",
          fontSize: 13, borderBottom: "1px solid var(--border)",
        }}>
          <span>{r.name}</span>
          <span className="mono" style={{ color: "var(--muted)", fontSize: 12 }}>{r.vol}</span>
          <span style={{ textAlign: "right" }}>
            <span className={`tag ${r.margin >= 30 ? "green" : r.margin >= 10 ? "amber" : "amber"}`} style={{ fontSize: 11 }}>
              {r.margin >= 0 ? "+" : ""}{r.margin}%
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

function ScreenDecision() {
  return (
    <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
      <div>
        <div style={{ fontSize: 12, color: "var(--muted)" }}>Decisiones</div>
        <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em", marginTop: 4 }}>
          Recomendaciones del mes
        </div>
      </div>

      <div className="grid grid-2" style={{ gap: 14 }}>
        <div style={{ padding: 22, border: "1px solid var(--border)", borderRadius: 12, background: "var(--bg)" }}>
          <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>Cobertura UB sobre convenios</div>
          <div style={{ display: "grid", placeItems: "center", padding: "12px 0" }}>
            <ChartDonut value={68} />
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)", textAlign: "center" }}>
            68% de tus convenios cubren el valor real de la UB
          </div>
        </div>
        <div style={{ padding: 22, border: "1px solid var(--border)", borderRadius: 12, background: "var(--bg)" }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>Acciones sugeridas</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { tag: "Renegociar", t: "PAMI Capital · margen -3%", c: "amber" },
              { tag: "Ajustar precio", t: "OSPE Cap. · UB cubierta 41%", c: "amber" },
              { tag: "Escalar", t: "OSDE 410 · margen +38%", c: "green" },
              { tag: "Revisar costo", t: "Insumo BAC-RVO-CHR · costo +24%", c: "amber" },
            ].map((it, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 8,
                border: "1px solid var(--border)",
              }}>
                <span className={`tag ${it.c}`} style={{ fontSize: 10 }}>{it.tag}</span>
                <span style={{ fontSize: 13 }}>{it.t}</span>
                <span style={{ flex: 1 }} />
                <Icon.arrow style={{ opacity: 0.5 }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        padding: "18px 22px", borderRadius: 12,
        background: "var(--accent-tint-2)", border: "1px solid oklch(0.85 0.05 148)",
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <Icon.spark style={{ color: "var(--accent-deep)" }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--accent-deep)" }}>Impacto potencial estimado</div>
          <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>
            Aplicando las 4 acciones sugeridas: <b className="mono">+ $ 84.3M</b> en margen anual.
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Tour });
