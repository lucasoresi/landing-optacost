// hero.jsx — Apple-style centered hero with dashboard front & center
function Hero({ t, lang = "es", dark = false }) {
  return (
    <section id="home" className={"hero" + (dark ? " dark" : "")} style={{
      paddingTop: 24,
      paddingBottom: 0,
      position: "relative",
      overflow: "hidden",
    }}>
      <div className="container" style={{ textAlign: "center" }}>

        {/* Pill announcement */}
        <a
          href="#tour"
          className="rise rise-1"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "6px 6px 6px 14px",
            borderRadius: 999,
            background: "color-mix(in oklch, var(--bg) 50%, var(--bg-tint))",
            border: "1px solid var(--border)",
            fontSize: 13,
            color: "var(--ink-soft)",
            marginTop: 40,
            marginBottom: 40,
            transition: "all .2s ease",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-strong)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
        >
          <span style={{
            background: "var(--accent)",
            color: "white",
            fontSize: 10.5,
            fontWeight: 600,
            padding: "3px 9px",
            borderRadius: 999,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            fontFamily: "var(--f-mono)",
          }}>3.12</span>
          <span>Análisis inteligente por convenios — disponible ahora</span>
          <Icon.arrow style={{ opacity: 0.5, marginRight: 6 }} />
        </a>

        {/* Headline */}
        <h1 className="rise rise-2" style={{
          fontSize: "clamp(32px, 6.4vw, 96px)",
          lineHeight: 1.02,
          letterSpacing: "-0.035em",
          fontWeight: 600,
          maxWidth: "18ch",
          margin: "0 auto",
          textWrap: "balance",
          color: "var(--ink)",
        }}>
          {t.hero.title_a}
          <br />
          <span style={{ color: "var(--ink-soft)", fontWeight: 500 }}>{t.hero.title_b}</span>
        </h1>

        {/* Lede */}
        <p className="rise rise-3" style={{
          marginTop: 28,
          marginInline: "auto",
          fontSize: "clamp(17px, 1.35vw, 21px)",
          color: "var(--muted)",
          maxWidth: "58ch",
          textWrap: "pretty",
          fontWeight: 400,
          letterSpacing: "-0.005em",
          lineHeight: 1.45,
        }}>
          {t.hero.lede}
        </p>

        {/* CTAs */}
        <div className="rise rise-3" style={{
          display: "flex", gap: 10, marginTop: 36,
          justifyContent: "center", alignItems: "center", flexWrap: "wrap",
        }}>
          <a href="#tour" className="btn btn-primary btn-lg" style={{ borderRadius: 999 }}>
            {t.hero.cta_primary} <Icon.arrow />
          </a>
          <a href="https://api.whatsapp.com/send?phone=5492915067059" target="_blank" rel="noopener" className="btn btn-ghost btn-lg" style={{ borderRadius: 999 }}>
            <Icon.whatsapp /> {t.hero.cta_secondary}
          </a>
        </div>

        {/* Live indicator */}
        <div className="rise rise-4" style={{
          marginTop: 28,
          display: "inline-flex", alignItems: "center", gap: 8,
          fontSize: 12.5, color: "var(--muted)",
          fontFamily: "var(--f-mono)", letterSpacing: "0.01em",
        }}>
          <span className="live-dot" />
          {t.hero.live}
        </div>

        {/* Big dashboard front & center */}
        <div className="rise rise-4" style={{
          marginTop: 64,
          position: "relative",
          paddingBottom: 120,
        }}>
          <HeroDashboard />

          {/* Floating accent KPI card */}
          <FloatingKPI
            label={lang === "en" ? "Margin discovered" : "Margen descubierto"}
            value="+ $ 84,3 M"
            sub={lang === "en" ? "this quarter" : "este trimestre"}
            style={{ top: 36, left: -56 }}
          />
          <FloatingKPI
            label={lang === "en" ? "Real-time" : "Tiempo real"}
            value="14:25"
            sub={lang === "en" ? "last updated" : "última act."}
            mono
            style={{ top: 240, right: -48 }}
          />
        </div>
      </div>

      {/* Subtle background tint */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: -1,
        background: "radial-gradient(ellipse 80% 50% at 50% 0%, var(--accent-tint-2), transparent 60%)",
        opacity: 0.7,
      }} />
    </section>
  );
}

function FloatingKPI({ label, value, sub, mono, style }) {
  return (
    <div className="floating-kpi" style={{
      position: "absolute",
      padding: "14px 18px",
      background: "var(--bg)",
      border: "1px solid var(--border)",
      borderRadius: 14,
      textAlign: "left",
      boxShadow: "0 16px 40px -20px oklch(0.18 0.018 250 / 0.25), 0 2px 6px oklch(0.18 0.018 250 / 0.04)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      zIndex: 4,
      animation: "rise .8s ease-out .6s both",
      ...style,
    }}>
      <div style={{ fontSize: 10.5, color: "var(--muted)", fontFamily: "var(--f-mono)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
        {label}
      </div>
      <div style={{
        fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em",
        color: "var(--ink)",
        fontFamily: mono ? "var(--f-mono)" : "var(--f-sans)",
        fontVariantNumeric: "tabular-nums",
      }}>
        {value}
      </div>
      <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 2 }}>{sub}</div>
    </div>
  );
}

function HeroDashboard() {
  return (
    <div style={{ borderRadius: 22, overflow: "hidden",
      boxShadow: "0 60px 120px -40px oklch(0.18 0.018 250 / 0.28), 0 16px 40px -20px oklch(0.18 0.018 250 / 0.12)",
      border: "1px solid var(--border)",
      background: "var(--bg)",
    }}>
      <div className="mock-chrome" style={{ borderRadius: 0 }}>
        <div className="dots"><i /><i /><i /></div>
        <div className="url">nanni.app.optacost.com/reports/general</div>
        <div style={{ width: 30 }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", minHeight: 540, textAlign: "left" }}>
        <MockSidebar active="facturacion" />

        <div style={{ padding: "26px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--muted)" }}>
            <Icon.home />
            <span>Facturación</span>
            <Icon.arrow style={{ opacity: 0.4 }} />
            <span style={{ color: "var(--ink)", fontWeight: 500 }}>Informe por sede</span>
            <span style={{ flex: 1 }} />
            <span className="tag green"><span className="live-dot" /> Actualizado 14:25</span>
          </div>

          {/* Title */}
          <div>
            <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.025em" }}>Análisis por sede</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>Costos y márgenes sobre facturaciones por sede</div>
          </div>

          {/* KPI grid */}
          <div className="grid grid-3" style={{ gap: 12 }}>
            <KPIGrid kind="facturacion" />
          </div>

          {/* Mini chart + table */}
          <div className="grid grid-2" style={{ gap: 14 }}>
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 16, background: "var(--bg)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 12.5, fontWeight: 500 }}>Margen últimos 12 meses</span>
                <span className="tag green">+ 24,7%</span>
              </div>
              <ChartLine height={120} />
            </div>
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 16, background: "var(--bg)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 12.5, fontWeight: 500 }}>Dispersión por convenio</span>
                <span className="tag">Top 8</span>
              </div>
              <ChartBars height={120} data={[
                { v: 38, l: "OSDE" },
                { v: 24, l: "Swiss" },
                { v: 16, l: "Galen" },
                { v: 9, l: "PAMI" },
                { v: 4, l: "IOMA" },
                { v: -3, l: "OSPE" },
                { v: -8, l: "OSEC" },
                { v: -14, l: "OSPL" },
              ]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Hero });
