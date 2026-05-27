// cta.jsx + Footer
function CTA({ t }) {
  return (
    <section id="cta" className="section section-divider" style={{
      background: "oklch(0.16 0.02 250)",
      color: "oklch(0.94 0.005 95)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
          <span className="eyebrow" style={{ color: "var(--accent)" }}>{t.cta.eyebrow}</span>
          <h2 style={{
            fontSize: "clamp(40px, 5vw, 76px)", fontWeight: 500, lineHeight: 1.04,
            letterSpacing: "-0.025em", marginTop: 24, textWrap: "balance",
          }}>
            {t.cta.title_a}{" "}
            <span className="serif" style={{ color: "var(--accent)" }}>{t.cta.title_em}</span>
            {t.cta.title_b}
          </h2>
          <p style={{
            marginTop: 28, fontSize: 19, color: "oklch(0.78 0.012 250)",
            maxWidth: "44ch", marginInline: "auto", lineHeight: 1.5,
          }}>{t.cta.lede}</p>

          <div style={{ display: "flex", gap: 12, marginTop: 40, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://app.optacost.com/" className="btn btn-accent btn-lg">
              {t.cta.primary} <Icon.arrow />
            </a>
            <a href="https://api.whatsapp.com/send?phone=5492915067059" target="_blank" rel="noopener" className="btn btn-lg" style={{
              background: "transparent",
              border: "1px solid oklch(0.32 0.015 250)",
              color: "oklch(0.94 0.005 95)",
            }}>
              <Icon.whatsapp /> {t.cta.secondary}
            </a>
          </div>

          {/* Small details */}
          <div style={{
            marginTop: 56, display: "flex", justifyContent: "center", gap: 36, flexWrap: "wrap",
            fontSize: 13, color: "oklch(0.65 0.012 250)",
            fontFamily: "var(--f-mono)", letterSpacing: "0.04em",
          }}>
            <span><span className="live-dot" /> &nbsp; 99,98% uptime</span>
            <span>30 días gratis · sin tarjeta</span>
            <span>Onboarding incluido</span>
          </div>
        </div>
      </div>

      {/* Decorative big number */}
      <div style={{
        position: "absolute", bottom: -120, right: -40,
        fontFamily: "var(--f-mono)", fontSize: "min(36vw, 460px)", fontWeight: 500,
        color: "oklch(0.22 0.018 250)",
        letterSpacing: "-0.05em",
        lineHeight: 0.8,
        pointerEvents: "none",
        zIndex: 1,
      }}>
        +28%
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer style={{
      background: "oklch(0.13 0.02 250)",
      color: "oklch(0.78 0.012 250)",
      padding: "72px 0 32px",
    }}>
      <div className="container">
        {/* Top: brand + cols */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.4fr repeat(4, 1fr)",
          gap: 40, marginBottom: 56,
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "oklch(0.94 0.005 95)" }}>
              <Logo />
              <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>Optacost</span>
            </div>
            <div style={{ fontSize: 14, color: "oklch(0.65 0.012 250)", marginTop: 14, maxWidth: "30ch", lineHeight: 1.5 }}>
              {t.footer.tagline}
            </div>
            <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
              <a href="https://api.whatsapp.com/send?phone=5492915067059" className="btn btn-sm" style={{
                background: "var(--accent)", color: "white", border: 0,
              }}>
                <Icon.whatsapp /> +54 9 291 506 7059
              </a>
            </div>
          </div>

          {t.footer.cols.map((col, i) => (
            <div key={i}>
              <div className="mono" style={{
                fontSize: 11, color: "oklch(0.55 0.012 250)",
                letterSpacing: "0.1em", textTransform: "uppercase",
                marginBottom: 16,
              }}>{col.t}</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {col.l.map((l, j) => (
                  <li key={j}>
                    <a href="#" style={{ fontSize: 14, color: "oklch(0.82 0.012 250)" }}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: 28, borderTop: "1px solid oklch(0.22 0.018 250)",
          fontSize: 12.5, color: "oklch(0.55 0.012 250)",
          fontFamily: "var(--f-mono)", letterSpacing: "0.02em",
          flexWrap: "wrap", gap: 12,
        }}>
          <span>{t.footer.copy}</span>
          <span>{t.footer.built}</span>
        </div>

        {/* Super-bold wordmark */}
        <div style={{
          marginTop: 48,
          fontSize: "clamp(80px, 18vw, 280px)",
          fontWeight: 500,
          letterSpacing: "-0.06em",
          color: "oklch(0.18 0.02 250)",
          lineHeight: 0.85,
          textAlign: "center",
          fontFamily: "var(--f-sans)",
          userSelect: "none",
        }}>
          OPTACOST<span style={{ color: "var(--accent)" }}>.</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { CTA, Footer });
