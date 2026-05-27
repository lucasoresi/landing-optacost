// nav.jsx
function Nav({ t, lang, setLang }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const items = [
    { k: "tour", label: t.nav.product },
    { k: "benefits", label: t.nav.benefits },
    { k: "pricing", label: t.nav.pricing },
    { k: "about", label: t.nav.about },
  ];

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      background: scrolled ? "color-mix(in oklch, var(--bg) 88%, transparent)" : "transparent",
      backdropFilter: scrolled ? "saturate(180%) blur(14px)" : "none",
      WebkitBackdropFilter: scrolled ? "saturate(180%) blur(14px)" : "none",
      transition: "all .25s ease",
    }}>
      <div className="container" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px var(--c-pad)",
      }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo />
          <span style={{ fontWeight: 600, letterSpacing: "-0.02em", fontSize: 18 }}>Optacost</span>
        </a>

        {/* Nav links */}
        <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {items.map((it) => (
            <a key={it.k} href={`#${it.k}`} style={{
              fontSize: 14, color: "var(--ink-soft)", fontWeight: 500,
              transition: "color .15s ease",
            }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--ink)"}
               onMouseLeave={(e) => e.currentTarget.style.color = "var(--ink-soft)"}>
              {it.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <LangToggle lang={lang} setLang={setLang} />
          <a href="https://app.optacost.com/" target="_blank" rel="noopener" className="btn btn-ghost btn-sm">
            {t.nav.login}
          </a>
          <a href="https://api.whatsapp.com/send?phone=5492915067059" target="_blank" rel="noopener" className="btn btn-primary btn-sm">
            {t.nav.contact} <Icon.arrow />
          </a>
        </div>
      </div>
    </header>
  );
}

function LangToggle({ lang, setLang }) {
  return (
    <div style={{
      display: "inline-flex",
      border: "1px solid var(--border)",
      borderRadius: 999,
      padding: 2,
      fontSize: 12,
      fontFamily: "var(--f-mono)",
    }}>
      {["es", "en"].map((l) => (
        <button key={l} onClick={() => setLang(l)} style={{
          appearance: "none", border: "none",
          padding: "4px 10px", borderRadius: 999,
          background: lang === l ? "var(--ink)" : "transparent",
          color: lang === l ? "var(--bg)" : "var(--ink-soft)",
          fontFamily: "inherit", fontSize: "inherit", fontWeight: 500,
          letterSpacing: "0.04em", textTransform: "uppercase",
          transition: "all .15s ease",
        }}>{l}</button>
      ))}
    </div>
  );
}

function Logo({ size = 30 }) {
  // Marca abstracta: cuatro barras crecientes — datos / costos / rentabilidad
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <rect x="0"  y="18" width="5" height="12" rx="1.2" fill="currentColor" opacity="0.32" />
      <rect x="8"  y="12" width="5" height="18" rx="1.2" fill="currentColor" opacity="0.55" />
      <rect x="16" y="6"  width="5" height="24" rx="1.2" fill="currentColor" opacity="0.78" />
      <rect x="24" y="0"  width="5" height="30" rx="1.2" fill="var(--accent)" />
    </svg>
  );
}

Object.assign(window, { Nav, Logo });
