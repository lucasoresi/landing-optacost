// pricing.jsx
function Pricing({ t }) {
  const [annual, setAnnual] = React.useState(true);

  return (
    <section id="pricing" className="section section-divider">
      <div className="container">
        <header className="sec-header" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end", marginBottom: 56 }}>
          <div>
            <span className="eyebrow">{t.pricing.eyebrow}</span>
            <h2 className="section-title" style={{ marginTop: 18 }}>
              {t.pricing.title_a} <em>{t.pricing.title_em}</em>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 18 }}>
            <p className="section-lede" style={{ marginTop: 0 }}>{t.pricing.lede}</p>

            <div style={{
              display: "inline-flex", padding: 3, borderRadius: 999,
              background: "var(--bg-tint)", border: "1px solid var(--border)",
              fontSize: 13, gap: 2,
            }}>
              <button onClick={() => setAnnual(false)} style={{
                appearance: "none", border: "none", padding: "8px 16px", borderRadius: 999,
                background: !annual ? "var(--ink)" : "transparent",
                color: !annual ? "var(--bg)" : "var(--ink-soft)",
                fontWeight: 500, fontSize: 13,
              }}>{t.pricing.monthly}</button>
              <button onClick={() => setAnnual(true)} style={{
                appearance: "none", border: "none", padding: "8px 16px", borderRadius: 999,
                background: annual ? "var(--ink)" : "transparent",
                color: annual ? "var(--bg)" : "var(--ink-soft)",
                fontWeight: 500, fontSize: 13,
                display: "flex", gap: 8, alignItems: "center",
              }}>
                {t.pricing.annual}
                {annual && <span className="tag green" style={{ background: "var(--accent)", color: "white", borderColor: "transparent", fontSize: 10 }}>−16%</span>}
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-3" style={{ gap: 14 }}>
          {t.pricing.plans.map((p, i) => (
            <PricingCard key={i} plan={p} annual={annual} />
          ))}
        </div>

        <div style={{
          marginTop: 36, display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px 26px", border: "1px dashed var(--border-strong)", borderRadius: 14,
          fontSize: 13.5, color: "var(--ink-soft)", flexWrap: "wrap", gap: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Icon.spark style={{ color: "var(--accent-deep)" }} />
            <span>Todos los planes incluyen <b style={{ color: "var(--ink)" }}>30 días de prueba</b>, sin tarjeta. {t.pricing.save}.</span>
          </div>
          <a href="#cta" className="btn btn-ghost btn-sm">Hablar con ventas <Icon.arrow /></a>
        </div>
      </div>
    </section>
  );
}

function PricingCard({ plan, annual }) {
  // Aproximación visual: si annual aplicamos -16%
  const display = (() => {
    if (plan.price.startsWith("USD")) {
      const n = parseInt(plan.price.replace(/[^0-9]/g, ""), 10);
      const v = annual ? Math.round(n * 0.84) : n;
      return `USD ${v.toLocaleString("en-US")}`;
    }
    return plan.price;
  })();

  return (
    <div style={{
      padding: 32,
      borderRadius: 18,
      border: plan.highlight ? "1px solid var(--ink)" : "1px solid var(--border)",
      background: plan.highlight ? "var(--ink)" : "var(--bg)",
      color: plan.highlight ? "var(--bg)" : "var(--ink)",
      display: "flex", flexDirection: "column", gap: 18,
      position: "relative",
      minHeight: 480,
      boxShadow: plan.highlight ? "0 30px 80px -30px oklch(0.18 0.018 250 / 0.4)" : "none",
    }}>
      {plan.highlight && (
        <span className="mono" style={{
          position: "absolute", top: 18, right: 22,
          fontSize: 10.5, color: "var(--accent)",
          letterSpacing: "0.1em", textTransform: "uppercase",
          display: "inline-flex", alignItems: "center", gap: 6,
        }}>
          <Icon.spark /> Recomendado
        </span>
      )}

      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: plan.highlight ? "var(--accent)" : "var(--accent-deep)", letterSpacing: "0.02em" }}>
          {plan.name}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 12 }}>
          <span className="mono" style={{ fontSize: 38, fontWeight: 500, letterSpacing: "-0.03em" }}>{display}</span>
          <span style={{ fontSize: 13, color: plan.highlight ? "oklch(0.7 0.012 250)" : "var(--muted)" }}>{plan.per}</span>
        </div>
        <div style={{
          fontSize: 13.5, color: plan.highlight ? "oklch(0.78 0.012 250)" : "var(--muted)",
          marginTop: 12, lineHeight: 1.5, maxWidth: "32ch",
        }}>
          {plan.desc}
        </div>
      </div>

      <hr style={{ border: 0, borderTop: `1px solid ${plan.highlight ? "oklch(0.3 0.015 250)" : "var(--border)"}` }} />

      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
        {plan.features.map((f, i) => (
          <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", color: plan.highlight ? "oklch(0.92 0.005 95)" : "var(--ink-soft)" }}>
            <span style={{
              width: 16, height: 16, borderRadius: "50%",
              background: plan.highlight ? "var(--accent)" : "var(--accent-tint-2)",
              color: plan.highlight ? "var(--ink)" : "var(--accent-deep)",
              display: "grid", placeItems: "center", flexShrink: 0, marginTop: 2,
            }}>
              <Icon.check style={{ width: 10, height: 10 }} />
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div style={{ flex: 1 }} />

      <a href="#cta" className={`btn ${plan.highlight ? "btn-accent" : "btn-ghost"} btn-lg`} style={{ justifyContent: "center" }}>
        {plan.cta} <Icon.arrow />
      </a>
    </div>
  );
}

Object.assign(window, { Pricing });
