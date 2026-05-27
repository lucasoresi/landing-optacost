// app.jsx — entrypoint
function App() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  const lang = t.lang === "en" ? "en" : "es";
  const dict = window.I18N[lang];

  // Hero headline variant
  const heroDict = React.useMemo(() => {
    if (t.headline === "precision") {
      return {
        ...dict.hero,
        title_a: lang === "en" ? "Precision" : "Precisión",
        title_b: lang === "en" ? "for every margin." : "para cada margen.",
      };
    }
    if (t.headline === "lab") {
      return {
        ...dict.hero,
        title_a: lang === "en" ? "Your lab," : "Tu laboratorio,",
        title_b: lang === "en" ? "in focus." : "en foco.",
      };
    }
    return dict.hero;
  }, [t.headline, lang]);

  const tWithHero = { ...dict, hero: heroDict };

  // Apply theme attrs to root
  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-accent", t.accent);
    root.setAttribute("data-density", t.density);
    root.setAttribute("data-serif", t.serifAccents ? "on" : "off");
  }, [t.accent, t.density, t.serifAccents]);

  // Turn serif on/off via CSS variable swap
  const serifCSS = t.serifAccents ? "" : `.serif, .section-title em { font-family: var(--f-sans) !important; font-style: normal !important; font-weight: 500 !important; }`;

  return (
    <>
      {serifCSS && <style>{serifCSS}</style>}
      <Nav t={dict} lang={lang} setLang={(l) => setTweak("lang", l)} />
      <Hero t={tWithHero} lang={lang} dark={t.darkHero} />
      <Benefits t={dict} />
      <Tour t={dict} />
      <Convenios t={dict} />
      <Social t={dict} showLogos={t.showLogos} />
      {t.showPricing && <Pricing t={dict} />}
      {t.showSecurity && <Security t={dict} />}
      {t.showFAQ && <FAQ t={dict} />}
      <CTA t={dict} />
      <Footer t={dict} />
      <Tweaks t={t} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
