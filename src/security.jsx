// security.jsx
function Security({ t }) {
  return (
    <section id="security" className="section section-divider" style={{ background: "var(--bg-tint)" }}>
      <div className="container">
        <header className="sec-header" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end", marginBottom: 56 }}>
          <div>
            <span className="eyebrow">{t.security.eyebrow}</span>
            <h2 className="section-title" style={{ marginTop: 18 }}>
              {t.security.title_a} <em>{t.security.title_em}</em>
            </h2>
          </div>
          <p className="section-lede" style={{ marginTop: 0 }}>{t.security.lede}</p>
        </header>

        <div className="grid grid-3" style={{ gap: 14 }}>
          {t.security.items.map((it, i) => (
            <div key={i} style={{
              padding: "26px 26px 24px",
              border: "1px solid var(--border)",
              borderRadius: 14,
              background: "var(--bg)",
              display: "flex", flexDirection: "column", gap: 12,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: "var(--accent-tint-2)", color: "var(--accent-deep)",
                  display: "grid", placeItems: "center",
                }}>
                  <Icon.check />
                </span>
                <span className="mono" style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.015em" }}>{it.t}</div>
              <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>{it.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Security });
