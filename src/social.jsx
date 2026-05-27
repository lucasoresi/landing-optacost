// social.jsx — testimonios + logos
function Social({ t, showLogos = true }) {
  return (
    <section id="social" className="section section-divider">
      <div className="container">
        <header style={{ marginBottom: 56 }}>
          <span className="eyebrow">{t.social.eyebrow}</span>
          <h2 className="section-title" style={{ marginTop: 18, maxWidth: "28ch" }}>
            {t.social.title_a} <em>{t.social.title_em}</em>
          </h2>
        </header>

        {/* Quotes */}
        <div className="grid grid-2" style={{ gap: 18 }}>
          {t.social.quotes.map((q, i) => (
            <figure key={i} style={{
              padding: "36px 36px 30px",
              border: "1px solid var(--border)",
              borderRadius: 18,
              background: i === 0 ? "var(--bg-tint)" : "var(--bg)",
              display: "flex", flexDirection: "column", gap: 24,
              position: "relative",
              overflow: "hidden",
            }}>
              <span className="serif" style={{
                position: "absolute", top: -20, right: 26,
                fontSize: 160, color: "var(--accent-tint)",
                lineHeight: 1,
                pointerEvents: "none",
              }}>"</span>

              <blockquote style={{
                fontSize: 20, fontWeight: 400, lineHeight: 1.4,
                letterSpacing: "-0.01em", color: "var(--ink)",
                textWrap: "pretty", maxWidth: "44ch",
                position: "relative",
              }}>
                <span className="serif" style={{ color: "var(--accent-deep)", marginRight: 4 }}>"</span>
                {q.q}
                <span className="serif" style={{ color: "var(--accent-deep)", marginLeft: 2 }}>"</span>
              </blockquote>

              <figcaption style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Avatar name={q.a} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{q.a}</div>
                  <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{q.r}</div>
                </div>
                <div style={{ flex: 1 }} />
                <div className="mono" style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em" }}>
                  {String(i + 1).padStart(2, "0")} / {String(t.social.quotes.length).padStart(2, "0")}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Logos marquee */}
        {showLogos && (
          <div style={{ marginTop: 72 }}>
            <div className="mono" style={{
              fontSize: 11, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase",
              textAlign: "center", marginBottom: 24,
            }}>
              {t.social.eyebrow}
            </div>
            <div className="marquee">
              <div className="marquee-track">
                {[...t.social.logos, ...t.social.logos].map((name, i) => (
                  <LogoChip key={i} name={name} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Avatar({ name }) {
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  const hash = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const hue = (hash * 7) % 360;
  return (
    <div style={{
      width: 40, height: 40, borderRadius: "50%",
      background: `oklch(0.88 0.06 ${hue})`,
      color: `oklch(0.32 0.1 ${hue})`,
      display: "grid", placeItems: "center",
      fontSize: 13, fontWeight: 600,
      letterSpacing: "0.02em",
      border: "1px solid oklch(0.78 0.06 " + hue + ")",
    }}>
      {initials}
    </div>
  );
}

function LogoChip({ name }) {
  return (
    <div style={{
      fontSize: 28, fontWeight: 500, color: "var(--ink-soft)",
      letterSpacing: "-0.02em",
      whiteSpace: "nowrap",
      opacity: 0.55,
      fontFamily: name.toLowerCase().includes("lab") ? "var(--f-serif)" : "var(--f-sans)",
      fontStyle: name.toLowerCase().includes("lab") ? "italic" : "normal",
    }}>
      {name}
    </div>
  );
}

Object.assign(window, { Social });
