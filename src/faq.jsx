// faq.jsx
function FAQ({ t }) {
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq" className="section section-divider">
      <div className="container">
        <header className="sec-header" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end", marginBottom: 56 }}>
          <div>
            <span className="eyebrow">{t.faq.eyebrow}</span>
            <h2 className="section-title" style={{ marginTop: 18 }}>
              {t.faq.title_a} <em>{t.faq.title_em}</em> {t.faq.title_b}
            </h2>
          </div>
          <div style={{ alignSelf: "end" }}>
            <p className="section-lede" style={{ marginTop: 0 }}>
              ¿No encontrás lo que buscás?{" "}
              <a href="#cta" style={{ color: "var(--accent-deep)", borderBottom: "1px solid var(--accent)" }}>
                Hablá con nosotros
              </a>.
            </p>
          </div>
        </header>

        <div style={{ borderTop: "1px solid var(--border)" }}>
          {t.faq.items.map((item, i) => (
            <FAQItem key={i} item={item} idx={i} open={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ item, idx, open, onClick }) {
  return (
    <div style={{ borderBottom: "1px solid var(--border)" }}>
      <button onClick={onClick} style={{
        appearance: "none", border: "none", background: "transparent",
        width: "100%", textAlign: "left",
        padding: "22px 0",
        display: "grid", gridTemplateColumns: "48px 1fr 32px", alignItems: "center", gap: 16,
        cursor: "pointer",
      }}>
        <span className="mono" style={{ color: "var(--muted)", fontSize: 12, letterSpacing: "0.06em" }}>
          {String(idx + 1).padStart(2, "0")}
        </span>
        <span style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.015em", color: "var(--ink)" }}>
          {item.q}
        </span>
        <span style={{
          width: 28, height: 28, borderRadius: "50%",
          border: "1px solid var(--border-strong)",
          display: "grid", placeItems: "center",
          transition: "all .2s ease",
          background: open ? "var(--ink)" : "transparent",
          color: open ? "var(--bg)" : "var(--ink)",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M6 1.5v9M1.5 6h9" />
          </svg>
        </span>
      </button>
      <div style={{
        display: "grid",
        gridTemplateRows: open ? "1fr" : "0fr",
        transition: "grid-template-rows .35s ease",
      }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{
            padding: "0 0 26px 64px",
            fontSize: 15.5, color: "var(--muted)", lineHeight: 1.6,
            maxWidth: "70ch", textWrap: "pretty",
          }}>
            {item.a}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { FAQ });
